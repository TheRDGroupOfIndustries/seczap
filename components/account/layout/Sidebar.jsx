"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GiArmorUpgrade } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";

const Sidebar = ({ sections }) => {
  const pathName = usePathname();
  // const { data: session } = useSession();
  return (
    <aside className="sticky top-0 left-0 z-[101] animate-slide-right w-fit md:w-60 max-w-lg h-screen select-none bg-background border-r border-primary/50 text-foreground flex-between flex-col overflow-hidde">
      <div className="w-full h-fit grid justify-center md:justify-start overflow-hidden">
        <Link
          href="/"
          title="Home"
          className="w-full flex items-center animate-slide-down p-2 py-5 md:p-4"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width="100"
            height="100"
            priority
            className="w-8 h-8 md:hidden overflow-hidden"
          />
          <h2 className="hidden md:block font-iceland text-xl md:text-2xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-blue-200 to-primary to-60%">
            SECZAP
          </h2>
        </Link>
        <div className="w-full h-fit space-y-2 mt-8 animate-slide-right p-2">
          {sections.map((sec, index) => {
            const isActive = pathName === sec.href;
            return (
              <Link
                key={index}
                href={sec.href}
                className={`w-full md:w-60 md:max-w-lg flex items-center gap-3 px-2 py-2 text-md font-medium transition-colors group ${
                  isActive ?
                    "text-primary fill-primary md:bg-primary/20"
                  : "hover:underlin underline-offset-8"
                } ease-in-out duration-200`}
              >
                <sec.icon size={20} className="scale-125 md:scale-100" />
                <span
                  className={`hidden md:block font-iceland text-2xl ${!isActive && "group-hover-link-underline group-hover:translate-x-1"} ease-in-out duration-300`}
                >
                  {sec.head}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-full space-y-4 animate-slide-up p-2 md:p-4 overflow-hidden">
        {/* <div className="flex items-center gap-2 md:bg-green-500/15 backdrop-blur-sm rounded-xl md:shadow md:p-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={session?.user?.image ?? "/user.png"}
              alt="Profile Image"
              width="200"
              height="200"
              className="w-10 h-10 rounded-full object-cover overflow-hidden"
            />
          </div>
          <div className="hidden md:block w-fit h-fit space-y-1">
            <h4 className="line-clamp-1">{session?.user?.name}</h4>
            {session?.user?.role === "admin" && (
              <h6 className="text-xs line-clamp-1">{session?.user?.role}</h6>
            )}
          </div>
        </div> */}

        <div className="w-full flex flex-col md:flex-row gap-1">
          {/* <Button className="w-full font-semibold p-0 md:px-4 md:py-2">
            <GiArmorUpgrade
              size={20}
              className="md:hidden scale-105 md:scale-100 md:mr-1"
            />
            <span className="hidden md:inline">Upgrade to Pro</span>
          </Button> */}
          <Button
            title="Logout"
            onClick={() => signOut()}
            className="md:p- w-full"
          >
            <HiOutlineLogout size={20} />{" "}
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
