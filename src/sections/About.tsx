import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Quote, ArrowUpRight } from "lucide-react";
import { portfolio } from "../data/portfolio";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeading from "../components/SectionHeading";

const { about, sections } = portfolio;

export default function About() {
  const reduceMotion = useReducedMotion();
  const [activeStrength, setActiveStrength] = useState<string | null>(null);

  return (
    <section id="about" aria-labelledby="about-title" className="section-pad">
      <div className="container-page">
        <SectionHeading sectionId="about" {...sections.about} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* About text and philosophy */}
          <AnimatedSection className="space-y-5 lg:col-span-7">
            {about.bio.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                className="text-copy text-pretty text-muted"
                initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: index * 0.12 }}
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Philosophy quote card */}
            <motion.figure
              whileHover={reduceMotion ? undefined : { y: -5 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="surface group relative mt-8 overflow-hidden p-6 sm:p-8"
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [0.9, 1.2, 0.9],
                        opacity: [0.08, 0.2, 0.08],
                      }
                }
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background:
                    "radial-gradient(closest-side, rgb(154 140 255 / 0.4), transparent)",
                }}
              />

              <div className="relative">
                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : { rotate: [0, -5, 5, 0] }
                  }
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <Quote className="size-7 text-accent" aria-hidden="true" />
                </motion.div>

                <blockquote className="mt-4 text-balance font-display text-xl font-medium leading-snug sm:text-2xl">
                  {about.philosophy}
                </blockquote>

                <figcaption className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-faint">
                  <span className="h-px w-6 bg-accent" />
                  Development philosophy
                </figcaption>
              </div>
            </motion.figure>
          </AnimatedSection>

          {/* Strengths, interests and quick facts */}
          <div className="space-y-10 lg:col-span-5">
            <AnimatedSection delay={0.1}>
              <h3 className="eyebrow">Strengths</h3>

              <ul className="mt-4 flex flex-wrap gap-2">
                {about.strengths.map((item, index) => {
                  const isActive = activeStrength === item;

                  return (
                    <motion.li
                      key={item}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.055 }}
                    >
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() =>
                          setActiveStrength(isActive ? null : item)
                        }
                        className={`rounded-full border px-4 py-2 text-sm transition-[color,background-color,border-color,box-shadow] duration-300 ${
                          isActive
                            ? "border-accent bg-accent/15 text-fg shadow-[0_0_20px_rgba(154,140,255,0.15)]"
                            : "border-line-strong bg-raised/60 text-fg hover:border-accent/60 hover:bg-accent/5"
                        }`}
                      >
                        {item}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
              <p className="mt-3 text-xs text-faint">
                Select a strength to highlight it.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h3 className="eyebrow">I enjoy building</h3>

              <ul className="mt-4 space-y-3">
                {about.enjoyBuilding.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="group/interest flex gap-3 text-sm leading-relaxed text-muted sm:text-base"
                  >
                    <motion.span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-signal"
                      whileHover={reduceMotion ? undefined : { scale: 1.8 }}
                    />
                    <span className="transition-colors duration-300 group-hover/interest:text-fg">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h3 className="sr-only">Quick facts</h3>

              <dl className="grid grid-cols-3 gap-3">
                {about.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={reduceMotion ? undefined : { y: -5, scale: 1.035 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="surface group/stat relative overflow-hidden p-4 text-center sm:p-5"
                  >
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-center bg-accent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.15 }}
                    />

                    <dd className="font-display text-2xl font-semibold text-gradient sm:text-3xl">
                      {stat.value}
                    </dd>

                    <dt className="mt-1 text-xs leading-snug text-muted">
                      {stat.label}
                    </dt>
                  </motion.div>
                ))}
              </dl>
            </AnimatedSection>

            {/* Small visual link */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
              >
                Explore my work
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
