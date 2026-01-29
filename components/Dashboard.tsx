import React, { useEffect, useState } from 'react';
import { UserProfile, ClusterType, Recommendation } from '../types';
import { COURSES } from '../constants';
import { Link } from 'react-router-dom';
import { generateLearningRecommendations } from '../services/geminiService';
import { getQuizHistory, saveUser } from '../services/storageService';

interface DashboardProps {
  user: UserProfile;
  setUser: (u: UserProfile) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setUser }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(user.recommendations || []);
  const [loadingRecs, setLoadingRecs] = useState(false);

  useEffect(() => {
    // If no recommendations exist but we have history, generate them.
    const checkRecommendations = async () => {
      if (!user.recommendations || user.recommendations.length === 0) {
        const history = await getQuizHistory(user.id);
        if (history.length > 0) {
          setLoadingRecs(true);
          const recs = await generateLearningRecommendations(user, history);
          if (recs.length > 0) {
            setRecommendations(recs);
            const updatedUser = { ...user, recommendations: recs };
            await saveUser(updatedUser);
            setUser(updatedUser); // Propagate state to parent
          }
          setLoadingRecs(false);
        }
      } else {
        setRecommendations(user.recommendations);
      }
    };

    checkRecommendations();
  }, [user.id, user.recommendations, setUser, user]);

  const getClusterColor = (cluster: ClusterType) => {
    switch (cluster) {
      case ClusterType.TOPPER: return 'bg-green-100 text-green-800 border-green-200';
      case ClusterType.AVERAGE: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case ClusterType.BELOW_AVERAGE: return 'bg-orange-100 text-orange-800 border-orange-200';
      case ClusterType.FAILURE: return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getRecIcon = (type: string) => {
    switch (type) {
      case 'video': return '📺';
      case 'article': return '📄';
      case 'topic': return '🎯';
      default: return '🔗';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Learning Dashboard</h1>
        <p className="text-slate-500 mt-2">Welcome back, {user.name}. Here is your personalized learning path.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 lg:col-span-1">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Your Segment</h2>
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold border ${getClusterColor(user.cluster)}`}>
            {user.cluster} Cluster
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Weekly Goal</span>
              <span className="font-medium">{user.studyHoursPerWeek} Hours</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Learning Style</span>
              <span className="font-medium capitalize">{user.studySource}</span>
            </div>
          </div>
        </div>

        {/* AI Study Plan Preview */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg lg:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <span>✨</span> Smart Personalized Study Plan
          </h2>
          <div className="prose prose-invert prose-sm max-h-40 overflow-y-auto pr-2 custom-scrollbar text-blue-100/90 whitespace-pre-line">
            {user.studyPlan}
          </div>
          <div className="mt-4 pt-4 border-t border-white/20 text-right">
            <Link to="/profile" className="text-sm font-medium hover:text-white text-blue-200 transition-colors">View Full Plan &rarr;</Link>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      {(recommendations.length > 0 || loadingRecs) && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>🚀</span> Recommended for You
            {loadingRecs && <span className="text-sm font-normal text-slate-400 animate-pulse">(Generating insights...)</span>}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loadingRecs && recommendations.length === 0 ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
              ))
            ) : (
              recommendations.map((rec, idx) => (
                <div key={`${rec.title}-${idx}`} className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{getRecIcon(rec.type)}</span>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded">{rec.type}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2 leading-tight">{rec.title}</h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">{rec.reason}</p>
                  <a href={rec.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                    View Resource &rarr;
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-slate-800 mb-6">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
            <div className="h-32 bg-slate-100 rounded-t-xl flex items-center justify-center text-6xl">
              {course.icon}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-800 mb-2">{course.title}</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-3">{course.description}</p>
              <div className="mt-auto">
                <Link
                  to={`/course/${course.id}`}
                  className="block w-full text-center py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;