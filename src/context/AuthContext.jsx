import { createContext, useContext, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminInfo, setAdminInfo] = useState(() => {
    const stored = localStorage.getItem("adminInfo");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const { data } = await api.post("/auth/admin/login", { email, password });
    localStorage.setItem("adminInfo", JSON.stringify(data));
    setAdminInfo(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("adminInfo");
    setAdminInfo(null);
  };

  return (
    <AuthContext.Provider value={{ adminInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
