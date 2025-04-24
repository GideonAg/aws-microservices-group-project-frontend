import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("idToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("idToken", token);
  } else {
    localStorage.removeItem("idToken");
  }
};

export const login = (credentials) => api.post("/auth", credentials);
export const createUser = (userData) => api.post("/users", userData);
export const getTaskById = (taskId) => api.get(`/tasks/${taskId}`);
export const updateTask = (taskId, taskData) =>
  api.put(`/tasks/${taskId}`, taskData);
export const createTask = (taskData) => api.post("/tasks", taskData);
export const getAllTasks = () => api.get("/tasks");
export const closeTask = (taskId, data) =>
  api.post(`/tasks/${taskId}/close`, data);
