import type { CSSProperties, ReactNode } from "react";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import { easeOutExpo } from "../lib/motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Small delay to stagger sibling animations */
  delay?: number;
}

export default function AnimatedSection({
  children,
  className,
  style,
  delay = 0,
}: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: 32,
              scale: 0.985,
              filter: "blur(5px)",
            }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
      }
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.85,
        ease: easeOutExpo,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
