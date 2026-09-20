import { profile } from "../data/profile";
import "../styles/TopBar.css";
import ThemeToggle from "./ThemeToggle";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function TopBar() {
  return (
    <header className="top-bar">
      <span className="top-bar-name">{profile.name}</span>
      <div className="top-bar-links">
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">
              <FaGithub  size={25}/>
            </a>
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
              <FaLinkedin  size={25}/>
            </a>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default TopBar;