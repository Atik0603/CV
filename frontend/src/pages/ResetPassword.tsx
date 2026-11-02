import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { API_BASE } from "../utils/api";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: password }),
      });

      if (!res.ok) {
        setError("This reset link is invalid or has expired. Request a new one.");
        return;
      }

      setDone(true);
      setTimeout(() => navigate("/admin/login"), 2500);
    } catch {
      setError("Something went wrong. Try again.");
    }
  }

  if (!token) {
    return (
      <div style={{ padding: "2rem", maxWidth: "320px", margin: "4rem auto", color: "white" }}>
        <p>Missing reset token.</p>
        <Link to="/admin/forgot-password" style={{ color: "#d4af37" }}>Request a new link</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "320px", margin: "4rem auto", color: "white" }}>
      <h2>Choose a new password</h2>

      {done ? (
        <p style={{ marginTop: "1rem" }}>Password updated. Redirecting to login...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ margin: "1rem 0" }}>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            Set new password
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;