import axios from "axios";

export const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const httpClient = axios.create({
  baseURL,
});

httpClient.interceptors.request.use(async (config) => {
  // Clerk is available globally after ClerkProvider loads
  if (window.Clerk && window.Clerk.session) {
    const token = await window.Clerk.session.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
