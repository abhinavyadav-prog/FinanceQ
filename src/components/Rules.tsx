import React from 'react';
import { ScrollText, Heart, Trophy, Star } from 'lucide-react';

const Rules: React.FC = () => {
  return (
    <div className="flex-grow">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <ScrollText className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Game Rules</h1>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Game Mechanics</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Answer financial literacy questions across different categories</li>
                <li>Questions vary in difficulty: Easy, Medium, and Hard</li>
                <li>You have 30 seconds to answer each question</li>
                <li>Choose your answer carefully - you only get one attempt per question</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Scoring System</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Heart className="h-6 w-6 text-red-500 mb-2" />
                  <h3 className="font-semibold mb-2">Health</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Start with 100% health</li>
                    <li>+10% for correct answers</li>
                    <li>-15% for wrong answers</li>
                    <li>Game ends at 0% health</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Trophy className="h-6 w-6 text-yellow-500 mb-2" />
                  <h3 className="font-semibold mb-2">Points</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Easy: 10 points</li>
                    <li>Medium: 20 points</li>
                    <li>Hard: 30 points</li>
                    <li>Time bonus: Up to 5 points</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <Star className="h-6 w-6 text-purple-500 mb-2" />
                  <h3 className="font-semibold mb-2">Streaks</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Build streaks with correct answers</li>
                    <li>Bonus points every 3 correct answers</li>
                    <li>Streak resets on wrong answers</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Tips for Success</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Read each question carefully before answering</li>
                <li>Use the explanation provided after each answer to learn</li>
                <li>Try to maintain your health above 50% for optimal learning</li>
                <li>Focus on building streaks for bonus points</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;