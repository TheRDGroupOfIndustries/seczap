"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";

const AccountSettingsContext = createContext({});

export const useAccountSettings = () => {
  const context = useContext(AccountSettingsContext);
  if (!context) {
    throw new Error(
      "useAccountSettings must be used within a AccountSettingsProvider!"
    );
  }
  return context;
};

const AccountSettingsProvider = ({ children }) => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [emailNotification, setEmailNotification] = useState(
    session?.user?.settings?.emailNotification ?? false
  );
  const [language, setLanguage] = useState(
    session?.user?.settings?.language ?? "en"
  );
  const [timeZone, setTimeZone] = useState(
    session?.user?.settings?.timeZone ?? "Asia/Kolkata"
  );
  const [securityLevel, setSecurityLevel] = useState(
    session?.user?.settings?.securityLevel ?? "standard"
  );

  useEffect(() => {
    if (session?.user?.settings) {
      const { settings } = session.user;
      if (settings.theme) setTheme(settings.theme);
      if (settings.emailNotification !== undefined)
        setEmailNotification(settings.emailNotification);
      if (settings.language) setLanguage(settings.language);
      if (settings.timeZone) setTimeZone(settings.timeZone);
      if (settings.securityLevel) setSecurityLevel(settings.securityLevel);
    }
  }, [session, setTheme]);

  console.log(
    "account settings",
    theme,
    emailNotification,
    language,
    timeZone,
    securityLevel
  );

  const saveSettings = async (newSettings) => {
    // Check if any settings have actually changed
    const hasChanges = Object.entries(newSettings).some(([key, value]) => {
      switch (key) {
        case "theme":
          return value !== theme;
        case "emailNotification":
          return value !== emailNotification;
        case "language":
          return value !== language;
        case "timeZone":
          return value !== timeZone;
        case "securityLevel":
          return value !== securityLevel;
        default:
          return false;
      }
    });

    if (!hasChanges) {
      return { success: true, message: "No changes detected or made!" };
    }

    try {
      const response = await fetch("/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          settings: newSettings,
        }),
      });

      if (response.ok) {
        // Update local state only after successful API call
        if (newSettings.theme) setTheme(newSettings.theme);
        if (newSettings.emailNotification !== undefined)
          setEmailNotification(newSettings.emailNotification);
        if (newSettings.language) setLanguage(newSettings.language);
        if (newSettings.timeZone) setTimeZone(newSettings.timeZone);
        if (newSettings.securityLevel)
          setSecurityLevel(newSettings.securityLevel);

        return { success: true };
      } else {
        throw new Error("Failed to update settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <AccountSettingsContext.Provider
      value={{
        theme,
        emailNotification,
        language,
        timeZone,
        securityLevel,
        saveSettings,
      }}
    >
      {children}
    </AccountSettingsContext.Provider>
  );
};

export default AccountSettingsProvider;
