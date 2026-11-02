import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import BackgroundPattern from "../components/BackgroundPattern";
import BackToTop from "../components/BackToTop";
import { useProfile } from "../hooks/useProfile";
import { useProjects } from "../hooks/useProjects";
import { useIsMobile } from "../hooks/useMediaQuery";
import "../styles/App.css";
import "../styles/Mobile.css";
import "../styles/ProjectsPage.css";
import { AnimatePresence } from "motion/react";
import ProjectSheet from "../components/ProjectSheet";
import { useSheetOpen } from "../hooks/useSheetOpen";

function ProjectsPage() {
  const profile = useProfile();
  const projects = useProjects();
  const isMobile = useIsMobile();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useSheetOpen(openIndex !== null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!isMobile) return <Navigate to="/" replace />;

  return (
    <div className="app-wrapper">
      <BackgroundPattern />
      <TopBar profile={profile} backTo="/" />

      <main className="projects-page">
        <h2 className="projects-title">All projects</h2>

        <ul className="projects-page-list">
          {projects.map((project, index) => (
            <li key={project.id}>
              <button className="projects-page-row" onClick={() => setOpenIndex(index)}>
                <span
                  className="projects-page-swatch"
                  style={{ backgroundColor: project.color || "var(--color-bg-elevated)" }}
                />
                <span className="projects-page-text">
                  <span className="projects-page-name">{project.name}</span>
                  <span className="projects-page-desc">{project.shortDescription}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
      <BackToTop />

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
    </div>
  );
}

export default ProjectsPage;