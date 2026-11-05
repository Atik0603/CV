import { useState } from "react";
import { useNavigate, Link  } from "react-router-dom";
import { API_BASE } from "../utils/api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 429) {
        setError("Too many attempts. Wait a minute and try again.");
        return;
      }

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      navigate("/admin");
    } catch (err) {
      setError("Login failed. Check your email and password.");
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "320px", margin: "4rem auto", color: "white" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Log in
        </button>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          <Link to="/admin/forgot-password" style={{ color: "#d4af37" }}>
            Forgot password?
          </Link>
        </p>
      </form>
    </div>
  );
}

export default AdminLogin;