import type { ExperienceEntry } from "../types/portfolio";
import AnimatedSection from "./AnimatedSection";

/** Vertical timeline. Renders one entry per object in portfolio.experience. */
export default function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <ol className="relative space-y-10 border-l border-line-strong pl-6 sm:pl-10">
      {entries.map((entry) => (
        <li key={entry.id} className="relative">
          {/* Timeline marker */}
          <span
            aria-hidden="true"
            className="absolute -left-[1.9rem] top-2 size-3 rounded-full border-2 border-accent bg-ink sm:-left-[2.9rem]"
          />
          <AnimatedSection>
            <article
              aria-labelledby={`exp-${entry.id}`}
              className="grid gap-4 md:grid-cols-[11rem_1fr] md:gap-10"
            >
              <header>
                <p className="font-mono text-sm text-signal">{entry.period}</p>
                <p className="mt-1 inline-block rounded-full border border-line-strong px-3 py-0.5 font-mono text-xs text-muted">
                  {entry.type}
                </p>
              </header>

              <div>
                <h3 id={`exp-${entry.id}`} className="font-display text-2xl font-semibold">
                  {entry.role}
                </h3>
                <p className="mt-1 text-base text-accent">{entry.company}</p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{entry.summary}</p>

                <ul className="mt-4 max-w-2xl space-y-2 text-sm leading-relaxed text-muted sm:text-base">
                  {entry.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                  {entry.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-chip border border-line-strong bg-raised/60 px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </AnimatedSection>
        </li>
      ))}
    </ol>
  );
}
