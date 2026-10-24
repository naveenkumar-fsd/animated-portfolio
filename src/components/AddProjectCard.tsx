import { Plus } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface AddProjectCardProps {
  onOpen: () => void;
  delay?: number;
}

/** The "+" tile at the end of the grid. It opens an instruction guide; it does not save anything. */
export default function AddProjectCard({ onOpen, delay = 0 }: AddProjectCardProps) {
  return (
    <AnimatedSection delay={delay} className="h-full">
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className="group relative flex h-full min-h-72 w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-card border border-dashed border-line-strong bg-surface/40 p-8 text-center transition-[border-color,background-color] duration-500 hover:border-accent/70 hover:bg-surface"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "radial-gradient(60% 60% at 50% 40%, rgb(154 140 255 / 0.14), transparent 70%)",
          }}
        />
        <span className="relative grid size-16 place-items-center rounded-full border border-line-strong bg-raised text-accent transition-[transform,border-color] duration-500 ease-out-expo group-hover:rotate-90 group-hover:border-accent/70">
          <Plus className="size-7" aria-hidden="true" />
        </span>
        <span className="relative">
          <span className="block font-display text-xl font-semibold">Add a project</span>
          <span className="mt-2 block max-w-56 text-sm leading-relaxed text-muted">
            See how to add your next build by editing one data file.
          </span>
        </span>
      </button>
    </AnimatedSection>
  );
}
