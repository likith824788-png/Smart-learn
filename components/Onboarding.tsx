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

  // Step indicators
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-3 mb-10">
      <div className={`flex items-center gap-2 ${step >= 1 ? 'text-cyan-400' : 'text-slate-600'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-gradient-to-br from-cyan-500 to-violet-500 text-white' : 'bg-dark-600 text-slate-400'}`}>1</div>
        <span className="text-sm font-medium hidden sm:inline">Profile</span>
      </div>
      <div className={`w-10 h-px ${step >= 2 ? 'bg-cyan-500' : 'bg-slate-700'}`}></div>
      <div className={`flex items-center gap-2 ${step >= 2 ? 'text-cyan-400' : 'text-slate-600'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-gradient-to-br from-cyan-500 to-violet-500 text-white' : 'bg-dark-600 text-slate-400'}`}>2</div>
        <span className="text-sm font-medium hidden sm:inline">Assessment</span>
      </div>
    </div>
  );

  // Render Step 1: Profile Form
  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950 p-4 relative overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-cyan-500 -top-40 -right-40" style={{ position: 'absolute' }}></div>
        <div className="orb w-[400px] h-[400px] bg-violet-600 bottom-0 left-0" style={{ position: 'absolute' }}></div>

        <div className="glass-card rounded-3xl w-full max-w-lg relative z-10 animate-fade-in">
          <div className="p-10">
            <StepIndicator />

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">Student Profiling</h2>
              <p className="text-slate-400 text-sm mt-1">Tell us a bit about yourself first.</p>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="dark-input w-full p-3.5 rounded-xl text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Study Hours/Week</label>
                  <input
                    type="number"
                    min="0"
                    required
                    className="dark-input w-full p-3.5 rounded-xl text-sm"
                    value={formData.studyHoursPerWeek}
                    onChange={(e) => setFormData({ ...formData, studyHoursPerWeek: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Quiz Attempts</label>
                  <input
                    type="number"
                    min="0"
                    required
                    className="dark-input w-full p-3.5 rounded-xl text-sm"
                    value={formData.quizAttempts}
                    onChange={(e) => setFormData({ ...formData, quizAttempts: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Preferred Study Source</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, studySource: 'video' })}
                    className={`flex-1 py-3.5 px-4 rounded-xl border font-medium transition-all text-sm ${formData.studySource === 'video'
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-lg shadow-cyan-500/10'
                      : 'bg-dark-700 border-white/5 text-slate-400 hover:border-white/15'
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto mb-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Videos
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, studySource: 'books' })}
                    className={`flex-1 py-3.5 px-4 rounded-xl border font-medium transition-all text-sm ${formData.studySource === 'books'
                      ? 'bg-violet-500/10 border-violet-500/40 text-violet-300 shadow-lg shadow-violet-500/10'
                      : 'bg-dark-700 border-white/5 text-slate-400 hover:border-white/15'
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto mb-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    Books
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-gradient text-white font-semibold py-3.5 rounded-xl shadow-lg mt-4 text-sm tracking-wide"
              >
                Continue to Assessment →
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Render Step 2: Assessment Quiz
  const currentQuestion = ONBOARDING_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / ONBOARDING_QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestionIndex === ONBOARDING_QUESTIONS.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 p-4 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-violet-600 -top-40 -right-40" style={{ position: 'absolute' }}></div>
      <div className="orb w-[400px] h-[400px] bg-cyan-500 bottom-0 left-0" style={{ position: 'absolute' }}></div>

      <div className="glass-card rounded-3xl w-full max-w-2xl relative z-10 animate-fade-in">
        <div className="p-10">
          {loading && (
            <div className="absolute inset-0 glass rounded-3xl z-20 flex flex-col items-center justify-center text-center p-4">
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30"></div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-violet-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Analyzing Your Skills...</h3>
              <p className="gradient-text font-semibold mb-1">You scored {quizScore} / 9</p>
              <p className="text-slate-400 text-sm">Generating your personalized study roadmap.</p>
            </div>
          )}

          <StepIndicator />

          <div className="mb-6">
            <div className="flex justify-between items-end mb-3">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  {currentQuestion.course}
                </span>
                <h2 className="text-xl font-bold text-white mt-3">Skill Assessment</h2>
              </div>
              <span className="text-sm text-slate-400 font-medium">
                {currentQuestionIndex + 1} / {ONBOARDING_QUESTIONS.length}
              </span>
            </div>
            <div className="w-full bg-dark-600 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-cyan-500 to-violet-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <p className="text-lg text-slate-200 font-medium mb-6">{currentQuestion.question}</p>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(currentQuestion.id, idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${answers[currentQuestion.id] === idx
                    ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-lg shadow-cyan-500/5'
                    : 'bg-dark-700/50 border-white/5 text-slate-300 hover:border-white/15 hover:bg-dark-600/50'
                    }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 text-xs transition-all ${answers[currentQuestion.id] === idx
                      ? 'border-cyan-400 bg-cyan-500 text-white'
                      : 'border-slate-600 text-slate-500'
                      }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-sm">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-white/5">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              className="px-6 py-2.5 text-slate-400 font-medium disabled:opacity-30 hover:text-white transition-colors text-sm"
            >
              Back
            </button>

            <button
              disabled={answers[currentQuestion.id] === undefined}
              onClick={handleNextQuestion}
              className="px-8 py-2.5 btn-gradient text-white rounded-xl font-semibold disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2 text-sm"
            >
              {isLastQuestion ? 'Finish & Analyze' : 'Next Question'}
              {!isLastQuestion && <span>→</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;