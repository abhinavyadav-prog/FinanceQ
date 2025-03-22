import React from 'react';
import { Home, ScrollText, User, LogIn, UserPlus, Brain } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: 'home' | 'rules' | 'game' | 'profile' | 'login' | 'register') => void;
  currentPage: 'home' | 'rules' | 'game' | 'profile' | 'login' | 'register';
  isAuthenticated: boolean;
  username?: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  currentPage,
  isAuthenticated,
  username,
  onLogout,
}) => {
  const navLinkClass = (page: string) =>
    `${
      currentPage === page
        ? 'border-blue-500 text-gray-900'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Brain className="h-6 w-6 mr-2 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">FinanceIQ</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button
                onClick={() => onNavigate('home')}
                className={navLinkClass('home')}
              >
                <div className="flex items-center">
                  <Home className="h-5 w-5 mr-1" />
                  Home
                </div>
              </button>
              <button
                onClick={() => onNavigate('rules')}
                className={navLinkClass('rules')}
              >
                <div className="flex items-center">
                  <ScrollText className="h-5 w-5 mr-1" />
                  Rules
                </div>
              </button>
              <button
                onClick={() => onNavigate('game')}
                className={navLinkClass('game')}
              >
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-1" />
                  Game
                </div>
              </button>
              {isAuthenticated && (
                <button
                  onClick={() => onNavigate('profile')}
                  className={navLinkClass('profile')}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-1" />
                    Profile
                  </div>
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {username}</span>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex sm:space-x-8">
                <button
                  onClick={() => onNavigate('login')}
                  className={navLinkClass('login')}
                >
                  <div className="flex items-center">
                    <LogIn className="h-5 w-5 mr-1" />
                    Login
                  </div>
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className={navLinkClass('register')}
                >
                  <div className="flex items-center">
                    <UserPlus className="h-5 w-5 mr-1" />
                    Register
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;