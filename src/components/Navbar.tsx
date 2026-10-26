import { useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { Menu } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrolled } from "../hooks/useScrolled";
import { mailtoHref } from "../lib/links";
import { buttonClass } from "../lib/ui";
import MobileMenu from "./MobileMenu";
import ResumeButton from "./ResumeButton";

const sectionIds = portfolio.navLinks.map((link) =>
  link.href.replace("#", ""),
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(12);
  const activeId = useActiveSection(sectionIds);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled
            ? "border-line bg-ink/80 shadow-lg shadow-black/10 backdrop-blur-2xl"
            : "border-transparent bg-ink/10 backdrop-blur-sm"
        }`}
        initial={reduceMotion ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Subtle glow along the bottom edge */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-accent/40 to-transparent"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.35, 0.8, 0.35] }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container-page flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <motion.a
            href="#home"
            aria-label={`${portfolio.name}, back to top`}
            className="group flex items-center gap-3 rounded-full"
            whileHover={
              reduceMotion
                ? undefined
                : { x: 2 }
            }
            whileTap={
              reduceMotion
                ? undefined
                : { scale: 0.97 }
            }
          >
            <motion.span
              className="grid size-9 place-items-center rounded-xl border border-line-strong bg-raised font-display text-sm font-semibold text-accent"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      rotate: -7,
                      scale: 1.07,
                      borderColor: "rgba(154,140,255,0.8)",
                    }
              }
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 16,
              }}
            >
              {portfolio.monogram}
            </motion.span>

            <span className="hidden font-display text-base font-medium sm:inline">
              {portfolio.name}
            </span>
          </motion.a>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {portfolio.navLinks.map((link) => {
                const isActive = link.href === `#${activeId}`;

                return (
                  <li key={link.href}>
                    <motion.a
                      href={link.href}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                        isActive
                          ? "text-fg"
                          : "text-muted hover:text-fg"
                      }`}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -2 }
                      }
                      whileTap={
                        reduceMotion
                          ? undefined
                          : { scale: 0.96 }
                      }
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-raised"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      )}

                      {link.label}
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -2 }
                }
              >
                <ResumeButton
                  variant="ghost"
                  size="sm"
                  label="Resume"
                />
              </motion.div>

              <motion.a
                href={mailtoHref}
                className={`${buttonClass("primary", "sm")} group`}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -3,
                        scale: 1.035,
                      }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : { scale: 0.96 }
                }
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 18,
                }}
              >
                {portfolio.navCtaLabel}
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <motion.button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-raised/50 text-fg backdrop-blur-md lg:hidden"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.05,
                      borderColor: "rgba(154,140,255,0.7)",
                    }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.92 }
              }
            >
              <Menu className="size-5" aria-hidden="true" />
            </motion.button>
          </div>
        </div>

        {/* Reading progress */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-accent via-signal to-transparent"
        />
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={activeId}
      />
    </>
  );
}

