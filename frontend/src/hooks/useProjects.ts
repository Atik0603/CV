import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import { API_BASE } from "../utils/api";

export function mapApiProject(apiProject: any): Project {
  return {
    id: apiProject.id,
    name: apiProject.name,
    shortDescription: apiProject.short_description,
    longDescription: apiProject.long_description,
    mediaUrl: apiProject.media_url,
    mediaType: apiProject.media_type,
    color: apiProject.color,
    links: apiProject.links.map((link: any) => ({
      label: link.label,
      url: link.url,
    })),
  };
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/projects/`)
      .then((res) => res.json())
      .then((data) => setProjects(data.map(mapApiProject)))
      .catch(() => setProjects([]));
  }, []);

  return projects;
}