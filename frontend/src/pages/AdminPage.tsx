import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminProjectList from "./AdminProjectList";
import AdminProfileForm from "./AdminProfileForm";

function AdminPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState<"projects" | "hero">("projects");

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
    <div style={{ padding: "2rem", color: "white" }}>
      <h2>Admin Dashboard</h2>
        <div style={{ display: "flex", gap: "0.5rem", margin: "1rem 0" }}>
        <button onClick={() => setTab("projects")}>Projects</button>
        <button onClick={() => setTab("hero")}>Hero</button>
        <button onClick={() => { localStorage.removeItem("token"); navigate("/admin/login"); }}>
          Log out
        </button>
      </div>

      <hr style={{ margin: "1.5rem 0" }} />

      {tab === "projects" && <AdminProjectList />}
      {tab === "hero" && <AdminProfileForm />}
    </div>
  );
}

export default AdminPage;