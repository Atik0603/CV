import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../utils/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.status === 429) {
        setMessage("Too many requests. Try again in a few minutes.");
        return;
      }
      const data = await res.json();
      setMessage(data.message);
    } catch {
      setMessage("Something went wrong. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "320px", margin: "4rem auto", color: "white" }}>
      <h2>Reset password</h2>

      {message ? (
        <p style={{ marginTop: "1rem" }}>{message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ margin: "1rem 0" }}>
            <input
              type="email"
              placeholder="Your admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <button type="submit" disabled={sending} style={{ padding: "0.5rem 1rem" }}>
            {sending ? "Sending..." : "Send reset link"}
          </button>
        </form>
      )}

      <p style={{ marginTop: "1.5rem", fontSize: "0.9rem" }}>
        <Link to="/admin/login" style={{ color: "#d4af37" }}>Back to login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;