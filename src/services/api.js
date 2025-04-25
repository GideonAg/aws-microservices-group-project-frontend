import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.REACT_APP_API_URL;

export async function login(email, password) {
  const response = await axios.post(`${API_URL}/auth`, { email, password });
  const { idToken, accessToken, refreshToken } = response.data;

  localStorage.setItem("idToken", idToken);
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  const decoded = jwtDecode(idToken);
  localStorage.setItem("role", decoded["custom:role"]);

  return decoded["custom:role"];
}

export async function getAllTasks() {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks", error);
    throw error;
  }
}

export async function closeTask(taskId, payload) {
  const response = await axios.post(
    `${API_URL}/tasks/${taskId}/close`,
    payload,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
}

export function logout() {
  localStorage.clear();
}

export function getAuthHeader() {
  const token = localStorage.getItem("idToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
