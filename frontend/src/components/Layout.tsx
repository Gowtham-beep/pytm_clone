import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Home, SendHorizontal } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && (
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600"
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};