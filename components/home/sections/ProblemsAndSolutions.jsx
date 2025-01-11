"use client";

import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
import { FaShieldHalved, FaUserSecret, FaUsersGear } from "react-icons/fa6";
import { IoWarningSharp } from "react-icons/io5";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { FaUserNinja, FaLock } from "react-icons/fa";

const ProblemsAndSolutions = () => {
  return (
    <motion.section
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="problems-and-solutions"
      className="w-full min-h-fit lg:h-fit lg:max-h-[calc(100vh-63px)] select-none bg-primary-clr dark:bg-primary-clr backdrop-blur-md p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <motion.div
        variants={fadeInOut("down", "tween", 0.2, 0.5)}
        className="flex-center"
      >
        <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Problems & Solutions
        </h2>
      </motion.div>

      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <motion.div
          variants={fadeInOut("right", "spring", 0.3, 0.5)}
          className="w-full h-full bg-primary-clr-2/60 dark:bg-primary-clr-2/60 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
        >
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            className="space-y-2 lg:space-y-4"
          >
            <motion.div
              variants={fadeInOut("up", "tween", 0.1, 0.5)}
              className="w-full h-fit flex items-center gap-4"
            >
              <IoWarningSharp size={20} className="fill-blue-500" />
              <h4 className="text-blue-500 text-sm md:text-md lg:text-lg">
                Common Security Challenges
              </h4>
            </motion.div>

            {[
              {
                icon: <FaShieldHalved size={20} className="fill-blue-500" />,
                title: "Data Breaches",
              },
              {
                icon: (
                  <MdOutlineSettingsSuggest
                    size={20}
                    className="fill-blue-500"
                  />
                ),
                title: "Ransomware Attacks",
              },
              {
                icon: <FaUserNinja size={20} className="fill-blue-500" />,
                title: "Social Engineering",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInOut("up", "tween", 0.2, 0.5 + index * 0.1)}
                className="w-full h-fit flex gap-4"
              >
                {item.icon}
                <div className="space-y-2">
                  <h4 className="text-white text-sm md:text-md lg:text-lg font-semibold">
                    {item.title}
                  </h4>
                  <p className="text-sky-500 text-balanc text-sm md:text-md lg:text-lg">
                    Comprehensive security assessments to identify and eliminate
                    potential threats.
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInOut("left", "spring", 0.3, 0.5)}
          className="w-full h-full bg-primary-clr-2/60 dark:bg-primary-clr-2/60 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
        >
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            className="space-y-2 lg:space-y-4"
          >
            <motion.div
              variants={fadeInOut("up", "tween", 0.1, 0.5)}
              className="w-full h-fit flex items-center gap-4"
            >
              <FaShieldHalved size={20} className="fill-blue-500" />
              <h4 className="text-blue-500 text-sm md:text-md lg:text-lg">
                Over Solutions
              </h4>
            </motion.div>

            {[
              {
                icon: (
                  <FaLock size={20} className="fill-blue-500 font-semibold" />
                ),
                title: "Advance Encryption",
              },
              {
                icon: (
                  <FaUserSecret
                    size={20}
                    className="fill-blue-500 font-semibold"
                  />
                ),
                title: "24/7 Threat Monitoring",
              },
              {
                icon: (
                  <FaUsersGear
                    size={20}
                    className="fill-blue-500 font-semibold"
                  />
                ),
                title: "Security Training",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInOut("up", "tween", 0.2, 0.5 + index * 0.1)}
                className="w-full h-fit flex gap-4"
              >
                {item.icon}
                <div className="space-y-2">
                  <h4 className="text-white text-sm md:text-md lg:text-lg">
                    {item.title}
                  </h4>
                  <p className="text-sky-500 text-balanc text-sm md:text-md lg:text-lg">
                    Advanced open-source intelligence gathering and analysis.
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProblemsAndSolutions;
