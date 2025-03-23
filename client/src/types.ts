export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameState {
  health: number;
  score: number;
  level: number;
  currentQuestion: Question | null;
  answeredQuestions: string[];
  achievements: string[];
  streak: number;
  questions: Question[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
}