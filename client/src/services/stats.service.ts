import api from './api';

export interface GameStats {
  gameStats: {
    marks: number;
    health: number;
    rank: string;
    streak: number;
    questionsAnswered: number;
    correctAnswers: number;
  };
  questionHistory: Array<{
    questionId: string;
    correct: boolean;
    timestamp: Date;
  }>;
  summary: {
    totalQuestions: number;
    correctAnswers: number;
    accuracy: string;
    highestStreak: number;
    currentRank: string;
  };
}

export const statsService = {
  getUserStats: async (): Promise<GameStats> => {
    try {
      const response = await api.get('/game/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  },

  saveGameProgress: async (gameData: {
    health: number;
    score: number;
    questionId: string;
    correct: boolean;
    streak: number;
  }) => {
    try {
      const response = await api.post('/game/stats', gameData);
      return response.data;
    } catch (error) {
      console.error('Error saving game progress:', error);
      throw error;
    }
  }
}; 