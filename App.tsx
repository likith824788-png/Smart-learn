import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import CourseView from './components/CourseView';
import TopicView from './components/TopicView';
import Quiz from './components/Quiz';
import Profile from './components/Profile';
import History from './components/History';
import QuizReview from './components/QuizReview';
import PerformanceChart from './components/PerformanceChart';
import { getUser } from './services/storageService';
import { UserProfile } from './types';
import { auth } from './services/firebase';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authEmail, setAuthEmail] = useState<string | null>(null);
  const [authUid, setAuthUid] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');

  useEffect(() => {
    // Fast timeout - if no response in 1.5s, show login
    const timer = setTimeout(() => {
      console.warn("Auth listener timed out. Forcing load.");
      setIsLoading(false);
    }, 1500);

    // v8 syntax: auth.onAuthStateChanged
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      clearTimeout(timer);

      if (currentUser) {
        setLoadingMessage('Loading your profile...');
        setAuthEmail(currentUser.email);
        setAuthUid(currentUser.uid);

        try {
          // Fetch user profile from Firestore
          const userProfile = await getUser(currentUser.uid);
          if (userProfile) {
            setUser(userProfile);
          } else {
            // User authenticated but no profile (needs onboarding)
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUser(null);
        setAuthEmail(null);
        setAuthUid(null);
      }

      setIsLoading(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const handleOnboardingComplete = (newUser: UserProfile) => {
    setUser(newUser);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-dark-950 relative overflow-hidden">
        {/* Background orbs */}
        <div className="orb w-96 h-96 bg-cyan-500 -top-20 -left-20" style={{ position: 'absolute' }}></div>
        <div className="orb w-96 h-96 bg-violet-500 -bottom-20 -right-20" style={{ position: 'absolute' }}></div>

        <div className="text-center animate-fade-in">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30"></div>
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-violet-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="gradient-text font-semibold text-lg tracking-wide">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          user ? <Navigate to="/dashboard" /> :
            (authEmail && authUid) ? <Onboarding email={authEmail} onComplete={handleOnboardingComplete} /> :
              <Login />
        } />

        <Route path="/dashboard" element={
          user ? <Layout user={user} setUser={setUser}><Dashboard user={user} setUser={setUser} /></Layout> : <Navigate to="/" />
        } />

        <Route path="/course/:id" element={
          user ? <CourseView user={user} /> : <Navigate to="/" />
        } />

        {/* Distraction-Free Topic View (No Layout) */}
        <Route path="/course/:courseId/topic/:topicId" element={
          user ? <TopicView /> : <Navigate to="/" />
        } />

        <Route path="/course/:courseId/topic/:topicId/quiz/:quizId" element={
          user ? <Quiz user={user} setUser={setUser} /> : <Navigate to="/" />
        } />

        <Route path="/quiz/:courseId" element={
          user ? <Quiz user={user} setUser={setUser} /> : <Navigate to="/" />
        } />

        <Route path="/profile" element={
          user ? <Layout user={user} setUser={setUser}><Profile user={user} setUser={setUser} /></Layout> : <Navigate to="/" />
        } />

        <Route path="/history" element={
          user ? <Layout user={user} setUser={setUser}><History user={user} /></Layout> : <Navigate to="/" />
        } />

        <Route path="/performance" element={
          user ? <Layout user={user} setUser={setUser}><PerformanceChart user={user} /></Layout> : <Navigate to="/" />
        } />

        <Route path="/history/review/:resultId" element={
          user ? <QuizReview user={user} /> : <Navigate to="/" />
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
