import { motion, useReducedMotion } from "motion/react";
import type { ExperienceEntry } from "../types/portfolio";
import AnimatedSection from "./AnimatedSection";

/** Animated vertical timeline for portfolio experience entries. */
export default function ExperienceTimeline({
  entries,
}: {
  entries: ExperienceEntry[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <ol className="relative space-y-10 pl-6 sm:pl-10">
      {/* Timeline base */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-px bg-line-strong"
      />

      {/* Animated timeline progress */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-accent via-signal to-transparent"
        initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ height: "100%" }}
      />

      {entries.map((entry, index) => (
        <li key={entry.id} className="relative">
          {/* Animated timeline marker */}
          <motion.span
            aria-hidden="true"
            className="absolute -left-[1.9rem] top-2 grid size-3 place-items-center rounded-full border-2 border-accent bg-ink sm:-left-[2.9rem]"
            initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.45,
              delay: index * 0.12,
              type: "spring",
              stiffness: 300,
              damping: 18,
            }}
          >
            <motion.span
              className="size-1 rounded-full bg-accent"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [0.8, 1.3, 0.8],
                      opacity: [0.6, 1, 0.6],
                    }
              }
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            />
          </motion.span>

          <AnimatedSection delay={index * 0.08}>
            <motion.article
              aria-labelledby={`exp-${entry.id}`}
              whileHover={reduceMotion ? undefined : { x: 4 }}
              transition={{ type: "spring", stiffness: 250, damping: 24 }}
              className="group relative grid gap-4 rounded-2xl md:grid-cols-[11rem_1fr] md:gap-10"
            >
              {/* Subtle hover glow */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl bg-accent/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* Period and role type */}
              <header>
                <p className="font-mono text-sm text-signal">
                  {entry.period}
                </p>

                <motion.p
                  whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                  className="mt-2 inline-block rounded-full border border-line-strong px-3 py-1 font-mono text-xs text-muted transition-colors duration-300 group-hover:border-accent/50"
                >
                  {entry.type}
                </motion.p>
              </header>

              {/* Experience details */}
              <div>
                <h3
                  id={`exp-${entry.id}`}
                  className="font-display text-2xl font-semibold transition-colors duration-300 group-hover:text-accent"
                >
                  {entry.role}
                </h3>

                <p className="mt-1 text-base text-accent">
                  {entry.company}
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {entry.summary}
                </p>

                {/* Responsibilities */}
                <ul className="mt-4 max-w-2xl space-y-2 text-sm leading-relaxed text-muted sm:text-base">
                  {entry.responsibilities.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={
                        reduceMotion ? false : { opacity: 0, x: 8 }
                      }
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.4,
                        delay: itemIndex * 0.07,
                      }}
                      className="flex gap-3"
                    >
                      <motion.span
                        aria-hidden="true"
                        className="mt-2.5 size-1 shrink-0 rounded-full bg-accent"
                        whileHover={
                          reduceMotion ? undefined : { scale: 1.8 }
                        }
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>

                {/* Technology tags */}
                <ul
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label="Technologies used"
                >
                  {entry.technologies.map((tech, techIndex) => (
                    <motion.li
                      key={tech}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -3, scale: 1.04 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 20,
                      }}
                      className="rounded-chip border border-line-strong bg-raised/60 px-2.5 py-1 font-mono text-xs text-muted transition-colors duration-300 hover:border-accent/60 hover:text-fg"
                      style={{
                        transitionDelay: `${techIndex * 15}ms`,
                      }}
                    >
                      {tech}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.article>
          </AnimatedSection>
        </li>
      ))}
    </ol>
  );
}
