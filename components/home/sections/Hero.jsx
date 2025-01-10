"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInOut, staggerContainer, textMask } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Hero = ({ heroData }) => {
  const router = useRouter();

  return (
    <motion.section
      variants={staggerContainer(0.1, 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="hero"
      className="w-full min-h-fit lg:h-fit lg:max-h-[calc(100vh-63px)] xl:h-[calc(100vh-63px)] select-none bg-gradient-to-tr from-accent to-accent/40 p-4 md:p-6 lg:p-8 xl:p-10 overflow-hidden"
    >
      <div className="w-full h-full flex-center flex-col-reverse md:flex-row gap-2 md:gap-4 lg:gap-6 overflow-hidden">
        <div className="flex-1 w-full h-fit grid items-center space-y-4 md:space-y-6 lg:space-y-8 overflow-hidden">
          <motion.div
            variants={textMask(0.3, 0.5)}
            initial="initial"
            whileInView="animate"
            exit="exit"
            viewport={{ once: false }}
          >
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-balance">
              {heroData?.heading}
            </h1>
          </motion.div>

          <motion.div
            variants={textMask(0.5, 0.5)}
            initial="initial"
            whileInView="animate"
            exit="exit"
            viewport={{ once: false }}
          >
            <p className="text-sm lg:text-md xl:text-lg text-sky-600 text-balanc text-justif">
              {heroData?.description}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInOut("right", "tween", 0.5, 0.5)}
            className="flex gap-2 md:gap-4"
          >
            {heroData?.buttonOne && (
              <Button
                onClick={() => router.push(heroData?.buttonOne?.link)}
                size="lg"
                effect="shine"
                className="bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold md:px-4 lg:px-6 xl:px-8"
              >
                {heroData?.buttonOne?.text}
              </Button>
            )}
            {heroData?.buttonTwo && (
              <Button
                onClick={() => router.push(heroData?.buttonTwo?.link)}
                size="lg"
                variant="outline"
                effect="gooeyRight"
                className="bg-transparent border-sky-700 text-sky-600 text-md md:text-lg font-bold md:px-4 lg:px-6 xl:px-8"
              >
                {heroData?.buttonTwo?.text}
              </Button>
            )}
          </motion.div>
        </div>
        <motion.div
          variants={fadeInOut("left", "spring", 0.2, 0.5)}
          className="flex-1 w-full h-full shadow-md overflow-hidden"
        >
          {heroData?.heroBannerImage && (
            <Image
              src={heroData?.heroBannerImage?.imageURL}
              alt={heroData?.heroBannerImage?.alt}
              width={1000}
              height={1000}
              className="w-full h-full overflow-hidden"
            />
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
