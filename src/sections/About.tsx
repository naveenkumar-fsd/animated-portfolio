import { Quote } from "lucide-react";
import { portfolio } from "../data/portfolio";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeading from "../components/SectionHeading";

const { about, sections } = portfolio;

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad">
      <div className="container-page">
        <SectionHeading sectionId="about" {...sections.about} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <AnimatedSection className="space-y-5 lg:col-span-7">
            {about.bio.map((paragraph) => (
              <p key={paragraph} className="text-copy text-pretty text-muted">
                {paragraph}
              </p>
            ))}

            <figure className="surface mt-8 p-6 sm:p-8">
              <Quote className="size-6 text-accent" aria-hidden="true" />
              <blockquote className="mt-3 text-balance font-display text-xl font-medium leading-snug sm:text-2xl">
                {about.philosophy}
              </blockquote>
              <figcaption className="mt-3 font-mono text-xs uppercase tracking-wider text-faint">
                Development philosophy
              </figcaption>
            </figure>
          </AnimatedSection>

          <div className="space-y-10 lg:col-span-5">
            <AnimatedSection delay={0.1}>
              <h3 className="eyebrow">Strengths</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.strengths.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line-strong bg-raised/60 px-4 py-2 text-sm text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h3 className="eyebrow">I enjoy building</h3>
              <ul className="mt-4 space-y-3">
                {about.enjoyBuilding.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h3 className="sr-only">Quick facts (sample values)</h3>
              <dl className="grid grid-cols-3 gap-3">
                {about.stats.map((stat) => (
                  <div key={stat.label} className="surface p-4 text-center sm:p-5">
                    <dd className="font-display text-2xl font-semibold text-gradient sm:text-3xl">{stat.value}</dd>
                    <dt className="mt-1 text-xs leading-snug text-muted">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
