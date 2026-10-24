import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { easeOutExpo, maskUp, riseIn, staggerParent } from "../lib/motion";
import { buttonClass } from "../lib/ui";
import ResumeButton from "../components/ResumeButton";

const { hero } = portfolio;

/** Splits the headline so the optional `highlight` phrase can be drawn in the accent gradient. */
function buildHeadlineWords() {
  const { headline, highlight } = hero;
  const start = highlight ? headline.indexOf(highlight) : -1;
  const parts =
    highlight && start >= 0
      ? [
          { text: headline.slice(0, start), accent: false },
          { text: highlight, accent: true },
          { text: headline.slice(start + highlight.length), accent: false },
        ]
      : [{ text: headline, accent: false }];

  return parts.flatMap((part) =>
    part.text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, accent: part.accent })),
  );
}

const headlineWords = buildHeadlineWords();

function RotatingPhrase() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const phrases = hero.rotatingPhrases;

  useEffect(() => {
    if (reduceMotion || phrases.length < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % phrases.length), 2800);
    return () => window.clearInterval(timer);
  }, [reduceMotion, phrases.length]);

  if (phrases.length === 0) return null;

  return (
    <p className="flex flex-wrap items-center gap-x-3 font-mono text-sm text-muted">
      <span className="text-faint">{hero.rotatingLabel}</span>
      {/* Fixed height so changing phrases never moves the content below */}
      <span className="relative block h-6 w-64 overflow-hidden text-fg sm:w-72">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={phrases[index]}
            className="absolute left-0 top-0 whitespace-nowrap leading-6"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}

/** Decorative orbit graphic: pure CSS, no images, no canvas. Hidden from assistive tech. */
function OrbitGraphic() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-md">
      {/* Core glow */}
      <div
        className="absolute inset-[22%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #cfc8ff 0%, #9a8cff 28%, #5b49e0 62%, #1c1750 100%)",
          boxShadow: "0 0 90px 10px rgb(124 108 255 / 0.45)",
        }}
      />
      <span className="absolute inset-0 grid place-items-center font-display text-4xl font-semibold text-ink/80 sm:text-5xl">
        {portfolio.monogram}
      </span>

      {/* Rings, each with a satellite */}
      <div className="absolute inset-[6%] animate-orbit rounded-full border border-line-strong">
        <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_16px_3px_rgb(79_216_230/0.7)]" />
      </div>
      <div className="absolute inset-[-6%] animate-orbit-reverse rounded-full border border-dashed border-line">
        <span className="absolute bottom-[14%] right-[10%] size-2.5 rounded-full bg-accent shadow-[0_0_14px_3px_rgb(154_140_255/0.7)]" />
      </div>
      <div className="absolute inset-[-24%] rounded-full border border-line opacity-60" />

      {/* Floating code card */}
      <div className="hero-code-card absolute -bottom-4 -right-2 w-56 animate-float rounded-2xl border p-4 font-mono text-[0.72rem] leading-relaxed backdrop-blur-xl sm:-right-6 sm:w-60">
        <div className="mb-2 flex gap-1.5">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </div>
        <p>
          <span className="text-accent">const</span> dev = {"{"}
        </p>
        <p className="pl-4">
          focus: <span className="text-signal">"full stack"</span>,
        </p>
        <p className="pl-4">
          ships: <span className="text-signal">"small & often"</span>,
        </p>
        <p className="pl-4">
          a11y: <span className="text-ok">true</span>,
        </p>
        <p>{"}"}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" aria-labelledby="home-title" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      {/* Background: grid + slowly drifting aurora (transform only) */}
      <div aria-hidden="true" className="bg-grid absolute inset-x-0 top-0 -z-10 h-[40rem]" />
      <div
        aria-hidden="true"
        className="absolute -right-[10%] top-[-10%] -z-10 h-[34rem] w-[34rem] animate-drift rounded-full"
        style={{ background: "radial-gradient(closest-side, rgb(124 108 255 / 0.28), transparent)" }}
      />

      <div className="container-page grid items-center gap-16 pb-20 lg:grid-cols-12 lg:gap-8 lg:pb-28">
        <motion.div
          className="lg:col-span-7"
          variants={staggerParent}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={riseIn}
            className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-raised/60 py-1.5 pl-3 pr-4 text-xs text-muted sm:text-sm"
          >
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${portfolio.availability.open ? "animate-ping-dot bg-ok" : "bg-faint"}`}
            />
            {portfolio.availability.label}
          </motion.p>

          <motion.p
  variants={riseIn}
  className="eyebrow mt-8 !text-xl sm:!text-3xl sm:tracking-[-0.035em]"
>
            {portfolio.name} — {hero.eyebrow}
          </motion.p>

          <h1
            id="home-title"
            className="mt-5 max-w-[15ch] text-balance font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.035em]"
          >
            {headlineWords.map(({ word, accent }, index) => (
              <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.12em] align-top">
                <motion.span
                  variants={maskUp}
                  className={`inline-block ${accent ? "text-gradient" : ""}`}
                >
                  {word}
                  {" "}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p variants={riseIn} className="text-copy mt-7 text-pretty text-muted">
            {hero.intro}
          </motion.p>

          <motion.div variants={riseIn} className="mt-6">
            <RotatingPhrase />
          </motion.div>

          <motion.div variants={riseIn} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#projects" className={buttonClass("primary")}>
              View Projects
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a href="#contact" className={buttonClass("secondary")}>
              <Mail className="size-4" aria-hidden="true" />
              Contact Me
            </a>
            <ResumeButton variant="ghost" />
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.3 }}
        >
          <OrbitGraphic />
        </motion.div>
      </div>
    </section>
  );
}
