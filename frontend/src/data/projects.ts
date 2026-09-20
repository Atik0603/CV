import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: 1,
    name: "Smart Greenhouse Monitor",
    shortDescription: "A three-tier IoT web app for monitoring greenhouse conditions.",
    longDescription: [
      "Built with FastAPI, SQLAlchemy, and PostgreSQL on the backend",
      "React + TypeScript + Tailwind frontend",
      "Tracks temperature, humidity, and soil data in real time",

    ],
    mediaUrl: "/images/green.png",
    mediaType: "image",
    links: [
      { label: "GitHub", url: "https://github.com/yourusername/greenhouse-app" },
      { label: "Live Demo", url: "https://example.com" },
    ],
    color: "#92fa97",
  },
];