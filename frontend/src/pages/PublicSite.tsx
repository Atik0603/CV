import { useRef } from "react";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import ProjectsSection from "../components/ProjectsSection";
import BackgroundPattern from "../components/BackgroundPattern";
import BackToTop from "../components/BackToTop";
import { useProfile } from "../hooks/useProfile";
import { useWheelForwarding } from "../hooks/useWheelForwarding";
import { useCanScrollDown } from "../hooks/useCanScrollDown";
import { useIsMobile } from "../hooks/useMediaQuery";
import "../styles/App.css";
import "../styles/Mobile.css";

function PublicSite() {
  const profile = useProfile();
  const isMobile = useIsMobile();
  const projectsRef = useRef<HTMLDivElement>(null);

  useWheelForwarding(projectsRef, !isMobile);
  const canScrollDown = useCanScrollDown(projectsRef);

  function scrollProjects() {
    projectsRef.current?.scrollBy({ top: 300, behavior: "smooth" });
  }

  return (
    <div className="app-wrapper">
      <BackgroundPattern />
      <TopBar profile={profile} />

      <div className="app-layout">
        <div className="hero-half">
          <Hero profile={profile} />
        </div>

        <div className="projects-half" ref={projectsRef}>
          <ProjectsSection />
        </div>

        {isMobile && (
          <section id="skills" className="mobile-skills">
            <h2 className="projects-title">Skills</h2>
            <Skills />
          </section>
        )}

        {!isMobile && (
          <button
            className={`scroll-hint ${canScrollDown ? "visible" : ""}`}
            onClick={scrollProjects}
            aria-label="Scroll to more projects"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}
      </div>

      <Footer />
      {isMobile && <BackToTop />}
    </div>
  );
}

export default PublicSite;