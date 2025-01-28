"use client";

import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
import Header from "@/components/ui/header";

const FAQs = ({ faqsData }) => {
  return (
    <motion.section
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="faqs"
      className="w-full min-h-fit lg:h-fit lg:max-h-[calc(100vh-63px)] select-none bg-primary-clr dark:bg-primary-clr p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <Header text={faqsData?.heading} />

      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        {faqsData?.faqs?.map((faq, index) => (
          <div
            key={index}
            className="shadow-lg hover:shadow-xl hover:-translate-y-1.5 hover:translate-x-2 ease-in-out duration-300 overflow-hidde"
          >
            <motion.div
              variants={fadeInOut("up", "tween", 0.2, 0.5 + index * 0.2)}
              className="w-full h-full bg-primary-clr-2/60 dark:bg-primary-clr-2/60 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
            >
              <motion.div
                variants={staggerContainer(0.1, 0.2)}
                className="space-y-2 lg:space-y-4"
              >
                <motion.h4
                  variants={fadeInOut("down", "tween", 0.3, 0.5)}
                  className="text-white text-md md:text-lg lg:text-xl xl:text-2xl font-semibold"
                >
                  {faq?.question}
                </motion.h4>
                <motion.p
                  variants={fadeInOut("up", "tween", 0.4, 0.5)}
                  className="text-blue-400 text-xs md:text-sm lg:text-md xl:text-lg"
                >
                  {faq?.answer}
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default FAQs;
