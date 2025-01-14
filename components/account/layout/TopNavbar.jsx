"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaBell } from "react-icons/fa";

const TopNavbar = () => {
  const { data: session, status } = useSession(); // console.log(session);

  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-[101] w-full h-fit border-b border-primary bg-background/80 backdrop-blur-sm text-foreground">
        <div className="w-full h-fit flex-between gap-4 p-2 px-4 md:p-4 md:px-6 lg:px-10 overflow-hidden">
          <div className="relative w-fit h-fit">
            <FaBell size={20} />
          </div>

          <div className="flex-center gap-2 p-1 cursor-pointer hover:bg-primary/40 backdrop-blur-md rounded-lg ease-in-out duration-300 overflow-hidden">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
