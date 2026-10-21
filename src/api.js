const API_URL = "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || data.message || "Request failed");
  }

  return data;
}

export const getProblems = () => request("/problem");

export const getProblem = (id) => request(`/problem/${id}`);

export const loginUser = (email, password) =>
  request("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

export const registerUser = (username, email, password) =>
  request("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

export const getProfile = () => {
  const token = localStorage.getItem("token");
  return request("/profile", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const executeCode = (payload) => {
  const token = localStorage.getItem("token");
  return request("/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
};

export { API_URL };
