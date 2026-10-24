import { Download, FileX2 } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { useResumeStatus } from "../hooks/useResumeStatus";
import { buttonClass } from "../lib/ui";
import type { ButtonSize, ButtonVariant } from "../lib/ui";

interface ResumeButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
  className?: string;
}

/**
 * Downloads the PDF at portfolio.resumeUrl.
 * If the file has not been added to public/ yet, it says so instead of offering a broken download.
 */
export default function ResumeButton({
  variant = "ghost",
  size = "md",
  label = "Download Resume",
  className = "",
}: ResumeButtonProps) {
  const status = useResumeStatus(portfolio.resumeUrl);

  if (status === "missing") {
    return (
      <button
        type="button"
        aria-disabled="true"
        title={`${portfolio.resumeUrl} was not found. Add your PDF to the public/ folder (see README.md).`}
        className={buttonClass(variant, size, `cursor-not-allowed opacity-60 ${className}`)}
      >
        <FileX2 className="size-4" aria-hidden="true" />
        Resume unavailable
        <span className="sr-only"> (no PDF has been added to this site yet)</span>
      </button>
    );
  }

  return (
    <a
      href={portfolio.resumeUrl}
      download={portfolio.resumeFileName}
      className={buttonClass(variant, size, className)}
    >
      <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
      {label}
    </a>
  );
}
