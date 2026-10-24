import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Info, X } from "lucide-react";
import type { Project } from "../types/portfolio";
import { useDialogA11y } from "../hooks/useDialogA11y";
import { easeOutExpo } from "../lib/motion";
import CopyButton from "./CopyButton";

const DATA_FILE = "src/data/portfolio.ts";

/** Typed against Project, so this example stops compiling if the Project type changes and this is not updated. */
const exampleProject: Project = {
  id: "my-new-project",
  title: "My New Project",
  problem: "One sentence about the problem it solves.",
  description: "Two sentences about what you built and how it works.",
  technologies: ["React", "TypeScript"],
  category: "Web Application",
  featured: false,
  visual: "grid",
  accent: "violet",
  githubUrl: "https://github.com/YOUR-USERNAME/my-new-project",
  liveUrl: "https://my-new-project.vercel.app",
};

const exampleSnippet = `${JSON.stringify(exampleProject, null, 2)},`;

const publishCommands = `npm run dev            # preview it locally first
git add .
git commit -m "Add project: My New Project"
git push               # Vercel redeploys automatically`;

const fields: Array<[string, string]> = [
  ["id", "Unique, lowercase-with-dashes. Never reuse one."],
  ["title, problem, description", "The text shown on the card."],
  ["technologies", "A list of labels, e.g. [\"React\", \"Java\"]."],
  ["category", "Small label on the thumbnail."],
  ["featured", "true = wide card with a bigger thumbnail."],
  ["visual", "bars, waves, nodes, grid or orbit (built-in artwork)."],
  ["accent", "violet, cyan, mint, amber or rose."],
  ["githubUrl", "Your repository. Remove the line to hide View Source."],
  ["liveUrl", "Your deployed site. Remove the line to hide Live Demo."],
  ["caseStudyUrl", "Optional write-up link. Remove the line to hide it."],
];

function GuidePanel({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useDialogA11y(ref, onClose);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Click-away backdrop (keyboard users close with Escape or the Close button) */}
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-project-title"
        aria-describedby="add-project-desc"
        tabIndex={-1}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.45, ease: easeOutExpo }}
        className="surface relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-b-none border-line-strong bg-raised shadow-2xl sm:rounded-b-card"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
          <div>
            <p className="eyebrow">How to</p>
            <h2 id="add-project-title" className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              Add a project
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close guide"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:text-fg"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-7 overflow-y-auto p-5 sm:p-6">
          <p
            id="add-project-desc"
            className="flex gap-3 rounded-xl border border-line-strong bg-ink/60 p-4 text-sm leading-relaxed text-muted"
          >
            <Info className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden="true" />
            <span>
              <strong className="font-medium text-fg">This is a guide, not a form.</strong> Nothing you do in the
              browser is saved. Projects are plain data in your code; once you add one there and reload, the card
              appears automatically.
            </span>
          </p>

          <ol className="space-y-7">
            <li>
              <h3 className="font-display text-lg font-semibold">1. Open the data file</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                In VS Code open{" "}
                <code className="rounded bg-ink px-1.5 py-0.5 font-mono text-[0.8rem] text-signal">{DATA_FILE}</code>{" "}
                and find the <code className="font-mono text-[0.8rem] text-signal">projects</code> array.
              </p>
            </li>

            <li>
              <h3 className="font-display text-lg font-semibold">2. Paste a new object into that array</h3>
              <div className="mt-3 overflow-hidden rounded-xl border border-line bg-ink">
                <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2">
                  <span className="font-mono text-xs text-faint">{DATA_FILE}</span>
                  <CopyButton text={exampleSnippet} label="Copy example" variant="ghost" size="sm" />
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-[0.78rem] leading-relaxed text-muted" tabIndex={0}>
                  <code>{exampleSnippet}</code>
                </pre>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                {fields.map(([name, help]) => (
                  <div key={name} className="grid gap-x-4 sm:grid-cols-[11rem_1fr]">
                    <dt className="font-mono text-xs text-accent">{name}</dt>
                    <dd className="text-muted">{help}</dd>
                  </div>
                ))}
              </dl>
            </li>

            <li>
              <h3 className="font-display text-lg font-semibold">3. Replace the placeholder URLs</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Put your real repository in <code className="font-mono text-[0.8rem] text-signal">githubUrl</code> and
                your deployed site in <code className="font-mono text-[0.8rem] text-signal">liveUrl</code>. Give the
                project an <code className="font-mono text-[0.8rem] text-signal">id</code> nobody else uses.
              </p>
            </li>

            <li>
              <h3 className="font-display text-lg font-semibold">4. Save, test and publish</h3>
              <div className="mt-3 overflow-hidden rounded-xl border border-line bg-ink">
                <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2">
                  <span className="font-mono text-xs text-faint">terminal</span>
                  <CopyButton text={publishCommands} label="Copy commands" variant="ghost" size="sm" />
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-[0.78rem] leading-relaxed text-muted" tabIndex={0}>
                  <code>{publishCommands}</code>
                </pre>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-faint">
                Full walkthrough, including GitHub and Vercel setup, is in README.md.
              </p>
            </li>
          </ol>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AddProjectGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <GuidePanel onClose={onClose} />}</AnimatePresence>;
}
