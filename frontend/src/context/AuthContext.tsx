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
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token and fetch user data
      api.get('/api/user/me')
        .then(response => {
          setAuth({
            user: response.data,
            token,
            isAuthenticated: true,
          });
        })
        .catch(() => {
          localStorage.removeItem('token');
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
    const response = await api.post('/api/auth/signup', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setAuth({ user, token:null, isAuthenticated: false });
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