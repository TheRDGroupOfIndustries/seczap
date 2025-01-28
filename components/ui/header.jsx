"use client";

import { fadeInOut } from "@/lib/utils";
import { motion } from "framer-motion";

const Header = ({ text }) => {
  return (
    <motion.div
      variants={fadeInOut("up", "spring", 0.2, 0.5)}
      className="flex-center"
    >
      <h2 className="font-iceland font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        {text}
      </h2>
    </motion.div>
  );
};

export default Header;
