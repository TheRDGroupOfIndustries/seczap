"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function UserHome() {
  const { data: session, status } = useSession(); // console.log(session);

  return (
    <main className="w-full h-screen relative flex-center flex-col gap-4 overflow-hidden">
      <div className="absolute top-2 left-2 flex-center gap-1 animate-slide-down">
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
      <div className="space-x-2 animate-fade-in">
        <div className="flex-center flex-col gap-4">
          {session?.user && (
            <div className="flex-center flex-col space-y-2 animate-slide-up">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl shadow px-4 py-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={session?.user?.image ?? "/logo.png"}
                    alt="Profile Image"
                    width="100"
                    height="100"
                    className="w-10 h-10 rounded-full object-cover overflow-hidden"
                  />
                </div>
                <div className="block w-fit h-fit space-y-1">
                  <h4 className="line-clamp-1">{session?.user?.name}</h4>
                  <h6 className="text-xs line-clamp-1">
                    {session?.user?.role}
                  </h6>
                </div>
              </div>
              <Link href="/admin/dashboard" className="mt-4">
                <Button type="button" size="lg" variant="outline">
                  Dashborad
                </Button>
              </Link>
            </div>
          )}
          <Button
            onClick={() => {
              if (status === "unauthenticated") {
                signIn("google");
              } else {
                signOut();
              }
            }}
            variant={status === "authenticated" ? "destructive" : "default"}
            disabled={status === "loading"}
            title={status === "authenticated" ? "Logout" : "Login"}
            size="lg"
            className="text-lg"
          >
            <FcGoogle className="mr-1" />
            {status === "loading"
              ? "Loading..."
              : status === "unauthenticated"
              ? "Login"
              : "Logout"}
          </Button>
        </div>
      </div>
    </main>
  );
}
