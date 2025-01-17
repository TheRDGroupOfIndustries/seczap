"use client";

import { useState } from "react";
// import { languages } from "countries-list";
import { toast } from "sonner";
import moment from "moment-timezone";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAccountSettings } from "@/context/AccountSettingsProvider";

const Settings = () => {
  return (
    <>
      <section className="w-full h-fit animate-slide-down bg-background/80 backdrop-blur-sm p-2 md:p-4 lg:p-6 space-y-4 md:sapce-y-6 lg:space-y-8 rounded-lg overflow-hidden">
        <h3 className="animate-slide-down font-bold text-md md:text-lg lg:text-xl xl:text-2xl text-blue-400">
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
  const {
    theme: initialTheme,
    emailNotification: initialEmailNotification,
    language: initialLanguage,
    timeZone: initialTimeZone,
    securityLevel: initialSecurityLevel,
    saveSettings,
  } = useAccountSettings();

  const [settings, setSettings] = useState({
    theme: initialTheme,
    emailNotification: initialEmailNotification,
    language: initialLanguage,
    timeZone: initialTimeZone,
    securityLevel: initialSecurityLevel,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await saveSettings(settings);
      if (result.success) {
        toast.success(result.message || "Settings updated successfully");
      } else {
        toast.error(result.error || "Failed to update settings");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Settings update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const languageOptions = Object.entries(languages).map(([code, lang]) => ({
  //   value: code.toLowerCase(),
  //   label: lang.name,
  // }));

  const timezoneOptions = moment.tz.names().map((tz) => {
    const offset = moment.tz(tz).format("Z");
    return {
      value: tz,
      label: `${tz} (UTC${offset})`,
    };
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full h-fit space-y-4 animate-slide-up overflow-hidden">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/5 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between">
              <label htmlFor="dark-mode" className="text-blue-400">
                Dark Mode
              </label>
              <Switch
                id="dark-mode"
                checked={settings.theme === "dark"}
                onCheckedChange={(checked) =>
                  handleSettingChange("theme", checked ? "dark" : "light")
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
                checked={settings.emailNotification}
                onCheckedChange={(checked) =>
                  handleSettingChange("emailNotification", checked)
                }
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {/* language translatoin select */}
          {/* <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/5 rounded-lg overflow-hidden">
            <label htmlFor="language" className="text-blue-400">
              Language
            </label>
            <Select
              value={settings.language}
              onValueChange={(value) => handleSettingChange("language", value)}
            >
              <SelectTrigger className="input-style">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
          <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/5 rounded-lg overflow-hidden">
            <label htmlFor="time-zone" className="text-blue-400">
              Time Zone
            </label>
            <Select
              value={settings.timeZone}
              onValueChange={(value) => handleSettingChange("timeZone", value)}
              name="time-zone"
            >
              <SelectTrigger className="input-style">
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent>
                {timezoneOptions.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 p-2 md:p-4 lg:p-6 bg-primary/5 rounded-lg overflow-hidden">
            <label htmlFor="security-level" className="text-blue-400">
              Security Level
            </label>
            <Select
              name="security-level"
              value={settings.securityLevel}
              onValueChange={(value) =>
                handleSettingChange("securityLevel", value)
              }
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
