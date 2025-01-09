"use client";

import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
import { FaUsers } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaRobot } from "react-icons/fa6";
import { FaCoins } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <motion.section
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="why-choose-us"
      className="w-full min-h-fit lg:h-fit lg:max-h-[calc(100vh-80px)] select-none bg-primary-clr/70 dark:bg-primary-clr/70 backdrop-blur-md p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <motion.div
        variants={fadeInOut("down", "tween", 0.2, 0.5)}
        className="flex-center"
      >
        <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Why Choose SECZAP
        </h2>
      </motion.div>

      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {[
          {
            icon: <FaUsers size={35} className="fill-blue-500" />,
            title: "Client-Centric Approach",
            description:
              "Comprehensive security assessments to identify and eliminate potential threats.",
          },
          {
            icon: <IoSearch size={35} className="fill-blue-500" />,
            title: "Expertise in OSINT",
            description:
              "Advanced open-source intelligence gathering and analysis.",
          },
          {
            icon: <FaRobot size={35} className="fill-blue-500" />,
            title: "AI-Powered Security",
            description:
              "Expert digital forensics and incident response services.",
          },
          {
            icon: <FaCoins size={35} className="fill-blue-500" />,
            title: "Affordable Solutions",
            description:
              "Continuous surveillance of dark web activities and threats.",
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            variants={fadeInOut("up", "tween", 0.2, 0.5 + index * 0.2)}
            className="w-full h-full bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
          >
            <div className="space-y-4 lg:space-y-6">
              <div className="w-full h-fit flex items-center gap-4">
                {card.icon}
                <h4 className="text-white text-md md:text-lg lg:text-xl font-extrabold">
                  {card.title}
                </h4>
              </div>
              <p className="text-sky-500 text-balance text-xs md:text-sm lg:text-md">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
