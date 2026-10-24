import { useCallback, useEffect, useRef, useState } from "react";

export type CopyStatus = "idle" | "copied" | "failed";

/**
 * Copies text with the Clipboard API. The status only becomes "copied" when the browser
 * actually accepted the write, so the UI never claims success on failure.
 */
export function useCopyToClipboard(resetAfterMs = 2400) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<number | undefined>(undefined);

  const copy = useCallback(
    async (text: string) => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error("Clipboard API not supported");
        await navigator.clipboard.writeText(text);
        setStatus("copied");
      } catch {
        setStatus("failed");
      }
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setStatus("idle"), resetAfterMs);
    },
    [resetAfterMs],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { status, copy };
}
