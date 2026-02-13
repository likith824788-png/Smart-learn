import React, { useEffect, useState } from 'react';
import { UserProfile, ClusterType, Recommendation } from '../types';
import { COURSES } from '../constants';
import { Link } from 'react-router-dom';
import { generateLearningRecommendations, generatePersonalizedStudyPlan } from '../services/geminiService';
import { getQuizHistory, saveUser } from '../services/storageService';

interface DashboardProps {
  user: UserProfile;
  setUser: (u: UserProfile) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setUser }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(user.recommendations || []);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshPlan = async () => {
    setIsRefreshing(true);
    try {
      const newPlan = await generatePersonalizedStudyPlan(user);
      const updatedUser = { ...user, studyPlan: newPlan, studyPlanStartDate: new Date().toISOString() };
      await saveUser(updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to refresh plan", error);
    } finally {
      setIsRefreshing(false);
    }
  };

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

  // Check for Study Plan Expiry (7 days)
  useEffect(() => {
    const checkPlanExpiry = async () => {
      if (user.studyPlan && user.studyPlanStartDate) {
        const planStartDate = new Date(user.studyPlanStartDate);
        const daysPassed = Math.floor((new Date().getTime() - planStartDate.getTime()) / (1000 * 3600 * 24));

        if (daysPassed >= 7 && !isRefreshing) {
          console.log("Plan expired (7+ days), regenerating...");
          await handleRefreshPlan();
        }
      } else if (!user.studyPlanStartDate && user.studyPlan) {
        // If plan exists but no start date (legacy), set it to now or handle gracefully
        // For now, we'll just set it to now to start tracking
        const updatedUser = { ...user, studyPlanStartDate: new Date().toISOString() };
        await saveUser(updatedUser);
        setUser(updatedUser);
      }
    };

    checkPlanExpiry();
  }, [user, isRefreshing]);

  const getClusterColor = (cluster: ClusterType) => {
    switch (cluster) {
      case ClusterType.ADVANCE: return 'bg-green-100 text-green-800 border-green-200';
      case ClusterType.INTERMEDIATE: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case ClusterType.EXPLORER: return 'bg-orange-100 text-orange-800 border-orange-200';
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
        <p className="text-slate-500 mt-2">Welcome {user.name}. Here is your personalized learning path.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 lg:col-span-1">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Your Segment</h2>
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold border ${getClusterColor(user.cluster)}`}>
            {user.cluster}
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

        {/* Daily Target */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-700 mb-2">Daily Target</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-xl">🎯</div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{Math.round((user.studyHoursPerWeek / 7) * 10) / 10} hrs</p>
                <p className="text-xs text-slate-500">Target for Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-700 mb-2">Weekly Progress</h2>
            <div className="flex items-end gap-2 h-20 mb-2">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                // Calculate current day based on studyPlanStartDate
                const planStartDate = user.studyPlanStartDate ? new Date(user.studyPlanStartDate) : new Date();
                const daysPassed = Math.floor((new Date().getTime() - planStartDate.getTime()) / (1000 * 3600 * 24));
                const currentPlanDay = (daysPassed % 7) + 1;

                // If plan is older than 7 days, it should likely be regenerated (handled in useEffect), 
                // but for visualization we show the loop.
                const isCurrentDay = day === currentPlanDay;
                const isPastDay = day < currentPlanDay;

                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                      className={`w-full rounded-t transition-all duration-300 ${isCurrentDay ? 'bg-indigo-600 shadow-md shadow-indigo-200' :
                        isPastDay ? 'bg-indigo-400' : 'bg-indigo-100 group-hover:bg-indigo-200'
                        }`}
                      style={{ height: isCurrentDay ? '70%' : isPastDay ? '50%' : '30%' }}
                    ></div>
                    <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-medium transition-colors ${isCurrentDay ? 'bg-indigo-600 text-white shadow-sm' :
                      isPastDay ? 'text-indigo-600' : 'text-gray-400'
                      }`}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            <span className="font-bold text-indigo-600">Day {
              user.studyPlanStartDate
                ? (Math.floor((new Date().getTime() - new Date(user.studyPlanStartDate).getTime()) / (1000 * 3600 * 24)) % 7) + 1
                : 1
            }</span> of your 7-day plan.
          </p>
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




      {/* Smart Personalized Study Plan (Moved) */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>🗺️</span> Study plan
        </h2>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span>✨</span> Study Strategy
              </h3>
              <button
                onClick={handleRefreshPlan}
                disabled={isRefreshing}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-medium border border-white/10 transition-colors flex items-center gap-1"
              >
                {isRefreshing ? 'Refreshing...' : (
                  <>
                    <span>🔄</span> Refresh
                  </>
                )}
              </button>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-blue-50/90 whitespace-pre-line mb-6">
              {user.studyPlan}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-indigo-600 flex items-center justify-center text-[10px]">🎓</div>)}
              </div>
              <Link to="/profile" className="px-6 py-2 bg-white text-indigo-600 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-sm">
                Show More &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-6">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
            <div className="h-32 bg-slate-100 rounded-t-xl flex items-center justify-center p-6">
              {course.icon.startsWith('http') ? (
                <img src={course.icon} alt={course.title} className="h-full w-full object-contain" />
              ) : (
                <span className="text-6xl">{course.icon}</span>
              )}
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

      <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-12">Recommended Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { title: 'Java Programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', description: 'Comprehensive guide to Java development.' },
          { title: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', description: 'The essential language for web development.' },
          { title: 'SQL Mastery', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', description: 'Master database management and queries.' },
          { title: 'HTML & CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', description: 'Build modern and responsive websites.' },
          { title: 'R Programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg', description: 'Statistical computing and graphics.' }
        ].map((course, idx) => (
          <div
            key={idx}
            onClick={() => alert("Work in Progress")}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              {course.icon.startsWith('http') ? (
                <img src={course.icon} alt={course.title} className="h-16 w-16 object-contain" />
              ) : (
                <span className="text-6xl">{course.icon}</span>
              )}
            </div>
            <div className="flex items-center gap-3 mb-3">
              {course.icon.startsWith('http') ? (
                <img src={course.icon} alt={course.title} className="h-10 w-10 object-contain" />
              ) : (
                <span className="text-3xl">{course.icon}</span>
              )}
              <h3 className="font-bold text-lg text-slate-800">{course.title}</h3>
            </div>
            <p className="text-sm text-slate-500 mb-4">{course.description}</p>
            <span className="text-indigo-600 text-sm font-medium">Start Learning &rarr;</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;