"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoScan } from "react-icons/io5";

const Scan = () => {
  const [file, setFile] = useState(null);
  const [scanType, setScanType] = useState("");
  const [scanSchedule, setScanSchedule] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // VirusTotal API key
  const VIRUSTOTAL_API_KEY = process.env.NEXT_PUBLIC_VIRUSTOTAL_API_KEY;

  // Handle form submission
  const handleScan = async () => {
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
          url: "target", // the URL the user provided
        }),
      });

      const result = await response.json();
      setScanResult(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error during analysis:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full mx-auto overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Initiate Malware Scan</h1>

        <div className="w-full max-h-[50vh] pr-0 overflow-x-hidden overflow-y-scroll">
          <div className="mb-4">
            <div className="relative w-full cursor-pointer flex-center mt-2 p-2 bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-md">
              <input
                type="file"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    setFile(selectedFile);
                  }
                }}
                className="absolute inset-0 z-10 opacity-0 cursor-pointer"
              />
              <span className="flex-center gap-1 line-clamp-1">
                <IoScan color={file && "green"} />
                {file ? file.name : "Scan Now"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1">
            <div>
              <label className="block text-sm font-medium">Scan Type</label>
              <div className="w-full py-2">
                <Select defaultValue={scanType} onValueChange={setScanType}>
                  <SelectTrigger className="py-5">
                    <SelectValue placeholder="Select scan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Scan Schedule</label>
              <div className="w-full py-2">
                <Select
                  defaultValue={scanSchedule}
                  onValueChange={setScanSchedule}
                >
                  <SelectTrigger className="py-5">
                    <SelectValue placeholder="Select scan schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full h-fit flex items-center justify-start gap-4 py-2">
          <Button size="sm" onClick={handleScan}>
            {isLoading ? "Scaning..." : "Scan"}
          </Button>
          {scanResult && (
            <Button size="sm" onClick={() => setIsOpen(!isOpen)}>
              View Result
            </Button>
          )}
        </div>
      </div>
      {isOpen && scanResult && (
        <ScanResult
          scanResult={scanResult}
          isOpen={isOpen}
          handleClose={() => setIsOpen(!isOpen)}
        />
      )}
    </>
  );
};

export default Scan;

const ScanResult = ({ ScanResult, isOpen, handleClose }) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>OSINT Analysis Result</DialogTitle>
            <DialogDescription>
              {ScanResult && (
                <div className="p-4">
                  {/* <h2 className="text-xl font-bold">Analysis Result</h2> */}
                  <pre className="mt-4 text-sm">
                    {JSON.stringify(ScanResult, null, 2)}
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
