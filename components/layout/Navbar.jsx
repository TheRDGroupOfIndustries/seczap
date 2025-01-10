"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
import { navLinks } from "@/constant/data";
import { Button } from "../ui/button";
import { DialogTitle } from "../ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession(); // console.log(session);
  const [activeSection, setActiveSection] = useState("");

  if (pathname.includes("/studio") && session?.user?.role === "user")
    router.push("/");

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
    <motion.div
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      animate="show"
      className="sticky top-0 left-0 right-0 z-[101] w-full bg-primary-clr/80 dark:bg-primary-clr/80 backdrop-blur-md border-b-2 border-b-sky-600 dark:border-b-sky-800 shadow-lg"
    >
      <motion.div
        variants={fadeInOut("down", "spring", 0.2, 0.5)}
        className="w-full h-fit flex-between gap-4 p-2 px-4 md:px-6 lg:px-10 overflow-hidden"
      >
        {/* logo */}
        <motion.div
          variants={fadeInOut("right", "spring", 0.3, 0.5)}
          className="flex-between gap-6 md:gap-8 lg:gap-10"
        >
          <Link href="/" className="text-xl md:text-2xl font-bold text-white">
            SECZAP
          </Link>

          {/* desktop navigation */}
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            className="hidden min-[854px]:flex gap-"
          >
            {navLinks.map((link, index) => {
              const isActive =
                activeSection === "hero"
                  ? link.href === "/"
                  : link.href === "/#" + activeSection;
              return (
                <motion.div
                  key={index}
                  variants={fadeInOut("up", "spring", 0.2, 0.5 + index * 0.3)}
                >
                  <Link href={link.href}>
                    <Button
                      variant="link"
                      effect={isActive ? "underline" : "hoverUnderline"}
                      className="text-lg text-sky-300 font-normal"
                    >
                      {link.name}
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* get started btn */}
        <motion.div variants={fadeInOut("left", "spring", 0.3, 0.5)}>
          {status === "loading" && !session ? (
            <Button
              onClick={() => router.push("/auth/sign-in")}
              disabled={status === "loading"}
              title={status === "loading" ? "Loading..." : "Login"}
              size="lg"
              className="hidden min-[854px]:block bg-blue-500 hover:bg-blue-600 text-white font-bold"
            >
              {status === "loading" ? "Loading.." : "Get Started"}
            </Button>
          ) : (
            <Link
              href="/account/dashboard"
              className="hidden min-[854px]:block w-fit h-fit overflow-hidden"
            >
              <div className="flex-center gap-2 overflow-hidden">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={session?.user?.image ?? "/user.png"}
                    alt="Profile Image"
                    width={200}
                    height={200}
                    className="w-10 h-10 rounded-full object-cover overflow-hidden"
                  />
                </div>
                <div className="hidden md:block w-fit h-fit space-y-1">
                  <h4 className="line-clamp-1">{session?.user?.name}</h4>
                  <h6 className="text-xs line-clamp-1">
                    {session?.user?.role}
                  </h6>
                </div>
              </div>
            </Link>
          )}
        </motion.div>

        {/* mobile navigation */}
        <motion.div
          variants={fadeInOut("left", "spring", 0.3, 0.5)}
          className="min-[854px]:hidden"
        >
          <Sheet>
            <SheetTrigger>
              <Menu className="text-white w-6 h-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-primary-clr/40 backdrop-blur-md p-4 overflow-hidden"
            >
              <motion.div
                variants={staggerContainer(0.1, 0.2)}
                initial="hidden"
                animate="show"
                className="w-full h-full flex justify-between flex-col gap-4"
              >
                <div className="w-full grid gap-4">
                  <motion.div variants={fadeInOut("down", "tween", 0.2, 0.5)}>
                    <DialogTitle className="text-md text-gray-500 border-b-2 border-b-sky-600 dark:border-b-sky-800 pb-4">
                      Menu
                    </DialogTitle>
                  </motion.div>

                  {navLinks.map((link, index) => {
                    const isActive =
                      activeSection === "hero"
                        ? link.href === "/"
                        : link.href === "/#" + activeSection;
                    return (
                      <motion.div
                        key={index}
                        variants={fadeInOut(
                          "left",
                          "spring",
                          0.2,
                          0.5 + index * 0.3
                        )}
                      >
                        <Link href={link.href}>
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
                      </motion.div>
                    );
                  })}
                </div>
                <motion.div
                  variants={fadeInOut("up", "spring", 0.4, 0.5)}
                  className="overflow-hidden"
                >
                  <SheetClose className="w-full">
                    <Button
                      onClick={() =>
                        router.push(
                          status === "loading"
                            ? "/"
                            : session
                              ? "/account/dashboard"
                              : "/auth/sign-in"
                        )
                      }
                      disabled={status === "loading"}
                      title={
                        status === "authenticated"
                          ? "Go to Dashboard"
                          : "Login first"
                      }
                      size="lg"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold mt-4"
                    >
                      {status === "loading"
                        ? "Loading.."
                        : session
                          ? "Dashboard"
                          : "Get Started"}
                    </Button>
                  </SheetClose>
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
