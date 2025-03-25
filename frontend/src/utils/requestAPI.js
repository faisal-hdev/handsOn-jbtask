import axios from "axios";
import toast from "react-hot-toast";

const requestAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
});

// Add token to header
requestAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handler
requestAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      toast.error("You are not authorized. Please log in again.");
      // Optional: redirect to login or logout user here
      // window.location.href = "/signIn";
    }
    return Promise.reject(error);
  }
);

export default requestAPI;
