import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  signIn,
  createUser,
  forgotPassword,
  changePassword,
} from "../services/auth";

export const useAuth = () => {
  const context = useContext(AuthContext);

  return {
    user: context.user,
    loading: context.loading,
    signIn: async (email, password) => await context.login(email, password),
    createUser: async (email, role, firstName, lastName) =>
      await createUser(email, role, firstName, lastName),
    forgotPassword: async (email) => await forgotPassword(email),
    changePassword: async (email, code, newPassword) =>
      await changePassword(email, code, newPassword),
    logout: context.logout,
  };
};
