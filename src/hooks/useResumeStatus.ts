import { useEffect, useState } from "react";

export type ResumeStatus = "checking" | "ready" | "missing";

const cache = new Map<string, Promise<boolean>>();

/**
 * Asks the server whether the resume URL really is a PDF.
 * (During development Vite answers a missing file with the HTML page, so a plain 200 is not enough.)
 * Only a definite "not a PDF" answer counts as missing; a network hiccup does not hide the button.
 */
function checkResume(url: string): Promise<boolean> {
  let result = cache.get(url);
  if (!result) {
    result = fetch(url, { method: "HEAD" })
      .then((response) => {
        const type = (response.headers.get("content-type") ?? "").toLowerCase();
        return response.ok && type.includes("pdf");
      })
      .catch(() => true);
    cache.set(url, result);
  }
  return result;
}

export function useResumeStatus(url: string): ResumeStatus {
  const [status, setStatus] = useState<ResumeStatus>("checking");

  useEffect(() => {
    let active = true;
    checkResume(url).then((ok) => {
      if (active) setStatus(ok ? "ready" : "missing");
    });
    return () => {
      active = false;
    };
  }, [url]);

  return status;
}
