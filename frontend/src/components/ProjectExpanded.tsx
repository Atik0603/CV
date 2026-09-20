import { createPortal } from "react-dom";
import type { Project } from "../types/project";
import "../styles/ProjectExpanded.css";

interface ProjectExpandedProps {
  project: Project;
  isExpanded: boolean;
  onClose: () => void;
}

function ProjectExpanded({ project, isExpanded, onClose }: ProjectExpandedProps) {
  return createPortal(
    <div className={`overlay-backdrop ${isExpanded ? "open" : "closing"}`} onClick={onClose}>
      <div className={`expanded-panel ${isExpanded ? "open" : "closing"}`} onClick={(e) => e.stopPropagation()}>
        <h2 className="expanded-title">{project.name}</h2>

        <ul className="expanded-points">
          {project.longDescription.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>

        {project.mediaType === "image" ? (
          <img src={project.mediaUrl} alt={project.name} className="project-media" />
        ) : (
          <video src={project.mediaUrl} controls className="project-media" />
        )}

        <div className="expanded-links">
          {project.links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="link-pill">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ProjectExpanded;