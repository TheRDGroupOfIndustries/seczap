"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <>
      <section className="w-full h-fit bg-background/80 backdrop-blur-sm p-2 md:p-4 lg:p-6 space-y-4 md:sapce-y-6 lg:space-y-8 rounded-lg overflow-hidden">
        <h3 className="font-bold text-md md:text-lg lg:text-xl xl:text-2xl text-blue-400">
          Settings
        </h3>
        <hr className="border-t-2 border-blue-400/30" />
        <SettingsUpdateForm />
      </section>
    </>
  );
};

export default Settings;

const SettingsUpdateForm = () => {
  const { theme, setTheme } = useTheme();
  const [emailNotification, setEmailNotification] = useState(true);
  const [language, setLanguage] = useState("english");
  const [timeZone, setTimeZone] = useState("UTC");
  const [securityLevel, setSecurityLevel] = useState("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await toast.promise(
      new Promise((resolve, reject) => {
        // Simulated API call
        setTimeout(() => {
          // Simulate successful update
          resolve();
        }, 1000);
      }),
      {
        loading: "Updating settings...",
        success: "Settings updated successfully",
        error: "Failed to update settings",
      }
    );

    setIsSubmitting(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full h-fit space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/5 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between">
              <label htmlFor="dark-mode" className="text-blue-400">
                Dark Mode
              </label>
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
              />
            </div>
          </div>
          <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/5 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between">
              <label htmlFor="email-notification" className="text-blue-400">
                Email Notification (Security Alerts)
              </label>
              <Switch
                id="email-notification"
                checked={emailNotification}
                onCheckedChange={setEmailNotification}
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/5 rounded-lg overflow-hidden">
            <label htmlFor="language" className="text-blue-400">
              Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="input-style">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/5 rounded-lg overflow-hidden">
            <label htmlFor="time-zone" className="text-blue-400">
              Time Zone
            </label>
            <Select
              value={timeZone}
              onValueChange={setTimeZone}
              name="time-zone"
            >
              <SelectTrigger className="input-style">
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">EST (UTC-5)</SelectItem>
                <SelectItem value="PST">PST (UTC-8)</SelectItem>
                <SelectItem value="IST">IST (UTC+5:30)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/5 rounded-lg overflow-hidden">
          <label htmlFor="security-level" className="text-blue-400">
            Security Level
          </label>
          <Select
            name="security-level"
            value={securityLevel}
            onValueChange={setSecurityLevel}
          >
            <SelectTrigger className="input-style">
              <SelectValue placeholder="Select security level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard (2FA)</SelectItem>
              <SelectItem value="high">High (2FA + Biometric)</SelectItem>
              <SelectItem value="maximum">
                Maximum (2FA + Biometric + Hardware Key)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            effect="gooeyRight"
            className={`w-full mt-2 bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold rounded md:px-4 lg:px-6 xl:px-8 overflow-hidden ${
              isSubmitting &&
              "opacity-50 cursor-not-allowed active:translate-y-0"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </>
  );
};
