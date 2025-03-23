import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import GameInterface from './components/GameInterface';
import Rules from './components/Rules';
import Profile from './components/Profile';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'rules' | 'game' | 'profile' | 'login' | 'register'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [userStats, setUserStats] = useState({
    marks: 0,
    health: 100,
    rank: 'Beginner',
    streak: 0
  });

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);

      // Update the app state
      setIsAuthenticated(true);
      setUsername(data.user.username);

      // Navigate to the game page after successful login
      setCurrentPage('game');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error instanceof Error ? error.message : 'Login failed. Please try again.');
    }
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store the token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);

      // Update the app state
      setIsAuthenticated(true);
      setUsername(data.user.username);

      // Navigate to the game page after successful registration
      setCurrentPage('game');
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
    setCurrentPage('home');
  };

  const handleNavigate = (page: 'home' | 'rules' | 'game' | 'profile' | 'login' | 'register') => {
    if (page === 'profile' && !isAuthenticated) {
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
  };

  const handleStartGame = () => {
    if (!isAuthenticated) {
      setCurrentPage('login');
    } else {
      setCurrentPage('game');
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'register':
        return <Register onRegister={handleRegister} onNavigate={handleNavigate} />;
      case 'home':
        return <HomePage onStartGame={handleStartGame} />;
      case 'rules':
        return <Rules />;
      case 'game':
        if (!isAuthenticated) {
          setCurrentPage('login');
          return <Login onLogin={handleLogin} onNavigate={handleNavigate} />;
        }
        return <GameInterface />;
      case 'profile':
        return isAuthenticated && username ? (
          <Profile
            username={username}
            marks={userStats.marks}
            health={userStats.health}
            rank={userStats.rank}
            streak={userStats.streak}
          />
        ) : null;
      default:
        return <HomePage onStartGame={handleStartGame} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#c0c0c0] flex flex-col">
        <Navbar
          onNavigate={handleNavigate}
          currentPage={currentPage}
          isAuthenticated={isAuthenticated}
          username={username}
          onLogout={handleLogout}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {renderContent()}
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;