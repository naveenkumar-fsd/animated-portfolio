import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { useDialogA11y } from "../hooks/useDialogA11y";
import { easeOutExpo } from "../lib/motion";
import { buttonClass } from "../lib/ui";
import { mailtoHref } from "../lib/links";
import ResumeButton from "./ResumeButton";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeId: string;
}

function MenuPanel({ onClose, activeId }: Omit<MobileMenuProps, "open">) {
  const ref = useRef<HTMLDivElement>(null);
  useDialogA11y(ref, onClose);

  return (
    <motion.div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink/95 backdrop-blur-xl lg:hidden"
    >
      <div className="container-page flex h-16 shrink-0 items-center justify-between">
        <span className="font-display text-lg font-semibold">{portfolio.name}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-page flex flex-1 flex-col justify-center py-8">
        <ul>
          {portfolio.navLinks.map((link, index) => {
            const isActive = link.href === `#${activeId}`;
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + index * 0.05, duration: 0.5, ease: easeOutExpo }}
                className="border-b border-line"
              >
                <a
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex min-h-16 items-center justify-between font-display text-3xl font-medium ${
                    isActive ? "text-accent" : "text-fg"
                  }`}
                >
                  {link.label}
                  <span className="font-mono text-xs text-faint" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col gap-3">
          <a href={mailtoHref} onClick={onClose} className={buttonClass("primary", "md", "w-full")}>
            {portfolio.navCtaLabel}
          </a>
          <ResumeButton variant="secondary" className="w-full" />
        </div>
      </nav>
    </motion.div>
  );
}

/** Full-screen navigation for small screens. Mounted only while open so focus handling stays simple. */
export default function MobileMenu({ open, onClose, activeId }: MobileMenuProps) {
  return <AnimatePresence>{open && <MenuPanel onClose={onClose} activeId={activeId} />}</AnimatePresence>;
}
