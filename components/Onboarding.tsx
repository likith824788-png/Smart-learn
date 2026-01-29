import React, { useState } from 'react';
import { ClusterType, UserProfile } from '../types';
import { determineCluster } from '../constants';
import { generatePersonalizedStudyPlan } from '../services/geminiService';
import { saveUser } from '../services/storageService';
import { auth } from '../services/firebase';

interface OnboardingProps {
  email: string;
  onComplete: (user: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ email, onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    studyHoursPerWeek: 5,
    quizAttempts: 0,
    quizScore: 50,
    studySource: 'video' as 'video' | 'books',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const cluster = determineCluster(formData.quizScore);
    const uid = auth.currentUser?.uid;

    if (!uid) {
      console.error("No authenticated user found during onboarding");
      setLoading(false);
      return;
    }

    // Create base user object
    const newUser: UserProfile = {
      id: uid, // Use Firebase Auth UID as the document ID
      email,
      name: formData.name,
      studyHoursPerWeek: formData.studyHoursPerWeek,
      quizAttempts: formData.quizAttempts,
      initialQuizScore: formData.quizScore,
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-blue-800 font-medium">Analyzing profile & generating study plan...</p>
            <p className="text-xs text-blue-500 mt-2">This may take a moment</p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Student Profiling</h2>
          <p className="text-slate-500 text-sm">Help us personalize your learning experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Previous Quiz Attempts</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Avg Quiz Score (0-100)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                value={formData.quizScore}
                onChange={(e) => setFormData({ ...formData, quizScore: parseInt(e.target.value) })}
              />
              <span className="font-bold text-indigo-600 w-10">{formData.quizScore}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Used for initial clustering.</p>
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
            Generate Profile & Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;