import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = useCallback(async (email: string, password: string) => {
    // In a real app, you would make an API call here
    // For demo purposes, we'll simulate a successful login
    const user: User = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    setAuthState({ user, isAuthenticated: true });
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    // In a real app, you would make an API call here
    // For demo purposes, we'll simulate a successful registration
    const user: User = {
      id: Date.now().toString(),
      email,
      name,
    };
    setAuthState({ user, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    setAuthState({ user: null, isAuthenticated: false });
  }, []);

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