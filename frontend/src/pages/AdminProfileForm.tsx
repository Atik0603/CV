import { useEffect, useState } from "react";
import { authFetch } from "../utils/api";
import "../styles/AdminForm.css";

interface ProfileForm {
  name: string;
  role: string;
  status_badge: string;
  bio: string;
  photo_url: string;
  github_url: string;
  linkedin_url: string;
}

const emptyForm: ProfileForm = {
  name: "",
  role: "",
  status_badge: "",
  bio: "",
  photo_url: "",
  github_url: "",
  linkedin_url: "",
};

function AdminProfileForm() {
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch("/profile/")
      .then((data) => setForm({ ...emptyForm, ...data, photo_url: data.photo_url ?? "" }))
      .catch(() => {
        // 404 just means the profile hasn't been created yet, so start blank
      })
      .finally(() => setLoading(false));
  }, []);

  function updateField(field: keyof ProfileForm, value: string) {
    setForm({ ...form, [field]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");

    try {
      await authFetch("/profile/", {
        method: "PUT",
        body: JSON.stringify({
          name: form.name,
          role: form.role,
          status_badge: form.status_badge,
          bio: form.bio,
          photo_url: form.photo_url.trim() || null,
          github_url: form.github_url,
          linkedin_url: form.linkedin_url,
        }),
      });
      setStatus("Profile saved!");
    } catch (err) {
      setStatus("Failed to save profile.");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h3>Edit Hero</h3>

      <label>Name</label>
      <input value={form.name} onChange={(e) => updateField("name", e.target.value)} required />

      <label>Role Badge</label>
      <input value={form.role} onChange={(e) => updateField("role", e.target.value)} required />

      <label>Status Badge</label>
      <input value={form.status_badge} onChange={(e) => updateField("status_badge", e.target.value)} required />

      <label>Bio</label>
      <textarea value={form.bio} onChange={(e) => updateField("bio", e.target.value)} rows={5} required />

      <label>Photo URL (optional)</label>
      <input value={form.photo_url} onChange={(e) => updateField("photo_url", e.target.value)} />

      <label>GitHub URL</label>
      <input value={form.github_url} onChange={(e) => updateField("github_url", e.target.value)} required />

      <label>LinkedIn URL</label>
      <input value={form.linkedin_url} onChange={(e) => updateField("linkedin_url", e.target.value)} required />

      <div className="admin-form-actions">
        <button type="submit">Save Profile</button>
      </div>
      {status && <p className="admin-status">{status}</p>}
    </form>
  );
}

export default AdminProfileForm;