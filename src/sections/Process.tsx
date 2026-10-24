import { Code2, Compass, Rocket, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
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
  if (process.length === 0) return null;

  return (
    <section id="process" aria-labelledby="process-title" className="section-pad">
      <div className="container-page">
        <SectionHeading sectionId="process" {...portfolio.sections.process} />

        <div className="relative">
          {/* Connector line that draws itself on wide screens */}
          <motion.div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-linear-to-r from-accent via-signal to-transparent lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease: easeOutExpo }}
          />

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => {
              const Icon = icons[step.icon];
              return (
                <li key={step.id}>
                  <AnimatedSection delay={index * 0.08} className="h-full">
                    <div className="surface relative h-full p-6 pt-12 transition-colors duration-500 hover:border-accent/40">
                      <span className="absolute -top-0 left-6 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-raised text-accent">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <p className="font-mono text-xs text-faint">
                        <span className="sr-only">Step </span>
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold">{step.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
                    </div>
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
