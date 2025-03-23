import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  gameStats: {
    marks: number;
    health: number;
    rank: string;
    streak: number;
    highScore: number;
    questionsAnswered: number;
    correctAnswers: number;
  };
  questionHistory: Array<{
    questionId: string;
    correct: boolean;
    timestamp: Date;
  }>;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gameStats: {
    marks: { type: Number, default: 0 },
    health: { type: Number, default: 100 },
    rank: { type: String, default: 'Beginner' },
    streak: { type: Number, default: 0 },
    highScore: { type: Number, default: 0 },
    questionsAnswered: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 }
  },
  questionHistory: [{
    questionId: String,
    correct: Boolean,
    timestamp: { type: Date, default: Date.now }
  }]
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema); 