"use client";

import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const Auth = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/auth/sign-in";
  const { status } = useSession(); // console.log(session);
  if (status === "authenticated") return router.replace("/");

  return (
    <div className="w-full h-screen select-none flex-center flex-col">
      <div className="w-96 h-fit animate-slide-up p-6 rounded-lg border border-zinc-300 dark:border-zinc-800/50 border-opacity-30 shadow-md dark:shadow-muted hover:shadow-lg ease-in-out duration-300 overflow-hidden">
        <h1 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Log In" : "Sign Up"}
        </h1>

        {children}

        <div className="text-center mt-4">
          <Link
            href={isLogin ? "/auth/sign-up" : "/auth/sign-in"}
            className="group"
          >
            {isLogin ? (
              <>
                Don{"'"}t have an account?{" "}
                <span className="group-hover:text-primary-green group-hover:underline underline-offset-8 ease-in-out duration-300">
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="group-hover:text-primary-green group-hover:underline underline-offset-8 ease-in-out duration-300">
                  Log in
                </span>
              </>
            )}
          </Link>
        </div>
        <div className="w-full flex-center flex-col gap-2 mt-4">
          <div className="flex-center gap-1">
            <span className="w-36 h-[1px] bg-[#8b8d93]"></span>
            <span className="text-[#8b8d93] font-semibold">OR</span>
            <span className="w-36 h-[1px] bg-[#8b8d93]"></span>
          </div>
          <Button
            onClick={() => signIn("google")}
            disabled={status === "loading"}
            title={status === "loading" ? "Loggin in..." : "Login"}
            size="lg"
            className="text-md"
          >
            <FcGoogle className="mr-1" />
            {status === "loading" ? "Loading..." : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
