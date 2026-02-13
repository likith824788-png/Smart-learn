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
                // Re-authenticate
                const credential = firebase.auth.EmailAuthProvider.credential(
                    currentUser.email,
                    currentPassword
                );

                await currentUser.reauthenticateWithCredential(credential);

                // Update Password
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
            const h = await getQuizHistory(user.id);
            setHistory(h);
        };
        loadHistory();
    }, [user.id]);

    const getCourseName = (id: string) => COURSES.find(c => c.id === id)?.title || id;

    const averageScore = history.length > 0
        ? Math.round(history.reduce((acc, curr) => acc + curr.percentage, 0) / history.length)
        : user.initialQuizScore;

    // Calculate current cluster based on ongoing performance if history exists
    const currentCluster = history.length > 0 ? determineCluster(averageScore) : user.cluster;

    const handleRegeneratePlan = async () => {
        // Cache current plan for undo
        setPreviousPlan(user.studyPlan || null);
        setIsRegenerating(true);

        // Prepare user object with current metrics for the model
        const profileForAI = {
            email: user.email,
            name: user.name,
            studyHoursPerWeek: user.studyHoursPerWeek,
            quizAttempts: user.quizAttempts + history.length,
            initialQuizScore: averageScore, // Use current average as the score metric
            studySource: user.studySource,
            cluster: currentCluster
        };

        const newPlan = await generatePersonalizedStudyPlan(profileForAI);

        const updatedUser: UserProfile = {
            ...user,
            cluster: currentCluster, // Update the stored cluster to match current performance
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

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-24 h-24 rounded-full bg-slate-900 text-white flex items-center justify-center text-3xl font-bold shrink-0">
                        {user.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Study Source</label>
                                        <select
                                            value={editSource}
                                            onChange={(e) => setEditSource(e.target.value as 'video' | 'books')}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="video">Video (Visual)</option>
                                            <option value="books">Books (Text)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Hours / Week</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="168"
                                            value={editHours}
                                            onChange={(e) => setEditHours(Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={handleSaveProfile}
                                        className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
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
                                        className="px-4 py-2 text-sm font-bold text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
                                    <p className="text-slate-500">{user.email}</p>
                                </div>
                                <div className="flex flex-wrap gap-3 mt-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentCluster === ClusterType.ADVANCE ? 'bg-green-100 text-green-700 border-green-200' :
                                        currentCluster === ClusterType.INTERMEDIATE ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                            'bg-orange-100 text-orange-700 border-orange-200'
                                        }`}>
                                        {currentCluster}
                                    </span>
                                    <span className="px-3 py-1 bg-blue-100 rounded-full text-xs font-bold text-blue-600">
                                        {user.studySource === 'video' ? 'Visual Learner' : 'Textbook Learner'}
                                    </span>
                                    <span className="px-3 py-1 bg-purple-100 rounded-full text-xs font-bold text-purple-600">
                                        {user.studyHoursPerWeek}h / week
                                    </span>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-3 justify-end md:justify-start">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg transition-colors border border-slate-300 shadow-sm"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-slate-500 mb-1">Overall Avg Score</div>
                        <div className="text-3xl font-black text-slate-800">{averageScore}%</div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800">Detailed Study Plan</h3>
                        <div className="flex gap-2">
                            {previousPlan && (
                                <button
                                    onClick={handleUndoPlan}
                                    className="text-xs text-orange-600 hover:text-orange-800 font-medium px-3 py-1.5 border border-orange-200 rounded-md"
                                >
                                    Undo Change
                                </button>
                            )}
                            {(user.cluster !== currentCluster || !user.studyPlan) && (
                                <button
                                    onClick={handleRegeneratePlan}
                                    disabled={isRegenerating}
                                    className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                >
                                    {isRegenerating ? 'Generating...' : 'Update Plan for New Cluster'}
                                </button>
                            )}
                            {user.cluster === currentCluster && user.studyPlan && (
                                <button
                                    onClick={handleRegeneratePlan}
                                    disabled={isRegenerating}
                                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                                >
                                    {isRegenerating ? 'Refreshing...' : 'Refresh Plan'}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl text-sm leading-relaxed text-slate-700 prose prose-indigo max-w-none">
                        {user.studyPlan ? (
                            <ReactMarkdown>{user.studyPlan}</ReactMarkdown>
                        ) : (
                            <p className="text-slate-400 italic">No study plan available.</p>
                        )}
                    </div>
                </div>

                {/* Password Change Section */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="font-bold text-slate-800 mb-4">Account Security</h3>

                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        {!showPasswordForm ? (
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium text-slate-700">Password</h4>
                                    <p className="text-xs text-slate-500 mt-1">Update your password to keep your account secure</p>
                                </div>
                                <button
                                    onClick={() => setShowPasswordForm(true)}
                                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors shadow-sm"
                                >
                                    Change Password
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-medium text-slate-700">Change Password</h4>
                                    <button
                                        onClick={() => setShowPasswordForm(false)}
                                        className="text-slate-400 hover:text-slate-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="space-y-3 max-w-md">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Current Password</label>
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="Enter current password to verify"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">New Password</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm new password"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {passwordMessage && (
                                        <p className={`text-sm ${passwordMessage.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                                            {passwordMessage}
                                        </p>
                                    )}

                                    <div className="flex gap-2 pt-2">
                                        <button
                                            onClick={handleChangePassword}
                                            disabled={isChangingPassword}
                                            className="px-4 py-2 text-sm font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition-colors disabled:opacity-50"
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
                                            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sign Out Section - Moved to bottom */}
                <div className="flex justify-center pt-8 pb-4">
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 flex items-center gap-2"
                    >
                        <span>Sign Out</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Profile;