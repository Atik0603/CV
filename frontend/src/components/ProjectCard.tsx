import { useEffect, useRef, useState } from "react";
import type { Project } from "../types/project";
import "../styles/ProjectCard.css";
import ProjectExpanded from "./ProjectExpanded";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function openExpanded() {
    setShouldRender(true);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setIsExpanded(true);
    });
  });
  }

  function closeExpanded() {
    setIsExpanded(false);
    setTimeout(() => {
      setShouldRender(false);
    }, 200);
  }

  useEffect(() => {
    if (!isExpanded) return;
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        closeExpanded();
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <>
      <div
        className="card-container"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <div
          ref={cardRef}
          className={`card-inner ${isFlipped || isExpanded ? "flipped" : ""}`}
        >
          <div
            className="card-front"
            style={{ backgroundColor: project.color || "var(--color-bg-elevated)" }}
          >
            <h3>{project.name}</h3>
          </div>
          <div className="card-back" onClick={openExpanded}>
            <p>{project.shortDescription}</p>
            <span className="expand-hint">Click to expand</span>
          </div>
        </div>
      </div>

      {shouldRender && (
        <ProjectExpanded
          project={project}
          isExpanded={isExpanded}
          onClose={closeExpanded}
        />
      )}
    </>
  );
}

export default ProjectCard;