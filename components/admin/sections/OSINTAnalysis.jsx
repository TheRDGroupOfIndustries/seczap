"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { TbBoxMargin } from "react-icons/tb";

const OSINTAnalysis = () => {
  const [formData, setFormData] = useState({
    serviceType: "",
    target: "",
    keywords: "",
    priority: "",
    budget: "",
    notes: "",
  });
  const [serviceType, setServiceType] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState(new Date());

  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // VirusTotal API key
  const VIRUSTOTAL_API_KEY = process.env.NEXT_PUBLIC_VIRUSTOTAL_API_KEY;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleAnalyze = async () => {
    const { target } = formData;

    if (!target) {
      alert("Please enter a valid target URL or file.");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = "https://www.virustotal.com/vtapi/v2/url/scan";

      // sending POST request to VirusTotal API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "x-apikey": VIRUSTOTAL_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          apikey: VIRUSTOTAL_API_KEY,
          url: target, // the URL the user provided
        }),
      });

      const result = await response.json();
      setAnalysisResult(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error during analysis:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full mx-auto overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">OSINT Analysis</h1>

        <div className="w-full h-[50vh] pr-1 overflow-x-hidden overflow-y-scroll">
          <div className="mb-4">
            <div className="relative w-full cursor-pointer flex-center mt-2 p-2 bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-md">
              <input type="file" className="absolute inset-0 z-10 hidden" />
              <span className="flex-center gap-1">
                <TbBoxMargin />
                Upload a doc or pdf file with task details
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Service Type</label>
              <div className="w-full mt-2 px-0.5">
                <Select
                  defaultValue={serviceType}
                  onValueChange={setServiceType}
                >
                  <SelectTrigger className="py-5">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social-media-intelligence">
                      Social Media Intelligence
                    </SelectItem>
                    <SelectItem value="public-data-analysis">
                      Public Data Analysis
                    </SelectItem>
                    <SelectItem value="brand-protection">
                      Brand Protection
                    </SelectItem>
                    <SelectItem value="competitive-intelligence">
                      Competitive Intelligence
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Target</label>
              <input
                type="text"
                name="target"
                value={formData.target}
                onChange={handleInputChange}
                className="mt-2 p-2 bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-md w-full"
                placeholder="Enter target name or URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Keywords</label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                className="mt-2 p-2 bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-md w-full"
                placeholder="Enter keywords (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="mt-2 px-2 py-5 bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-md w-full active:translate-y-0"
                  >
                    {date !== new Date() ? (
                      format(date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="mt-2 p-2 bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-md w-full"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-sm font-medium">Priority</label>
              <div className="w-full mt-2 px-0.5">
                <Select defaultValue={priority} onValueChange={setPriority}>
                  <SelectTrigger className="py-5">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social-media-intelligence">
                      Primary
                    </SelectItem>
                    <SelectItem value="public-data-analysis">
                      Secondary
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Budget</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="mt-2 p-2 bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-md w-full"
                placeholder="Enter budget"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="mt-2 p-2 bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-md w-full"
              placeholder="Enter any additional notes"
            ></textarea>
          </div>
        </div>

        <div className="w-full h-fit flex items-center justify-start gap-4 py-2">
          <Button size="sm" onClick={handleAnalyze}>
            {isLoading ? "Analyzing..." : "Analyze"}
          </Button>
          {analysisResult && (
            <Button size="sm" onClick={() => setIsOpen(!isOpen)}>
              View Result
            </Button>
          )}
        </div>
      </div>
      {isOpen && analysisResult && (
        <AnalysisResult
          analysisResult={analysisResult}
          isOpen={isOpen}
          handleClose={() => setIsOpen(!isOpen)}
        />
      )}
    </>
  );
};

export default OSINTAnalysis;

const AnalysisResult = ({ analysisResult, isOpen, handleClose }) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>OSINT Analysis Result</DialogTitle>
            <DialogDescription>
              {analysisResult && (
                <div className="p-4">
                  {/* <h2 className="text-xl font-bold">Analysis Result</h2> */}
                  <pre className="mt-4 text-sm">
                    {JSON.stringify(analysisResult, null, 2)}
                  </pre>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
