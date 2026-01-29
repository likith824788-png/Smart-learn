import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COURSES } from '../constants';
import { QuizResult, UserProfile } from '../types';
import { saveQuizResult, saveUser } from '../services/storageService';
import { generateQuizFeedback } from '../services/geminiService';

interface QuizProps {
  user: UserProfile;
  setUser: (u: UserProfile) => void;
}

const Quiz: React.FC<QuizProps> = ({ user, setUser }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === courseId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!course) return <div className="p-8 text-center text-slate-500">Course not found</div>;

  const handleOptionSelect = (qId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const calculateBadge = (percentage: number) => {
    if (percentage >= 90) return '🏆 Gold Master';
    if (percentage >= 75) return '🥈 Silver Expert';
    if (percentage >= 50) return '🥉 Bronze Achiever';
    return '🌱 Novice Learner';
  };

  const handleSubmitConfirm = () => {
    setShowConfirmation(true);
  };

  const handleSubmit = async () => {
    setShowConfirmation(false);
    setIsSubmitted(true);
    setLoadingFeedback(true);

    let score = 0;
    course.quizQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });

    const percentage = (score / course.quizQuestions.length) * 100;

    // Get Feedback
    const feedback = await generateQuizFeedback(course.title, score, course.quizQuestions.length);

    const quizResult: QuizResult = {
      id: Date.now().toString(),
      courseId: course.id,
      score,
      totalQuestions: course.quizQuestions.length,
      percentage,
      badge: calculateBadge(percentage),
      feedback,
      date: new Date().toISOString()
    };

    await saveQuizResult(user.id, quizResult);
    setResult(quizResult);
    setLoadingFeedback(false);

    // Invalidate recommendations so they regenerate based on new scores
    const updatedUser = { ...user, recommendations: [] };
    await saveUser(updatedUser);
    setUser(updatedUser);
  };

  // Confirmation Modal
  const ConfirmationModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Submit Quiz?</h3>
        <p className="text-slate-500 mb-6">
          You've answered {Object.keys(answers).length} of {course.quizQuestions.length} questions.
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
          <p className="text-slate-500 mb-8">Here is how you performed on {course.title}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-slate-500">Score</p>
              <p className="text-2xl font-bold text-indigo-600">{result.score} / {result.totalQuestions}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-slate-500">Badge Earned</p>
              <p className="text-lg font-bold text-yellow-600">{result.badge}</p>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-left mb-8">
            <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              💡 Smart Feedback
            </h3>
            {loadingFeedback ? (
              <p className="text-sm text-indigo-700 animate-pulse">Generating insights...</p>
            ) : (
              <p className="text-sm text-indigo-800 leading-relaxed">{result.feedback}</p>
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

  const question = course.quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / course.quizQuestions.length) * 100;
  const allAnswered = Object.keys(answers).length === course.quizQuestions.length;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {showConfirmation && <ConfirmationModal />}

      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-xl font-bold text-slate-800">Question {currentQuestionIndex + 1}</h2>
          <span className="text-sm text-slate-500">{currentQuestionIndex + 1} of {course.quizQuestions.length}</span>
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

          {currentQuestionIndex === course.quizQuestions.length - 1 ? (
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
          {course.quizQuestions.map((q, idx) => (
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
  );
};

export default Quiz;