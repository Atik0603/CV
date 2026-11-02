import { useRef, useState, useEffect } from "react";
import type { Project } from "../types/project";
import "../styles/ProjectCarousel.css";

const GAP = 12; // must match the gap in ProjectCarousel.css

interface ProjectCarouselProps {
  projects: Project[];
  onOpen: (index: number) => void;
  focusIndex?: number | null;
}

function ProjectCarousel({ projects, onOpen, focusIndex }: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function cardStep() {
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + GAP : 1;
  }

  function handleScroll() {
    const el = trackRef.current;
    if (!el) return;

    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setActive(atEnd ? projects.length - 1 : Math.round(el.scrollLeft / cardStep()));
  }

  function scrollToIndex(index: number) {
    trackRef.current?.scrollTo({ left: index * cardStep(), behavior: "smooth" });
  }

  useEffect(() => {
    if (focusIndex == null) return;
    trackRef.current?.scrollTo({ left: focusIndex * cardStep(), behavior: "auto" });
    setActive(focusIndex);
  }, [focusIndex]);

  return (
    <div>
      <div className="carousel" ref={trackRef} onScroll={handleScroll}>
        {projects.map((project, index) => (
          <button
            key={project.id}
            className="carousel-card"
            style={{ backgroundColor: project.color || "var(--color-bg-elevated)" }}
            onClick={() => onOpen(index)}
          >
            <h3 className="carousel-card-title">{project.name}</h3>
            <p className="carousel-card-desc">{project.shortDescription}</p>
            <span className="carousel-card-hint">Open ↗</span>
          </button>
        ))}
      </div>

      <div className="carousel-dots">
        {projects.map((project, index) => (
          <button
            key={project.id}
            className={`carousel-dot ${index === active ? "active" : ""}`}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to ${project.name}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectCarousel;