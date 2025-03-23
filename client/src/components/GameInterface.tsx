import React, { useState, useEffect } from 'react';
import { Heart, Trophy, TrendingUp, Star, Timer, Book, AlertCircle } from 'lucide-react';
import type { Question, GameState } from '../types';
import { getQuestions, getMoreQuestions } from '../data/questions';
import { useAuth } from '../contexts/AuthContext';
import { gameService } from '../services/game.service';

const GameInterface: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    health: 100,
    score: 0,
    level: 1,
    currentQuestion: null,
    answeredQuestions: [],
    achievements: [],
    streak: 0,
    questions: getQuestions() // Initialize with first set of questions
  });

  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showContinueModal, setShowContinueModal] = useState(false);
  const { token, user } = useAuth();

  const getRandomQuestion = () => {
    const unansweredQuestions = gameState.questions.filter(
      q => !gameState.answeredQuestions.includes(q.id)
    );
    if (unansweredQuestions.length === 0) {
      setShowContinueModal(true);
      return null;
    }
    return unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)];
  };

  const handleContinue = () => {
    const newQuestions = getMoreQuestions(gameState.questions);
    setGameState(prev => ({
      ...prev,
      questions: [...prev.questions, ...newQuestions],
      currentQuestion: null
    }));
    setShowContinueModal(false);
  };

  useEffect(() => {
    if (!gameState.currentQuestion) {
      setGameState(prev => ({
        ...prev,
        currentQuestion: getRandomQuestion()
      }));
      setTimeLeft(30);
      setShowExplanation(false);
      setSelectedAnswer(null);
    }
  }, [gameState.currentQuestion]);

  useEffect(() => {
    if (timeLeft > 0 && gameState.currentQuestion && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleAnswer(-1); // Time's up!
    }
  }, [timeLeft, gameState.currentQuestion, showExplanation]);

  const saveGameProgress = async (isCorrect: boolean) => {
    if (!gameState.currentQuestion) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to save your progress');
        return;
      }

      const updatedStats = await gameService.saveGameProgress({
        health: gameState.health,
        score: gameState.score,
        questionId: gameState.currentQuestion.id,
        correct: isCorrect,
        streak: gameState.streak
      });

      setGameState(prev => ({
        ...prev,
        rank: updatedStats.rank
      }));
    } catch (error) {
      console.error('Error saving game progress:', error);
      alert('Failed to save game progress. Please check your connection.');
    }
  };

  const handleAnswer = async (selectedIndex: number) => {
    if (!gameState.currentQuestion || showExplanation) return;

    setSelectedAnswer(selectedIndex);
    setShowExplanation(true);

    const isCorrect = selectedIndex === gameState.currentQuestion.correctAnswer;
    const healthChange = isCorrect ? 10 : -15;
    const scoreChange = isCorrect ?
      (gameState.currentQuestion.difficulty === 'hard' ? 30 :
        gameState.currentQuestion.difficulty === 'medium' ? 20 : 10) : 0;

    const newStreak = isCorrect ? gameState.streak + 1 : 0;
    const streakBonus = Math.floor(newStreak / 3) * 5;

    // Save progress to server
    await saveGameProgress(isCorrect);

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        health: Math.min(100, Math.max(0, prev.health + healthChange)),
        score: prev.score + scoreChange + streakBonus,
        streak: newStreak,
        answeredQuestions: [...prev.answeredQuestions, prev.currentQuestion!.id],
        currentQuestion: null
      }));
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Stats Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <Heart
                className={`w-6 h-6 ${gameState.health > 60 ? 'text-green-500' :
                  gameState.health > 30 ? 'text-yellow-500' : 'text-red-500'
                  }`}
              />
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${gameState.health > 60 ? 'bg-green-500' :
                      gameState.health > 30 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    style={{ width: `${gameState.health}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{gameState.health}%</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <div>
                <div className="text-lg font-bold">{gameState.score}</div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-purple-500" />
              <div>
                <div className="text-lg font-bold">{gameState.streak}</div>
                <div className="text-xs text-gray-500">Streak</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <div>
                <div className="text-lg font-bold">{gameState.level}</div>
                <div className="text-xs text-gray-500">Level</div>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          {gameState.currentQuestion ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${getDifficultyColor(gameState.currentQuestion.difficulty)}`}>
                  {gameState.currentQuestion.difficulty.toUpperCase()}
                </span>
                <span className="text-sm text-gray-500">
                  {gameState.currentQuestion.category}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                {gameState.currentQuestion.question}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {gameState.currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showExplanation}
                    className={`p-4 text-left rounded-lg border transition-all duration-200 ${showExplanation
                      ? index === gameState.currentQuestion!.correctAnswer
                        ? 'bg-green-100 border-green-500'
                        : index === selectedAnswer
                          ? 'bg-red-100 border-red-500'
                          : 'bg-gray-50 border-gray-200'
                      : 'border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showExplanation && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <Book className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900">Explanation</h3>
                      <p className="text-blue-800">{gameState.currentQuestion.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
              <p className="text-gray-600">Loading next question...</p>
            </div>
          )}
        </div>

        {/* Continue Modal */}
        {showContinueModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 max-w-md mx-4">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Great Job!</h2>
                <p className="text-gray-600 mb-6">
                  You've completed this set of questions! Would you like to continue with more?
                </p>
                <div className="space-x-4">
                  <button
                    onClick={handleContinue}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => setGameState({
                      health: 100,
                      score: 0,
                      level: 1,
                      currentQuestion: null,
                      answeredQuestions: [],
                      achievements: [],
                      streak: 0,
                      questions: getQuestions()
                    })}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Start New Game
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Over State */}
        {gameState.health <= 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 max-w-md mx-4">
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                <p className="text-gray-600 mb-6">Final Score: {gameState.score}</p>
                <button
                  onClick={() => setGameState({
                    health: 100,
                    score: 0,
                    level: 1,
                    currentQuestion: null,
                    answeredQuestions: [],
                    achievements: [],
                    streak: 0,
                    questions: getQuestions()
                  })}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameInterface;