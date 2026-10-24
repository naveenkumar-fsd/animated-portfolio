import { Mail } from "lucide-react";
import { portfolio } from "../data/portfolio";
import AnimatedSection from "../components/AnimatedSection";
import CopyButton from "../components/CopyButton";
import ResumeButton from "../components/ResumeButton";
import SocialLinks from "../components/SocialLinks";
import { mailtoHref } from "../lib/links";
import { buttonClass } from "../lib/ui";

const { contact } = portfolio;

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad">
      <div className="container-page">
        <AnimatedSection>
          <div className="surface relative isolate overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 -z-10 h-80 w-[44rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgb(124 108 255 / 0.32), transparent)" }}
            />
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-60" />

            <p className="eyebrow">07 / Contact</p>
            <h2
              id="contact-title"
              className="mx-auto mt-4 max-w-3xl text-balance font-display text-[clamp(2.15rem,4.8vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.035em]"
            >
              {contact.headline}
            </h2>
            <p className="text-copy mx-auto mt-6 text-pretty text-muted">
              {contact.text}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {/* mailto: opens the visitor's email app. Nothing is sent from this page. */}
              <a href={mailtoHref} className={buttonClass("primary")}>
                <Mail className="size-4" aria-hidden="true" />
                {contact.ctaLabel}
              </a>
              <CopyButton text={portfolio.email} label="Copy email" />
              <ResumeButton variant="ghost" />
            </div>

            <p className="mt-6 font-mono text-sm text-muted">{portfolio.email}</p>

            <div className="mt-8 flex justify-center">
              <SocialLinks />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
