"use client";

import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

const getDigitCount = (num) => {
  if (num === 0) return 1;
  return Math.max(Math.floor(Math.log10(Math.abs(num))) + 1, 1);
};

export function AnimatedCounter({ value, className }) {
  const digitCount = getDigitCount(value);
  const digits = [100, 10, 1].slice(-digitCount);

  return (
    <div
      style={{ fontSize }}
      className={`${className} flex rounded-md leading-none overflow-hidden`}
    >
      {digits.map((place) => (
        <Digit key={place} place={place} value={value} />
      ))}
    </div>
  );
}

function Digit({ place, value }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span style={{ y }} className="absolute inset-0 flex-center font-iceland">
      {number}
    </motion.span>
  );
}
