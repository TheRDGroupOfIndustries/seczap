"use client";

import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { passwordPattern } from "@/components/auth/form/Login";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Settings = () => {
  const { data: session } = useSession(); // console.log(session);
  const { theme, setTheme } = useTheme();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const confirmPasswordInputRef = useRef(null);

  const handlePassword = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);

    if (inputValue.trim() === "") {
      setDisableBtn(true);
    } else if (!/(?=.*[a-z])/.test(inputValue)) {
      toast.error("Include at least one lowercase letter.");
      setDisableBtn(true);
    } else if (!/(?=.*[A-Z])/.test(inputValue)) {
      toast.error("Include at least one uppercase letter.");
      setDisableBtn(true);
    } else if (!/(?=.*\d)/.test(inputValue)) {
      toast.error("Include at least one digit.");
      setDisableBtn(true);
    } else if (!/(?=.*[@$!%*?&])/.test(inputValue)) {
      toast.error("Include at least one special character (@$!%*?&).");
      setDisableBtn(true);
    } else if (inputValue.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      setDisableBtn(true);
    } else if (!passwordPattern.test(inputValue)) {
      toast.error("Invalid password");
      setDisableBtn(true);
    } else {
      toast.success("Valid password!");
      setDisableBtn(false);
    }
  };

  const handleConfirmPassword = (e) => {
    const cpswd = e.target.value;
    setConfirmPassword(cpswd);

    if (cpswd !== password) {
      setDisableBtn(true);
      toast.error("Mismatch password!");
    } else {
      setDisableBtn(false);
      toast.success("Password matched!");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const email = session?.user?.email;

    if (!email) {
      return toast.error("Please provide email!");
    }
    // if (!email || !password) {
    //   return toast.error("Please provide name or password!");
    // }
    setIsSaving(true);

    const update = async (email, password, name) => {
      try {
        const res = await fetch("/api/auth/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        if (res.status === 400) {
          throw new Error(`${email} doesn't exists!`);
        }

        if (res.status === 200) {
          return "Registered successfully!";
        } else {
          throw new Error("Something went wrong, please try again!");
        }
      } catch (error) {
        throw error;
      } finally {
        setIsSaving(false);
      }
    };

    toast.promise(update(email, password, name), {
      loading: "Updating...",
      success: "Updated successfully!",
      error: (err) => `${err.message}`,
    });
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[48vh] pr-1.5 overflow-x-hidden overflow-y-scroll pb-4">
        {/* Left Section - Settings Categories */}
        <div className="space-y-6">
          {/* General Settings */}
          <div>
            <h4 className="text-lg font-semibold mb-2">General Settings</h4>
            <div className="flex flex-col space-y-2">
              <label className="w-fit inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  checked={theme === "dark"}
                />
                <span className="ml-2">Dark Mode</span>
              </label>
              {/* upgrade-features */}
              {session?.user?.subscription !== "free" && (
                <>
                  <label className="w-fit inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Notifications</span>
                  </label>
                  <label className="w-fit inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Auto Update</span>
                  </label>
                </>
              )}
            </div>
          </div>
          {/* upgrade-features */}
          {session?.user?.subscription !== "free" && (
            // Security Settings
            <div>
              <h4 className="text-lg font-semibold mb-2">Security Settings</h4>
              <div className="flex flex-col space-y-2">
                <label className="w-fit inline-flex items-center cursor-pointer">
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
          )}
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
                  // value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  disabled
                  defaultValue={session?.user?.email ?? "Add Email"}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium -mb-2">
                  Password
                </label>
                <div className="input-style flex gap-2 cursor-text">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder={
                      session?.user?.password
                        ? "Update Password"
                        : "Add Password"
                    }
                    required
                    // defaultValue={session?.user?.password}
                    value={password}
                    onChange={handlePassword}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        confirmPasswordInputRef.current.focus();
                      }
                    }}
                    className="w-full h-full bg-transparent ring-0 border-none outline-none"
                  />
                  <div
                    onClick={() => setShowPass(!showPass)}
                    className="w-fit h-fit cursor-pointer flex-center gap-1 ease-in-out duration-200"
                  >
                    {showPass ? (
                      <FaRegEyeSlash
                        size={20}
                        className="w-full h-full active:scale-75 text-primary-green"
                      />
                    ) : (
                      <FaRegEye
                        size={20}
                        className="w-full h-full active:scale-75"
                      />
                    )}
                  </div>
                </div>
              </div>
              {passwordPattern.test(password) && (
                <div className="w-full overflow-hidden">
                  <div className="input-style flex gap-2 cursor-text animate-slide-down">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={handleConfirmPassword}
                      ref={confirmPasswordInputRef}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSave();
                        }
                      }}
                      className="w-full h-full bg-transparent ring-0 border-none outline-none"
                    />
                    <div
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="w-fit h-fit cursor-pointer flex-center gap-1 ease-in-out duration-200"
                    >
                      {showConfirmPass ? (
                        <FaRegEyeSlash
                          size={20}
                          className="w-full h-full active:scale-75 text-primary-green"
                        />
                      ) : (
                        <FaRegEye
                          size={20}
                          className="w-full h-full active:scale-75"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Integrations */}
          <div className="">
            <h4 className="text-lg font-semibold mb-2">Integrations</h4>
            <div className="flex flex-col space-y-2">
              {/* Google Integration */}
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={session?.user?.integrationsAuth.includes("google")}
                  readOnly
                />
                <span className="ml-2">Google</span>
              </label>

              {/* Slack Integration */}
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={session?.user?.integrationsAuth.includes("slack")}
                  readOnly
                />
                <span className="ml-2">Slack Integration</span>
              </label>

              {/* GitHub Integration */}
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={session?.user?.integrationsAuth.includes("github")}
                  readOnly
                />
                <span className="ml-2">GitHub Integration</span>
              </label>

              {/* Jira Integration */}
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={session?.user?.integrationsAuth.includes("jira")}
                  readOnly
                />
                <span className="ml-2">Jira Integration</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Save Changes */}
      <div className="flex items-center space-x-4 border-t py-4">
        <Button
          variant="outline"
          size="sm"
          disabled={isSaving}
          onClick={() => console.log("Cancelled")}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          disabled={disableBtn || isSaving}
          onClick={handleSave}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
