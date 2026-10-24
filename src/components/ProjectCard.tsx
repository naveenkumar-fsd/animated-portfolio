import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, BookOpen, Github } from "lucide-react";
import type { Project } from "../types/portfolio";
import { accentColors } from "../lib/accents";
import { cleanUrl, externalLinkProps, linkTitle } from "../lib/links";
import { useTilt } from "../hooks/useTilt";
import AnimatedSection from "./AnimatedSection";
import ProjectVisual from "./ProjectVisual";

interface ProjectCardProps {
  project: Project;
  /** Position in the grid, used only to stagger the entrance */
  index: number;
}

function ActionLink({
  href,
  label,
  icon,
  primary = false,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      {...externalLinkProps}
      title={linkTitle(label, href)}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-[color,background-color,border-color] duration-300 ${
        primary
          ? "bg-fg/10 text-fg hover:bg-(--accent) hover:text-ink"
          : "border border-line-strong text-muted hover:border-(--accent) hover:text-fg"
      }`}
    >
      {icon}
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * One project card. It renders whatever is in the Project object it receives, so adding a project
 * to src/data/portfolio.ts never requires editing this file.
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt(project.featured ? 3 : 5);

  const githubUrl = cleanUrl(project.githubUrl);
  const liveUrl = cleanUrl(project.liveUrl);
  const caseStudyUrl = cleanUrl(project.caseStudyUrl);
  const hasActions = Boolean(githubUrl || liveUrl || caseStudyUrl);

  return (
    <AnimatedSection
      delay={(index % 2) * 0.08}
      className={project.featured ? "lg:col-span-2" : ""}
      style={{ "--accent": accentColors[project.accent] } as CSSProperties}
    >
      <motion.article
        aria-labelledby={`${project.id}-title`}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
        className={`group surface relative flex h-full flex-col overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-[color-mix(in_oklab,var(--accent)_45%,transparent)] hover:shadow-[0_30px_80px_-40px_var(--accent)] focus-within:border-[color-mix(in_oklab,var(--accent)_45%,transparent)] ${
          project.featured ? "lg:flex-row" : ""
        }`}
      >
        {/* Accent line that draws across the top on hover / focus */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 transition-transform duration-700 ease-out-expo group-hover:scale-x-100 group-focus-within:scale-x-100"
          style={{ backgroundImage: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
        />
        {/* Soft glare that follows a mouse cursor (decorative, mouse only) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--accent) 14%, transparent), transparent 60%)",
          }}
        />

        <div
          className={`relative aspect-[16/9] shrink-0 border-b border-line ${
            project.featured ? "lg:aspect-auto lg:min-h-80 lg:w-[46%] lg:border-b-0 lg:border-r" : ""
          }`}
        >
          <ProjectVisual name={project.visual} />
          <span className="absolute left-4 top-4 z-10 rounded-full border border-line-strong bg-ink/70 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-fg backdrop-blur">
            {project.category}
          </span>
          {project.featured && (
            <span
              className="absolute right-4 top-4 z-10 rounded-full px-3 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-ink"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Featured
            </span>
          )}
        </div>

        <div className="relative z-20 flex flex-1 flex-col p-6 sm:p-8">
          <h3 id={`${project.id}-title`} className="font-display text-2xl font-semibold sm:text-3xl">
            {project.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-fg">
            <span className="mr-2 font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
              Problem
            </span>
            {project.problem}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{project.description}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-chip border border-line-strong bg-raised/60 px-2.5 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
            {githubUrl && (
              <ActionLink
                primary
                href={githubUrl}
                label="View Source"
                icon={<Github className="size-4" aria-hidden="true" />}
              />
            )}
            {liveUrl && (
              <ActionLink
                primary
                href={liveUrl}
                label="Live Demo"
                icon={<ArrowUpRight className="size-4" aria-hidden="true" />}
              />
            )}
            {caseStudyUrl && (
              <ActionLink
                href={caseStudyUrl}
                label="Case Study"
                icon={<BookOpen className="size-4" aria-hidden="true" />}
              />
            )}
            {!hasActions && <p className="text-xs text-faint">Links have not been added for this project yet.</p>}
          </div>
        </div>
      </motion.article>
    </AnimatedSection>
  );
}
