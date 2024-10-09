"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const { data: session, status } = useSession(); // console.log(session);

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 5000);
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[48vh] pr-1.5 overflow-x-hidden overflow-y-scroll">
        {/* Left Section - Settings Categories */}
        <div className="space-y-6">
          {/* General Settings */}
          <div>
            <h4 className="text-lg font-semibold mb-2">General Settings</h4>
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" checked />
                <span className="ml-2">Dark Mode</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Notifications</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Auto Update</span>
              </label>
            </div>
          </div>

          {/* Security Settings */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Security Settings</h4>
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Two-Factor Authentication</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">IP Whitelist</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Session Timeout</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Section - Account Settings */}
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">Account Settings</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  defaultValue={session?.user?.name ?? "Add Name"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded"
                  defaultValue={session?.user?.email ?? "Add Email"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded"
                  defaultValue="**********"
                />
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Integrations</h4>
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Slack Integration</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">GitHub Integration</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Jira Integration</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-4 border-t py-4">
        <Button
          variant="outline"
          size="sm"
          disabled={isSaving}
          onClick={() => console.log("Cancelled")}
        >
          Cancel
        </Button>
        <Button size="sm" disabled={isSaving} onClick={handleSave}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
