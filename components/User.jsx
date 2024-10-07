"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function UserHome() {
  const { data: session } = useSession(); // console.log(session);
  const router = useRouter();
  if (session?.user && session?.user?.role === "admin")
    return router.replace("/admin");

  return (
    <main className="w-full h-screen relative flex-center flex-col gap-4 overflow-hidden">
      <div className="absolute top-2 left-2 flex-center gap-1">
        <Image
          src="/logo.png"
          alt="logo"
          width="70"
          height="70"
          className="w-12 h-12 overflow-hidden"
        />
        <div className="text-xl md:text-2xl lg:text-3xl font-semibold">
          <span className="text-green-400">Sec</span>zap
        </div>
      </div>
      <div className="space-x-2">
        {session?.user ? (
          <>
            <h4 className="text-xl">{session?.user?.name}</h4>
            Role: {session?.user?.role}
            <Button
              onClick={() => signOut()}
              title="Logout"
              size="lg"
              className="text-lg"
              variant="destructive"
            >
              <FcGoogle className="mr-1" /> Logout
            </Button>
          </>
        ) : (
          <Button
            onClick={() => signIn("google")}
            title="Login"
            size="lg"
            className="text-lg"
          >
            <FcGoogle className="mr-1" /> Login
          </Button>
        )}
      </div>
    </main>
  );
}
