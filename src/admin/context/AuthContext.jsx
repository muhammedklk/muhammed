import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('cms_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('cms_token') || '');
  // Instant load if saved user exists
  const [loading, setLoading] = useState(() => !localStorage.getItem('cms_user'));

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (token) {
        try {
          const res = await authApi.getMe();
          if (res.data && res.data.data && res.data.data.user) {
            setUser(res.data.data.user);
            localStorage.setItem('cms_user', JSON.stringify(res.data.data.user));
          }
        } catch (err) {
          console.warn('Auth token verification failed:', err);
          logout();
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, [token]);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    const { token: newToken, user: newUser } = res.data.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('cms_token', newToken);
    localStorage.setItem('cms_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
  };

  const updateProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('cms_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!token && !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
