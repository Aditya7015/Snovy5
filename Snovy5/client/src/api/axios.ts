import axios from "axios";

// Automatically switch between local + production
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://snovy5-backend.onrender.com");

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Attach ADMIN token automatically (for protected routes)
api.interceptors.request.use((config: any) => {
  const adminToken = localStorage.getItem("admin_token");

  if (adminToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${adminToken}`;
  }

  return config;
});

export default api;
