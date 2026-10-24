import { portfolio } from "../data/portfolio";
import ResumeButton from "./ResumeButton";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{portfolio.name}</p>
          <p className="mt-1 text-sm text-muted">
            {portfolio.role} · {portfolio.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {portfolio.navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-block py-1 transition-colors hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-wrap items-center gap-4">
          <ResumeButton variant="secondary" size="sm" label="Resume (PDF)" />
          <SocialLinks />
        </div>
      </div>

      <div className="border-t border-line">
        <p className="container-page py-5 text-xs leading-relaxed text-faint">
          © {new Date().getFullYear()} {portfolio.name}. {portfolio.footerNote}
        </p>
      </div>
    </footer>
  );
}
