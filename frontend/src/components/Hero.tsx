import { useProfile } from "../hooks/useProfile";
import "../styles/Hero.css";

function Hero() {
  const profile = useProfile();

  if (!profile) return null;

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
          <button className="hero-btn">Download CV</button>
          <button className="hero-btn hero-btn-secondary">Show CV</button>
        </div>
      </div>

      <div className="hero-decoration"></div>
    </section>
  );
}

export default Hero;