import React, { useState } from 'react';
import { auth } from '../services/firebase';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        await auth.createUserWithEmailAndPassword(email, password);
      } else {
        await auth.signInWithEmailAndPassword(email, password);
      }
      // App.tsx auth listener will handle the rest
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error && 'code' in err) {
        const firebaseError = err as { code: string; message: string };
        if (firebaseError.code === 'auth/invalid-credential') {
          setError('Invalid email or password.');
        } else if (firebaseError.code === 'auth/email-already-in-use') {
          setError('Email already in use. Please sign in.');
        } else if (firebaseError.code === 'auth/weak-password') {
          setError('Password should be at least 6 characters.');
        } else {
          setError(firebaseError.message || 'An error occurred. Please try again.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-cyan-500 -top-40 -left-40" style={{ position: 'absolute' }}></div>
      <div className="orb w-[400px] h-[400px] bg-violet-600 bottom-0 right-0" style={{ position: 'absolute' }}></div>
      <div className="orb w-[300px] h-[300px] bg-fuchsia-500 top-1/2 left-1/3" style={{ position: 'absolute', opacity: 0.08 }}></div>

      <div className="glass-card rounded-3xl w-full max-w-md relative z-10 animate-fade-in">
        <div className="p-10">
          {/* Logo / Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 mb-5 shadow-lg shadow-cyan-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.205 47.205 0 00-1.346-.808c-.281.37-.578.713-.887 1.03A.75.75 0 019 21.75a49.29 49.29 0 00-3.795-1.36.75.75 0 01-.46-.71c.033-1.44.122-2.87.268-4.28a49.009 49.009 0 00-2.66-1.14.75.75 0 01-.46-.71c.035-1.442.122-2.873.266-4.291a.75.75 0 01.938-.623c.17.046.34.096.51.148a.75.75 0 01.492.754 47.327 47.327 0 00-.181 3.3 49.386 49.386 0 012.768 1.219 48.478 48.478 0 00-.168-.96.75.75 0 01.492-.753A48.63 48.63 0 0112 13.48a48.645 48.645 0 011.06 1.993z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-slate-400 text-sm">
              {isSignUp ? 'Join Smart Learn today' : 'Sign in to continue learning'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 text-rose-400 text-sm rounded-xl border border-rose-500/20 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="dark-input w-full px-4 py-3.5 rounded-xl text-sm"
                placeholder="student@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="dark-input w-full px-4 py-3.5 rounded-xl text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gradient text-white font-semibold py-3.5 rounded-xl shadow-lg disabled:opacity-70 flex items-center justify-center text-sm tracking-wide"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
