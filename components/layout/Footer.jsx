"use client";

import Link from "next/link";
import { navLinks } from "@/constant/data";

const Footer = () => {
  return (
    <>
      <div className="relative z-50 w-full h-fit select-none bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border-t-2 border-t-sky-600 dark:border-t-sky-800 shadow-lg overflow-hidden">
        <div className="w-full h-full space-y-4 p-4 md:p-6 lg:px-10 xl:px-12 overflow-hidden">
          <div className="w-full h-fit flex justify-between">
            <div className="flex-1 w-full h-full space-y-4">
              <h4 className="">
                <Link
                  href="/"
                  className="w-fit hover-link-underline text-white text-lg md:text-xl lg:text-2xl font-extrabold"
                >
                  SECZAP
                </Link>
              </h4>
              <p className="text-sky-500 text-balance">
                Securing the digital future with advance cybersecurity
                solutions.
              </p>
            </div>

            <div className="flex-1 w-fit h-fit space-y-4">
              <h4 className="text-white text-lg md:text-xl lg:text-2xl font-bold">
                Quick Links
              </h4>
              <div className="text-sky-500 grid space-y-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="w-fit hover-link-underline"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* <div className="w-full h-full flex flex-col items-end"> */}
            <div className="flex- w-fit h-fit space-y-4">
              <h4 className="text-white text-lg md:text-xl lg:text-2xl font-bold">
                Services
              </h4>
              <div className="text-sky-500 grid space-y-2">
                <Link
                  href="/#our-services"
                  className="w-fit hover-link-underline"
                >
                  Vulnerability Testing
                </Link>
                <Link
                  href="/#our-services"
                  className="w-fit hover-link-underline"
                >
                  OSINT Investigations
                </Link>
                <Link
                  href="/#our-services"
                  className="w-fit hover-link-underline"
                >
                  Cyber Forensics
                </Link>
                <Link
                  href="/#our-services"
                  className="w-fit hover-link-underline"
                >
                  Dark Web Monitoring
                </Link>
              </div>
            </div>
            {/* </div> */}
          </div>

          {/* copyright */}
          <div className="text-sky-500 border-t border-t-sky-900 pt-4">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="w-fit hover-link-underline font-semibold">
              SECZAP
            </Link>
            . All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
