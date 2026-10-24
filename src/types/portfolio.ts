/**
 * Types for everything in src/data/portfolio.ts.
 * If you add a new field to a type here, TypeScript will tell you which data entries need updating.
 */

/** Colour themes available to a project card. Hex values live in src/lib/accents.ts */
export type AccentName = "violet" | "cyan" | "mint" | "amber" | "rose";

/** Built-in CSS/SVG artwork used as a project thumbnail (no image files needed). */
export type ProjectVisualName = "bars" | "waves" | "nodes" | "grid" | "orbit";

export type SkillIconName = "layout" | "server" | "database" | "wrench";
export type ProcessIconName = "search" | "map" | "code" | "rocket";

export interface NavLink {
  label: string;
  /** Must match a section id, e.g. "#about" */
  href: string;
}

export interface Availability {
  open: boolean;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  /** Optional phrase inside `headline` to show in the gradient accent */
  highlight?: string;
  intro: string;
  rotatingLabel: string;
  rotatingPhrases: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface AboutContent {
  bio: string[];
  strengths: string[];
  philosophy: string;
  enjoyBuilding: string[];
  stats: Stat[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: SkillIconName;
  items: string[];
}

export interface Project {
  /** Unique and stable: used as the React key. Use lowercase-with-dashes. */
  id: string;
  title: string;
  /** One-line problem statement */
  problem: string;
  description: string;
  technologies: string[];
  category: string;
  /** Featured projects get a wider card with a larger visual */
  featured: boolean;
  visual: ProjectVisualName;
  accent: AccentName;
  /** Optional: leave out (or "") to hide the View Source button */
  githubUrl?: string;
  /** Optional: leave out (or "") to hide the Live Demo button */
  liveUrl?: string;
  /** Optional: leave out (or "") to hide the Case Study link */
  caseStudyUrl?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  type: string;
  period: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  /** Optional: only add a real verification link. Leave out to hide the button. */
  url?: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: ProcessIconName;
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  intro?: string;
}

export interface ContactContent {
  headline: string;
  text: string;
  ctaLabel: string;
  /** Pre-filled subject for the mailto: link */
  emailSubject: string;
  /** Pre-filled body for the mailto: link */
  emailBody: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
}

export interface Portfolio {
  name: string;
  /** Two letters shown in the logo mark */
  monogram: string;
  role: string;
  location: string;
  email: string;
  resumeUrl: string;
  resumeFileName: string;
  availability: Availability;
  socialLinks: SocialLinks;
  navLinks: NavLink[];
  navCtaLabel: string;
  hero: HeroContent;
  about: AboutContent;
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications: Certification[];
  process: ProcessStep[];
  contact: ContactContent;
  sections: {
    about: SectionCopy;
    skills: SectionCopy;
    projects: SectionCopy;
    experience: SectionCopy;
    education: SectionCopy;
    process: SectionCopy;
  };
  footerNote: string;
}
