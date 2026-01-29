export enum ClusterType {
  TOPPER = 'Topper', // > 75
  AVERAGE = 'Average', // > 50 & <= 75
  BELOW_AVERAGE = 'Below Average', // > 25 & <= 50
  FAILURE = 'Needs Improvement', // <= 25
}

export interface Recommendation {
  title: string;
  type: 'article' | 'video' | 'topic';
  link: string;
  reason: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  studyHoursPerWeek: number;
  quizAttempts: number;
  initialQuizScore: number;
  studySource: 'video' | 'books';
  cluster: ClusterType;
  studyPlan?: string; // Markdown content from Gemini
  recommendations?: Recommendation[]; // AI Generated specifics
  joinedAt: string;
}

export interface QuizResult {
  id: string;
  courseId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  badge: string;
  feedback?: string; // From Gemini
  date: string;
}

export interface Topic {
  id: string;
  title: string;
  videoUrl: string; // Placeholder or YouTube embed
  bookContent: string; // Text summary
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: Topic[];
  quizQuestions: Question[];
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}