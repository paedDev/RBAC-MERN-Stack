import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config.js";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSetShowPasword = () => {
    setShowPassword((prev) => !prev);
  };
  const [expanded, setExpanded] = useState(false);

  const handleExpanded = () => {
    setExpanded((prev) => !prev);
  };
  const navigate = useNavigate();
  // Save/remove token from localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token", token);
    }
  }, [token]);
  // Save/remove user from localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    setTimeout(() => {
      if (userData?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }, 100);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };
  const value = {
    user,
    setUser,
    token,
    loading,
    setLoading,
    showPassword,
    handleSetShowPasword,
    login,
    logout,
    navigate,
    isAuthenticated: Boolean(token),
    expanded,
    setExpanded,
    handleExpanded,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
