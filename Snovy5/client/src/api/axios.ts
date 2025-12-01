// // src/api/axios.ts
// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
//   withCredentials: true,
// });

// // Attach ADMIN token automatically (for protected routes)
// api.interceptors.request.use((config: any) => {
//   const adminToken = localStorage.getItem("admin_token");

//   if (adminToken) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${adminToken}`;
//   }

//   return config;
// });

// export default api;



// src/api/axios.ts
import axios from "axios";

// Automatically switch between local + production
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://snovy5-2.onrender.com");

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
