// Base URL for Spring Boot backend
const API_URL = "http://localhost:8080/api/auth";

async function parseJsonSafe(response) {
  // Read raw text first to avoid JSON.parse errors when server returns HTML or empty body
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch (err) {
    // Not JSON — return the raw text under `message` so callers can show something useful
    return { message: text };
  }
}

export async function registerUser(email, password, role = 'Voter') {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role })
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    // prefer server-provided message, fallback to status text
    throw new Error((data && data.message) || res.statusText || 'Registration failed');
  }
  return data;
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error((data && data.message) || res.statusText || 'Login failed');
  }
  return data;
}
