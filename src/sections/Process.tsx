import { Code2, Compass, Rocket, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { portfolio } from "../data/portfolio";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeading from "../components/SectionHeading";
import { easeOutExpo } from "../lib/motion";
import type { ProcessIconName } from "../types/portfolio";

const icons: Record<ProcessIconName, LucideIcon> = {
  search: Search,
  map: Compass,
  code: Code2,
  rocket: Rocket,
};

export default function Process() {
  const { process } = portfolio;
  const reduceMotion = useReducedMotion();

  if (process.length === 0) return null;

  return (
    <section id="process" aria-labelledby="process-title" className="section-pad">
      <div className="container-page">
        <SectionHeading sectionId="process" {...portfolio.sections.process} />

        <div className="relative">
          {/* Desktop connector line */}
          <motion.div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-linear-to-r from-accent via-signal to-transparent lg:block"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease: easeOutExpo }}
          />

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => {
              const Icon = icons[step.icon];

              return (
                <li key={step.id}>
                  <AnimatedSection delay={index * 0.1} className="h-full">
                    <motion.article
                      whileHover={reduceMotion ? undefined : { y: -7 }}
                      transition={{ type: "spring", stiffness: 280, damping: 23 }}
                      className="surface group relative h-full overflow-hidden p-6 pt-12 transition-[border-color,box-shadow] duration-500 hover:border-accent/50 hover:shadow-[0_24px_60px_-35px_rgba(154,140,255,0.45)]"
                    >
                      {/* Animated top accent */}
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px origin-left bg-linear-to-r from-transparent via-accent to-transparent"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.12,
                          ease: "easeOut",
                        }}
                      />

                      {/* Ambient hover glow */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                      />

                      {/* Icon badge */}
                      <motion.span
                        className="absolute left-6 top-5 grid size-12 place-items-center rounded-full border border-line-strong bg-raised text-accent transition-[border-color,background-color] duration-300 group-hover:border-accent/60 group-hover:bg-accent/10"
                        whileHover={
                          reduceMotion
                            ? undefined
                            : { rotate: -8, scale: 1.1 }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 18,
                        }}
                      >
                        <motion.span
                          animate={
                            reduceMotion
                              ? undefined
                              : { y: [0, -2, 0] }
                          }
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2,
                          }}
                        >
                          <Icon className="size-5" aria-hidden="true" />
                        </motion.span>
                      </motion.span>

                      {/* Step number */}
                      <motion.p
                        className="relative font-mono text-xs text-faint"
                        initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <span className="sr-only">Step </span>
                        {String(index + 1).padStart(2, "0")}
                      </motion.p>

                      {/* Step title */}
                      <h3 className="relative mt-2 font-display text-xl font-semibold transition-colors duration-300 group-hover:text-accent">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="relative mt-3 text-sm leading-relaxed text-muted">
                        {step.description}
                      </p>

                      {/* Bottom progress indicator */}
                      <motion.div
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-0.5 bg-accent"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.9,
                          delay: 0.25 + index * 0.12,
                          ease: easeOutExpo,
                        }}
                      />
                    </motion.article>
                  </AnimatedSection>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
