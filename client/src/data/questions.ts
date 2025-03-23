interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// All available questions
const allQuestions: Question[] = [
  {
    id: '1',
    category: 'Budgeting',
    question: 'What is the 50/30/20 rule in budgeting?',
    options: [
      '50% needs, 30% wants, 20% savings',
      '50% savings, 30% needs, 20% wants',
      '50% wants, 30% savings, 20% needs',
      '50% needs, 30% savings, 20% wants'
    ],
    correctAnswer: 0,
    explanation: 'The 50/30/20 rule suggests spending 50% of income on needs, 30% on wants, and 20% on savings/debt repayment. This balanced approach helps ensure all financial aspects are covered while maintaining a sustainable lifestyle.',
    difficulty: 'easy'
  },
  {
    id: '2',
    category: 'Saving',
    question: 'What is compound interest?',
    options: [
      'Interest earned only on the principal amount',
      'Interest earned on both principal and accumulated interest',
      'A fixed interest rate that never changes',
      'Interest paid to the government'
    ],
    correctAnswer: 1,
    explanation: 'Compound interest is interest earned on both your initial investment (principal) and previously accumulated interest. This "interest on interest" effect can significantly accelerate wealth growth over time.',
    difficulty: 'medium'
  },
  {
    id: '3',
    category: 'Investment',
    question: 'What is diversification in investing?',
    options: [
      'Putting all money in high-risk stocks',
      'Investing only in well-known companies',
      'Spreading investments across different assets',
      'Keeping all money in a savings account'
    ],
    correctAnswer: 2,
    explanation: 'Diversification means spreading investments across different assets, sectors, and risk levels. This strategy helps reduce risk by ensuring that poor performance in one investment is potentially offset by better performance in others.',
    difficulty: 'medium'
  },
  {
    id: '4',
    category: 'Credit',
    question: 'What factor has the biggest impact on your credit score?',
    options: [
      'Payment history',
      'Credit utilization',
      'Length of credit history',
      'Types of credit accounts'
    ],
    correctAnswer: 0,
    explanation: 'Payment history accounts for 35% of your FICO credit score, making it the most important factor. Consistently paying bills on time shows lenders you\'re reliable and helps maintain a good credit score.',
    difficulty: 'hard'
  },
  {
    id: '5',
    category: 'Taxes',
    question: 'What is the difference between a tax deduction and a tax credit?',
    options: [
      'They are the same thing',
      'Credits reduce taxable income, deductions reduce taxes owed',
      'Deductions reduce taxable income, credits reduce taxes owed',
      'Neither affects your tax payment'
    ],
    correctAnswer: 2,
    explanation: 'Tax deductions reduce your taxable income, while tax credits directly reduce the amount of taxes you owe. Credits are generally more valuable because they provide a dollar-for-dollar reduction in your tax bill.',
    difficulty: 'hard'
  },
  {
    id: '6',
    category: 'Retirement',
    question: 'What is a 401(k) plan?',
    options: [
      'A type of savings account',
      'A retirement savings plan sponsored by an employer',
      'A government pension plan',
      'A type of insurance policy'
    ],
    correctAnswer: 1,
    explanation: 'A 401(k) is an employer-sponsored retirement savings plan that allows employees to contribute a portion of their salary on a pre-tax basis. Many employers also match employee contributions, making it a valuable retirement savings tool.',
    difficulty: 'medium'
  },
  {
    id: '7',
    category: 'Insurance',
    question: 'What is the purpose of a deductible in insurance?',
    options: [
      'To increase your monthly premium',
      'The amount you must pay before insurance coverage kicks in',
      'The maximum amount your insurance will pay',
      'A fee for filing a claim'
    ],
    correctAnswer: 1,
    explanation: 'A deductible is the amount you must pay out of pocket before your insurance coverage begins. Higher deductibles typically result in lower premiums, while lower deductibles mean higher premiums.',
    difficulty: 'easy'
  },
  {
    id: '8',
    category: 'Stock Market',
    question: 'What is a bull market?',
    options: [
      'A market where prices are falling',
      'A market where prices are rising',
      'A market with no price movement',
      'A market that only trades in bull-related stocks'
    ],
    correctAnswer: 1,
    explanation: 'A bull market is a period when stock prices are rising or expected to rise. It\'s characterized by investor confidence and optimism about the economy\'s future performance.',
    difficulty: 'easy'
  },
  {
    id: '9',
    category: 'Real Estate',
    question: 'What is equity in real estate?',
    options: [
      'The amount of your monthly mortgage payment',
      'The difference between your home\'s value and your mortgage balance',
      'The total amount of your mortgage',
      'The property tax amount'
    ],
    correctAnswer: 1,
    explanation: 'Equity is the difference between your home\'s current market value and the amount you still owe on your mortgage. It represents your ownership stake in the property.',
    difficulty: 'medium'
  },
  {
    id: '10',
    category: 'Cryptocurrency',
    question: 'What is blockchain technology?',
    options: [
      'A type of cryptocurrency',
      'A digital ledger that records transactions across a network',
      'A type of investment fund',
      'A digital wallet service'
    ],
    correctAnswer: 1,
    explanation: 'Blockchain is a decentralized digital ledger that records transactions across a network of computers. It\'s the underlying technology behind cryptocurrencies and provides transparency and security for digital transactions.',
    difficulty: 'hard'
  },
  {
    id: '11',
    category: 'Personal Finance',
    question: 'What is an emergency fund?',
    options: [
      'A type of investment account',
      'Money set aside for unexpected expenses',
      'A government assistance program',
      'A type of insurance policy'
    ],
    correctAnswer: 1,
    explanation: 'An emergency fund is money set aside specifically for unexpected expenses or financial emergencies. Financial experts typically recommend having 3-6 months of living expenses in your emergency fund.',
    difficulty: 'easy'
  },
  {
    id: '12',
    category: 'Debt Management',
    question: 'What is the debt avalanche method?',
    options: [
      'Taking on more debt to pay off existing debt',
      'Paying off debts with the highest interest rates first',
      'Paying off the smallest debts first',
      'Ignoring all debts until they go away'
    ],
    correctAnswer: 1,
    explanation: 'The debt avalanche method involves paying off debts with the highest interest rates first while making minimum payments on other debts. This strategy minimizes the total interest paid over time.',
    difficulty: 'medium'
  },
  {
    id: '13',
    category: 'Investment',
    question: 'What is a mutual fund?',
    options: [
      'A type of bank account',
      'A pool of money from multiple investors managed by professionals',
      'A government savings program',
      'A type of insurance policy'
    ],
    correctAnswer: 1,
    explanation: 'A mutual fund is an investment vehicle that pools money from multiple investors to purchase a diversified portfolio of stocks, bonds, or other securities. It\'s managed by professional fund managers.',
    difficulty: 'medium'
  },
  {
    id: '14',
    category: 'Taxes',
    question: 'What is a W-4 form?',
    options: [
      'A tax return form',
      'A form that determines how much tax is withheld from your paycheck',
      'A form for claiming tax deductions',
      'A form for reporting investment income'
    ],
    correctAnswer: 1,
    explanation: 'A W-4 form is used by employees to tell their employer how much federal income tax to withhold from their paycheck. It helps ensure you\'re paying the correct amount of taxes throughout the year.',
    difficulty: 'easy'
  },
  {
    id: '15',
    category: 'Banking',
    question: 'What is the difference between a checking and savings account?',
    options: [
      'There is no difference',
      'Checking accounts earn interest, savings accounts don\'t',
      'Savings accounts are for long-term storage, checking accounts for daily transactions',
      'Checking accounts are only for businesses'
    ],
    correctAnswer: 2,
    explanation: 'Savings accounts are designed for long-term storage of money and typically offer higher interest rates, while checking accounts are meant for daily transactions and bill payments.',
    difficulty: 'easy'
  },
  {
    id: '16',
    category: 'Investment',
    question: 'What is dollar-cost averaging?',
    options: [
      'Investing a fixed amount at regular intervals',
      'Investing only when the market is high',
      'Investing only when the market is low',
      'Investing all money at once'
    ],
    correctAnswer: 0,
    explanation: 'Dollar-cost averaging is an investment strategy where you invest a fixed amount of money at regular intervals, regardless of market conditions. This helps reduce the impact of market volatility.',
    difficulty: 'medium'
  },
  {
    id: '17',
    category: 'Credit',
    question: 'What is a credit utilization ratio?',
    options: [
      'The total amount of credit available',
      'The percentage of available credit being used',
      'The number of credit cards you have',
      'The interest rate on your credit cards'
    ],
    correctAnswer: 1,
    explanation: 'Credit utilization ratio is the percentage of your available credit that you\'re currently using. A lower ratio is better for your credit score, with experts recommending keeping it below 30%.',
    difficulty: 'medium'
  },
  {
    id: '18',
    category: 'Retirement',
    question: 'What is a Roth IRA?',
    options: [
      'A type of savings account',
      'A retirement account where contributions are taxed but withdrawals are tax-free',
      'A government pension plan',
      'A type of investment fund'
    ],
    correctAnswer: 1,
    explanation: 'A Roth IRA is a retirement account where you pay taxes on contributions but can withdraw money tax-free in retirement. This can be advantageous if you expect to be in a higher tax bracket in retirement.',
    difficulty: 'hard'
  },
  {
    id: '19',
    category: 'Insurance',
    question: 'What is term life insurance?',
    options: [
      'Insurance that covers you for your entire life',
      'Insurance that covers you for a specific period',
      'Insurance that only covers accidents',
      'Insurance that only covers health issues'
    ],
    correctAnswer: 1,
    explanation: 'Term life insurance provides coverage for a specific period (term) and pays a death benefit if you die during that period. It\'s typically more affordable than whole life insurance.',
    difficulty: 'medium'
  },
  {
    id: '20',
    category: 'Real Estate',
    question: 'What is PMI in real estate?',
    options: [
      'A type of property tax',
      'Private Mortgage Insurance required for down payments less than 20%',
      'A type of home warranty',
      'A property management fee'
    ],
    correctAnswer: 1,
    explanation: 'PMI (Private Mortgage Insurance) is insurance that lenders require when borrowers make a down payment of less than 20% on a home. It protects the lender if the borrower defaults on the loan.',
    difficulty: 'hard'
  }
];

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to get random questions
export function getRandomQuestions(count: number = 10): Question[] {
  const shuffledQuestions = shuffleArray(allQuestions);
  return shuffledQuestions.slice(0, count);
}

// Function to get additional questions after quiz completion
export function getMoreQuestions(previousQuestions: Question[], count: number = 5): Question[] {
  // Filter out previously used questions
  const availableQuestions = allQuestions.filter(
    question => !previousQuestions.some(prev => prev.id === question.id)
  );
  
  // Shuffle remaining questions and get new ones
  const shuffledRemaining = shuffleArray(availableQuestions);
  return shuffledRemaining.slice(0, count);
}

// Export a function that returns initial questions
export const getQuestions = () => getRandomQuestions(10);