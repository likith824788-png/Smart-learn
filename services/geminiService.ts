import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserProfile, QuizResult, Recommendation } from "../types";

// Access via Vite Env Var
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Helper to get model
const getModel = () => {
  return genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      maxOutputTokens: 600,
      temperature: 0.7,
    }
  });
};

export const generatePersonalizedStudyPlan = async (user: Omit<UserProfile, 'id' | 'joinedAt' | 'studyPlan'>): Promise<string> => {
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    return "⚠️ Please configure your API key in the .env.local file to enable AI-powered study plans.";
  }

  const model = getModel();
  const prompt = `Create a personalized weekly study plan for a student:
- Performance Level: ${user.cluster}
- Available Hours: ${user.studyHoursPerWeek} hours/week
- Preferred Learning: ${user.studySource === 'video' ? 'Video tutorials' : 'Reading materials'}

Provide:
1. Daily schedule breakdown
2. Specific topics to focus on
3. Practice recommendations
4. Tips for their level

Format in markdown with headers and bullet points. Be specific and actionable.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Error:", error);
    return "Unable to generate study plan. Please check your internet connection and try again.";
  }
};

export const generateQuizFeedback = async (courseName: string, score: number, total: number, missedQuestions: string[]): Promise<string> => {
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    return score >= total / 2
      ? "Great job! You're making solid progress. Review any questions you missed and keep practicing!"
      : "Keep practicing! Review the course materials and try again. Focus on understanding the concepts.";
  }

  const percentage = (score / total) * 100;
  const model = getModel();

  let prompt = `A student completed a ${courseName} quiz with score ${score}/${total} (${percentage.toFixed(0)}%).`;

  if (missedQuestions.length > 0) {
    prompt += `\n\nThey missed questions related to: ${missedQuestions.join(', ')}.`;
  }

  prompt += `\n\nProvide personalized feedback in markdown format:
1. Short encouraging summary (1 sentence).
2. exactly 5 to 6 specific, actionable suggestions for improvement based on their performance and missed topics.
3. Use bullet points for suggestions.
4. Keep it friendly and supportive.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Feedback Error:", error);
    return "Good effort! Keep reviewing the materials and practicing regularly.";
  }
};

export const generateLearningRecommendations = async (user: UserProfile, history: QuizResult[]): Promise<Recommendation[]> => {
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY' || history.length === 0) return [];

  const recentHistory = history.slice(0, 3).map(h =>
    `${h.courseId}: ${h.percentage.toFixed(0)}%`
  ).join(', ');

  const model = getModel();
  const prompt = `Based on quiz performance: ${recentHistory}
Student cluster: ${user.cluster}
Preferred learning: ${user.studySource}

Recommend 3 specific learning resources. Return ONLY a valid JSON array:
[
  {"title": "Resource name", "type": "video", "link": "https://youtube.com/watch?v=...", "reason": "Why this helps"},
  {"title": "Resource name", "type": "article", "link": "https://docs.python.org/...", "reason": "Why this helps"},
  {"title": "Topic name", "type": "topic", "link": "https://realpython.com/...", "reason": "Why this helps"}
]

Use real URLs from: YouTube, freeCodeCamp, Real Python, MDN, W3Schools, GeeksforGeeks, Coursera.
No markdown, just the JSON array.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean JSON
    const jsonString = text.replace(/```json\n|\n```|```/g, "").trim();
    return JSON.parse(jsonString) as Recommendation[];
  } catch (error) {
    console.error("AI Recommendations Error:", error);
    return [];
  }
};
