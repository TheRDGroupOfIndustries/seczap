"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ReadyToSecure = ({ readyToSecureData }) => {
  const router = useRouter();
  return (
    <motion.section
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="ready-to-secure"
      className="w-full h-fit select-none p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 overflow-hidden"
    >
      <motion.div
        variants={fadeInOut("up", "spring", 0.2, 0.5)}
        className="w-full h-fit bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 xl:p-10 overflow-hidden"
      >
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          className="w-full h-full flex-center flex-col gap-4 md:gap-6"
        >
          <motion.h2
            variants={fadeInOut("down", "tween", 0.2, 0.5)}
            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold"
          >
            {readyToSecureData?.heading}
          </motion.h2>

          <motion.p
            variants={fadeInOut("up", "tween", 0.3, 0.5)}
            className="w-fit mx-auto text-sm md:text-md lg:text-lg xl:text-xl text-balanc text-center text-blue-500"
          >
            {readyToSecureData?.description}
          </motion.p>

          <motion.div
            variants={fadeInOut("up", "spring", 0.4, 0.5)}
            className="flex-center flex-col md:flex-row gap-4 md:gap-6"
          >
            {readyToSecureData?.buttonOne && (
              <motion.div variants={fadeInOut("right", "spring", 0.5, 0.5)}>
                <Button
                  onClick={() =>
                    router.push(readyToSecureData?.buttonOne?.link)
                  }
                  size="lg"
                  effect="shine"
                  className="bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold md:px-4 lg:px-6 xl:px-8"
                >
                  {readyToSecureData?.buttonOne?.text}
                </Button>
              </motion.div>
            )}
            {readyToSecureData?.buttonTwo && (
              <motion.div variants={fadeInOut("left", "spring", 0.5, 0.5)}>
                <Button
                  onClick={() =>
                    router.push(readyToSecureData?.buttonTwo?.link)
                  }
                  size="lg"
                  variant="outline"
                  effect="gooeyRight"
                  className="bg-transparent border-sky-700 text-sky-600 text-md md:text-lg font-bold md:px-4 lg:px-6 xl:px-8"
                >
                  {readyToSecureData?.buttonTwo?.text}
                </Button>
              </motion.div>
            )}
          </motion.div>

          <motion.p
            variants={fadeInOut("up", "tween", 0.6, 0.5)}
            className="w-fit mx-auto text-xs md:text-sm lg:text-md xl:text-lg text-balance text-center text-sky-500"
          >
            {readyToSecureData?.footer}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ReadyToSecure;
