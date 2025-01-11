"use client";

import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
import { GiCycle } from "react-icons/gi";
import { PiChatsCircleFill, PiShareNetworkFill } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa6";

const iconMap = {
  GiCycle,
  PiChatsCircleFill,
  PiShareNetworkFill,
  FaGraduationCap,
};

const HowWeDeliverValue = ({ howWeDeliverValueData }) => {
  return (
    <motion.section
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="how-we-deliver-value"
      className="w-full min-h-fit lg:h-fit lg:max-h-[calc(100vh-63px)] select-none bg-gradient-to-b from-primary-clr to-gray-950 p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <motion.div
        variants={fadeInOut("down", "tween", 0.2, 0.5)}
        className="flex-center"
      >
        <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          {howWeDeliverValueData?.heading}
        </h2>
      </motion.div>

      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {howWeDeliverValueData?.values.map((card, index) => {
          const Icon = iconMap[card?.icon];
          return (
            <motion.div
              key={index}
              variants={fadeInOut("up", "spring", 0.2, 0.5 + index * 0.2)}
              className="w-full h-full bg-primary-clr-2/60 dark:bg-primary-clr-2/60 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
            >
              <div className="space-y-4 lg:space-y-6">
                <Icon size={35} className="text-blue-500 fill-blue-500" />
                <h4 className="text-white text-md md:text-lg lg:text-xl font-extrabold">
                  {card?.head}
                </h4>
                <p className="text-sky-500 text-balance text-xs md:text-sm lg:text-md">
                  {card?.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default HowWeDeliverValue;
