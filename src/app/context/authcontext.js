// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Real authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for token in localStorage
        const token = localStorage.getItem("authToken");
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("authToken", token);
    document.cookie = `authToken=${token}; path=/; max-age=${60 * 60}`; // 1 hour expiry
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    document.cookie = "authToken=; path=/; max-age=0"; // Remove cookie
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
