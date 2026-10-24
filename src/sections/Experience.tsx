import { portfolio } from "../data/portfolio";
import ExperienceTimeline from "../components/ExperienceTimeline";
import SectionHeading from "../components/SectionHeading";

export default function Experience() {
  if (portfolio.experience.length === 0) return null;

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad">
      <div className="container-page">
        <SectionHeading sectionId="experience" {...portfolio.sections.experience} />
        <ExperienceTimeline entries={portfolio.experience} />
      </div>
    </section>
  );
}
