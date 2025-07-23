//@ts-ignore
//@ts-nocheck
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { LocalStorage } from "./localStorage";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use Vite's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the Authorization header
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = LocalStorage.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error?.response?.data?.message || "Something went wrong");
    return Promise.reject(error);
  }
);

export default apiClient;
