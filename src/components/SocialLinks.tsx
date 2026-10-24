import { Github, Linkedin, Mail } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { externalLinkProps, linkTitle, mailtoHref } from "../lib/links";

const linkClass =
  "inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-raised/50 text-muted " +
  "transition-[color,border-color,background-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent/70 hover:text-fg";

/** Icon-only profile links. Each has an accessible name and the external ones open safely in a new tab. */
export default function SocialLinks({ className = "" }: { className?: string }) {
  const { github, linkedin } = portfolio.socialLinks;

  return (
    <ul className={`flex items-center gap-3 ${className}`} aria-label="Social profiles">
      <li>
        <a
          href={github}
          {...externalLinkProps}
          aria-label="GitHub profile (opens in a new tab)"
          title={linkTitle("GitHub", github)}
          className={linkClass}
        >
          <Github className="size-5" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a
          href={linkedin}
          {...externalLinkProps}
          aria-label="LinkedIn profile (opens in a new tab)"
          title={linkTitle("LinkedIn", linkedin)}
          className={linkClass}
        >
          <Linkedin className="size-5" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a href={mailtoHref} aria-label={`Email ${portfolio.email}`} title="Email" className={linkClass}>
          <Mail className="size-5" aria-hidden="true" />
        </a>
      </li>
    </ul>
  );
}
