import { portfolio } from "../data/portfolio";

/** Safe attributes for links that open another site in a new tab. */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

/** Build a correctly encoded mailto: URL. Spaces and line breaks in subject/body are escaped. */
export function buildMailto(email: string, subject?: string, body?: string): string {
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${email}${params.length > 0 ? `?${params.join("&")}` : ""}`;
}

/** The site-wide "email me" link, built from src/data/portfolio.ts */
export const mailtoHref = buildMailto(
  portfolio.email,
  portfolio.contact.emailSubject,
  portfolio.contact.emailBody,
);

/** True for the sample URLs shipped with the template (so we can warn instead of pretending they are real). */
export function isPlaceholderUrl(url: string): boolean {
  return /your-username|example\.(com|org|net)/i.test(url);
}

/** Tooltip text for a link: flags placeholders honestly. */
export function linkTitle(label: string, url: string): string {
  return isPlaceholderUrl(url)
    ? `${label}: placeholder URL, replace it in src/data/portfolio.ts`
    : label;
}

/** Returns the trimmed URL, or undefined when it is missing/blank (so the button can be hidden). */
export function cleanUrl(url?: string): string | undefined {
  const trimmed = url?.trim();
  return trimmed ? trimmed : undefined;
}
