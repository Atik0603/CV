import { useProfile } from "../hooks/useProfile";
import "../styles/Footer.css";

function Footer() {
  const profile = useProfile();

  if (!profile) return null;

  return (
    <footer className="footer">
      <span>{profile.name}</span>
      <div className="footer-links">
        <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
}

export default Footer;