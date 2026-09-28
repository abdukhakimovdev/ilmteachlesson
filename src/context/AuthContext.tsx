import React, { createContext, useContext, useState, useEffect } from 'react';
import { TeacherProfile } from '../types';
import { INITIAL_TEACHER } from '../data/mockData';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: TeacherProfile;
  login: (email: string, pass: string) => boolean;
  loginDemo: () => void;
  logout: () => void;
  updateProfile: (updated: Partial<TeacherProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('teacheros_auth');
    return saved === 'true';
  });

  const [currentUser, setCurrentUser] = useState<TeacherProfile>(() => {
    const saved = localStorage.getItem('teacheros_teacher');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_TEACHER;
  });

  useEffect(() => {
    localStorage.setItem('teacheros_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('teacheros_teacher', JSON.stringify(currentUser));
  }, [currentUser]);

  const login = (email: string, pass: string): boolean => {
    if ((email === 'demo@teacheros.com' && pass === 'demo123') || (email && pass.length >= 4)) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const loginDemo = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updated: Partial<TeacherProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...updated }));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        loginDemo,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
