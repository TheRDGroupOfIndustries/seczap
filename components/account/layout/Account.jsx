"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { adminSections } from "@/lib/sections";
import AccountSettingsProvider from "@/context/AccountSettingsProvider";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const Account = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession(); // console.log(session);
  if (!session?.user) router.push("/");
  return (
    <>
      <AccountSettingsProvider>
        <section className="relative w-full h-screen select-none flex animate-fade-in bg-gradient-to-br from-background from-20% via-primary/50 to-background to-90% overflow-hidden">
          <Sidebar sections={adminSections} />
          <div className="relative w-full overflow-x-hidden">
            <TopNavbar />
            <div className="w-full h-fit p-2 md:p-4 lg:p-6 xl:p-8 overflow-hidden">
              {children}
            </div>
          </div>
        </section>
      </AccountSettingsProvider>
    </>
  );
};

export default Account;
