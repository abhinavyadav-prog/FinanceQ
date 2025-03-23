import api from './api';

export const gameService = {
  saveGameProgress: async (gameData: {
    health: number;
    score: number;
    questionId: string;
    correct: boolean;
    streak: number;
  }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.post('/game/stats', gameData);
      return response.data;
    } catch (error) {
      console.error('Game service error:', error);
      throw error;
    }
  },

  getLeaderboard: async () => {
    try {
      const response = await api.get('/game/leaderboard');
      return response.data;
    } catch (error) {
      console.error('Leaderboard error:', error);
      throw error;
    }
  },
}; 