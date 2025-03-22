import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import GameInterface from './components/GameInterface';
import Rules from './components/Rules';
import Profile from './components/Profile';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { IUser } from './models/User';

// Mock user data
const mockUserData = {
  username: "John Doe",
  marks: 750,
  health: 85,
  rank: 12,
  streak: 5
};

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
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      setIsAuthenticated(true);
      setUsername(data.username);
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      setIsAuthenticated(true);
      setUsername(data.username);
    } catch (error) {
      throw error;
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

  const renderContent = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'register':
        return <Register onRegister={handleRegister} onNavigate={handleNavigate} />;
      case 'home':
        return <HomePage onStartGame={() => setCurrentPage('game')} />;
      case 'rules':
        return <Rules />;
      case 'game':
        return isAuthenticated ? <GameInterface /> : null;
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
        return <HomePage onStartGame={() => setCurrentPage('game')} />;
    }
  };

  return (
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
  );
};

export default App;