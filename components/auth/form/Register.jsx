"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { emailPattern, passwordPattern } from "./Login";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState("password");
  const [showConfirmPass, setShowConfirmPass] = useState("password");
  const [disableBtn, setDisableBtn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const handleEmail = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    if (inputValue.trim() === "") {
      setDisableBtn(true);
    } else {
      if (!emailPattern.test(inputValue)) {
        toast.error("Invalid email");
        setDisableBtn(true);
      } else {
        toast.success("Valid email");
        setDisableBtn(false);
      }
    }
  };

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

    if (cpswd !== password) {
      setDisableBtn(true);
      toast.error("Mismatch password!");
    } else {
      setDisableBtn(false);
      toast.success("Password matched!");
    }
    setConfirmPassword(cpswd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill all the fields!");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords does not match!");
    }

    setSubmitting(true);

    const register = async (name, email, password) => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        if (res.status === 400) {
          setSubmitting(false);
          throw new Error(`${email} is already registered!`);
        }

        if (res.status === 200) {
          setSuccess(true);
          router.push("/auth/sign-in");
          return "Registered successfully!";
        } else {
          setSubmitting(false);
          throw new Error("Something went wrong, please try again!");
        }
      } catch (error) {
        setSubmitting(false);
        throw error;
      }
    };

    toast.promise(register(name, email, password), {
      loading: "Registering...",
      success: "Registered successfully!",
      error: (err) => `${err.message}`,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              emailInputRef.current.focus();
            }
          }}
          className="input-style"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmail}
          ref={emailInputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              passwordInputRef.current.focus();
            }
          }}
          className="input-style"
        />
        <div className="input-style flex gap-2 cursor-text">
          <input
            type={showPass}
            placeholder="Password"
            required
            value={password}
            onChange={handlePassword}
            ref={passwordInputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                confirmPasswordInputRef.current.focus();
              }
            }}
            className="w-full h-full bg-transparent ring-0 border-none outline-none"
          />
          <div
            onClick={() => {
              if (showPass === "text") setShowPass("password");
              else setShowPass("text");
            }}
            className="w-fit h-fit cursor-pointer flex-center gap-1 ease-in-out duration-200"
          >
            {showPass === "text" ? (
              <FaRegEyeSlash
                size={20}
                className="w-full h-full active:scale-75 text-primary-green"
              />
            ) : (
              <FaRegEye size={20} className="w-full h-full active:scale-75" />
            )}
          </div>
        </div>
        <div className="input-style flex gap-2 cursor-text">
          <input
            type={showConfirmPass}
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={handleConfirmPassword}
            ref={confirmPasswordInputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="w-full h-full bg-transparent ring-0 border-none outline-none"
          />
          <div
            onClick={() => {
              if (showConfirmPass === "text") setShowConfirmPass("password");
              else setShowConfirmPass("text");
            }}
            className="w-fit h-fit cursor-pointer flex-center gap-1 ease-in-out duration-200"
          >
            {showConfirmPass === "text" ? (
              <FaRegEyeSlash
                size={20}
                className="w-full h-full active:scale-75 text-primary-green"
              />
            ) : (
              <FaRegEye size={20} className="w-full h-full active:scale-75" />
            )}
          </div>
        </div>

        <Button
          disabled={disableBtn || submitting || success}
          type="submit"
          className={`w-full ${disableBtn && "animate-pulse"}`}
        >
          {submitting
            ? "Registering..."
            : success
            ? "Registered Successfully!"
            : "Sign Up"}
        </Button>
      </form>
    </>
  );
};

export default Register;
