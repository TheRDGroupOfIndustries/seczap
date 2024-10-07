"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { adminSections } from "@/lib/sections";
import Sidebar from "./Sidebar";
import Total from "./Total";

const Admin = ({ section, children }) => {
  const router = useRouter();
  const pathName = usePathname();
  const { data: session } = useSession(); // console.log(session);
  if (session?.user?.role !== "admin") return router.replace("/");

  return (
    <>
      <section className="w-full h-screen animate-fade-in flex overflow-hidden">
        <Sidebar section={section} sections={adminSections} />
        <div className="w-full h-full space-y-8 p-4 md:p-8">
          {pathName !== "/admin/settings" && <Total />}
          <div className="animate-fade-in">{children}</div>
        </div>
      </section>
    </>
  );
};

export default Admin;
