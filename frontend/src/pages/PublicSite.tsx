import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import BackgroundPattern from "../components/BackgroundPattern";
import "../styles/App.css";

function PublicSite() {
  return (
    <div className="app-wrapper">
      <BackgroundPattern />
      <TopBar />
      <div className="app-layout">
        <div className="hero-half">
          <Hero />
        </div>
        <div className="projects-half">
          <ProjectsSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PublicSite;