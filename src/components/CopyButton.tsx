import { Check, Copy, TriangleAlert } from "lucide-react";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { buttonClass } from "../lib/ui";
import type { ButtonSize, ButtonVariant } from "../lib/ui";

interface CopyButtonProps {
  text: string;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** Copies `text` and reports the real outcome (copied or failed) to both sighted and screen-reader users. */
export default function CopyButton({ text, label, variant = "secondary", size = "md", className = "" }: CopyButtonProps) {
  const { status, copy } = useCopyToClipboard();

  const Icon = status === "copied" ? Check : status === "failed" ? TriangleAlert : Copy;
  const visibleLabel = status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : label;
  const announcement =
    status === "copied"
      ? "Copied to clipboard."
      : status === "failed"
        ? "Could not copy automatically. Please select the text and copy it manually."
        : "";

  return (
    <>
      <button type="button" onClick={() => copy(text)} className={buttonClass(variant, size, className)}>
        <Icon className="size-4" aria-hidden="true" />
        {visibleLabel}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </>
  );
}
