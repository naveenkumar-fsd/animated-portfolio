import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { easeOutExpo, riseIn, staggerParent } from "../lib/motion";
import { buttonClass } from "../lib/ui";
import ResumeButton from "../components/ResumeButton";

const { hero } = portfolio;

function RotatingPhrase() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const phrases = hero.rotatingPhrases;

  useEffect(() => {
    if (reduceMotion || phrases.length < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [reduceMotion, phrases.length]);

  if (phrases.length === 0) return null;

  return (
    <p className="flex min-h-6 flex-wrap items-center gap-x-3 text-sm text-muted">
      <span className="text-faint">{hero.rotatingLabel}</span>

      <span className="relative block h-6 w-64 overflow-hidden sm:w-72">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phrases[index]}
            className="absolute inset-0 whitespace-nowrap leading-6 text-fg"
            initial={reduceMotion ? false : { y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: -18, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}

function DeveloperVisual() {
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 80,
    damping: 20,
  });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();

    pointerX.set(
      (event.clientX - bounds.left - bounds.width / 2) / 28,
    );

    pointerY.set(
      (event.clientY - bounds.top - bounds.height / 2) / 28,
    );
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[620px] [perspective:1000px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      {/* Ambient purple and cyan lighting */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,108,255,0.3), rgba(79,216,230,0.09) 45%, transparent 72%)",
          x: reduceMotion ? 0 : smoothX,
          y: reduceMotion ? 0 : smoothY,
        }}
      />

      {/* Main workspace image */}
      <motion.div
        className="relative"
        style={{
          x: reduceMotion ? 0 : smoothX,
          rotateX: reduceMotion ? 0 : smoothY,
          rotateY: reduceMotion ? 0 : smoothX,
          transformPerspective: 1000,
        }}
      >
        <motion.div
          className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d0f16] shadow-2xl shadow-violet-950/40"
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -4, 0] }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src="/images/developer-workspace.png"
            alt="A developer coding at a computer in a modern, neon-lit workspace"
            className="block aspect-[4/3] h-auto w-full object-cover"
            fetchPriority="high"
          />

          {/* Blend the image with the dark website background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(7,8,12,0.25), transparent 48%), linear-gradient(0deg, rgba(7,8,12,0.4), transparent 38%), linear-gradient(180deg, rgba(7,8,12,0.12), transparent 24%)",
            }}
          />

          {/* Animated light sweep */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-y-1/2 left-[-65%] w-1/3 rotate-[18deg] bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
            animate={
              reduceMotion
                ? undefined
                : { left: ["-65%", "135%"] }
            }
            transition={{
              duration: 9,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />

          {/* Bottom ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-violet-950/30 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Floating technology panel */}
      <motion.div
        className="absolute left-2 top-[7%] z-20 rounded-xl border border-white/15 bg-[#10111b]/90 px-3 py-3 shadow-xl shadow-violet-950/20 backdrop-blur-xl sm:left-4 sm:px-4"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -6, 0] }
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          x: reduceMotion ? 0 : smoothX,
        }}
      >
        <p className="mb-2 text-[9px] tracking-[0.16em] text-white/45">
          TECH STACK
        </p>

        <div className="flex max-w-44 flex-wrap gap-1.5 sm:max-w-48">
          {["Java", "Spring Boot", "React", "MySQL"].map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-violet-300/20 bg-violet-400/10 px-2 py-1 text-[10px] text-white/90 sm:text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Floating developer status */}
      <motion.div
        className="absolute bottom-[7%] right-2 z-20 rounded-xl border border-white/15 bg-[#10111b]/90 px-3 py-3 shadow-xl shadow-violet-950/20 backdrop-blur-xl sm:right-4 sm:px-4"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, 5, 0] }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          x: reduceMotion ? 0 : smoothX,
        }}
      >
        <p className="flex items-center gap-2 text-[10px] text-white/90 sm:text-xs">
          <motion.span
            className="size-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.7)]"
            animate={
              reduceMotion
                ? undefined
                : { opacity: [1, 0.45, 1] }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          Building something new
        </p>
      </motion.div>

      {/* Floating cyan light */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 top-[24%] size-2.5 rounded-full bg-cyan-300 shadow-[0_0_22px_6px_rgba(103,232,249,0.4)]"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8],
              }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate overflow-hidden pt-28 sm:pt-32"
    >
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem]"
        style={{
          background:
            "radial-gradient(ellipse at 78% 25%, rgba(112,90,240,0.16), transparent 40%), radial-gradient(ellipse at 8% 70%, rgba(58,188,209,0.06), transparent 34%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 -z-10 size-[30rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(124,108,255,0.12), transparent 68%)",
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -35, 0],
                y: [0, 25, 0],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container-page grid items-center gap-14 pb-20 lg:grid-cols-12 lg:gap-8 lg:pb-28">
        {/* Left: hero content */}
        <motion.div
          className="relative z-10 lg:col-span-7"
          variants={staggerParent}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
        >
          <motion.p
            variants={riseIn}
            className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-raised/70 py-2 pl-3 pr-4 text-xs text-muted backdrop-blur-md sm:text-sm"
          >
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${
                portfolio.availability.open
                  ? "animate-ping-dot bg-ok"
                  : "bg-faint"
              }`}
            />

            {portfolio.availability.label}
          </motion.p>

          <motion.p
            variants={riseIn}
            className="eyebrow mt-8 !text-base sm:!text-lg"
          >
            {portfolio.name} — {hero.eyebrow}
          </motion.p>

          <motion.h1
            id="home-title"
            variants={riseIn}
            className="mt-5 max-w-[13ch] text-balance font-display text-[clamp(2.7rem,5.5vw,5rem)] font-semibold leading-[1.04] tracking-[-0.055em]"
          >
            {hero.headline
              .split(hero.highlight || "\u0000")
              .map((part, index, parts) => (
                <span key={`${part}-${index}`}>
                  {part}

                  {index < parts.length - 1 && hero.highlight && (
                    <span className="text-gradient">
                      {hero.highlight}
                    </span>
                  )}
                </span>
              ))}
          </motion.h1>

          <motion.p
            variants={riseIn}
            className="text-copy mt-7 max-w-[42rem] text-pretty text-muted"
          >
            {hero.intro}
          </motion.p>

          <motion.div variants={riseIn} className="mt-6">
            <RotatingPhrase />
          </motion.div>

          {/* Action buttons */}
          <motion.div
            variants={riseIn}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <motion.a
              href="#projects"
              className={`${buttonClass("primary")} group`}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -3, scale: 1.025 }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.97 }
              }
              transition={{ duration: 0.2 }}
            >
              View Projects

              <ArrowDown
                className="size-4 transition-transform duration-300 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </motion.a>

            <motion.a
              href="#contact"
              className={`${buttonClass("secondary")} group`}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -3 }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.97 }
              }
              transition={{ duration: 0.2 }}
            >
              <Mail className="size-4" aria-hidden="true" />

              Contact Me

              <ArrowUpRight
                className="size-4 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </motion.a>

            <ResumeButton variant="ghost" />
          </motion.div>

          {/* Technology signature */}
          <motion.div
            variants={riseIn}
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-faint"
          >
            <span>BUILDING WITH</span>

            <span className="h-3 w-px bg-line-strong" />

            {["Java", "Spring Boot", "React", "MySQL"].map((tech) => (
              <span
                key={tech}
                className="text-muted transition-colors duration-200 hover:text-fg"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: animated developer workspace */}
        <motion.div
          className="relative lg:col-span-5"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 24, scale: 0.96 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            ease: easeOutExpo,
            delay: reduceMotion ? 0 : 0.2,
          }}
        >
          <DeveloperVisual />
        </motion.div>
      </div>
    </section>
  );
}

