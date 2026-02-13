export enum ClusterType {
  ADVANCE = 'Advance', // 7-9 Correct
  INTERMEDIATE = 'Intermediate', // 4-6 Correct
  EXPLORER = 'Explorer', // 0-3 Correct
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
  studyPlanStartDate?: string; // ISO Date string for tracking 7-day progress
  recommendations?: Recommendation[]; // AI Generated specifics
  joinedAt: string;
  completedTopics?: string[]; // Array of topic IDs that user has completed
}

export interface QuizResult {
  id: string;
  courseId: string;
  topicId?: string; // Added for granular history
  score: number;
  totalQuestions: number;
  percentage: number;
  badge: string;
  feedback?: string; // From Gemini
  questionResults?: boolean[]; // Array of true/false for each question
  answers?: { [key: number]: number }; // Map of questionId -> selectedOptionIndex
  date: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index
}

export interface TopicQuiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Topic {
  id: string;
  title: string;
  videoUrl: string; // Placeholder or YouTube embed
  bookContent: string; // Text summary
  quizzes?: TopicQuiz[];
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