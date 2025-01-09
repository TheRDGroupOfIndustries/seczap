"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
import { GoGraph, GoClockFill } from "react-icons/go";
import { FaShieldVirus, FaDatabase } from "react-icons/fa6";

const GrowingNeed = () => {
  const statsCards = [
    {
      icon: GoGraph,
      value: "300%",
      description: "Increase in cybercrime snice 2020",
    },
    {
      icon: FaShieldVirus,
      value: "60%",
      description: "SMEs targeted by cyber attacks",
    },
    {
      icon: FaDatabase,
      value: "$4.35M",
      description: "Average cost of a data breach",
    },
    {
      icon: GoClockFill,
      value: "24/7",
      description: "Continous threat monitoring",
    },
  ];

  return (
    <motion.section
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="growing-need"
      className="w-full h-fit select-none bg-primary-clr/70 dark:bg-primary-clr/70 backdrop-blur-md p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <motion.div
        variants={fadeInOut("down", "tween", 0.2, 0.5)}
        className="flex-center"
      >
        <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          The Growing Need for Cybersecurity
        </h2>
      </motion.div>

      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-[1fr,30%] gap-4 md:gap-6 lg:gap-8 xl:gap-10">
        <motion.div
          variants={fadeInOut("right", "tween", 0.3, 0.5)}
          id="content"
          className="flex-1 w-full h-full bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
        >
          <div className="space-y-4 lg:space-y-6 xl:space-y-8">
            <motion.h4
              variants={fadeInOut("up", "tween", 0.4, 0.5)}
              className="text-white text-lg md:text-xl lg:text-2xl font-semibold"
            >
              The Rising Importance of Cybersecurity in Today's Digital World
            </motion.h4>
            <motion.p
              variants={fadeInOut("up", "tween", 0.5, 0.5)}
              className="w-fit mx-auto text-xs md:text-sm lg:text-md xl:text-lg text-balanc text-sky-500"
            >
              In an era of unprecedented digital transformation, cybersecurity
              has become more critical than ever. Organizations face
              increasingly sophisticated threats while managing complex digital
              infrastructures and remote workforces.
            </motion.p>

            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 overflow-hidde">
              {statsCards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={fadeInOut("up", "spring", 0.2, 0.5 + index * 0.2)}
                  className="w-full h-full bg-primary-clr dark:bg-primary-clr backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
                >
                  <div className="w-full h-full text-blue-500 flex-center flex-col gap-2 lg:gap-4">
                    <card.icon
                      size={50}
                      className="fill-blue-500 text-blue-500 font-bold"
                    />
                    <div className="font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">
                      {card.value}
                    </div>
                    <p className="text-xs md:text-sm lg:text-md xl:text-lg text-balanc text-center text-blue-500">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInOut("left", "tween", 0.3, 0.5)}
          id="banner-image"
          className="flex-1 relative w-full lg:w-fit h-full bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
        >
          <Image
            src={
              "https://t4.ftcdn.net/jpg/08/85/37/71/360_F_885377177_UIz6CZXJshXGK150ON8QfPPhhtbxH5fJ.jpg" ||
              "https://img.freepik.com/premium-photo/global-cyber-threat-map-hightech-map-showing-realtime-global-cyber-threats-with-red-lines-indicati_343960-118556.jpg"
            }
            alt="grwoing-need-banner"
            width={1000}
            height={1000}
            className="w-full h-full rounded-xl object-cover overflow-hidden"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GrowingNeed;
