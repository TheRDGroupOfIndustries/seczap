"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { navLinks } from "@/constant/data";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession(); // console.log(session);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll("section[id]").forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-50 animate-slide-down w-full h-fit select-none bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border-b-2 border-b-sky-600 dark:border-b-sky-800 shadow-lg overflow-hidde">
        <div className="w-full h-fit flex-between p-4 md:p-6 lg:px-10 xl:px-12 overflow-hidden">
          <div className="w-fit h-fit flex-center gap-10 lg:gap-14 xl:gap-20">
            <div>
              <Link
                href="/"
                className="text-xl md:text-2xl xl:text-3xl text-white font-semibold"
              >
                SECZAP
              </Link>
            </div>
            <div className="w-fit h-fit flex-between lg:gap-2 xl:gap-4">
              {navLinks.map((link, index) => {
                const isActive =
                  activeSection === "hero"
                    ? link.href === "/"
                    : link.href === "/#" + activeSection;
                return (
                  <Link key={index} href={link.href} className="w-fit h-fit">
                    <Button
                      variant="link"
                      effect={isActive ? "underline" : "hoverUnderline"}
                      className="w-fit h-fit lg:text-lg xl:text-xl text-sky-300"
                    >
                      {link.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="">
            <Button
              onClick={() =>
                router.push(session ? "/account/dashboard" : "/auth/sign-in")
              }
              size="lg"
              effect="shine"
              className="bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold md:px-4 lg:px-6 xl:px-8"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
