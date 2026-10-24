import type { SectionCopy } from "../types/portfolio";
import AnimatedSection from "./AnimatedSection";

interface SectionHeadingProps extends SectionCopy {
  /** The id of the parent <section>; the heading gets `${sectionId}-title` for aria-labelledby */
  sectionId: string;
}

export default function SectionHeading({ sectionId, eyebrow, title, intro }: SectionHeadingProps) {
  return (
    <AnimatedSection className="mb-12 max-w-2xl sm:mb-16">
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id={`${sectionId}-title`}
        className="mt-4 text-balance font-display text-[clamp(2.15rem,4.4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em]"
      >
        {title}
      </h2>
      {intro && <p className="text-copy mt-5 text-pretty text-muted">{intro}</p>}
    </AnimatedSection>
  );
}
