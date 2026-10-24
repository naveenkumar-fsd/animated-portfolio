export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out-expo " +
  "active:scale-[0.97]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-ink hover:bg-white shadow-[0_10px_30px_-12px_rgb(124_108_255/0.9)]",
  secondary:
    "border border-line-strong bg-raised/60 text-fg hover:border-accent/70 hover:bg-raised",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-6 py-3 text-sm sm:text-base",
};

/** Tailwind classes shared by every button/link that looks like a button. */
export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = "",
): string {
  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(" ");
}
