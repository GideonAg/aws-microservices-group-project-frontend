import {
  resetPassword,
  confirmResetPassword,
  updatePassword,
} from "aws-amplify/auth";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = process.env.REACT_APP_API_URL || "{{API_LINK}}";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, {
      email,
      password,
    });
    const { idToken } = response.data;
    const decodedToken = jwtDecode(idToken);
    const userData = {
      email: decodedToken.email,
      sub: decodedToken.sub,
      role: decodedToken["custom:role"] || "user",
      idToken, // Already included
    };
    return userData;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Invalid email or password");
    }
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "User creation failed");
  }
};

export const forgotPassword = async (email) => {
  try {
    await resetPassword({ username: email });
  } catch (error) {
    throw new Error(error.message || "Password reset request failed");
  }
};

export const confirmForgotPassword = async (email, code, newPassword) => {
  try {
    await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword,
    });
  } catch (error) {
    throw new Error(error.message || "Password reset failed");
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    await updatePassword({ oldPassword, newPassword });
  } catch (error) {
    throw new Error(error.message || "Password change failed");
  }
};
