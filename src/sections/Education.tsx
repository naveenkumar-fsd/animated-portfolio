import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { portfolio } from "../data/portfolio";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeading from "../components/SectionHeading";
import { cleanUrl, externalLinkProps, linkTitle } from "../lib/links";

export default function Education() {
  const { education, certifications } = portfolio;
  // Optional section: leave both arrays empty in the data file and it disappears.
  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <section id="education" aria-labelledby="education-title" className="section-pad">
      <div className="container-page">
        <SectionHeading sectionId="education" {...portfolio.sections.education} />

        <div className="grid gap-5 md:grid-cols-2">
          {education.length > 0 && (
            <AnimatedSection className="surface p-6 sm:p-8">
              <h3 className="flex items-center gap-3 font-display text-xl font-semibold">
                <GraduationCap className="size-5 text-accent" aria-hidden="true" />
                Education
              </h3>
              <ul className="mt-6 space-y-6">
                {education.map((entry) => (
                  <li key={entry.id}>
                    <p className="font-medium text-fg">{entry.degree}</p>
                    <p className="mt-1 text-sm text-muted">{entry.institution}</p>
                    <p className="mt-1 font-mono text-xs text-signal">{entry.period}</p>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          )}

          {certifications.length > 0 && (
            <AnimatedSection delay={0.08} className="surface p-6 sm:p-8">
              <h3 className="flex items-center gap-3 font-display text-xl font-semibold">
                <Award className="size-5 text-accent" aria-hidden="true" />
                Certifications
              </h3>
              <ul className="mt-6 space-y-6">
                {certifications.map((cert) => {
                  const url = cleanUrl(cert.url);
                  return (
                    <li key={cert.id}>
                      <p className="font-medium text-fg">{cert.title}</p>
                      <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                        <p className="font-mono text-xs text-signal">{cert.year}</p>
                        {/* Only shown when a real link was provided */}
                        {url && (
                          <a
                            href={url}
                            {...externalLinkProps}
                            title={linkTitle("View credential", url)}
                            className="inline-flex items-center gap-1.5 py-1 text-xs text-accent underline-offset-4 hover:underline"
                          >
                            View credential
                            <ExternalLink className="size-3" aria-hidden="true" />
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
