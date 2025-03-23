import { Request, Response } from 'express';
import { User } from '../models/User';

export const statsController = {
  async getUserStats(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const stats = {
        gameStats: user.gameStats,
        questionHistory: user.questionHistory,
        summary: {
          totalQuestions: user.gameStats.questionsAnswered,
          correctAnswers: user.gameStats.correctAnswers,
          accuracy: user.gameStats.questionsAnswered > 0
            ? (user.gameStats.correctAnswers / user.gameStats.questionsAnswered * 100).toFixed(1)
            : 0,
          highestStreak: user.gameStats.streak,
          currentRank: user.gameStats.rank
        }
      };

      res.json(stats);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      res.status(500).json({ message: 'Error fetching stats' });
    }
  },

  async updateGameStats(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const { health, score, questionId, correct, streak } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update game stats
      user.gameStats.health = health;
      user.gameStats.marks = Math.max(user.gameStats.marks, score);
      user.gameStats.streak = streak;
      user.gameStats.questionsAnswered++;
      if (correct) {
        user.gameStats.correctAnswers++;
      }

      // Update rank based on score
      if (score >= 1000) {
        user.gameStats.rank = 'Expert';
      } else if (score >= 500) {
        user.gameStats.rank = 'Advanced';
      } else if (score >= 200) {
        user.gameStats.rank = 'Intermediate';
      }

      // Add to question history
      user.questionHistory.push({
        questionId,
        correct,
        timestamp: new Date()
      });

      await user.save();
      res.json(user.gameStats);
    } catch (error) {
      console.error('Error updating game stats:', error);
      res.status(500).json({ message: 'Error updating stats' });
    }
  }
}; 