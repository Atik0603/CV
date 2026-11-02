import { useState } from "react";
import { authFetch, API_BASE } from "../utils/api";

function AdminCvUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);   // "file" must match the parameter name in FastAPI

    try {
      setStatus("Uploading...");
      await authFetch("/cv/", { method: "POST", body: formData });
      setStatus("CV uploaded ✓");
      setFile(null);
    } catch (err) {
      setStatus(`Upload failed: ${(err as Error).message}`);
    }
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>CV (PDF)</h3>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", margin: "1rem 0" }}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button onClick={handleUpload} disabled={!file}>
          Upload
        </button>
        <a href={`${API_BASE}/cv/`} target="_blank" rel="noreferrer">
          View current CV
        </a>
      </div>
      {status && <p>{status}</p>}
    </div>
  );
}

export default AdminCvUpload;