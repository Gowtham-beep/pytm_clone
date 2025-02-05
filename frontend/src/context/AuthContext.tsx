import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, LoginCredentials, SignupCredentials } from '../types/auth';
import { api } from '../services/api';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  });
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/api/user/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setAuth({ user: response.data.user, token, isAuthenticated: true });
        })
        .catch(() => {
          localStorage.removeItem('token'); // Remove invalid token
          setAuth({ user: null, token: null, isAuthenticated: false });
        });
    }
  }, []);
  
  const login = async (credentials: LoginCredentials) => {
    const response = await api.post('/api/auth/signin', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setAuth({ user, token, isAuthenticated: true });
  };

  const signup = async (credentials: SignupCredentials) => {
    await api.post('/api/auth/signup', credentials);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ user: null, token: null, isAuthenticated: false });
  };

  const updateUser = (user: User) => {
    setAuth(prev => ({ ...prev, user }));
  };
  

  return (
    <AuthContext.Provider value={{ ...auth, login, signup, logout, updateUser }}>
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