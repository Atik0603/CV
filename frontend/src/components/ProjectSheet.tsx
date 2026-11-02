import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, type PanInfo } from "motion/react";
import { LuX, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import type { Project } from "../types/project";
import "../styles/ProjectExpanded.css";
import "../styles/ProjectSheet.css";

const SWIPE_DISTANCE = 80;   // px dragged before it counts as a swipe
const SWIPE_VELOCITY = 500;  // px/s, a quick flick counts even if short

const spring = { type: "spring", stiffness: 320, damping: 34 } as const;

const paneVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0.6 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0.6 }),
};

interface ProjectSheetProps {
  projects: Project[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

function ProjectSheet({ projects, index, onIndexChange, onClose }: ProjectSheetProps) {
  const [direction, setDirection] = useState(0);
  const pushedRef = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Back button / back gesture closes the sheet
  useEffect(() => {
    if (!pushedRef.current) {
      window.history.pushState({ ...window.history.state, sheet: true }, "");
      pushedRef.current = true;
    }

    function onPopState() {
      onCloseRef.current();
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function requestClose() {
    window.history.back();
  }

  function paginate(dir: number) {
    const next = index + dir;
    if (next < 0 || next >= projects.length) return;
    setDirection(dir);
    onIndexChange(next);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) {
      paginate(1);
    } else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) {
      paginate(-1);
    }
  }

  const project = projects[index];
  if (!project) return null;

  const isFirst = index === 0;
  const isLast = index === projects.length - 1;

  return createPortal(
    <>
      <motion.div
        className="sheet-backdrop"
        onClick={requestClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={spring}
      >
        <div className="sheet-header">
          <button
            className="sheet-icon-btn"
            onClick={() => paginate(-1)}
            disabled={isFirst}
            aria-label="Previous project"
          >
            <LuChevronLeft size={18} />
          </button>
          <span className="sheet-position">
            {index + 1} / {projects.length}
          </span>
          <button
            className="sheet-icon-btn"
            onClick={() => paginate(1)}
            disabled={isLast}
            aria-label="Next project"
          >
            <LuChevronRight size={18} />
          </button>
          <button className="sheet-icon-btn sheet-close" onClick={requestClose} aria-label="Close">
            <LuX size={18} />
          </button>
        </div>

        <div className="sheet-body">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={project.id}
              className="sheet-pane"
              custom={direction}
              variants={paneVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={spring}
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: isLast ? 0.15 : 0.7, right: isFirst ? 0.15 : 0.7 }}
              onDragEnd={handleDragEnd}
              style={{ touchAction: "pan-y" }}
            >
              <h2 className="expanded-title">{project.name}</h2>

              <ul className="expanded-points">
                {project.longDescription.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              {project.mediaUrl &&
                (project.mediaType === "image" ? (
                  <img src={project.mediaUrl} alt={project.name} className="project-media" />
                ) : (
                  <video
                    src={project.mediaUrl}
                    className="project-media"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                ))}

              <div className="expanded-links">
                {project.links.map((link) => (
                  <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="link-pill">
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>,
    document.body
  );
}

export default ProjectSheet;