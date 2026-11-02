import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import type { Profile } from "../types/profile";
import ThemeToggle from "./ThemeToggle";
import "../styles/TopBar.css";

interface TopBarProps {
  profile: Profile | null;
  backTo?: string;
}

function TopBar({ profile, backTo }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <header className="top-bar">
      {backTo ? (
        <button
          className="top-bar-back"
          onClick={() => navigate(backTo)}
          aria-label="Back"
        >
          <LuArrowLeft size={18} />
        </button>
      ) : (
        <span className="top-bar-greeting">Welcome</span>
      )}

      <div className="top-bar-links">
        {profile?.githubUrl && (
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub size={22} />
          </a>
        )}
        {profile?.linkedinUrl && (
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={22} />
          </a>
        )}
        {profile?.email && (
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <FaEnvelope size={22} />
          </a>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}

export default TopBar;