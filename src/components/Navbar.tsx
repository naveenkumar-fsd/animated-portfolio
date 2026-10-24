import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Menu } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrolled } from "../hooks/useScrolled";
import { mailtoHref } from "../lib/links";
import { buttonClass } from "../lib/ui";
import MobileMenu from "./MobileMenu";
import ResumeButton from "./ResumeButton";

const sectionIds = portfolio.navLinks.map((link) => link.href.replace("#", ""));

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(12);
  const activeId = useActiveSection(sectionIds);

  // Thin reading-progress line along the bottom of the bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <a
            href="#home"
            aria-label={`${portfolio.name}, back to top`}
            className="group flex items-center gap-3 rounded-full"
          >
            <span className="grid size-9 place-items-center rounded-xl border border-line-strong bg-raised font-display text-sm font-semibold text-accent transition-colors duration-300 group-hover:border-accent/70">
              {portfolio.monogram}
            </span>
            <span className="hidden font-display text-base font-medium sm:inline">{portfolio.name}</span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {portfolio.navLinks.map((link) => {
                const isActive = link.href === `#${activeId}`;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                        isActive ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-raised"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Desktop only. The wrapper hides them, because button classes already set display. */}
            <div className="hidden items-center gap-2 lg:flex">
              <ResumeButton variant="ghost" size="sm" label="Resume" />
              <a href={mailtoHref} className={buttonClass("primary", "sm")}>
                {portfolio.navCtaLabel}
              </a>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-linear-to-r from-accent via-signal to-transparent"
        />
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeId={activeId} />
    </>
  );
}
