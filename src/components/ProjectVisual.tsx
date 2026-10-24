import type { ProjectVisualName } from "../types/portfolio";

/**
 * Thumbnail artwork drawn with inline SVG, so there are no image files to break.
 * Everything uses `currentColor`; the parent sets the colour from the project's accent.
 */
function Artwork({ name }: { name: ProjectVisualName }) {
  switch (name) {
    case "bars":
      return (
        <>
          <line x1="20" y1="172" x2="300" y2="172" stroke="currentColor" strokeOpacity="0.3" />
          {[38, 62, 50, 88, 70, 112, 96, 136, 122].map((height, index) => (
            <rect
              key={index}
              x={30 + index * 30}
              y={172 - height}
              width="16"
              height={height}
              rx="4"
              fill="currentColor"
              fillOpacity={0.16 + index * 0.06}
            />
          ))}
          <path
            d="M30 140 C 70 118, 90 132, 120 100 S 190 92, 220 64 S 270 40, 292 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="292" cy="26" r="5" fill="currentColor" />
        </>
      );
    case "waves":
      return (
        <>
          {[62, 90, 118, 146].map((y, index) => (
            <path
              key={y}
              d={`M-10 ${y} C 50 ${y - 34}, 100 ${y + 34}, 160 ${y} S 270 ${y - 34}, 330 ${y}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5 - index * 0.4}
              strokeOpacity={1 - index * 0.2}
              strokeLinecap="round"
            />
          ))}
          <circle cx="160" cy="62" r="5" fill="currentColor" />
          <circle cx="226" cy="118" r="3.5" fill="currentColor" fillOpacity="0.6" />
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
              x1="160"
              y1="100"
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.4"
            />
          ))}
          <line x1="80" y1="56" x2="66" y2="140" stroke="currentColor" strokeOpacity="0.2" />
          <line x1="248" y1="52" x2="260" y2="142" stroke="currentColor" strokeOpacity="0.2" />
          {points.slice(1).map(([x, y], index) => (
            <circle key={index} cx={x} cy={y} r="8" fill="currentColor" fillOpacity="0.55" />
          ))}
          <circle cx="160" cy="100" r="26" fill="none" stroke="currentColor" strokeOpacity="0.35" />
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
              <rect
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
              />
            );
          })}
          <path d="M214 120 l0 26 l7 -6 l5 11 l5 -2 l-5 -11 l9 0 z" fill="#fff" fillOpacity="0.9" />
        </>
      );
    case "orbit":
      return (
        <>
          <circle cx="160" cy="100" r="28" fill="none" stroke="currentColor" strokeOpacity="0.5" />
          <circle cx="160" cy="100" r="58" fill="none" stroke="currentColor" strokeOpacity="0.3" />
          <circle cx="160" cy="100" r="88" fill="none" stroke="currentColor" strokeOpacity="0.15" />
          <circle cx="160" cy="100" r="9" fill="currentColor" />
          <circle cx="218" cy="100" r="6" fill="currentColor" />
          <circle cx="98" cy="64" r="5" fill="currentColor" fillOpacity="0.7" />
          <circle cx="236" cy="150" r="4" fill="currentColor" fillOpacity="0.5" />
        </>
      );
  }
}

export default function ProjectVisual({ name }: { name: ProjectVisualName }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{
        color: "var(--accent)",
        background:
          "radial-gradient(120% 90% at 20% 0%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 62%), #0a0c13",
      }}
    >
      <div className="bg-grid absolute inset-0 opacity-70" />
      <svg
        viewBox="0 0 320 200"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
      >
        <Artwork name={name} />
      </svg>
    </div>
  );
}
