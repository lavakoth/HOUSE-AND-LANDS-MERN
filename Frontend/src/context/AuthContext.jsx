// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('userInfo');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const getToken = () => user?.token || null;
  const isAuthenticated = !!user;
  const isLister = isAuthenticated && (user?.role === 'agent' || user?.role === 'landlord');

  const saveUser = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const handleAuth = useCallback(async (type, data) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(res => setTimeout(res, 1000));

      if (data.email === 'error@test.com') {
        throw new Error('Invalid credentials');
      }

      const mockUser = {
        username: data.username || 'User',
        email: data.email,
        role: data.role || 'buyer',
        token: 'fake-jwt-12345',
        firstName: data.firstName || 'Guest',
        lastName: data.lastName || ''
      };

      saveUser(mockUser);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated, isLister, loading, error, setError,
      getToken, handleAuth, handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
};