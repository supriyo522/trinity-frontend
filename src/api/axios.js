import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const adminInfo = localStorage.getItem("adminInfo");
  if (adminInfo) {
    const { token } = JSON.parse(adminInfo);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
