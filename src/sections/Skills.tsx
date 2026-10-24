import { portfolio } from "../data/portfolio";
import SectionHeading from "../components/SectionHeading";
import SkillGroup from "../components/SkillGroup";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad">
      <div className="container-page">
        <SectionHeading sectionId="skills" {...portfolio.sections.skills} />
        <div className="grid gap-5 md:grid-cols-2">
          {portfolio.skills.map((category, index) => (
            <SkillGroup key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
