import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { COURSES, calculateBadge } from '../constants';
import { QuizResult, UserProfile } from '../types';
import { saveQuizResult, saveUser } from '../services/storageService';
import { generateQuizFeedback } from '../services/geminiService';

interface QuizProps {
  user: UserProfile;
  setUser: (u: UserProfile) => void;
}

const Quiz: React.FC<QuizProps> = ({ user, setUser }) => {
  const { courseId, topicId, quizId } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === courseId);
  const topic = course?.topics.find(t => t.id === topicId); // Find topic if exists

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!course) return <div className="p-8 text-center text-slate-500">Course not found</div>;

  // Determine questions source
  let questions = course.quizQuestions;
  let quizTitle = course.title;

  if (topic && quizId && topic.quizzes) {
    const specificQuiz = topic.quizzes.find(q => q.id === quizId);
    if (specificQuiz) {
      questions = specificQuiz.questions;
      quizTitle = `${topic.title}: ${specificQuiz.title}`;
    }
  }

  const handleOptionSelect = (qId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const getBadgeColor = (badge: string) => {
    if (badge.includes('Gold')) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (badge.includes('Silver')) return 'text-slate-600 bg-slate-50 border-slate-200';
    if (badge.includes('Bronze')) return 'text-orange-700 bg-orange-50 border-orange-200';
    return 'text-green-700 bg-green-50 border-green-200';
  };

  const handleSubmitConfirm = () => {
    setShowConfirmation(true);
  };

  const handleSubmit = async () => {
    setShowConfirmation(false);
    setIsSubmitted(true);
    setLoadingFeedback(true);

    let score = 0;
    const missedQuestions: string[] = [];
    const questionResults: boolean[] = [];

    questions.forEach(q => {
      const isCorrect = answers[q.id] === q.correctAnswer;
      questionResults.push(isCorrect);

      if (isCorrect) {
        score++;
      } else {
        missedQuestions.push(q.text);
      }
    });

    const percentage = (score / questions.length) * 100;

    // Get Feedback
    const feedback = await generateQuizFeedback(quizTitle, score, questions.length, missedQuestions);

    const quizResult: QuizResult = {
      id: Date.now().toString(),
      courseId: course.id,
      topicId: topicId, // Save topic ID if available
      score,
      totalQuestions: questions.length,
      percentage,
      badge: calculateBadge(percentage),
      feedback,
      questionResults,
      answers, // Save the full answers map
      date: new Date().toISOString()
    };

    await saveQuizResult(user.id, quizResult);
    setResult(quizResult);
    setLoadingFeedback(false);

    // Invalidate recommendations so they regenerate based on new scores
    // Invalidate recommendations so they regenerate based on new scores
    // Update completed topics if a topicId is present
    const updatedCompletedTopics = user.completedTopics ? [...user.completedTopics] : [];
    if (topicId && !updatedCompletedTopics.includes(topicId)) {
      updatedCompletedTopics.push(topicId);
    }

    // Save updated user profile
    const updatedUser = {
      ...user,
      recommendations: [],
      completedTopics: updatedCompletedTopics
    };

    await saveUser(updatedUser);
    setUser(updatedUser);
  };

  // Confirmation Modal
  const ConfirmationModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Submit Quiz?</h3>
        <p className="text-slate-500 mb-6">
          You've answered {Object.keys(answers).length} of {questions.length} questions.
          Are you sure you want to submit?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowConfirmation(false)}
            className="flex-1 py-2.5 border border-gray-300 rounded-lg font-medium text-slate-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
          >
            Yes, Submit
          </button>
        </div>
      </div>
    </div>
  );

  if (result) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-6xl mb-4">{result.percentage >= 50 ? '🎉' : '📚'}</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Completed!</h2>
          <p className="text-slate-500 mb-8">Here is how you performed on {quizTitle}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-slate-500">Score</p>
              <p className="text-2xl font-bold text-indigo-600">{result.score} / {result.totalQuestions}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-slate-500">Badge Earned</p>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getBadgeColor(result.badge)}`}>
                {result.badge === 'Novice' ? (
                  <span className="text-xl">🌱</span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${result.badge === 'Gold' ? 'text-yellow-500' :
                    result.badge === 'Silver' ? 'text-gray-400' :
                      'text-amber-700'
                    }`}>
                    <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h14.625c.414 0 .75-.336.75-.75a2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="font-bold">{result.badge}</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-left mb-8">
            <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              💡 Smart Feedback
            </h3>
            {loadingFeedback ? (
              <p className="text-sm text-indigo-700 animate-pulse">Generating insights...</p>
            ) : (
              <div className="text-sm text-indigo-800 leading-relaxed prose prose-indigo max-w-none">
                <ReactMarkdown>{result.feedback}</ReactMarkdown>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const allAnswered = Object.keys(answers).length === questions.length;

  const handleExit = () => {
    if (topicId) {
      navigate(`/course/${courseId}/topic/${topicId}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 relative">
      <button
        onClick={handleExit}
        className="mb-8 flex items-center text-slate-500 hover:text-slate-800 font-medium transition-colors"
      >
        <span className="mr-2 text-xl">✕</span> Exit Quiz
      </button>

      <div className="max-w-3xl mx-auto">
        {showConfirmation && <ConfirmationModal />}

        <div className="mb-6">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-slate-800">Question {currentQuestionIndex + 1}</h2>
            <span className="text-sm text-slate-500">{currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 min-h-[400px] flex flex-col">
          <p className="text-lg font-medium text-slate-800 mb-8">{question.text}</p>

          <div className="space-y-3 flex-1">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(question.id, idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[question.id] === idx
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-medium'
                  : 'border-gray-100 hover:border-gray-300 text-gray-600'
                  }`}
              >
                <span className="inline-block w-6 h-6 rounded-full border border-current text-xs text-center leading-5 mr-3 opacity-50">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              className="px-6 py-2 text-slate-500 font-medium disabled:opacity-30 hover:text-slate-800"
            >
              Previous
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmitConfirm}
                disabled={!allAnswered}
                className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:shadow-none transition-all"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
          <p className="text-sm font-medium text-slate-600 mb-3">Question Navigator</p>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${currentQuestionIndex === idx
                  ? 'bg-indigo-600 text-white'
                  : answers[q.id] !== undefined
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;