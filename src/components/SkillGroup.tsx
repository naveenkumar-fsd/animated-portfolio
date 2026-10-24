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

export default function SkillGroup({ category, index }: { category: SkillCategory; index: number }) {
  const Icon = icons[category.icon];

  return (
    <AnimatedSection delay={(index % 2) * 0.08} className="h-full">
      <article
        aria-labelledby={`skill-${category.id}`}
        className="surface group relative h-full overflow-hidden p-6 transition-colors duration-500 hover:border-accent/40 sm:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: "radial-gradient(closest-side, rgb(154 140 255 / 0.18), transparent)" }}
        />
        <div className="relative flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line-strong bg-raised text-accent">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h3 id={`skill-${category.id}`} className="font-display text-xl font-semibold sm:text-2xl">
              {category.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{category.description}</p>
          </div>
        </div>

        <ul className="relative mt-6 flex flex-wrap gap-2">
          {category.items.map((item) => (
            <li
              key={item}
              className="rounded-chip border border-line-strong bg-raised/60 px-3 py-1.5 font-mono text-xs text-fg transition-colors duration-300 hover:border-accent/60 sm:text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>
    </AnimatedSection>
  );
}
