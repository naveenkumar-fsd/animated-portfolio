import type { PointerEvent } from "react";
import { useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/**
 * Subtle 3D tilt that follows a MOUSE pointer.
 * It ignores touch and pen input (touch users get the normal, always-visible card) and
 * does nothing when the visitor prefers reduced motion.
 * It also writes --mx / --my (pointer position in %) so CSS can draw a glare under the cursor.
 */
export function useTilt(maxDeg = 5) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxDeg, -maxDeg]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxDeg, maxDeg]), spring);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    // The glare is cheap and purely visual, so it still follows the cursor with reduced motion.
    event.currentTarget.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    event.currentTarget.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);

    if (reduceMotion) return;
    x.set(px - 0.5);
    y.set(py - 0.5);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, onPointerMove, onPointerLeave };
}
