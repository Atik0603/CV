import { profile } from "../data/profile";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">{profile.role}</span>

        <h1 className="hero-name">{profile.name}</h1>

        <div className="hero-status">
          <span className="hero-status-dot"></span>
          {profile.statusBadge}
        </div>

        <p className="hero-bio">{profile.bio}</p>

        <div className="hero-actions">
          <button className="hero-btn">Download CV</button>
          <button className="hero-btn hero-btn-secondary">Show CV</button>
        </div>
      </div>

      <div className="hero-decoration">
        {/* placeholder for pattern/animation/logo, built later */}
      </div>
    </section>
  );
}

export default Hero;