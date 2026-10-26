import { motion, useReducedMotion } from "motion/react";
import type { ProjectVisualName } from "../types/portfolio";

/**
 * Decorative SVG artwork for project cards.
 * Existing artwork designs are preserved.
 */
function Artwork({ name }: { name: ProjectVisualName }) {
  switch (name) {
    case "bars":
      return (
        <>
          <line
            x1="20" y1="172" x2="300" y2="172"
            stroke="currentColor" strokeOpacity="0.3"
          />
          {[38, 62, 50, 88, 70, 112, 96, 136, 122].map((height, index) => (
            <motion.rect
              key={index}
              x={30 + index * 30}
              y={172 - height}
              width="16"
              height={height}
              rx="4"
              fill="currentColor"
              fillOpacity={0.16 + index * 0.06}
              initial={{ scaleY: 0.2, opacity: 0.35 }}
              animate={{ scaleY: [0.88, 1, 0.92], opacity: [0.55, 1, 0.7] }}
              transition={{
                duration: 2 + (index % 4) * 0.35,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: index * 0.08,
              }}
              style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
            />
          ))}
          <motion.path
            d="M30 140 C 70 118, 90 132, 120 100 S 190 92, 220 64 S 270 40, 292 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
          <motion.circle
            cx="292" cy="26" r="5" fill="currentColor"
            animate={{ r: [4, 6, 4], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      );

    case "waves":
      return (
        <>
          {[62, 90, 118, 146].map((y, index) => (
            <motion.path
              key={y}
              d={`M-10 ${y} C 50 ${y - 34}, 100 ${y + 34}, 160 ${y} S 270 ${y - 34}, 330 ${y}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5 - index * 0.4}
              strokeOpacity={1 - index * 0.2}
              strokeLinecap="round"
              animate={{ translateY: [0, index % 2 === 0 ? -5 : 5, 0] }}
              transition={{
                duration: 2.8 + index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          <motion.circle
            cx="160" cy="62" r="5" fill="currentColor"
            animate={{ r: [4, 7, 4], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="226" cy="118" r="3.5" fill="currentColor" fillOpacity="0.6"
            animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </>
      );

    case "nodes": {
      const points: Array<[number, number]> = [
        [160, 100],
        [80, 56],
        [66, 140],
        [248, 52],
        [260, 142],
        [170, 168],
      ];

      return (
        <>
          {points.slice(1).map(([x, y], index) => (
            <line
              key={index}
              x1="160" y1="100" x2={x} y2={y}
              stroke="currentColor" strokeOpacity="0.4"
            />
          ))}
          <line
            x1="80" y1="56" x2="66" y2="140"
            stroke="currentColor" strokeOpacity="0.2"
          />
          <line
            x1="248" y1="52" x2="260" y2="142"
            stroke="currentColor" strokeOpacity="0.2"
          />
          {points.slice(1).map(([x, y], index) => (
            <motion.circle
              key={index}
              cx={x} cy={y} r="8"
              fill="currentColor" fillOpacity="0.65"
              animate={{ opacity: [0.45, 1, 0.45], r: [6, 9, 6] }}
              transition={{
                duration: 2 + (index % 3) * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.18,
              }}
            />
          ))}
          <motion.circle
            cx="160" cy="100" r="26"
            fill="none" stroke="currentColor" strokeOpacity="0.45"
            animate={{ r: [24, 30, 24], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <circle cx="160" cy="100" r="13" fill="currentColor" />
        </>
      );
    }

    case "grid":
      return (
        <>
          {Array.from({ length: 12 }, (_, index) => {
            const col = index % 4;
            const row = Math.floor(index / 4);
            const filled = [0, 5, 6, 11].includes(index);

            return (
              <motion.rect
                key={index}
                x={34 + col * 66}
                y={30 + row * 46}
                width="54"
                height="34"
                rx="8"
                fill="currentColor"
                fillOpacity={filled ? 0.7 : 0.1}
                stroke="currentColor"
                strokeOpacity={filled ? 0 : 0.35}
                animate={
                  filled
                    ? { fillOpacity: [0.4, 0.85, 0.4] }
                    : { strokeOpacity: [0.15, 0.45, 0.15] }
                }
                transition={{
                  duration: 2.5 + (index % 3) * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.07,
                }}
              />
            );
          })}
          <path
            d="M214 120 l0 26 l7 -6 l5 11 l5 -2 l-5 -11 l9 0 z"
            fill="#fff"
            fillOpacity="0.9"
          />
        </>
      );

    case "orbit":
      return (
        <>
          <motion.circle
            cx="160" cy="100" r="28"
            fill="none" stroke="currentColor" strokeOpacity="0.5"
            animate={{ r: [25, 31, 25] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle
            cx="160" cy="100" r="58"
            fill="none" stroke="currentColor" strokeOpacity="0.3"
          />
          <motion.circle
            cx="160" cy="100" r="88"
            fill="none" stroke="currentColor" strokeOpacity="0.15"
            animate={{ r: [85, 91, 85] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="160" cy="100" r="9" fill="currentColor" />
          <motion.circle
            cx="218" cy="100" r="6" fill="currentColor"
            animate={{ cx: [218, 160, 102, 160, 218], cy: [100, 42, 100, 158, 100] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="98" cy="64" r="5" fill="currentColor" fillOpacity="0.7"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <circle
            cx="236" cy="150" r="4"
            fill="currentColor" fillOpacity="0.5"
          />
        </>
      );
  }
}

export default function ProjectVisual({ name }: { name: ProjectVisualName }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 isolate overflow-hidden"
      style={{
        color: "var(--accent)",
        background:
          "radial-gradient(120% 90% at 20% 0%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 62%), #0a0c13",
      }}
    >
      {/* Subtle background grid */}
      <div className="bg-grid absolute inset-0 opacity-70" />

      {/* Slow ambient light */}
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 16%, transparent), transparent)",
          }}
          animate={{
            x: ["-8%", "8%", "-8%"],
            y: ["-5%", "7%", "-5%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Animated SVG artwork */}
      <motion.svg
        viewBox="0 0 320 200"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={reduceMotion ? undefined : { scale: 1.04 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Artwork name={name} />
      </motion.svg>

      {/* Decorative scan line */}
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-px opacity-30"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
          animate={{ top: ["5%", "95%", "5%"] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
}

