import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminProjectList from "./AdminProjectList";
import AdminProfileForm from "./AdminProfileForm";
import AdminSkillList from "./AdminSkillList";
import AdminCvUpload from "./AdminCvUpload";
import "../styles/AdminPage.css";

function AdminPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState<"projects" | "hero" | "skills">("projects");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    } else {
      setChecked(true);
    }
  }, [navigate]);

  if (!checked) return null;

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
        <div className="admin-tabs">
            <button
              className={`admin-tab ${tab === "projects" ? "active" : ""}`}
              onClick={() => setTab("projects")}
            >
              Projects
            </button>
            <button
              className={`admin-tab ${tab === "hero" ? "active" : ""}`}
              onClick={() => setTab("hero")}
            >
              Hero
            </button>
            <button
              className={`admin-tab ${tab === "skills" ? "active" : ""}`}
              onClick={() => setTab("skills")}
            >
              Skills
            </button>
            <button
              className="admin-tab admin-logout"
              onClick={() => { localStorage.removeItem("token"); navigate("/admin/login"); }}
            >
              Log out
            </button>
          </div>

      <hr style={{ margin: "1.5rem 0" }} />

      {tab === "projects" && <AdminProjectList />}
      {tab === "hero" && (
        <>
          <AdminProfileForm />
          <AdminCvUpload />
        </>
      )}
      {tab === "skills" && <AdminSkillList />}
    </div>
  );
}

export default AdminPage;