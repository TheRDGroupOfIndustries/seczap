"use client";

import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
import { FaShieldHalved } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaMicroscope } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa6";

const OurServices = () => {
  return (
    <motion.section
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="our-services"
      className="w-full min-h-fit lg:h-fit lg:max-h-[calc(100vh-80px)] select-none p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <motion.div
        variants={fadeInOut("down", "spring", 0.2, 0.5)}
        className="flex-center"
      >
        <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Our Services
        </h2>
      </motion.div>

      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {["right", "up", "down", "left"].map((direction, index) => (
          <motion.div
            key={index}
            variants={fadeInOut(direction, "spring", 0.3, 0.5)}
            className="w-full h-full bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
          >
            <div className="space-y-4 lg:space-y-6">
              {index === 0 && (
                <FaShieldHalved size={35} className="fill-blue-500" />
              )}
              {index === 1 && <IoSearch size={35} className="fill-blue-500" />}
              {index === 2 && (
                <FaMicroscope size={35} className="fill-blue-500" />
              )}
              {index === 3 && (
                <FaUserSecret size={35} className="fill-blue-500" />
              )}
              <h4 className="text-white text-md md:text-lg lg:text-xl font-extrabold">
                {
                  [
                    "Vulnerability Testing",
                    "OSINT Investigations",
                    "Cyber Forensics",
                    "Dark Web Monitoring",
                  ][index]
                }
              </h4>
              <p className="text-sky-500 text-balance text-xs md:text-sm lg:text-md">
                {
                  [
                    "Comprehensive security assessments to identify and eliminate potential threats.",
                    "Advanced open-source intelligence gathering and analysis.",
                    "Expert digital forensics and incident response services.",
                    "Continuous surveillance of dark web activities and threats.",
                  ][index]
                }
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default OurServices;
