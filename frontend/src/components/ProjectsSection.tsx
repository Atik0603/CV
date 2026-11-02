import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import ProjectCarousel from "./ProjectCarousel";
import ProjectExpanded from "./ProjectExpanded";
import { useProjects } from "../hooks/useProjects";
import { useIsMobile } from "../hooks/useMediaQuery";
import "../styles/ProjectsSection.css";
import { AnimatePresence } from "motion/react";
import ProjectSheet from "./ProjectSheet";
import { useSheetOpen } from "../hooks/useSheetOpen";
import "../styles/ProjectsSection.css";

function ProjectsSection() {
  const projects = useProjects();
  const isMobile = useIsMobile();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useSheetOpen(openIndex !== null);


  if (isMobile) {
    return (
      <section className="projects-section">
        <div className="projects-header">
          <h2 className="projects-title">Projects</h2>
          <Link to="/projects" className="projects-see-all">See all →</Link>
        </div>

      <ProjectCarousel projects={projects} onOpen={setOpenIndex} focusIndex={openIndex}/>

       <AnimatePresence>
          {openIndex !== null && (
            <ProjectSheet
              key="sheet"
              projects={projects}
              index={openIndex}
              onIndexChange={setOpenIndex}
              onClose={() => setOpenIndex(null)}
            />
          )}
        </AnimatePresence>
      </section>
    );
  }

  return (
    <section className="projects-section">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={project.id} style={{ animationDelay: `${index * 0.1}s` }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;