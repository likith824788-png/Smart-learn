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
  const topic = course?.topics.find(t => t.id === topicId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!course) return <div className="p-8 text-center text-slate-400">Course not found</div>;

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

  const getBadgeStyle = (badge: string) => {
    if (badge.includes('Gold')) return 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400';
    if (badge.includes('Silver')) return 'from-slate-400/20 to-slate-400/5 border-slate-400/30 text-slate-300';
    if (badge.includes('Bronze')) return 'from-amber-600/20 to-amber-600/5 border-amber-600/30 text-amber-500';
    return 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400';
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
    const feedback = await generateQuizFeedback(quizTitle, score, questions.length, missedQuestions);

    const quizResult: QuizResult = {
      id: Date.now().toString(),
      courseId: course.id,
      topicId: topicId,
      score,
      totalQuestions: questions.length,
      percentage,
      badge: calculateBadge(percentage),
      feedback,
      questionResults,
      answers,
      date: new Date().toISOString()
    };

    await saveQuizResult(user.id, quizResult);
    setResult(quizResult);
    setLoadingFeedback(false);

    const updatedCompletedTopics = user.completedTopics ? [...user.completedTopics] : [];
    if (topicId && !updatedCompletedTopics.includes(topicId)) {
      updatedCompletedTopics.push(topicId);
    }

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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full animate-fade-in">
        <h3 className="text-xl font-bold text-white mb-2">Submit Quiz?</h3>
        <p className="text-slate-400 text-sm mb-6">
          You've answered {Object.keys(answers).length} of {questions.length} questions.
          Are you sure you want to submit?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowConfirmation(false)}
            className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl font-medium text-slate-300 hover:bg-white/10 transition-all text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all text-sm"
          >
            Yes, Submit
          </button>
        </div>
      </div>
    </div>
  );

  if (result) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full animate-fade-in">
          <div className="glass-card rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500"></div>

            <div className="text-6xl mb-5">{result.percentage >= 50 ? '🎉' : '📚'}</div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Quiz Completed!</h2>
            <p className="text-slate-400 text-sm mb-8">Here is how you performed on {quizTitle}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-light rounded-2xl p-5">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Score</p>
                <p className="text-2xl font-bold gradient-text">{result.score} / {result.totalQuestions}</p>
              </div>
              <div className="glass-light rounded-2xl p-5">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Badge</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-gradient-to-r ${getBadgeStyle(result.badge)}`}>
                  {result.badge === 'Novice' ? (
                    <span className="text-lg">🌱</span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h14.625c.414 0 .75-.336.75-.75a2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="font-bold text-sm">{result.badge}</span>
                </div>
              </div>
            </div>

            <div className="glass-light rounded-2xl p-6 text-left mb-8">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Smart Feedback
              </h3>
              {loadingFeedback ? (
                <p className="text-sm text-slate-400 animate-pulse">Generating insights...</p>
              ) : (
                <div className="text-sm text-slate-300 leading-relaxed prose-dark prose max-w-none">
                  <ReactMarkdown>{result.feedback}</ReactMarkdown>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full btn-gradient text-white font-semibold py-3.5 rounded-xl text-sm tracking-wide"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  const allAnswered = Object.keys(answers).length === questions.length;

  const handleExit = () => {
    if (topicId) {
      navigate(`/course/${courseId}/topic/${topicId}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 p-6 md:p-10 relative">
      <button
        onClick={handleExit}
        className="mb-8 flex items-center text-slate-500 hover:text-white font-medium transition-colors text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Exit Quiz
      </button>

      <div className="max-w-3xl mx-auto animate-fade-in">
        {showConfirmation && <ConfirmationModal />}

        <div className="mb-6">
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-lg font-bold text-white">Question {currentQuestionIndex + 1}</h2>
            <span className="text-sm text-slate-500 font-medium">{currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-dark-600 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-cyan-500 to-violet-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 min-h-[400px] flex flex-col">
          <p className="text-lg font-medium text-white mb-8">{question.text}</p>

          <div className="space-y-3 flex-1">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(question.id, idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${answers[question.id] === idx
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-lg shadow-cyan-500/5'
                  : 'bg-dark-700/50 border-white/5 text-slate-300 hover:border-white/15 hover:bg-dark-600/50'
                  }`}
              >
                <span className={`inline-block w-6 h-6 rounded-full border text-xs text-center leading-6 mr-3 transition-all ${answers[question.id] === idx
                  ? 'border-cyan-400 bg-cyan-500 text-white'
                  : 'border-slate-600 text-slate-500'
                  }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm">{option}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              className="px-6 py-2.5 text-slate-400 font-medium disabled:opacity-30 hover:text-white transition-colors text-sm"
            >
              Previous
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmitConfirm}
                disabled={!allAnswered}
                className="px-8 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:shadow-none transition-all hover:shadow-lg hover:shadow-emerald-500/20 text-sm"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-6 py-2.5 btn-gradient text-white rounded-xl font-medium transition-all text-sm"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-6 glass-card rounded-xl p-4">
          <p className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wider">Question Navigator</p>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentQuestionIndex === idx
                  ? 'bg-gradient-to-br from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/20'
                  : answers[q.id] !== undefined
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                    : 'bg-dark-600 text-slate-500 hover:bg-dark-500'
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