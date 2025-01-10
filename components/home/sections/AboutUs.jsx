"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInOut, staggerContainer, textMask } from "@/lib/utils";
import { SiTicktick } from "react-icons/si";

const AboutUs = ({ aboutUsData }) => {
  return (
    <motion.section
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="about-us"
      className="w-full min-h-fit lg:h-fit lg:max-h-[calc(100vh-63px)] select-none bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <div className="flex-center py-1 overflow-hidde">
        <motion.h2
          variants={textMask(0.2, 0.4)}
          initial="initial"
          whileInView="animate"
          exit="exit"
          viewport={{ once: false }}
          className="font-bold text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl"
        >
          Who We Are
        </motion.h2>
      </div>
      <div className="w-full h-fit flex-center flex-col-reverse md:flex-row gap-2 md:gap-4 lg:gap-6 overflow-hidden">
        <div className="flex-1 w-full h-fit grid items-center space-y-4 md:space-y-6 lg:space-y-8 overflow-hidden">
          <motion.h3
            variants={textMask(0.4, 0.4)}
            initial="initial"
            whileInView="animate"
            exit="exit"
            viewport={{ once: false }}
            className="font-bold text-white text-lg md:text-xl lg:text-2xl xl:text-3xl text-balanc"
          >
            {aboutUsData?.heading}
          </motion.h3>
          <motion.p
            variants={textMask(0.6, 0.4)}
            initial="initial"
            whileInView="animate"
            exit="exit"
            viewport={{ once: false }}
            className="w-full h-fit text-sm lg:text-md xl:text-lg text-sky-600 text-balanc text-justify"
            dangerouslySetInnerHTML={{ __html: aboutUsData?.description }}
          />
          <div className="w-full h-fit space-y-2 md:space-y-4 lg:space-y-6">
            {Array.isArray(aboutUsData?.features) &&
              aboutUsData.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="w-fit h-fit flex-center gap-2"
                >
                  <motion.div
                    variants={fadeInOut("right", "spring", 0.4, 0.5 * index)}
                    className=""
                  >
                    <SiTicktick className="fill-sky-600 text-sky-600" />
                  </motion.div>
                  <motion.p
                    variants={fadeInOut("top", "spring", 0.4, 0.5 * index)}
                    className="text-xs lg:text-sm xl:text-md text-sky-600 text-balance"
                  >
                    {feature}
                  </motion.p>
                </motion.div>
              ))}
          </div>
        </div>
        <motion.div
          variants={fadeInOut("left", "spring", 0.4, 0.5)}
          className="flex-1 w-full h-full lg:h-[50vh] shadow-md rounded-lg overflow-hidden"
        >
          {aboutUsData?.aboutBannerImage && (
            <Image
              src={aboutUsData?.aboutBannerImage?.imageURL}
              alt={aboutUsData?.aboutBannerImage?.alt}
              width={1000}
              height={1000}
              className="w-full h-full object-cover overflow-hidden"
            />
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
