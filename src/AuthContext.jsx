import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("todo_token"));
  const [error, setError] = useState(null);

  const login = (newToken) => {
    localStorage.setItem("todo_token", newToken);
    setToken(newToken);
    setError(null);
  };

  const logout = () => {
    localStorage.removeItem("todo_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuth: !!token, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
