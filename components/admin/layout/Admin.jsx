"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { adminSections } from "@/lib/sections";
import Sidebar from "./Sidebar";
import Total from "./Total";

const Admin = ({ section, children }) => {
  const router = useRouter();
  const { data: session } = useSession(); // console.log(session);
  if (!session?.user) return router.replace("/");
  return (
    <>
      <section className="w-full h-screen animate-fade-in flex overflow-hidden">
        <Sidebar section={section} sections={adminSections} />
        <div className="w-full h-full space-y-8 p-4 md:p-8 overflow-y-scroll lg:overflow-hidden">
          <Total />
          <div
            className={`animate-fade-in w-full h-fit lg:max-h-[68vh] p-4 rounded-lg border border-zinc-300 dark:border-zinc-800/50 border-opacity-30 shadow-sm dark:shadow-muted hover:shadow-md ease-in-out duration-300 overflow-hidden`}
          >
            {children}
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;
