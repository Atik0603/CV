import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import "../styles/ProjectsSection.css";

function ProjectsSection() {
  return (
    <section className="projects-section">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={project.id}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;