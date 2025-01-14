"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { IoSearch } from "react-icons/io5";

const OSINTCases = () => {
  return (
    <>
      <section className="w-full h-fit bg-background/80 backdrop-blur-sm p-2 md:p-4 lg:p-6 space-y-4 md:sapce-y-6 lg:space-y-8 rounded-lg overflow-hidden">
        <h3 className="font-bold text-md md:text-lg lg:text-xl xl:text-2xl text-blue-400">
          OSINT Cases Input
        </h3>
        {/* <hr className="border-t-2 border-blue-400/30" /> */}
        <OSINTCasesInputForm />
      </section>
    </>
  );
};

export default OSINTCases;

const OSINTCasesInputForm = () => {
  const [formData, setFormData] = useState({
    caseType: "",
    dataSources: {
      linkedin: false,
      twitter: false,
      whois: false,
      google: false,
    },
    target: "",
    keywords: "",
    budget: "",
    priority: "",
    extraNotes: "",
  });

  const [attachments, setAttachments] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        dataSources: {
          ...prev.dataSources,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => {
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      const isValidType = /\.(pdf|doc|docx|txt|png|jpg|jpeg)$/i.test(file.name);
      return isValidSize && isValidType;
    });

    if (attachments.length + validFiles.length > 5) {
      toast.error("Maximum 5 files allowed");
      return;
    }

    setAttachments((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.caseType) newErrors.caseType = "Case type is required";
    if (!formData.target) newErrors.target = "Target is required";
    if (!formData.budget) newErrors.budget = "Budget is required";
    if (!formData.priority) newErrors.priority = "Priority is required";

    const hasSelectedSource = Object.values(formData.dataSources).some(
      (v) => v
    );
    if (!hasSelectedSource)
      newErrors.dataSources = "Select at least one data source";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsUploading(true);
    try {
      // TODO: Implement your API call here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated API call
      toast.success("OSINT investigation started successfully");
    } catch (error) {
      toast.error("Failed to start investigation");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-fit space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/ rounded-lg overflow-hidden">
          <label htmlFor="case-type" className="text-blue-400">
            Case Type{" "}
            {errors.caseType && <span className="text-red-500 text-sm">*</span>}
          </label>
          <Select
            value={formData.caseType}
            onValueChange={(value) => handleSelectChange("caseType", value)}
          >
            <SelectTrigger className="input-style">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="social-media-intelligence">
                Social Media Intelligence
              </SelectItem>
              <SelectItem value="public-data-analysis">
                Public Data Analysis
              </SelectItem>
              <SelectItem value="brand-protection">Brand Protection</SelectItem>
              <SelectItem value="competitive-intelligence">
                Competitive Intelligence
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/ rounded-lg overflow-hidden">
          <label className="text-blue-400">
            Data Sources{" "}
            {errors.dataSources && (
              <span className="text-red-500 text-sm">*</span>
            )}
          </label>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              { name: "linkedin", label: "LinkedIn" },
              { name: "twitter", label: "Twitter" },
              { name: "whois", label: "WHOIS" },
              { name: "google", label: "Google" },
            ].map((source) => (
              <label
                key={source.name}
                className="flex items-center gap-2 cursor-pointer select-none text-blue-400 p-2 rounded-md hover:bg-blue-500/10 transition-all duration-200"
              >
                <input
                  type="checkbox"
                  name={source.name}
                  checked={formData.dataSources[source.name]}
                  onChange={handleInputChange}
                  className="appearance-none w-5 h-5 border-2 border-blue-400/50 rounded-md bg-transparent 
                           checked:bg-blue-500 checked:border-blue-500 
                           flex items-center justify-center
                           transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-blue-500/30
                           after:content-['✓'] after:hidden checked:after:block
                           after:text-white after:text-sm after:font-bold"
                />
                {source.label}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/ rounded-lg overflow-hidden">
          <label htmlFor="target" className="text-blue-400">
            Target{" "}
            {errors.target && <span className="text-red-500 text-sm">*</span>}
          </label>
          <input
            type="text"
            required
            name="target"
            id="target"
            value={formData.target}
            onChange={handleInputChange}
            placeholder="Enter target name/URL/identifier"
            className="input-style"
          />
        </div>
        <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/ rounded-lg overflow-hidden">
          <label htmlFor="keywords" className="text-blue-400">
            Keywords (Optional)
          </label>
          <input
            type="text"
            name="keywords"
            id="keywords"
            value={formData.keywords}
            onChange={handleInputChange}
            placeholder="Enter keywords spearated by commas (,)"
            className="input-style"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/ rounded-lg overflow-hidden">
          <label htmlFor="budget" className="text-blue-400">
            Budget{" "}
            {errors.budget && <span className="text-red-500 text-sm">*</span>}
          </label>
          <input
            type="text"
            required
            name="budget"
            id="budget"
            value={formData.budget}
            onChange={handleInputChange}
            placeholder="Enter budget in INR or USD"
            className="input-style"
          />
        </div>
        <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/ rounded-lg overflow-hidden">
          <label htmlFor="priority" className="text-blue-400">
            Priority{" "}
            {errors.priority && <span className="text-red-500 text-sm">*</span>}
          </label>
          <Select
            value={formData.priority}
            onValueChange={(value) => handleSelectChange("priority", value)}
          >
            <SelectTrigger className="input-style">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/ rounded-lg overflow-hidden">
          <label htmlFor="priority" className="text-blue-400">
            Case Document (Optional)
          </label>
          <div
            className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center ${
              isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } ${
              isDragging
                ? "border-blue-500 bg-blue-500/10"
                : "border-blue-900/50 text-foreground bg-primary/50"
            }`}
            onDragOver={!isUploading ? handleDragOver : undefined}
            onDragLeave={!isUploading ? handleDragLeave : undefined}
            onDrop={!isUploading ? handleDrop : undefined}
            onClick={
              !isUploading
                ? () => document.getElementById("file-upload").click()
                : undefined
            }
          >
            <Upload className="w-6 h-6  mb-2" />
            <p className="text-sm ">
              {isUploading
                ? "Uploading files..."
                : "Drop files here or click to upload (Max 5 files)"}
            </p>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
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
                  <span className="text-sm text-blue-400 truncate">
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
        <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/ rounded-lg overflow-hidden">
          <label htmlFor="extra-notes" className="text-blue-400">
            Extra Notes (Optional)
          </label>
          <textarea
            name="extraNotes"
            id="extra-notes"
            rows={4}
            value={formData.extraNotes}
            onChange={handleInputChange}
            placeholder="Enter any additional notes"
            className="w-full text-foreground bg-primary/50 dark:bg-gray-900 backdrop-blur-md border border-blue-950/50 ring-1 ring-blue-900/50 rounded p-2 overflow-hidden"
          />
        </div>
      </div>

      <div className="w-full h-fit mt-2 flex justify-end">
        <Button
          type="submit"
          size="lg"
          effect="gooeyRight"
          className={`w-fit bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold rounded md:px-4 lg:px-6 xl:px-8 overflow-hidden `}
        >
          <IoSearch size={28} /> Start OSINT Investigation
        </Button>
      </div>
    </form>
  );
};
