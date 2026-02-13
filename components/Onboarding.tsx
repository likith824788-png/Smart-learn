import React, { useState } from 'react';
import { ClusterType, UserProfile } from '../types';
import { determineCluster, ONBOARDING_QUESTIONS } from '../constants';
import { generatePersonalizedStudyPlan } from '../services/geminiService';
import { saveUser } from '../services/storageService';
import { auth } from '../services/firebase';

interface OnboardingProps {
  email: string;
  onComplete: (user: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ email, onComplete }) => {
  const [step, setStep] = useState(1); // 1: Profile, 2: Quiz
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    studyHoursPerWeek: 5,
    quizAttempts: 0,
    studySource: 'video' as 'video' | 'books',
  });

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [quizScore, setQuizScore] = useState(0);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Move to Quiz
  };

  const handleOptionSelect = (qId: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < ONBOARDING_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleQuizSubmit();
    }
  };

  const handleQuizSubmit = async () => {
    setLoading(true);

    // Calculate Score
    let score = 0;
    ONBOARDING_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    setQuizScore(score);

    const cluster = determineCluster(score);
    const uid = auth.currentUser?.uid;

    if (!uid) {
      console.error("No authenticated user found during onboarding");
      setLoading(false);
      return;
    }

    // Create base user object
    const newUser: UserProfile = {
      id: uid,
      email,
      name: formData.name,
      studyHoursPerWeek: formData.studyHoursPerWeek,
      quizAttempts: formData.quizAttempts,
      initialQuizScore: score, // Store raw score (0-9)
      studySource: formData.studySource,
      cluster,
      joinedAt: new Date().toISOString(),
    };

    // Generate AI Study Plan
    const plan = await generatePersonalizedStudyPlan(newUser);
    newUser.studyPlan = plan;

    await saveUser(newUser);
    setLoading(false);
    onComplete(newUser);
  };

  // Render Step 1: Profile Form
  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Student Profiling</h2>
            <p className="text-slate-500 text-sm">Tell us a bit about yourself first.</p>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Study Hours/Week</label>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.studyHoursPerWeek}
                  onChange={(e) => setFormData({ ...formData, studyHoursPerWeek: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Attempts</label>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.quizAttempts}
                  onChange={(e) => setFormData({ ...formData, quizAttempts: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Study Source</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, studySource: 'video' })}
                  className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-all ${formData.studySource === 'video'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  🎥 Videos
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, studySource: 'books' })}
                  className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-all ${formData.studySource === 'books'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  📚 Books
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-500/30 transition-all mt-4"
            >
              Submit & Take Assessment &rarr;
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Step 2: Assessment Quiz
  const currentQuestion = ONBOARDING_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / ONBOARDING_QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestionIndex === ONBOARDING_QUESTIONS.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center text-center p-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-6"></div>
            <h3 className="text-xl font-bold text-indigo-900 mb-2">Analyzing Your Skills...</h3>
            <p className="text-indigo-600 mb-1">You scored {quizScore} / 9</p>
            <p className="text-gray-500 text-sm">Generating your personalized study roadmap based on your results.</p>
          </div>
        )}

        <div className="mb-6">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded">
                {currentQuestion.course}
              </span>
              <h2 className="text-xl font-bold text-slate-800 mt-2">Skill Assessment</h2>
            </div>

            <span className="text-sm text-slate-500 font-medium">
              {currentQuestionIndex + 1} / {ONBOARDING_QUESTIONS.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg text-slate-700 font-medium mb-6">{currentQuestion.question}</p>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(currentQuestion.id, idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[currentQuestion.id] === idx
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-medium shadow-sm'
                  : 'border-gray-100 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 text-xs ${answers[currentQuestion.id] === idx ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-400 text-gray-500'
                    }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  {option}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-100">
          <button
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            className="px-6 py-2 text-slate-500 font-medium disabled:opacity-30 hover:text-slate-800 transition-colors"
          >
            Back
          </button>

          <button
            disabled={answers[currentQuestion.id] === undefined}
            onClick={handleNextQuestion}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2"
          >
            {isLastQuestion ? 'Finish & Analyze' : 'Next Question'}
            {!isLastQuestion && <span>&rarr;</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;