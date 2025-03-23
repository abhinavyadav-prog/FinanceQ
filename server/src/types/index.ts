import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export interface GameStats {
  health: number;
  score: number;
  questionId: string;
  correct: boolean;
  streak: number;
} 