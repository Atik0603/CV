import ProjectCard from "./ProjectCard";
//import { projects } from "../data/projects";
import { useState, useEffect } from "react";
import "../styles/ProjectsSection.css";
import type { Project } from "../types/project";

function mapApiProject(apiProject: any): Project {
  return {
    id: apiProject.id,
    name: apiProject.name,
    shortDescription: apiProject.short_description,
    longDescription: apiProject.long_description,
    mediaUrl: apiProject.media_url,
    mediaType: apiProject.media_type,
    color: apiProject.color,
    links: apiProject.links.map((link: any) => ({
      label: link.label,
      url: link.url,
    })),
  };
}


function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/projects/")
      .then((res) => res.json())
      .then((data) => setProjects(data.map(mapApiProject)));
  }, []);
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