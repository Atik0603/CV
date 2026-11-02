import "../styles/Hero.css";
import Skills from "./Skills";
import { API_BASE } from "../utils/api";
import type { Profile } from "../types/profile";
import { useIsMobile } from "../hooks/useMediaQuery";
import { Link } from "react-router-dom";

interface HeroProps {
  profile: Profile | null;
}

function Hero({ profile }: HeroProps) {
  const isMobile = useIsMobile();


  if (!profile) return null;

   function scrollToSkills() {
    document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <section className="hero">
      <div className="hero-content">
        {profile.photoUrl && (
          <img src={profile.photoUrl} alt={profile.name} className="hero-photo" />
        )}
        <span className="hero-badge">{profile.role}</span>

        <h1 className="hero-name">{profile.name}</h1>

        <div className="hero-status">
          <span className="hero-status-dot"></span>
          {profile.statusBadge}
        </div>

        <p className="hero-bio">{profile.bio}</p>

        <div className="hero-actions">
          <a className="hero-btn" href={`${API_BASE}/cv/?download=true`}>
            Download CV
          </a>
          <a
            className="hero-btn hero-btn-secondary"
            href={`${API_BASE}/cv/`}
            target="_blank"
            rel="noreferrer"
          >
            Show CV
          </a>
        </div>
      </div>

      {isMobile ? (
          <nav className="hero-sections">
            <Link to="/projects">Projects</Link>
            <button onClick={scrollToSkills}>Skills</button>
          </nav>
        ) : (
          <Skills />
        )}
    </section>
  );
}

export default Hero;