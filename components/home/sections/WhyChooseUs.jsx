"use client";

import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
import { FaUsers, FaRobot, FaCoins } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Header from "@/components/ui/header";

const iconMap = {
  FaUsers,
  IoSearch,
  FaRobot,
  FaCoins,
};

const WhyChooseUs = ({ whyChooseUsData }) => {
  return (
    <motion.section
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="why-choose-us"
      className="w-full min-h-fit lg:h-fit lg:max-h-[calc(100vh-63px)] select-none bg-primary-clr dark:bg-primary-clr backdrop-blur-md p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <Header text={whyChooseUsData?.heading} />

      <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
        {whyChooseUsData?.fetaures?.map((feature, index) => {
          const Icon = iconMap[feature?.icon];
          return (
            <div
              key={index}
              className="shadow-lg hover:shadow-xl hover:-translate-y-1.5 hover:translate-x-2 ease-in-out duration-300 overflow-hidde"
            >
              <motion.div
                key={index}
                variants={fadeInOut("up", "tween", 0.2, 0.5 + index * 0.2)}
                className="w-full h-full bg-primary-clr-2/60 dark:bg-primary-clr-2/60 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
              >
                <div className="space-y-4 lg:space-y-6">
                  <div className="w-full h-fit flex items-center gap-4">
                    {Icon && <Icon size={35} className="fill-blue-500" />}
                    <h4 className="text-white text-md md:text-lg lg:text-xl font-extrabold">
                      {feature?.head}
                    </h4>
                  </div>
                  <p className="text-sky-500 text-balance text-xs md:text-sm lg:text-md xl:text-base">
                    {feature?.description}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
