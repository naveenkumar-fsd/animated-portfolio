import { useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, BookOpen, Github } from "lucide-react";
import type { Project } from "../types/portfolio";
import { accentColors } from "../lib/accents";
import { cleanUrl, externalLinkProps, linkTitle } from "../lib/links";
import { useTilt } from "../hooks/useTilt";
import AnimatedSection from "./AnimatedSection";
import ProjectVisual from "./ProjectVisual";

interface ProjectCardProps {
  project: Project;
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
    <motion.a
      href={href}
      {...externalLinkProps}
      title={linkTitle(label, href)}
      whileHover={{ y: -3, scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`relative inline-flex min-h-11 items-center gap-2 overflow-hidden rounded-full px-4 text-sm font-medium transition-[color,background-color,border-color] duration-300 ${
        primary
          ? "bg-fg/10 text-fg hover:bg-(--accent) hover:text-ink"
          : "border border-line-strong text-muted hover:border-(--accent) hover:text-fg"
      }`}
    >
      {icon}
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </motion.a>
  );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const { rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt(
    project.featured ? 3 : 5,
  );

  const githubUrl = cleanUrl(project.githubUrl);
  const liveUrl = cleanUrl(project.liveUrl);
  const caseStudyUrl = cleanUrl(project.caseStudyUrl);
  const hasActions = Boolean(githubUrl || liveUrl || caseStudyUrl);

  return (
    <AnimatedSection
      delay={(index % 2) * 0.1}
      className={project.featured ? "lg:col-span-2" : ""}
      style={{ "--accent": accentColors[project.accent] } as CSSProperties}
    >
      <motion.article
        aria-labelledby={`${project.id}-title`}
        onPointerMove={onPointerMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          onPointerLeave();
          setHovered(false);
        }}
        style={{ 
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformPerspective: 1100,
          transformStyle: "preserve-3d",
        }}
        whileHover={reduceMotion ? undefined : { y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className={`group surface relative flex h-full flex-col overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-[color-mix(in_oklab,var(--accent)_45%,transparent)] hover:shadow-[0_30px_80px_-40px_var(--accent)] focus-within:border-[color-mix(in_oklab,var(--accent)_45%,transparent)] ${
          project.featured ? "lg:flex-row" : ""
        }`}
      >
        {/* Animated accent border */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-30 h-px origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
        />

        {/* Cursor-following ambient glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--accent) 16%, transparent), transparent 65%)",
          }}
        />

        {/* Project visual */}
        <div
          className={`relative aspect-[16/9] shrink-0 overflow-hidden border-b border-line ${
            project.featured
              ? "lg:aspect-auto lg:min-h-80 lg:w-[46%] lg:border-b-0 lg:border-r"
              : ""
          }`}
        >
          <motion.div
            className="absolute inset-0"
            animate={
              reduceMotion
                ? undefined
                : { scale: hovered ? 1.055 : 1 }
            }
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <ProjectVisual name={project.visual} />
          </motion.div>

          {/* Image overlay */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/45 via-transparent to-black/10"
            animate={{ opacity: hovered ? 0.75 : 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Moving shine */}
          {!reduceMotion && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[2] block"
              initial={{ x: "-120%", opacity: 0 }}
              animate={
                hovered
                  ? { x: "120%", opacity: [0, 0.35, 0] }
                  : { x: "-120%", opacity: 0 }
              }
              transition={{ duration: 0.85, ease: "easeInOut" }}
              style={{
                background:
                  "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.16) 50%, transparent 65%)",
              }}
            />
          )}

          <span className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/45 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-white backdrop-blur-md">
            {project.category}
          </span>

          {project.featured && (
            <motion.span
              className="absolute right-4 top-4 z-10 rounded-full px-3 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-ink"
              style={{ backgroundColor: "var(--accent)" }}
              animate={
                reduceMotion
                  ? undefined
                  : { boxShadow: hovered
                    ? "0 0 24px color-mix(in oklab, var(--accent) 55%, transparent)"
                    : "0 0 0px transparent" }
              }
              transition={{ duration: 0.35 }}
            >
              Featured
            </motion.span>
          )}

          {/* Hover indicator */}
          <motion.div
            aria-hidden="true"
            className="absolute bottom-4 right-4 z-10 grid size-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md"
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              x: hovered ? 0 : 8,
              y: hovered ? 0 : 8,
              rotate: hovered ? 0 : -25,
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="size-5" />
          </motion.div>
        </div>

        {/* Project details */}
        <div className="relative z-20 flex flex-1 flex-col p-6 sm:p-8">
          <motion.h3
            id={`${project.id}-title`}
            className="font-display text-2xl font-semibold sm:text-3xl"
            animate={
              reduceMotion
                ? undefined
                : { x: hovered ? 3 : 0 }
            }
            transition={{ duration: 0.25 }}
          >
            {project.title}
          </motion.h3>

          <p className="mt-3 text-sm leading-relaxed text-fg">
            <span
              className="mr-2 font-mono text-xs uppercase tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              Problem
            </span>
            {project.problem}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {project.description}
          </p>

          {/* Technology chips */}
          <ul
            className="mt-5 flex flex-wrap gap-2"
            aria-label={`${project.title} technologies`}
          >
            {project.technologies.map((tech, techIndex) => (
              <motion.li
                key={tech}
                initial={false}
                animate={
                  hovered && !reduceMotion
                    ? { y: -2, borderColor: "var(--accent)" }
                    : { y: 0, borderColor: "var(--chip-border, currentColor)" }
                }
                transition={{
                  duration: 0.25,
                  delay: hovered ? techIndex * 0.035 : 0,
                }}
                className="rounded-chip border border-line-strong bg-raised/60 px-2.5 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </motion.li>
            ))}
          </ul>

          {/* Project links */}
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

            {!hasActions && (
              <p className="text-xs text-faint">
                Links have not been added for this project yet.
              </p>
            )}
          </div>
        </div>
      </motion.article>
    </AnimatedSection>
  );
}

