export const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function authFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
    throw new Error("Session expired");
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}