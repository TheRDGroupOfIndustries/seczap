import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const capitalizeString = (title) => {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const reverseSlug = (slug) => {
  const name = slug
    .replace(/-/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return name;
};

export const fadeInOut = (
  direction, //: "left" | "right" | "up" | "down" | "",
  type = "tween",
  delay,
  duration
) => {
  let hiddenX = 0;
  let hiddenY = 0;

  switch (direction) {
    case "left":
      hiddenX = 100;
      break;
    case "right":
      hiddenX = -100;
      break;
    case "up":
      hiddenY = 100;
      break;
    case "down":
      hiddenY = -100;
      break;
  }

  return {
    hidden: {
      x: hiddenX,
      y: hiddenY,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
    exit: {
      x: hiddenX,
      y: hiddenY,
      opacity: 0,
      transition: {
        type,
        duration,
        ease: "easeIn",
      },
    },
  };
};

export const staggerContainer = (staggerChildren, delayChildren) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

export const zoom = (
  direction, //: "in" | "out",
  delay,
  duration
) => {
  const scaleStart = direction === "in" ? 0 : 1;
  const scaleEnd = direction === "in" ? 1 : 0.8;

  return {
    hidden: {
      scale: scaleStart,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay,
        duration,
        ease: "easeOut",
      },
    },
    exit: {
      scale: scaleEnd,
      opacity: 0,
      transition: {
        type: "tween",
        duration,
        ease: "easeIn",
      },
    },
  };
};

export const textMask = (delay = 0, duration = 0.5) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: duration,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };
};

export const textContainer = {
  hidden: {
    opacity: 0,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
  }),
};

export const textChar = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
    },
  },
};
