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
  const [showFullPlan, setShowFullPlan] = useState(false);

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
            setUser(updatedUser);
          }
          setLoadingRecs(false);
        }
      } else {
        setRecommendations(user.recommendations);
      }
    };
    checkRecommendations();
  }, [user.id, user.recommendations, setUser, user]);

  useEffect(() => {
    const checkPlanExpiry = async () => {
      if (user.studyPlan && user.studyPlanStartDate) {
        const planStartDate = new Date(user.studyPlanStartDate);
        const daysPassed = Math.floor((new Date().getTime() - planStartDate.getTime()) / (1000 * 3600 * 24));
        if (daysPassed >= 7 && !isRefreshing) {
          await handleRefreshPlan();
        }
      } else if (!user.studyPlanStartDate && user.studyPlan) {
        const updatedUser = { ...user, studyPlanStartDate: new Date().toISOString() };
        await saveUser(updatedUser);
        setUser(updatedUser);
      }
    };
    checkPlanExpiry();
  }, [user, isRefreshing]);

  const getClusterStyle = (cluster: ClusterType) => {
    switch (cluster) {
      case ClusterType.ADVANCE: return 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400';
      case ClusterType.INTERMEDIATE: return 'from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400';
      case ClusterType.EXPLORER: return 'from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-400';
    }
  };

  const getRecIcon = (type: string) => {
    switch (type) {
      case 'video': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      );
      case 'article': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
      case 'topic': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
        </svg>
      );
      default: return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  const planStartDate = user.studyPlanStartDate ? new Date(user.studyPlanStartDate) : new Date();
  const daysPassed = Math.floor((new Date().getTime() - planStartDate.getTime()) / (1000 * 3600 * 24));
  const currentPlanDay = (daysPassed % 7) + 1;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">Learning Dashboard</h1>
        <p className="text-slate-400 mt-2">Welcome <span className="text-cyan-400 font-medium">{user.name}</span>. Here is your personalized learning path.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Segment Card */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Your Segment</h2>
          <div className={`inline-block px-4 py-2 rounded-xl text-sm font-bold border bg-gradient-to-r ${getClusterStyle(user.cluster)}`}>
            {user.cluster}
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Weekly Goal</span>
              <span className="font-medium text-slate-200">{user.studyHoursPerWeek} Hours</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Learning Style</span>
              <span className="font-medium text-slate-200 capitalize">{user.studySource}</span>
            </div>
          </div>
        </div>

        {/* Daily Target */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Daily Target</h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{Math.round((Number(user.studyHoursPerWeek || 0) / 7) * 10) / 10} <span className="text-lg text-slate-400 font-normal">hrs</span></p>
              <p className="text-xs text-slate-500 mt-0.5">Target for Today</p>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Weekly Progress</h2>
          <div className="flex items-end gap-2 h-20 mb-3">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
              const isCurrentDay = day === currentPlanDay;
              const isPastDay = day < currentPlanDay;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className={`w-full rounded-lg transition-all duration-500 ${isCurrentDay ? 'bg-gradient-to-t from-cyan-500 to-violet-500 shadow-lg shadow-cyan-500/20' :
                      isPastDay ? 'bg-cyan-500/40' : 'bg-dark-500'
                      }`}
                    style={{ height: isCurrentDay ? '70%' : isPastDay ? '50%' : '30%' }}
                  ></div>
                  <span className={`text-[10px] font-bold ${isCurrentDay ? 'text-cyan-400' : isPastDay ? 'text-slate-400' : 'text-slate-600'}`}>
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-500">
            <span className="font-bold text-cyan-400">Day {currentPlanDay}</span> of your 7-day plan.
          </p>
        </div>
      </div>

      {/* Recommendations */}
      {(recommendations.length > 0 || loadingRecs) && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
            </div>
            Recommended for You
            {loadingRecs && <span className="text-sm font-normal text-slate-500 animate-pulse">(Generating...)</span>}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loadingRecs && recommendations.length === 0 ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-32 glass-card rounded-xl animate-pulse"></div>
              ))
            ) : (
              recommendations.map((rec, idx) => (
                <div key={`${rec.title}-${idx}`} className="glass-card rounded-xl p-5 group">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-cyan-400">{getRecIcon(rec.type)}</span>
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">{rec.type}</span>
                  </div>
                  <h3 className="font-bold text-white text-sm mb-2 leading-tight">{rec.title}</h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">{rec.reason}</p>
                  <a href={rec.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                    View Resource
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Study Plan */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM14 5.586v12.828l2.293-2.293A1 1 0 0017 16V6a1 1 0 00-.293-.707L14 2.586v3z" clipRule="evenodd" />
            </svg>
          </div>
          Study Plan
        </h2>
        <div className="glass-card rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500"></div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                AI Study Strategy
              </h3>
              <button
                onClick={handleRefreshPlan}
                disabled={isRefreshing}
                className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-medium border border-white/10 transition-all flex items-center gap-2 text-slate-300 hover:text-white"
              >
                {isRefreshing ? (
                  <span className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                )}
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            <div className={`prose-dark prose prose-lg max-w-none whitespace-pre-line mb-6 ${!showFullPlan ? 'max-h-48 overflow-hidden relative' : ''}`}>
              {user.studyPlan}
              {!showFullPlan && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[rgba(15,23,42,0.95)] to-transparent pointer-events-none"></div>
              )}
            </div>

            <div className="flex items-center justify-end pt-6 border-t border-white/5">
              <button
                onClick={() => setShowFullPlan(!showFullPlan)}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all text-sm border border-white/10 flex items-center gap-2"
              >
                {showFullPlan ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Show Less
                  </>
                ) : (
                  <>
                    Show More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Available Courses */}
      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </div>
        Available Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {COURSES.map(course => {
          const completedTopicsSet = new Set(user.completedTopics || []);
          const completedInCourse = course.topics.filter(t => completedTopicsSet.has(t.id)).length;
          const courseProgress = course.topics.length > 0 ? Math.round((completedInCourse / course.topics.length) * 100) : 0;

          return (
            <Link key={course.id} to={`/course/${course.id}`} className="glass-card rounded-2xl overflow-hidden group block">
              <div className="h-28 bg-gradient-to-br from-dark-600 to-dark-700 flex items-center justify-center p-6 border-b border-white/5">
                {course.icon.startsWith('http') ? (
                  <img src={course.icon} alt={course.title} className="h-full w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 transform duration-300" />
                ) : (
                  <span className="text-5xl group-hover:scale-110 transform transition-transform duration-300">{course.icon}</span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{course.title}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{course.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-slate-500">Progress</span>
                    <span className="text-xs font-bold text-cyan-400">{courseProgress}%</span>
                  </div>
                  <div className="w-full bg-dark-500 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-violet-500 h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${courseProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors gap-1">
                  {courseProgress > 0 ? 'Continue Learning' : 'Start Learning'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recommended Courses */}
      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
        Learn More Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
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
            className="glass-card rounded-xl p-5 cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <img src={course.icon} alt={course.title} className="h-20 w-20 object-contain" />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <img src={course.icon} alt={course.title} className="h-10 w-10 object-contain" />
              <h3 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">{course.title}</h3>
            </div>
            <p className="text-sm text-slate-500 mb-3">{course.description}</p>
            <span className="text-cyan-400 text-sm font-medium flex items-center gap-1">
              Start Learning
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;