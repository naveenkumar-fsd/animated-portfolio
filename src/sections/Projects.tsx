import { useState } from "react";
import { portfolio } from "../data/portfolio";
import AddProjectCard from "../components/AddProjectCard";
import AddProjectGuide from "../components/AddProjectGuide";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";

export default function Projects() {
  const [guideOpen, setGuideOpen] = useState(false);
  const { projects } = portfolio;

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad">
      <div className="container-page">
        <SectionHeading sectionId="projects" {...portfolio.sections.projects} />

        {/* One card per object in portfolio.projects. Nothing here needs editing when you add a project. */}
        <div className="grid grid-flow-dense gap-5 lg:grid-cols-2 lg:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
          <AddProjectCard onOpen={() => setGuideOpen(true)} delay={(projects.length % 2) * 0.08} />
        </div>
      </div>

      <AddProjectGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </section>
  );
}
