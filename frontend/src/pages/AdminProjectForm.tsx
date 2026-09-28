import { useState } from "react";
import { authFetch } from "../utils/api";
import type { Project } from "../types/project";
import "../styles/AdminForm.css";


interface AdminProjectFormProps {
  editingProject?: Project;
  onSaved: () => void;
  onCancel: () => void;
}

function AdminProjectForm({ editingProject, onSaved, onCancel }: AdminProjectFormProps) {
  const [name, setName] = useState(editingProject?.name ?? "");
  const [shortDescription, setShortDescription] = useState(editingProject?.shortDescription ?? "");
  const [longDescription, setLongDescription] = useState<string[]>(
    editingProject?.longDescription ?? [""]
  );
  const [mediaUrl, setMediaUrl] = useState(editingProject?.mediaUrl ?? "");
  const [mediaType, setMediaType] = useState<"image" | "video">(editingProject?.mediaType ?? "image");
  const [color, setColor] = useState(editingProject?.color ?? "#3d2f5c");
  const [links, setLinks] = useState(editingProject?.links ?? [{ label: "", url: "" }]);
  const [status, setStatus] = useState("");

  function updateBulletPoint(index: number, value: string) {
    const updated = [...longDescription];
    updated[index] = value;
    setLongDescription(updated);
  }

  function addBulletPoint() {
    setLongDescription([...longDescription, ""]);
  }

  function updateLink(index: number, field: "label" | "url", value: string) {
    const updated = [...links];
    updated[index] = { ...updated[index], [field]: value };
    setLinks(updated);
  }

  function addLink() {
    setLinks([...links, { label: "", url: "" }]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");

    const payload = {
      name,
      short_description: shortDescription,
      long_description: longDescription.filter((p) => p.trim() !== ""),
      media_url: mediaUrl,
      media_type: mediaType,
      color,
      links: links.filter((l) => l.label.trim() !== "" && l.url.trim() !== ""),
    };

    try {
      if (editingProject) {
        await authFetch(`/projects/${editingProject.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setStatus("Project updated!");
      } else {
        await authFetch("/projects/", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setStatus("Project saved!");
      }
      onSaved();
    } catch (err) {
      setStatus("Failed to save project.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h3>{editingProject ? "Edit Project" : "Add Project"}</h3>

      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Short Description</label>
      <input value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required />

      <label>Bullet Points</label>
      {longDescription.map((point, index) => (
        <input
          key={index}
          value={point}
          onChange={(e) => updateBulletPoint(index, e.target.value)}
          placeholder={`Point ${index + 1}`}
        />
      ))}
      <button type="button" onClick={addBulletPoint}>+ Add bullet point</button>

      <label>Media URL</label>
      <input value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} />

      <label>Media Type</label>
      <select value={mediaType} onChange={(e) => setMediaType(e.target.value as "image" | "video")}>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>

      <label>Card Color</label>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

      <label>Links</label>
      {links.map((link, index) => (
        <div key={index} className="link-row">
          <input
            placeholder="Label"
            value={link.label}
            onChange={(e) => updateLink(index, "label", e.target.value)}
          />
          <input
            placeholder="URL"
            value={link.url}
            onChange={(e) => updateLink(index, "url", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addLink}>+ Add link</button>

      <div className="admin-form-actions">
        <button type="submit">{editingProject ? "Update Project" : "Save Project"}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
      {status && <p className="admin-status">{status}</p>}
    </form>
  );
}

export default AdminProjectForm;