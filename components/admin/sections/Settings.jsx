"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setInterval(() => setIsSaving(false), 5000);
  };
  return (
    <>
      <div className="w-full mx-auto overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>

        <div className="w-full max-h-[50vh] pr-0 overflow-x-hidden overflow-y-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1">
            <h4 className="block text-sm font-medium">General Settings</h4>
            <h4 className="block text-sm font-medium">Account Settings</h4>

            <div>{/* input */}</div>
            <div>{/* input */}</div>
          </div>
        </div>

        <div className="mt-4 w-full h-fit flex items-center justify-start gap-4 py-2 border-t border-t-zinc-400 dark:border-t-zinc-800/60">
          <Button
            variant="outline"
            size="sm"
            disabled={isSaving}
            onClick={() => setIsOpen(!isOpen)}
          >
            Cancel
          </Button>
          <Button size="sm" disabled={isSaving} onClick={handleSave}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Settings;
