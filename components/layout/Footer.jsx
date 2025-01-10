"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
import { navLinks } from "@/constant/data";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.includes("/studio")) return null;
  return (
    <motion.div
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="relative z-50 w-full h-fit select-none bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border-t-2 border-t-sky-600 dark:border-t-sky-800 shadow-lg overflow-hidden"
    >
      <motion.div
        variants={fadeInOut("up", "spring", 0.2, 0.5)}
        className="w-full h-full space-y-4 p-4 md:p-6 lg:px-10 xl:px-12 overflow-hidden"
      >
        <div className="w-full h-fit flex justify-between">
          <div className="flex-1 w-full h-full space-y-4">
            <motion.h4 variants={fadeInOut("right", "spring", 0.3, 0.5)}>
              <Link
                href="/"
                className="w-fit hover-link-underline text-white text-lg md:text-xl lg:text-2xl font-extrabold"
              >
                SECZAP
              </Link>
            </motion.h4>
            <motion.p
              variants={fadeInOut("right", "tween", 0.3, 0.8)}
              className="text-sky-500 text-balance"
            >
              Securing the digital future with advance cybersecurity solutions.
            </motion.p>
          </div>

          <motion.div
            variants={fadeInOut("up", "tween", 0.4, 0.5)}
            className="flex-1 w-fit h-fit space-y-4"
          >
            <h4 className="text-white text-lg md:text-xl lg:text-2xl font-bold">
              Quick Links
            </h4>
            <motion.div
              variants={staggerContainer(0.1, 0.2)}
              className="text-sky-500 grid space-y-2"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  variants={fadeInOut("right", "tween", 0.2, 0.5 + index * 0.1)}
                >
                  <Link href={link.href} className="w-fit hover-link-underline">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInOut("left", "spring", 0.4, 0.5)}
            className="flex- w-fit h-fit space-y-4"
          >
            <h4 className="text-white text-lg md:text-xl lg:text-2xl font-bold">
              Services
            </h4>
            <motion.div
              variants={staggerContainer(0.1, 0.2)}
              className="text-sky-500 grid space-y-2"
            >
              {[
                "Vulnerability Testing",
                "OSINT Investigations",
                "Cyber Forensics",
                "Dark Web Monitoring",
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInOut("left", "tween", 0.2, 0.5 + index * 0.1)}
                >
                  <Link
                    href="/#our-services"
                    className="w-fit hover-link-underline"
                  >
                    {service}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeInOut("up", "tween", 0.5, 0.5)}
          className="text-sky-500 border-t border-t-sky-900 pt-4"
        >
          &copy; {new Date().getFullYear()}{" "}
          <Link href="/" className="w-fit hover-link-underline font-semibold">
            SECZAP
          </Link>
          . All rights reserved.
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
