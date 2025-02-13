"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
// import { navLinks } from "@/constant/data";
import { ArrowBigRight } from "lucide-react";

const Footer = ({ navData }) => {
  const pathname = usePathname();

  if (pathname.includes("/studio")) return null;
  return (
    <motion.div
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="relative z-50 w-full h-fit select-none bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border-t border-t-blue-500/50 dark:border-t-blue-500/50 shadow-lg overflow-hidden"
    >
      <motion.div
        variants={fadeInOut("up", "spring", 0.2, 0.5)}
        className="w-full h-full space-y-4 p-4 md:p-6 lg:px-10 xl:px-12 overflow-hidden"
      >
        <div className="w-full h-fit flex flex-col md:flex-row justify-between gap-6 md:gap-8 lg:gap-12">
          <div className="md:flex-1 w-full h-full space-y-2 md:space-y-4">
            <motion.h4 variants={fadeInOut("right", "spring", 0.3, 0.5)}>
              <Link
                href="/"
                className="w-fit hover-link-underline text-white font-iceland text-2xl md:text-3xl lg:text-4xl font-extrabold"
              >
                SECZAP
              </Link>
            </motion.h4>
            <motion.p
              variants={fadeInOut("right", "tween", 0.3, 0.8)}
              className="text-blue-400 text-balanc font-iceland text-lg md:text-xl lg:text-2xl"
            >
              Securing the digital future with advance cybersecurity solutions.
            </motion.p>
          </div>

          <motion.div
            variants={fadeInOut("up", "tween", 0.4, 0.5)}
            className="flex-1 w-fit h-fit space-y-2 md:space-y-4"
          >
            <h4 className="text-white text-lg md:text-xl lg:text-2xl font-bold">
              Quick Links
            </h4>
            <motion.div
              variants={staggerContainer(0.1, 0.2)}
              className="text-blue-400 grid space-y-1"
            >
              {navData?.links &&
                navData?.links.map((link, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInOut(
                      "right",
                      "tween",
                      0.2,
                      0.5 + index * 0.1
                    )}
                    className="w-fit h-fit overflow-hidden"
                  >
                    <Link
                      href={link.link}
                      className="w-fit flex-center group -translate-x-5 hover:translate-x-0 ease-in-out duration-200 overflow-hidden"
                    >
                      <ArrowBigRight />
                      <span className="capitalize group-hover-link-underline font-iceland text-xl md:text-2xl">
                        {link.text}
                      </span>
                    </Link>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInOut("left", "spring", 0.4, 0.5)}
            className="flex- w-fit h-fit space-y-2 md:space-y-4"
          >
            <h4 className="text-white text-lg md:text-xl lg:text-2xl font-bold">
              Services
            </h4>
            <motion.div
              variants={staggerContainer(0.1, 0.2)}
              className="text-blue-400 grid space-y-1"
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
                  className="w-fit overflow-hidden"
                >
                  <Link
                    href="/#our-services"
                    className="w-fit flex-center group -translate-x-5 hover:translate-x-0 ease-in-out duration-200 overflow-hidden"
                  >
                    <ArrowBigRight />
                    <span className="capitalize group-hover-link-underline font-iceland text-xl md:text-2xl">
                      {service}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeInOut("up", "tween", 0.5, 0.5)}
          className="text-blue-400 border-t border-t-sky-900 pt-4 md:pt-6 flex-center gap-1"
        >
          &copy;{new Date().getFullYear()}{" "}
          <span>
            <Link
              href="/"
              className="w-fit hover-link-underline font-semibold font-iceland text-xl"
            >
              SECZAP
            </Link>
            .
          </span>
          All rights reserved.
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
