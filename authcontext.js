import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(); // Create context for user data

export const useAuth = () => {
  return useContext(AuthContext); // Custom hook to access auth context
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data

  const login = (uid, email) => {
    setUser({ uid, email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};