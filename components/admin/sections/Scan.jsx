"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { IoScan } from "react-icons/io5";
import { toast } from "sonner";
import { scanAnalyse } from "@/utils/virusTotal.action";

const Scan = () => {
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState(null);
  const [scanType, setScanType] = useState("");
  const [scanSchedule, setScanSchedule] = useState(new Date());
  const [formattedDateTime, setFormattedDateTime] = useState("");

  const [scanResult, setScanResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    if (date) {
      const updatedDateTime = new Date(scanSchedule);
      updatedDateTime.setFullYear(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      setScanSchedule(updatedDateTime);
      updateFormattedDateTime(updatedDateTime);
    }
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    const [hours, minutes] = time.split(":").map(Number);
    const updatedDateTime = new Date(scanSchedule);
    updatedDateTime.setHours(hours, minutes);
    setScanSchedule(updatedDateTime);
    updateFormattedDateTime(updatedDateTime);
  };

  const updateFormattedDateTime = (date) => {
    setFormattedDateTime(format(date, "PPP p"));
  };

  const hours = scanSchedule.getHours().toString().padStart(2, "0");
  const minutes = scanSchedule.getMinutes().toString().padStart(2, "0");
  const timeValue = `${hours}:${minutes}`;

  // handling form submission
  const handleScan = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const fileForm = new FormData();
    fileForm.append("file", file);

    const startScanning = async (file) => {
      try {
        const result = await scanAnalyse(file);
        // console.log(result);
        if (!result) {
          throw new Error("Something went wrong, please try again!");
        }

        setScanResult(result);
        return "Your Scan analysis is ready!";
      } catch (err) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    toast.promise(startScanning(fileForm), {
      loading: "Scanning...",
      success: "Your Scan analysis is ready!",
      error: (err) => `${err.message}`,
    });
  };

  // console.log(scanResult);

  return (
    <>
      <form onSubmit={handleScan} className="w-full mx-auto overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Initiate Malware Scan</h1>

        <div className="w-full max-h-[50vh] pr-0 overflow-x-hidden overflow-y-scroll">
          <div className="mb-4">
            <div className="relative w-full cursor-pointer flex-center mt-2 p-2 bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-md">
              <input
                type="file"
                required
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
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="advance">Advance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Scan Schedule</label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-2 px-2 py-5 bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-md w-full active:translate-y-0"
                  >
                    {formattedDateTime || "Select date and time"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="scale-[0.80] translate-y-10">
                  <div className="flex flex-col space-y-4">
                    <Calendar
                      mode="single"
                      selected={scanSchedule}
                      onSelect={handleDateChange}
                      className="input-style"
                    />
                    <div className="flex flex-col">
                      <label className="text-sm font-medium">Select Time</label>
                      <input
                        type="time"
                        value={timeValue}
                        className="mt-1 p-2 border rounded"
                        onChange={handleTimeChange}
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full h-fit flex items-center justify-start gap-4 py-2">
          <Button type="submit" disabled={isLoading} size="sm">
            {isLoading ? "Scaning..." : "Scan"}
          </Button>
          {scanResult && (
            <Button type="button" size="sm" onClick={() => setIsOpen(!isOpen)}>
              View Result
            </Button>
          )}
        </div>
      </form>
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

const ScanResult = ({ scanResult, isOpen, handleClose }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // converting Unix timestamp to milliseconds
    return date.toLocaleString();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={handleClose}
        className="max-h-[70vh] overflow-hidden"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>SCAN Analysis Result</DialogTitle>
            <DialogDescription className="max-h-[68vh] mr-2 overflow-y-scroll overflow-x-hidden">
              {scanResult && (
                <div className="w-full overflow-hidden">
                  <div className="">
                    <p className="text-xs line-clamp-1 flex gap-1">
                      <strong>ID:</strong> {scanResult.id}
                    </p>
                    <p className="text-xs line-clamp-1 flex gap-1">
                      <strong>Status:</strong> {scanResult.attributes.status}
                    </p>
                    <p className="text-xs line-clamp-1 flex gap-1">
                      <strong>Date:</strong>{" "}
                      {formatDate(scanResult.attributes.date)}
                    </p>
                  </div>

                  <div className="mt-4 mb-4">
                    <h3 className="text-md font-semibold text-black dark:text-white">
                      Scan Stats
                    </h3>
                    <p>Malicious: {scanResult.attributes.stats.malicious}</p>
                    <p>Suspicious: {scanResult.attributes.stats.suspicious}</p>
                    <p>Undetected: {scanResult.attributes.stats.undetected}</p>
                    <p>Timeout: {scanResult.attributes.stats.timeout}</p>
                    <p>
                      Type Unsupported:{" "}
                      {scanResult.attributes.stats["type-unsupported"]}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-black dark:text-white">
                      Engine Results
                    </h3>
                    <div className="max-h-[40vh] mr-1 overflow-y-scroll">
                      {Object.keys(scanResult.attributes.results).map(
                        (engine) => {
                          const result = scanResult.attributes.results[engine];
                          return (
                            <div
                              key={engine}
                              className="p-2 border-b border-gray-200"
                            >
                              <h4 className="font-semibold text-md text-black dark:text-white">
                                {result.engine_name}
                              </h4>
                              <p>Version: {result.engine_version || "N/A"}</p>
                              <p>Last Updated: {result.engine_update}</p>
                              <p>Category: {result.category}</p>
                              <p>
                                Result: {result.result || "No issues detected"}
                              </p>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
