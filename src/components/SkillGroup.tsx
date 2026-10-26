import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Database, LayoutTemplate, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SkillCategory, SkillIconName } from "../types/portfolio";
import AnimatedSection from "./AnimatedSection";

const icons: Record<SkillIconName, LucideIcon> = {
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  wrench: Wrench,
};

export default function SkillGroup({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const Icon = icons[category.icon];
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <AnimatedSection delay={index * 0.09} className="h-full">
      <motion.article
        aria-labelledby={`skill-${category.id}`}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={reduceMotion ? undefined : { y: -7, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 280, damping: 23 }}
        className="surface group relative h-full overflow-hidden p-6 transition-[border-color,box-shadow] duration-500 hover:border-accent/50 hover:shadow-[0_24px_65px_-35px_rgba(154,140,255,0.45)] sm:p-8"
      >
        {/* Ambient glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full"
          animate={{
            opacity: hovered ? 1 : 0.15,
            scale: hovered ? 1.25 : 0.8,
          }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(closest-side, rgb(154 140 255 / 0.24), transparent)",
          }}
        />

        {/* Animated accent line */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left"
          animate={{ scaleX: hovered ? 1 : 0.15 }}
          transition={{ duration: 0.45 }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgb(154 140 255 / 0.9), transparent)",
          }}
        />

        <div className="relative flex items-start gap-4">
          {/* Animated icon */}
          <motion.span
            className="grid size-12 shrink-0 place-items-center rounded-xl border border-line-strong bg-raised text-accent transition-colors duration-300 group-hover:border-accent/60 group-hover:bg-accent/10"
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: hovered ? [0, -8, 8, 0] : 0,
                    scale: hovered ? 1.08 : 1,
                  }
            }
            transition={{ duration: 0.45 }}
          >
            <Icon className="size-6" aria-hidden="true" />
          </motion.span>

          <div>
            <h3
              id={`skill-${category.id}`}
              className="font-display text-xl font-semibold sm:text-2xl"
            >
              {category.title}
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-muted">
              {category.description}
            </p>
          </div>
        </div>

        {/* Animated skill chips */}
        <ul className="relative mt-6 flex flex-wrap gap-2">
          {category.items.map((item, itemIndex) => (
            <motion.li
              key={item}
              initial={false}
              animate={
                hovered && !reduceMotion
                  ? { y: -2, scale: 1.035 }
                  : { y: 0, scale: 1 }
              }
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 20,
                delay: hovered ? itemIndex * 0.025 : 0,
              }}
              className="rounded-chip border border-line-strong bg-raised/60 px-3 py-1.5 font-mono text-xs text-fg transition-[border-color,background-color,color] duration-300 hover:border-accent/60 hover:bg-accent/10 sm:text-sm"
            >
              {item}
            </motion.li>
          ))}
        </ul>

        {/* Small decorative indicator */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-6 h-0.5 bg-accent sm:left-8"
          animate={{ width: hovered ? "calc(100% - 4rem)" : "0%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </motion.article>
    </AnimatedSection>
  );
}

