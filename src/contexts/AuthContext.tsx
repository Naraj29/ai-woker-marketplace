import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/auth';

// Define interfaces locally to avoid import issues
interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  githubId: string;
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await authAPI.getCurrentUser();
      if (user) {
        setState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  };

  const login = async (username: string) => {
    try {
      const user = await authAPI.login(username);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('currentUser');
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};