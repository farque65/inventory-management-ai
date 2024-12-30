import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { User, AuthState } from '../types';
import { auth } from '../services/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    return {
      user: userStr ? JSON.parse(userStr) : null,
      isAuthenticated: !!token,
    };
  });

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { key, user } = await auth.login(email, password);
      localStorage.setItem('token', key);
      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({ user, isAuthenticated: true });
      toast.success('Welcome back!');
    } catch (error) {
      toast.error('Invalid email or password');
      throw error;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    try {
      const { key, user } = await auth.register(email, password, name);
      localStorage.setItem('token', key);
      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({ user, isAuthenticated: true });
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await auth.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuthState({ user: null, isAuthenticated: false });
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && authState.isAuthenticated) {
      setAuthState({ user: null, isAuthenticated: false });
    }
  }, [authState.isAuthenticated]);

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}