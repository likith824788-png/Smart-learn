import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { UserProfile, QuizResult, ClusterType } from '../types';
import { getQuizHistory, saveUser, logoutUser } from '../services/storageService';
import { COURSES, determineCluster } from '../constants';
import { generatePersonalizedStudyPlan } from '../services/geminiService';
import { auth } from '../services/firebase';

interface ProfileProps {
    user: UserProfile;
    setUser: (u: UserProfile | null) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [history, setHistory] = useState<QuizResult[]>([]);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [previousPlan, setPreviousPlan] = useState<string | null>(null);

    // Edit State
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(user.name);
    const [editSource, setEditSource] = useState(user.studySource);
    const [editHours, setEditHours] = useState(user.studyHoursPerWeek);

    // Password Change State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const handleLogout = () => {
        logoutUser();
        setUser(null);
        navigate('/');
    };

    const handleChangePassword = async () => {
        setPasswordMessage('');

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordMessage('Please fill in all password fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordMessage('New passwords do not match.');
            return;
        }

        if (newPassword.length < 6) {
            setPasswordMessage('Password must be at least 6 characters.');
            return;
        }

        setIsChangingPassword(true);

        try {
            const currentUser = auth.currentUser;
            if (currentUser && currentUser.email) {
                const credential = firebase.auth.EmailAuthProvider.credential(
                    currentUser.email,
                    currentPassword
                );

                await currentUser.reauthenticateWithCredential(credential);
                await currentUser.updatePassword(newPassword);

                setPasswordMessage('Success! Password updated.');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setPasswordMessage('User not found. Please log in again.');
            }
        } catch (error: any) {
            console.error("Password update error:", error);
            if (error.code === 'auth/wrong-password') {
                setPasswordMessage('Incorrect current password.');
            } else {
                setPasswordMessage('Failed to update password. ' + error.message);
            }
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handleSaveProfile = async () => {
        const updatedUser = {
            ...user,
            name: editName,
            studySource: editSource,
            studyHoursPerWeek: editHours
        };

        try {
            await saveUser(updatedUser);
            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save profile:", error);
            alert("Failed to save changes. Please try again.");
        }
    };

    useEffect(() => {
        const loadHistory = async () => {
            const h = await getQuizHistory(user.id, 500);
            setHistory(h);
        };
        loadHistory();
    }, [user.id]);

    const getCourseName = (id: string) => COURSES.find(c => c.id === id)?.title || id;

    const averageScore = history.length > 0
        ? Math.round(history.reduce((acc, curr) => acc + curr.percentage, 0) / history.length)
        : Math.round((user.initialQuizScore / 9) * 100);

    const currentCluster = history.length > 0 ? determineCluster(averageScore) : user.cluster;

    const handleRegeneratePlan = async () => {
        setPreviousPlan(user.studyPlan || null);
        setIsRegenerating(true);

        const profileForAI = {
            email: user.email,
            name: user.name,
            studyHoursPerWeek: user.studyHoursPerWeek,
            quizAttempts: user.quizAttempts + history.length,
            initialQuizScore: averageScore,
            studySource: user.studySource,
            cluster: currentCluster
        };

        const newPlan = await generatePersonalizedStudyPlan(profileForAI);

        const updatedUser: UserProfile = {
            ...user,
            cluster: currentCluster,
            studyPlan: newPlan,
            studyPlanStartDate: new Date().toISOString()
        };

        await saveUser(updatedUser);
        setUser(updatedUser);
        setIsRegenerating(false);
    };

    const handleUndoPlan = async () => {
        if (!previousPlan) return;

        const updatedUser = {
            ...user,
            studyPlan: previousPlan
        };

        await saveUser(updatedUser);
        setUser(updatedUser);
        setPreviousPlan(null);
    };

    const getClusterStyle = (cluster: ClusterType) => {
        switch (cluster) {
            case ClusterType.ADVANCE: return 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400';
            case ClusterType.INTERMEDIATE: return 'from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400';
            case ClusterType.EXPLORER: return 'from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-400';
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
            {/* Profile Header Card */}
            <div className="glass-card rounded-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500"></div>

                <div className="p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 text-white flex items-center justify-center text-2xl font-bold shrink-0 shadow-lg shadow-cyan-500/20">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            {isEditing ? (
                                <div className="space-y-4 glass-light rounded-xl p-5">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="dark-input w-full p-3 rounded-xl text-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Study Source</label>
                                            <select
                                                value={editSource}
                                                onChange={(e) => setEditSource(e.target.value as 'video' | 'books')}
                                                className="dark-select w-full p-3 rounded-xl text-sm"
                                            >
                                                <option value="video">Video (Visual)</option>
                                                <option value="books">Books (Text)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Hours / Week</label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="168"
                                                value={editHours}
                                                onChange={(e) => setEditHours(Number(e.target.value))}
                                                className="dark-input w-full p-3 rounded-xl text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={handleSaveProfile}
                                            className="px-5 py-2.5 text-sm font-semibold text-white btn-gradient rounded-xl"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setEditName(user.name);
                                                setEditSource(user.studySource);
                                                setEditHours(user.studyHoursPerWeek);
                                            }}
                                            className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-white tracking-tight">{user.name}</h1>
                                        <p className="text-slate-400 text-sm mt-1">{user.email}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className={`px-3 py-1 rounded-xl text-xs font-bold border bg-gradient-to-r ${getClusterStyle(currentCluster)}`}>
                                            {currentCluster}
                                        </span>
                                        <span className="px-3 py-1 bg-cyan-500/10 rounded-xl text-xs font-bold text-cyan-400 border border-cyan-500/20">
                                            {user.studySource === 'video' ? 'Visual Learner' : 'Textbook Learner'}
                                        </span>
                                        <span className="px-3 py-1 bg-violet-500/10 rounded-xl text-xs font-bold text-violet-400 border border-violet-500/20">
                                            {user.studyHoursPerWeek}h / week
                                        </span>
                                    </div>
                                    <div className="mt-5">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Avg Score</div>
                            <div className="text-3xl font-bold gradient-text">{averageScore}%</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Study Plan */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold text-white flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            Detailed Study Plan
                        </h3>
                        <div className="flex gap-2">
                            {previousPlan && (
                                <button
                                    onClick={handleUndoPlan}
                                    className="text-xs text-amber-400 hover:text-amber-300 font-medium px-3 py-1.5 border border-amber-500/20 bg-amber-500/10 rounded-xl transition-all"
                                >
                                    Undo Change
                                </button>
                            )}
                            {(user.cluster !== currentCluster || !user.studyPlan) && (
                                <button
                                    onClick={handleRegeneratePlan}
                                    disabled={isRegenerating}
                                    className="text-xs btn-gradient text-white px-4 py-1.5 rounded-xl transition-colors disabled:opacity-50 font-semibold"
                                >
                                    {isRegenerating ? 'Generating...' : 'Update Plan for New Cluster'}
                                </button>
                            )}
                            {user.cluster === currentCluster && user.studyPlan && (
                                <button
                                    onClick={handleRegeneratePlan}
                                    disabled={isRegenerating}
                                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium px-3 py-1.5 border border-cyan-500/20 bg-cyan-500/10 rounded-xl transition-all flex items-center gap-1.5"
                                >
                                    {isRegenerating ? (
                                        <span className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    {isRegenerating ? 'Refreshing...' : 'Refresh Plan'}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="glass-light rounded-xl p-6 prose-dark prose prose-sm max-w-none leading-relaxed">
                        {user.studyPlan ? (
                            <ReactMarkdown>{user.studyPlan}</ReactMarkdown>
                        ) : (
                            <p className="text-slate-500 italic">No study plan available.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Account Security */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="p-8">
                    <h3 className="font-bold text-white mb-5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500/20 to-orange-500/20 border border-rose-500/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        Account Security
                    </h3>

                    <div className="glass-light rounded-xl p-6">
                        {!showPasswordForm ? (
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium text-white text-sm">Password</h4>
                                    <p className="text-xs text-slate-500 mt-1">Update your password to keep your account secure</p>
                                </div>
                                <button
                                    onClick={() => setShowPasswordForm(true)}
                                    className="px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                                >
                                    Change Password
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-medium text-white text-sm">Change Password</h4>
                                    <button
                                        onClick={() => setShowPasswordForm(false)}
                                        className="text-slate-500 hover:text-white transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="space-y-3 max-w-md">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Password</label>
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="Enter current password"
                                            className="dark-input w-full p-3 rounded-xl text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">New Password</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password"
                                            className="dark-input w-full p-3 rounded-xl text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm new password"
                                            className="dark-input w-full p-3 rounded-xl text-sm"
                                        />
                                    </div>

                                    {passwordMessage && (
                                        <p className={`text-sm font-medium ${passwordMessage.includes('Success') ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {passwordMessage}
                                        </p>
                                    )}

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={handleChangePassword}
                                            disabled={isChangingPassword}
                                            className="px-5 py-2.5 text-sm font-semibold text-white btn-gradient rounded-xl disabled:opacity-50"
                                        >
                                            {isChangingPassword ? 'Updating...' : 'Update Password'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowPasswordForm(false);
                                                setPasswordMessage('');
                                                setCurrentPassword('');
                                                setNewPassword('');
                                                setConfirmPassword('');
                                            }}
                                            className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sign Out */}
            <div className="flex justify-center py-4">
                <button
                    onClick={handleLogout}
                    className="px-6 py-2.5 text-sm font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl transition-all border border-rose-500/20 flex items-center gap-2"
                >
                    <span>Sign Out</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Profile;