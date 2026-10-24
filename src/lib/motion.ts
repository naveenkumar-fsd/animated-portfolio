import type { Variants } from "motion/react";

/** Shared easing: fast start, long soft landing. Matches --ease-out-expo in index.css */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Parent that staggers its children */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

/** Child: fades up a short distance */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
};

/** Child: slides up out of an overflow-hidden mask (used for headline words) */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: easeOutExpo } },
};
