import { useEffect, useState } from "react";
import type { Skill } from "../types/skill";
import { API_BASE } from "../utils/api";

export function mapApiSkill(api: any): Skill {
  return {
    id: api.id,
    name: api.name,
    category: api.category ?? "Other",
  };
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/skills/`)
    .then((res) => {
        if (!res.ok) throw new Error("No skills");
        return res.json();
      })
      .then((data) => setSkills(data.map(mapApiSkill)))
      .catch(() => setSkills([]));
  }, []);

  return skills;
}