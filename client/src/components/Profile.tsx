import React, { useEffect, useState } from 'react';
import { User, Star, Heart, Trophy, TrendingUp, Award, Target, Zap, Medal } from 'lucide-react';
import { statsService, GameStats } from '../services/stats.service';

interface ProfileProps {
  username: string;
  marks?: number;
  health?: number;
  rank?: string;
  streak?: number;
}

const Profile: React.FC<ProfileProps> = ({
  username,
  marks = 0,
  health = 100,
  rank = 'Beginner',
  streak = 0
}) => {
  const [stats, setStats] = useState<GameStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userStats = await statsService.getUserStats();
        setStats(userStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading stats...</div>;
  }

  if (!stats) {
    return <div>No stats available</div>;
  }

  // Calculate level based on marks (every 1000 marks = 1 level)
  const level = Math.floor(marks / 1000) + 1;
  const nextLevelMarks = level * 1000;
  const progressToNextLevel = (marks % 1000) / 10;

  // Mock achievements
  const achievements = [
    { icon: <Target className="h-6 w-6" />, title: "First Win", description: "Win your first game", earned: true },
    { icon: <Zap className="h-6 w-6" />, title: "Speed Demon", description: "Complete a game in under 2 minutes", earned: false },
    { icon: <Medal className="h-6 w-6" />, title: "Perfect Score", description: "Score 100% in a game", earned: false },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Username</h2>
          <p className="mt-1 text-lg text-gray-900">{username}</p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500">Email</h2>
          <p className="mt-1 text-lg text-gray-900">{username}@example.com</p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500">Member Since</h2>
          <p className="mt-1 text-lg text-gray-900">January 1, 2024</p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500">Stats</h2>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Marks</p>
              <p className="text-lg font-semibold text-gray-900">{stats.gameStats.marks}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Health</p>
              <p className="text-lg font-semibold text-gray-900">{stats.gameStats.health}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Rank</p>
              <p className="text-lg font-semibold text-gray-900">{stats.gameStats.rank}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Streak</p>
              <p className="text-lg font-semibold text-gray-900">{stats.gameStats.streak}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Header with Level */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="h-12 w-12 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{username}</h1>
            <p className="text-gray-600">Financial IQ Player</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-bold text-gray-800">Level {level}</span>
          </div>
          <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="h-2 bg-yellow-500 rounded-full transition-all duration-500"
              style={{ width: `${progressToNextLevel}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{marks}/{nextLevelMarks} XP</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Marks Card */}
        <div className="bg-blue-50 rounded-lg p-6 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center space-x-3 mb-2">
            <Star className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Marks</h2>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-blue-600">{stats.gameStats.marks}</span>
            <span className="ml-2 text-gray-600">points</span>
          </div>
        </div>

        {/* Health Card */}
        <div className="bg-red-50 rounded-lg p-6 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center space-x-3 mb-2">
            <Heart className="h-6 w-6 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-800">Health</h2>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-red-600">{stats.gameStats.health}</span>
            <span className="ml-2 text-gray-600">points</span>
          </div>
        </div>

        {/* Rank Card */}
        <div className="bg-yellow-50 rounded-lg p-6 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center space-x-3 mb-2">
            <Trophy className="h-6 w-6 text-yellow-600" />
            <h2 className="text-lg font-semibold text-gray-800">Rank</h2>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-yellow-600">#{stats.gameStats.rank}</span>
            <span className="ml-2 text-gray-600">in leaderboard</span>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-green-50 rounded-lg p-6 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-800">Streak</h2>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-green-600">{stats.gameStats.streak}</span>
            <span className="ml-2 text-gray-600">days</span>
          </div>
        </div>
      </div>

      {/* Health Bar */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Health Status</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(stats.gameStats.health / 100) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${achievement.earned
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200'
                }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className={`${achievement.earned ? 'text-green-600' : 'text-gray-400'}`}>
                  {achievement.icon}
                </div>
                <h4 className={`font-semibold ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                  {achievement.title}
                </h4>
              </div>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add new stats section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Accuracy</p>
            <p className="text-xl font-bold text-blue-600">{stats.summary.accuracy}%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Questions Answered</p>
            <p className="text-xl font-bold text-green-600">{stats.summary.totalQuestions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 