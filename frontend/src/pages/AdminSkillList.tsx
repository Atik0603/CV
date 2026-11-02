import { useEffect, useState, type FormEvent } from "react";
import { authFetch } from "../utils/api";
import { mapApiSkill } from "../hooks/useSkills";
import type { Skill } from "../types/skill";
import "../styles/AdminForm.css";

function AdminSkillList() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState("");

  // "Add new" fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  // Inline edit fields
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");

  async function loadSkills() {
    try {
      const data = await authFetch("/skills/");
      setSkills(data.map(mapApiSkill));
    } catch {
      setError("Could not load skills");
    }
  }

  useEffect(() => {
    loadSkills();
  }, []);

  // Unique category names, for the suggestion dropdown
  const categories = [...new Set(skills.map((s) => s.category))];

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await authFetch("/skills/", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          category: category.trim() || null,
        }),
      });
      setName("");          // clear the name, keep the category
      setError("");
      loadSkills();
    } catch {
      setError("Could not add skill");
    }
  }

  function startEdit(skill: Skill) {
    setEditingId(skill.id);
    setEditName(skill.name);
    setEditCategory(skill.category);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit(id: number) {
    if (!editName.trim()) return;
    try {
      await authFetch(`/skills/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: editName.trim(),
          category: editCategory.trim() || null,
        }),
      });
      setEditingId(null);
      setError("");
      loadSkills();
    } catch {
      setError("Could not save skill");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this skill?")) return;
    try {
      await authFetch(`/skills/${id}`, { method: "DELETE" });
      loadSkills();
    } catch {
      setError("Could not delete skill");
    }
  }

  return (
    <div>
      <h3>Skills</h3>

      {error && <p style={{ color: "#e57373" }}>{error}</p>}

      <form onSubmit={handleAdd} className="admin-inline-form">
        <input
          placeholder="Skill (e.g. React)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Category (e.g. Frontend)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          list="skill-categories"
        />
        <button type="submit" className="admin-btn admin-btn-primary">+ Add</button>
      </form>

      <datalist id="skill-categories">
        {categories.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <ul className="admin-list">
        {skills.map((skill) =>
          editingId === skill.id ? (
            <li key={skill.id} className="admin-list-item">
              <div className="admin-inline-form" style={{ margin: 0, flex: 1 }}>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                <input
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  list="skill-categories"
                />
              </div>
              <div className="admin-list-actions">
                <button className="admin-btn admin-btn-sm admin-btn-primary" onClick={() => saveEdit(skill.id)}>
                  Save
                </button>
                <button className="admin-btn admin-btn-sm" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            </li>
          ) : (
            <li key={skill.id} className="admin-list-item">
              <span>
                {skill.name} <small style={{ opacity: 0.6 }}>· {skill.category}</small>
              </span>
              <div className="admin-list-actions">
                <button className="admin-btn admin-btn-sm" onClick={() => startEdit(skill)}>
                  Edit
                </button>
                <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(skill.id)}>
                  Delete
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default AdminSkillList;