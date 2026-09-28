import { useEffect, useState } from "react";
import { authFetch } from "../utils/api";
import AdminProjectForm from "./AdminProjectForm";
import type { Project } from "../types/project";
import "../styles/AdminForm.css";

function mapApiProject(apiProject: any): Project {
  return {
    id: apiProject.id,
    name: apiProject.name,
    shortDescription: apiProject.short_description,
    longDescription: apiProject.long_description,
    mediaUrl: apiProject.media_url,
    mediaType: apiProject.media_type,
    color: apiProject.color,
    links: apiProject.links.map((link: any) => ({ label: link.label, url: link.url })),
  };
}

function AdminProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function loadProjects() {
    const data = await authFetch("/projects/");
    setProjects(data.map(mapApiProject));
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this project?")) return;
    await authFetch(`/projects/${id}`, { method: "DELETE" });
    loadProjects();
  }

  function handleSaved() {
    setShowForm(false);
    setEditingProject(null);
    loadProjects();
  }

  function handleCancel() {
  setShowForm(false);
  setEditingProject(null);
}

  return (
    <div>
      <h3>Projects</h3>
      {!showForm && (
        <>
          <ul className="admin-list">
            {projects.map((project) => (
              <li key={project.id} className="admin-list-item">
                <span>{project.name}</span>
                <div>
                  <button onClick={() => { setEditingProject(project); setShowForm(true); }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(project.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={() => { setEditingProject(null); setShowForm(true); }}>
            + Add New Project
          </button>
        </>
      )}

      {showForm && (
        <AdminProjectForm editingProject={editingProject ?? undefined} onSaved={handleSaved}  onCancel={handleCancel}/>
      )}
    </div>
  );
}

export default AdminProjectList;