import { motion, useReducedMotion } from "motion/react";
import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { portfolio } from "../data/portfolio";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeading from "../components/SectionHeading";
import { cleanUrl, externalLinkProps, linkTitle } from "../lib/links";

export default function Education() {
  const { education, certifications } = portfolio;
  const reduceMotion = useReducedMotion();

  // Hide this optional section when there is no content.
  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <section id="education" aria-labelledby="education-title" className="section-pad">
      <div className="container-page">
        <SectionHeading sectionId="education" {...portfolio.sections.education} />

        <div className="grid gap-5 md:grid-cols-2">
          {/* Education card */}
          {education.length > 0 && (
            <AnimatedSection className="h-full">
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="surface group relative h-full overflow-hidden p-6 transition-[border-color,box-shadow] duration-500 hover:border-accent/50 hover:shadow-[0_24px_65px_-35px_rgba(154,140,255,0.4)] sm:p-8"
              >
                {/* Animated accent line */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-accent to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />

                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                />

                <h3 className="relative flex items-center gap-3 font-display text-xl font-semibold">
                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : { rotate: [0, -5, 5, 0] }
                    }
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="grid size-11 place-items-center rounded-xl border border-line-strong bg-raised text-accent transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/10"
                  >
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </motion.span>
                  Education
                </h3>

                <ul className="relative mt-6 space-y-6">
                  {education.map((entry, index) => (
                    <motion.li
                      key={entry.id}
                      initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.55, delay: index * 0.12 }}
                      className="relative border-l border-line-strong pl-4"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -left-[4.5px] top-1.5 size-2 rounded-full bg-accent"
                      />

                      <p className="font-medium text-fg transition-colors duration-300 group-hover:text-accent">
                        {entry.degree}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {entry.institution}
                      </p>
                      <p className="mt-1 font-mono text-xs text-signal">
                        {entry.period}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            </AnimatedSection>
          )}

          {/* Certifications card */}
          {certifications.length > 0 && (
            <AnimatedSection delay={0.1} className="h-full">
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="surface group relative h-full overflow-hidden p-6 transition-[border-color,box-shadow] duration-500 hover:border-accent/50 hover:shadow-[0_24px_65px_-35px_rgba(154,140,255,0.4)] sm:p-8"
              >
                {/* Animated accent line */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-signal to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                />

                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-signal/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                />

                <h3 className="relative flex items-center gap-3 font-display text-xl font-semibold">
                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.08, 1],
                            rotate: [0, 4, 0],
                          }
                    }
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="grid size-11 place-items-center rounded-xl border border-line-strong bg-raised text-accent transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/10"
                  >
                    <Award className="size-5" aria-hidden="true" />
                  </motion.span>
                  Certifications
                </h3>

                <ul className="relative mt-6 space-y-6">
                  {certifications.map((cert, index) => {
                    const url = cleanUrl(cert.url);

                    return (
                      <motion.li
                        key={cert.id}
                        initial={reduceMotion ? false : { opacity: 0, x: 14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.55, delay: index * 0.12 }}
                        className="relative border-l border-line-strong pl-4"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute -left-[4.5px] top-1.5 size-2 rounded-full bg-signal"
                        />

                        <p className="font-medium text-fg transition-colors duration-300 group-hover:text-accent">
                          {cert.title}
                        </p>

                        <p className="mt-1 text-sm text-muted">
                          {cert.issuer}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                          <p className="font-mono text-xs text-signal">
                            {cert.year}
                          </p>

                          {url && (
                            <motion.a
                              href={url}
                              {...externalLinkProps}
                              title={linkTitle("View credential", url)}
                              whileHover={reduceMotion ? undefined : { x: 3 }}
                              className="inline-flex items-center gap-1.5 py-1 text-xs text-accent underline-offset-4 hover:underline"
                            >
                              View credential
                              <ExternalLink className="size-3" aria-hidden="true" />
                              <span className="sr-only"> (opens in a new tab)</span>
                            </motion.a>
                          )}
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.article>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
