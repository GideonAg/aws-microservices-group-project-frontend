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

export function logout() {
  localStorage.clear();
}

export function getToken() {
  return localStorage.getItem("idToken");
}

export function getRole() {
  return localStorage.getItem("role");
}

export function getAuthHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
