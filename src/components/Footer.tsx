import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-2 text-gray-600">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-red-500" />
          <span>for financial literacy</span>
        </div>
        <div className="text-center mt-2 text-sm text-gray-500">
          © {new Date().getFullYear()} FinanceQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;