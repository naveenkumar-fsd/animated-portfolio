import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import { easeOutExpo } from "../lib/motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Seconds to wait before the reveal starts (use small values to stagger siblings) */
  delay?: number;
}

/**
 * Fades its content up once, the first time it scrolls into view.
 * Only opacity and a small translate are animated, so nothing shifts the layout.
 * Reduced-motion visitors get the fade without the movement (see <MotionConfig> in main.tsx).
 */
export default function AnimatedSection({ children, className, style, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  );
}
