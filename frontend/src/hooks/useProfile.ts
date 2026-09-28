import { useEffect, useState } from "react";
import type { Profile } from "../types/profile";

function mapApiProfile(api: any): Profile {
  return {
    name: api.name,
    role: api.role,
    statusBadge: api.status_badge,
    bio: api.bio,
    photoUrl: api.photo_url ?? undefined,
    githubUrl: api.github_url,
    linkedinUrl: api.linkedin_url,
  };
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/profile/")
      .then((res) => {
        if (!res.ok) throw new Error("No profile");
        return res.json();
      })
      .then((data) => setProfile(mapApiProfile(data)))
      .catch(() => setProfile(null));
  }, []);

  return profile;
}