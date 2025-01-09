"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { navLinks } from "@/constant/data";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { DialogTitle } from "../ui/dialog";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
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
    <div className="sticky top-0 left-0 right-0 z-50 w-full bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border-b-2 border-b-sky-600 dark:border-b-sky-800 shadow-lg">
      <div className="flex items-center justify-between p-4 md:p-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold text-white">
          SECZAP
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-4">
          {navLinks.map((link, index) => {
            const isActive =
              activeSection === "hero"
                ? link.href === "/"
                : link.href === "/#" + activeSection;
            return (
              <Link key={index} href={link.href}>
                <Button
                  variant="link"
                  effect={isActive ? "underline" : "hoverUnderline"}
                  className="text-lg text-sky-300"
                >
                  {link.name}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Get Started Button */}
        <Button
          onClick={() =>
            router.push(session ? "/account/dashboard" : "/auth/sign-in")
          }
          size="lg"
          className="hidden lg:block bg-blue-500 hover:bg-blue-600 text-white font-bold"
        >
          Get Started
        </Button>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="text-white w-6 h-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-primary-clr/40 backdrop-blur-md p-4"
            >
              <div className="w-full h-full flex justify-between flex-col gap-4">
                <div className="w-full grid gap-4">
                  <DialogTitle className="text-md text-gray-500 border-b-2 border-b-sky-600 dark:border-b-sky-800 pb-4">
                    Menu
                  </DialogTitle>

                  {navLinks.map((link, index) => {
                    const isActive =
                      activeSection === "hero"
                        ? link.href === "/"
                        : link.href === "/#" + activeSection;
                    return (
                      <Link key={index} href={link.href}>
                        <SheetClose>
                          <Button
                            variant="link"
                            effect={isActive ? "underline" : "hoverUnderline"}
                            className="w-fit text-2xl font-extrabold text-sky-300 text-left"
                          >
                            {link.name}
                          </Button>
                        </SheetClose>
                      </Link>
                    );
                  })}
                </div>
                <Button
                  onClick={() =>
                    router.push(
                      session ? "/account/dashboard" : "/auth/sign-in"
                    )
                  }
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold mt-4"
                >
                  Get Started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
