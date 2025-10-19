import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSetShowPasword = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token', token);
    }
  }, [token]);
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    navigate("/dashboard");
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate('/login');
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
    isAuthenticated: Boolean(token)
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);