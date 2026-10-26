import { motion, useReducedMotion } from "motion/react";
import { Mail, ArrowDown, Sparkles } from "lucide-react";
import { portfolio } from "../data/portfolio";
import AnimatedSection from "../components/AnimatedSection";
import CopyButton from "../components/CopyButton";
import ResumeButton from "../components/ResumeButton";
import SocialLinks from "../components/SocialLinks";
import { mailtoHref } from "../lib/links";
import { buttonClass } from "../lib/ui";

const { contact } = portfolio;

export default function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad">
      <div className="container-page">
        <AnimatedSection>
          <motion.div
            className="surface relative isolate overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20"
            whileHover={reduceMotion ? undefined : { borderColor: "rgba(154,140,255,0.4)" }}
            transition={{ duration: 0.4 }}
          >
            {/* Ambient animated glow */}
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-0 -z-10 h-80 w-[44rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgb(124 108 255 / 0.32), transparent)",
              }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [0.9, 1.15, 0.9],
                      opacity: [0.65, 1, 0.65],
                      x: ["-2%", "2%", "-2%"],
                    }
              }
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Background grid */}
            <div
              aria-hidden="true"
              className="bg-grid absolute inset-0 -z-10 opacity-60"
            />

            {/* Decorative sparkle */}
            <motion.div
              aria-hidden="true"
              className="absolute right-6 top-6 text-accent sm:right-10 sm:top-10"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.15, 1],
                      opacity: [0.5, 1, 0.5],
                    }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="size-5 sm:size-6" />
            </motion.div>

            <motion.p
              className="eyebrow"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              07 / Contact
            </motion.p>

            <motion.h2
              id="contact-title"
              className="mx-auto mt-4 max-w-3xl text-balance font-display text-[clamp(2.15rem,4.8vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.035em]"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              {contact.headline}
            </motion.h2>

            <motion.p
              className="text-copy mx-auto mt-6 text-pretty text-muted"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              {contact.text}
            </motion.p>

            {/* Contact actions */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.3 }}
            >
              <motion.a
                href={mailtoHref}
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.035 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className={buttonClass("primary")}
              >
                <Mail className="size-4" aria-hidden="true" />
                {contact.ctaLabel}
              </motion.a>

              <motion.div
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <CopyButton text={portfolio.email} label="Copy email" />
              </motion.div>

              <motion.div
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <ResumeButton variant="ghost" />
              </motion.div>
            </motion.div>

            {/* Email address */}
            <motion.p
              className="mt-7 font-mono text-sm text-muted transition-colors duration-300 hover:text-accent"
              whileHover={reduceMotion ? undefined : { scale: 1.025 }}
            >
              {portfolio.email}
            </motion.p>

            {/* Social links */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <SocialLinks />
            </motion.div>

            {/* Bottom decorative indicator */}
            <motion.div
              aria-hidden="true"
              className="mx-auto mt-10 flex justify-center text-faint"
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, 4, 0], opacity: [0.4, 0.9, 0.4] }
              }
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="size-4" />
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
