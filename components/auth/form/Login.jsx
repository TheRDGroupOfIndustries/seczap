"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState("password");
  const [disableBtn, setDisableBtn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordInputRef = useRef(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please provide credentials!");
    }

    setSubmitting(true);

    const login = async (email, password) => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (res?.error) {
          console.log(res.error);
          setSubmitting(false);
          throw new Error("User doesn't exist or Invalid e-mail or password!");
        }

        if (res?.url) {
          setSubmitting(true);
          setSuccess(true);
          router.replace("/");
          return "Logged in successfully!";
        } else {
          setSubmitting(false);
          throw new Error("Something went wrong, please try again!");
        }
      } catch (error) {
        setSubmitting(false);
        throw error;
      }
    };

    toast.promise(login(email, password), {
      loading: "Logging in...",
      success: "Logged in successfully!",
      error: (err) => `${err.message}`,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmail}
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
                handleSubmit(e);
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
        <Button
          disabled={disableBtn || submitting || success}
          type="submit"
          className={`w-full ${disableBtn && "animate-pulse"}`}
        >
          {submitting ? "Loggin..." : success ? "Logged in" : "Login"}
        </Button>
      </form>
    </>
  );
};

export default Login;
