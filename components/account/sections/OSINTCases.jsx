"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { uploadNewFile } from "@/utils/actions/fileUploads.ts";
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
import OSINTCasesList from "./admin/osnitCase/OSINTCasesList";

const OSINTCases = () => {
  const { data: session } = useSession();

  return (
    <>
      <section className="w-full h-fit animate-slide-down bg-background/80 backdrop-blur-sm p-2 md:p-4 lg:p-6 space-y-4 md:sapce-y-6 lg:space-y-8 rounded-lg overflow-hidden">
        <h3 className="animate-slide-down font-bold text-md md:text-lg lg:text-xl xl:text-2xl">
          OSINT Cases {session?.user?.role !== "admin" && "Input"}
        </h3>
        {session?.user?.role !== "admin" ?
          <OSINTCasesInputForm userId={session?.user?._id} />
        : <>
            <hr className="border-t-2 border-blue-400/30" />
            <OSINTCasesList />
          </>
        }
      </section>
    </>
  );
};

export default OSINTCases;

const OSINTCasesInputForm = ({ userId }) => {
  const user_id = userId;
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    budget: {
      currency: "₹",
      amount: "",
    },
    priority: "",
    extraNotes: "",
    caseDocument: {
      name: "",
      size: "",
      file: null,
    },
  });

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
    const file = files[0];
    if (!file) return;

    const isValidSize = file.size <= 5 * 1024 * 1024;

    if (!isValidSize) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const fileSize =
      file.size < 1024 * 1024 ?
        `${(file.size / 1024).toFixed(2)} KB`
      : `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

    setFormData((prev) => ({
      ...prev,
      caseDocument: {
        name: file.name,
        size: fileSize,
        file: file,
      },
    }));
  };

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      caseDocument: {
        name: "",
        size: "",
        file: null,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.caseType) newErrors.caseType = "Case type is required";
    if (!formData.target) newErrors.target = "Target is required";
    if (!formData.budget.amount) newErrors.budget = "Budget amount is required";
    if (!formData.priority) newErrors.priority = "Priority is required";

    const hasSelectedSource = Object.values(formData.dataSources).some(
      (v) => v
    );
    if (!hasSelectedSource)
      newErrors.dataSources = "Select at least one data source";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add currency conversion function
  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    // Using approximate conversion rates
    const rates = {
      "₹": { $: 0.012 }, // 1 INR = 0.012 USD
      $: { "₹": 83.33 }, // 1 USD = 83.33 INR
    };

    if (fromCurrency === toCurrency) return amount;
    return (amount * rates[fromCurrency][toCurrency]).toFixed(2);
  };

  // Update budget change handler
  const handleBudgetChange = (field, value) => {
    setFormData((prev) => {
      if (field === "currency" && prev.budget.amount) {
        // Convert amount when currency changes
        const convertedAmount = convertCurrency(
          prev.budget.amount,
          prev.budget.currency,
          value
        );
        return {
          ...prev,
          budget: {
            currency: value,
            amount: convertedAmount,
          },
        };
      }
      return {
        ...prev,
        budget: {
          ...prev.budget,
          [field]: value,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const createOSINTCase = async () => {
      try {
        // checking if theres a file to upload
        let fileUrl = null;
        if (formData.caseDocument.file) {
          try {
            const fileFormData = new FormData();
            fileFormData.append("file", formData.caseDocument.file);
            const uploadedFileData = await uploadNewFile(fileFormData);
            fileUrl = uploadedFileData?.url;
            // console.log("File upload success:", fileUrl);

            if (!fileUrl) {
              throw new Error("File upload failed, please try again.");
            }
          } catch (error) {
            console.error("File upload error:", error);
            toast.error("File upload failed. Please try again.");
            setIsSubmitting(false);
            return;
          }
        }

        const keywordsArray =
          formData.keywords ?
            formData.keywords.split(",").map((k) => k.trim())
          : [];

        const requestBody = {
          user_id,
          caseType: formData.caseType,
          dataSorce: {
            google: formData.dataSources.google,
            linkedIn: formData.dataSources.linkedin,
            twitter: formData.dataSources.twitter,
            whois: formData.dataSources.whois,
          },
          target: formData.target,
          budget: {
            currency: formData.budget.currency,
            amount: Number(formData.budget.amount),
          },
          priority: formData.priority,
          keywords: keywordsArray,
          extraNotes: formData.extraNotes,
          caseDocument:
            fileUrl ?
              {
                name: formData.caseDocument.name,
                size: formData.caseDocument.size,
                url: fileUrl,
              }
            : null,
        };

        const response = await fetch("/api/account/osint-cases/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);

        // Reset form after successful submission
        setFormData({
          caseType: "",
          dataSources: {
            linkedin: false,
            twitter: false,
            whois: false,
            google: false,
          },
          target: "",
          keywords: "",
          budget: {
            currency: "₹",
            amount: "",
          },
          priority: "",
          extraNotes: "",
          caseDocument: {
            name: "",
            size: "",
            file: null,
          },
        });

        return data.message;
      } catch (error) {
        console.error("OSINT case error:", error);
        throw new Error(error.message);
      } finally {
        setIsSubmitting(false);
      }
    };

    toast.promise(createOSINTCase(), {
      loading: "Creating OSINT case...",
      success: (message) => `Success! ${message}`,
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-fit space-y-4 animate-slide-up overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/ rounded-lg overflow-hidden">
          <label htmlFor="case-type" className="">
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
          <label className="">
            Data Sources{" "}
            {errors.dataSources && (
              <span className="text-red-500 text-sm">*</span>
            )}
          </label>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              { name: "google", label: "Google" },
              { name: "linkedin", label: "LinkedIn" },
              { name: "twitter", label: "Twitter" },
              { name: "whois", label: "WHOIS" },
            ].map((source) => (
              <label
                key={source.name}
                className="flex items-center gap-2 cursor-pointer select-none p-2 rounded-md hover:bg-blue-500/10 transition-all duration-200"
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
          <label htmlFor="target" className="">
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
          <label htmlFor="keywords" className="">
            Keywords (Optional)
          </label>
          <input
            type="text"
            name="keywords"
            id="keywords"
            value={formData.keywords}
            onChange={handleInputChange}
            placeholder="Enter keywords spearated by commas (,) e.g. name,email,phone"
            className="input-style"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/ rounded-lg overflow-hidden">
          <label htmlFor="budget" className="">
            Budget{" "}
            {errors.budget && <span className="text-red-500 text-sm">*</span>}
          </label>
          <div className="flex gap-2 w-full text-foreground bg-primary/50 dark:bg-gray-900 backdrop-blur-md border border-blue-950/50 ring-1 ring-blue-900/50 rounded overflow-hidden">
            <select
              value={formData.budget.currency}
              onChange={(e) => handleBudgetChange("currency", e.target.value)}
              className="w-fit bg-primary/50 dark:bg-primary/10 border border-blue-400/50 rounded-sm p-2 outline-none"
            >
              <option
                value="₹"
                className="bg-primary/50 dark:bg-primary/10 text-background"
              >
                ₹ INR
              </option>
              <option
                value="$"
                className="bg-primary/50 dark:bg-primary/10 text-background"
              >
                $ USD
              </option>
            </select>
            <input
              type="text"
              required
              name="budget-amount"
              id="budget-amount"
              value={formData.budget.amount}
              onChange={(e) =>
                handleBudgetChange("amount", e.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter amount"
              className="flex-1 w-full h-full bg-transparent outline-none p-2"
            />
          </div>
        </div>
        <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/ rounded-lg overflow-hidden">
          <label htmlFor="priority" className="">
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
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="h-full space-y-2 p-2 md:p-4 lg:p-6 bg-primary/ rounded-lg overflow-hidden">
          <label htmlFor="priority" className="">
            Case Document (Optional)
          </label>
          <div
            className={`w-full h-28 border-2 border-dashed rounded-lg flex flex-col items-center justify-center ${
              isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } ${
              isDragging ?
                "border-blue-500 bg-blue-500/10"
              : "border-blue-900/50 text-foreground bg-primary/50 dark:bg-primary/10"
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
            <Upload className="w-6 h-6  mb-2" />
            <p className="text-sm ">
              {isUploading ?
                "Uploading files..."
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
              disabled={isUploading}
            />
          </div>
          {formData.caseDocument.name && (
            <div className="mt-2">
              <div className="flex items-center justify-between bg-primary-clr/50 p-2 rounded">
                <span className="text-sm  truncate">
                  {formData.caseDocument.name} ({formData.caseDocument.size})
                </span>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-red-400 hover:text-red-500 text-lg"
                  disabled={isUploading}
                >
                  ×
                </button>
              </div>
            </div>
          )}
          {errors.attachment && (
            <span className="text-red-500 text-sm">{errors.attachment}</span>
          )}
        </div>
        <div className="h-full space-y-2 p-2 md:p-4 lg:p-6 bg-primary/ rounded-lg overflow-hidden">
          <label htmlFor="extra-notes" className="">
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

      {/* <div className="w-full h-fit mt-2 flex justify-end"> */}
      <Button
        type="submit"
        size="lg"
        effect="gooeyRight"
        disabled={isSubmitting}
        className={`w-fit bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold rounded md:px-4 lg:px-6 xl:px-8 overflow-hidden ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        <IoSearch size={28} />
        {isSubmitting ? "OSINT Investigating..." : "Start OSINT Investigation"}
      </Button>
      {/* </div> */}
    </form>
  );
};
