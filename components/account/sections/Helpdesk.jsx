"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { uploadMultipleNewFiles } from "@/utils/actions/fileUploads";

const Helpdesk = () => {
  return (
    <>
      <section className="w-full h-fit bg-background/80 backdrop-blur-sm p-2 md:p-4 lg:p-6 space-y-4 md:sapce-y-6 lg:space-y-8 rounded-lg overflow-hidden">
        <h3 className="font-bold text-md md:text-lg lg:text-xl xl:text-2xl">
          Contact Support
        </h3>

        <HelpdeskForm />
      </section>
    </>
  );
};

export default Helpdesk;

const HelpdeskForm = () => {
  const { data: session } = useSession();
  const user_id = session?.user?._id;
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "image/png",
    "image/jpeg",
  ];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_FILES = 5;

  const validateFile = (file) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Invalid file type";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds 5MB";
    }
    return null;
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.value) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!validateEmail(e.target.value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    if (!e.target.value) {
      setErrors((prev) => ({ ...prev, subject: "Subject is required" }));
    } else {
      setErrors((prev) => ({ ...prev, subject: "" }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const newErrors = [];
    const validFiles = [];

    files.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(`${file.name}: ${error}`);
      } else if (validFiles.length + attachments.length >= MAX_FILES) {
        newErrors.push(`${file.name}: Maximum ${MAX_FILES} files allowed`);
      } else {
        validFiles.push(file);
      }
    });

    if (newErrors.length > 0) {
      setErrors((prev) => ({
        ...prev,
        attachment: newErrors.join(", "),
      }));
    }

    if (validFiles.length > 0) {
      setAttachments((prev) => [...prev, ...validFiles]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const removeFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    if (attachments.length <= 5) {
      setErrors((prev) => ({ ...prev, attachment: "" }));
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (!e.target.value) {
      setErrors((prev) => ({ ...prev, message: "Message is required" }));
    } else {
      setErrors((prev) => ({ ...prev, message: "" }));
    }
  };

  const handleFileUpload = async (files) => {
    if (!files.length) return [];
    setIsUploading(true);

    try {
      const filesFormData = new FormData();
      files.forEach((file) => filesFormData.append("files", file));

      const uploadedUrls = await uploadMultipleNewFiles(filesFormData);

      return files.map((file, index) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: uploadedUrls[index],
      }));
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed. Please try again.");
      throw new Error("File upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const sendHelpDeskContactForm = async (formData) => {
    try {
      const response = await fetch("/api/account/help-desk/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      return true;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // First upload files if any
      let uploadedFiles = [];
      if (attachments.length > 0) {
        uploadedFiles = await handleFileUpload(attachments);
      }

      // Then submit the form
      await toast.promise(
        sendHelpDeskContactForm({
          user_id,
          name,
          email,
          subject,
          priority,
          message,
          attachments: uploadedFiles,
        }),
        {
          loading: "Sending your request...",
          success: "Request submitted successfully!",
          error: "Failed to submit request. Please try again.",
        }
      );

      // Reset form on success
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    else if (!validateEmail(email)) errors.email = "Invalid email format";
    if (!subject) errors.subject = "Subject is required";
    if (!priority) errors.priority = "Priority is required";
    if (!message) errors.message = "Message is required";
    return errors;
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSubject("");
    setPriority("");
    setAttachments([]);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-fit space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="dark:text-blue-200">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={name}
          onChange={handleNameChange}
          placeholder="Enter Name"
          className="input-style"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="dark:text-blue-200">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter Email"
          className="input-style"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="dark:text-blue-200">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          required
          value={subject}
          onChange={handleSubjectChange}
          placeholder="Enter Subject"
          className="input-style"
        />
        {errors.subject && (
          <span className="text-red-500 text-sm">{errors.subject}</span>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="priority" className="dark:text-blue-200">
          Priority
        </label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="input-style">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
        {errors.priority && (
          <span className="text-red-500 text-sm">{errors.priority}</span>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="dark:text-blue-200">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          required
          rows={4}
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter Message"
          className="w-full text-foreground bg-primary/50 dark:bg-gray-900 backdrop-blur-md border border-blue-950/50 ring-1 ring-blue-900/50 rounded p-2 overflow-hidden"
        />
        {errors.message && (
          <span className="text-red-500 text-sm">{errors.message}</span>
        )}
      </div>
      <div className="space-y-2">
        <label className="dark:text-blue-200">Attachments</label>
        <div
          className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center ${
            isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          } ${
            isDragging ?
              "border-blue-500 bg-blue-500/10"
            : "border-blue-900/50 text-foreground bg-primary/50"
          }`}
          onDragOver={!isUploading ? handleDragOver : undefined}
          onDragLeave={!isUploading ? handleDragLeave : undefined}
          onDrop={!isUploading ? handleDrop : undefined}
          onClick={
            !isUploading ?
              () => document.getElementById("file-upload").click()
            : undefined
          }
        >
          <Upload className="w-6 h-6 dark:text-blue-200 mb-2" />
          <p className="text-sm dark:text-blue-200">
            {isUploading ?
              "Uploading files..."
            : "Drop files here or click to upload (Max 5 files)"}
          </p>
          <p className="text-xs dark:text-blue-200/70 mt-1">
            Max file size: 5MB each
          </p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            multiple
            disabled={isUploading}
          />
        </div>
        {attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-primary-clr/50 p-2 rounded"
              >
                <span className="text-sm dark:text-blue-200 truncate">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-400 hover:text-red-500 text-lg"
                  disabled={isUploading}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.attachment && (
          <span className="text-red-500 text-sm">{errors.attachment}</span>
        )}
      </div>
      <div>
        <Button
          type="submit"
          disabled={isSubmitting || Object.values(errors).some(Boolean)}
          size="lg"
          effect="gooeyRight"
          className={`w-full mt-4 bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold ${
            (isSubmitting || Object.values(errors).some(Boolean)) &&
            "opacity-50 cursor-not-allowed active:translate-y-0"
          } rounded md:px-4 lg:px-6 xl:px-8 overflow-hidden`}
        >
          {isSubmitting ? "Submitting..." : "Submit Ticket"}
        </Button>
      </div>
    </form>
  );
};
