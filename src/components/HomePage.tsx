import React, { useState, useEffect } from 'react';
import { TrendingUp, BookOpen, Target, DollarSign, PiggyBank, LineChart, Award, Users, ArrowRight } from 'lucide-react';

interface FinancialTip {
  id: number;
  title: string;
  description: string;
  category: string;
}

const financialTips: FinancialTip[] = [
  {
    id: 1,
    title: "Start Early",
    description: "The earlier you start investing, the more time your money has to grow through compound interest.",
    category: "Investment"
  },
  {
    id: 2,
    title: "Emergency Fund",
    description: "Build an emergency fund with 3-6 months of living expenses for financial security.",
    category: "Savings"
  },
  {
    id: 3,
    title: "Diversify",
    description: "Spread your investments across different assets to reduce risk.",
    category: "Investment"
  },
  {
    id: 4,
    title: "Budget Tracking",
    description: "Use the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt.",
    category: "Budgeting"
  },
  {
    id: 5,
    title: "Credit Score",
    description: "Maintain a good credit score by paying bills on time and keeping credit utilization below 30%.",
    category: "Credit"
  },
  {
    id: 6,
    title: "Retirement Planning",
    description: "Contribute to retirement accounts early and take advantage of employer matching.",
    category: "Retirement"
  },
  {
    id: 7,
    title: "Tax Efficiency",
    description: "Maximize tax-advantaged accounts and understand tax deductions to keep more of your money.",
    category: "Taxes"
  },
  {
    id: 8,
    title: "Insurance Coverage",
    description: "Ensure adequate insurance coverage for health, life, and property to protect your assets.",
    category: "Insurance"
  },
  {
    id: 9,
    title: "Debt Management",
    description: "Focus on high-interest debt first and consider debt consolidation for better rates.",
    category: "Debt"
  },
  {
    id: 10,
    title: "Market Research",
    description: "Stay informed about market trends but avoid making emotional investment decisions.",
    category: "Investment"
  }
];

const HomePage: React.FC<{ onStartGame: () => void }> = ({ onStartGame }) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % financialTips.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-900 dark:text-green-400 mb-4">
            Master Your Finances Through Play
          </h1>
          <p className="text-xl text-gray-600 dark:text-black-300 mb-8">
            Learn essential financial concepts while having fun. Test your knowledge and improve your financial literacy!
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onStartGame}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Game
            </button>
            <button
              onClick={() => setShowStats(!showStats)}
              className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>
        </div>

        {/* Stats Section */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <DollarSign className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$1.2M</h3>
              <p className="text-gray-600 dark:text-gray-300">Average Savings</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <Users className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">10K+</h3>
              <p className="text-gray-600 dark:text-gray-300">Active Players</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <Award className="h-8 w-8 text-yellow-500 mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">85%</h3>
              <p className="text-gray-600 dark:text-gray-300">Success Rate</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <LineChart className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">24%</h3>
              <p className="text-gray-600 dark:text-gray-300">Knowledge Growth</p>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <TrendingUp className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Learn Investment Basics</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Understand fundamental concepts of investing and growing your wealth responsibly.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <BookOpen className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Budget Management</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Master the art of budgeting and make your money work for you.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <Target className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Financial Goals</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Learn to set and achieve your financial goals through smart planning.
            </p>
          </div>
        </div>

        {/* Financial Tips Carousel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Financial Tips</h2>
          <div className="relative h-32">
            {financialTips.map((tip, index) => (
              <div
                key={tip.id}
                className={`absolute w-full transition-opacity duration-500 ${
                  index === currentTip ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <PiggyBank className="h-8 w-8 text-yellow-500" />
                  <div>
                    <h3 className="text-lg font-semibold dark:text-white">{tip.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{tip.description}</p>
                    <span className="text-sm text-blue-500">{tip.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            {financialTips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTip(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentTip ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Financial Journey?</h2>
          <p className="mb-6">Join thousands of players who are improving their financial literacy through play.</p>
          <button
            onClick={onStartGame}
            className="bg-white text-blue-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center mx-auto"
          >
            Start Learning Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;