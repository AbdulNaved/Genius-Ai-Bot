// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock authentication check (replace this with your actual logic)
  useEffect(() => {
    const checkAuth = async () => {
      // Example: replace with your actual auth check (e.g., check JWT token, etc.)
      const token = localStorage.getItem('authToken'); // Change as needed
      setIsAuthenticated(!!token); // Set true if token exists
    };

    checkAuth();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'your-token'); // Mock token
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Remove token
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
