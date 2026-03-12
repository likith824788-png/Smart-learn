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

const card: React.CSSProperties = {
    background: '#ffffff',
    border: '1.5px solid #ebe5e0',
    borderRadius: 16,
    boxShadow: '0 2px 16px rgba(160,82,45,0.07)',
};

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [history, setHistory] = useState<QuizResult[]>([]);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [previousPlan, setPreviousPlan] = useState<string | null>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(user.name);
    const [editSource, setEditSource] = useState(user.studySource);
    const [editHours, setEditHours] = useState(user.studyHoursPerWeek);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const handleLogout = () => { logoutUser(); setUser(null); navigate('/'); };

    const handleChangePassword = async () => {
        setPasswordMessage('');
        if (!currentPassword || !newPassword || !confirmPassword) { setPasswordMessage('Please fill in all password fields.'); return; }
        if (newPassword !== confirmPassword) { setPasswordMessage('New passwords do not match.'); return; }
        if (newPassword.length < 6) { setPasswordMessage('Password must be at least 6 characters.'); return; }
        setIsChangingPassword(true);
        try {
            const currentUser = auth.currentUser;
            if (currentUser && currentUser.email) {
                const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, currentPassword);
                await currentUser.reauthenticateWithCredential(credential);
                await currentUser.updatePassword(newPassword);
                setPasswordMessage('Success! Password updated.');
                setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
            } else { setPasswordMessage('User not found. Please log in again.'); }
        } catch (error: any) {
            if (error.code === 'auth/wrong-password') setPasswordMessage('Incorrect current password.');
            else setPasswordMessage('Failed to update password. ' + error.message);
        } finally { setIsChangingPassword(false); }
    };

    const handleSaveProfile = async () => {
        const updatedUser = { ...user, name: editName, studySource: editSource, studyHoursPerWeek: editHours };
        try { await saveUser(updatedUser); setUser(updatedUser); setIsEditing(false); }
        catch { alert('Failed to save changes. Please try again.'); }
    };

    useEffect(() => {
        const loadHistory = async () => { const h = await getQuizHistory(user.id, 500); setHistory(h); };
        loadHistory();
    }, [user.id]);

    const averageScore = history.length > 0
        ? Math.round(history.reduce((acc, curr) => acc + curr.percentage, 0) / history.length)
        : Math.round((user.initialQuizScore / 9) * 100);

    const currentCluster = history.length > 0 ? determineCluster(averageScore) : user.cluster;

    const handleRegeneratePlan = async () => {
        setPreviousPlan(user.studyPlan || null);
        setIsRegenerating(true);
        const profileForAI = { email: user.email, name: user.name, studyHoursPerWeek: user.studyHoursPerWeek, quizAttempts: user.quizAttempts + history.length, initialQuizScore: averageScore, studySource: user.studySource, cluster: currentCluster };
        const newPlan = await generatePersonalizedStudyPlan(profileForAI);
        const updatedUser: UserProfile = { ...user, cluster: currentCluster, studyPlan: newPlan, studyPlanStartDate: new Date().toISOString() };
        await saveUser(updatedUser); setUser(updatedUser); setIsRegenerating(false);
    };

    const handleUndoPlan = async () => {
        if (!previousPlan) return;
        const updatedUser = { ...user, studyPlan: previousPlan };
        await saveUser(updatedUser); setUser(updatedUser); setPreviousPlan(null);
    };

    const getClusterStyle = (cluster: ClusterType) => {
        switch (cluster) {
            case ClusterType.ADVANCE: return { background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.3)' };
            case ClusterType.INTERMEDIATE: return { background: 'rgba(245,158,11,0.1)', color: '#d97706', border: '1px solid rgba(245,158,11,0.3)' };
            case ClusterType.EXPLORER: return { background: 'rgba(249,115,22,0.1)', color: '#ea580c', border: '1px solid rgba(249,115,22,0.3)' };
        }
    };

    return (
        <div className="max-w-5xl mx-auto animate-fade-in pb-10" style={{ color: '#111111' }}>

            {/* ── Page title ── */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #5c2e0e, #a0522d, #c87941)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Profile</h1>
                <p className="text-sm mt-1" style={{ color: '#666666' }}>Manage your account settings and preferences</p>
            </div>

            {/* ══════════════════════════════
                PROFILE HERO CARD
                (banner + avatar + existing info)
            ══════════════════════════════ */}
            <div className="overflow-hidden mb-6" style={card}>

                {/* Purple gradient banner */}
                <div style={{
                    height: 120,
                    background: 'linear-gradient(135deg, #6b3318 0%, #7d3e1f 50%, #a0522d 100%)',
                }} />

                <div className="px-8 pb-8">
                    {/* Circular avatar overlapping banner */}
                    <div
                        className="flex items-center justify-center font-bold text-white text-2xl"
                        style={{
                            width: 72, height: 72,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6b3318, #a0522d)',
                            border: '4px solid #ffffff',
                            marginTop: -36,
                            boxShadow: '0 4px 16px rgba(109,51,24,0.35)',
                        }}
                    >
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Name / email / edit form — same as original */}
                    <div className="mt-4">
                        {isEditing ? (
                            <div className="space-y-4 p-5 rounded-xl" style={{ background: '#fdf8f3', border: '1.5px solid #ebe5e0' }}>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#7d3e1f' }}>Name</label>
                                    <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="dark-input w-full p-3 rounded-xl text-sm" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#7d3e1f' }}>Study Source</label>
                                        <select value={editSource} onChange={e => setEditSource(e.target.value as 'video' | 'books')} className="dark-select w-full p-3 rounded-xl text-sm">
                                            <option value="video">Video (Visual)</option>
                                            <option value="books">Books (Text)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#7d3e1f' }}>Hours / Week</label>
                                        <input type="number" min="1" max="168" value={editHours} onChange={e => setEditHours(Number(e.target.value))} className="dark-input w-full p-3 rounded-xl text-sm" />
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button onClick={handleSaveProfile} className="px-5 py-2.5 text-sm font-semibold text-white btn-gradient rounded-xl">Save Changes</button>
                                    <button onClick={() => { setIsEditing(false); setEditName(user.name); setEditSource(user.studySource); setEditHours(user.studyHoursPerWeek); }}
                                        className="px-5 py-2.5 text-sm font-medium rounded-xl" style={{ background: '#f0ece8', border: '1.5px solid #ebe5e0', color: '#444' }}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-bold" style={{ color: '#111111' }}>{user.name}</h2>
                                        <p className="text-sm mt-0.5" style={{ color: '#666666' }}>{user.email}</p>
                                        {/* Badges — same as original */}
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <span className="px-3 py-1 rounded-xl text-xs font-bold" style={getClusterStyle(currentCluster)}>{currentCluster}</span>
                                            <span className="px-3 py-1 rounded-xl text-xs font-bold" style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)' }}>
                                                {user.studySource === 'video' ? 'Visual Learner' : 'Textbook Learner'}
                                            </span>
                                            <span className="px-3 py-1 rounded-xl text-xs font-bold" style={{ background: 'rgba(160,82,45,0.08)', color: '#7d3e1f', border: '1px solid rgba(160,82,45,0.2)' }}>
                                                {user.studyHoursPerWeek}h / week
                                            </span>
                                        </div>
                                        <button onClick={() => setIsEditing(true)} className="mt-4 px-4 py-2 text-sm font-medium rounded-xl flex items-center gap-2"
                                            style={{ background: '#f0ece8', border: '1.5px solid #ebe5e0', color: '#555' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                            Edit Profile
                                        </button>
                                    </div>
                                    {/* Avg Score — same as original */}
                                    <div className="text-right shrink-0">
                                        <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#888' }}>Avg Score</div>
                                        <div className="text-3xl font-bold" style={{ background: 'linear-gradient(135deg,#7d3e1f,#a0522d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{averageScore}%</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════
                STUDY PLAN — original content, new style
            ══════════════════════════════ */}
            <div className="overflow-hidden mb-6" style={card}>
                <div className="p-8">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold flex items-center gap-3" style={{ color: '#111' }}>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.1)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="#6366f1">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            Detailed Study Plan
                        </h3>
                        <div className="flex gap-2">
                            {previousPlan && (
                                <button onClick={handleUndoPlan} className="text-xs font-medium px-3 py-1.5 rounded-xl"
                                    style={{ color: '#d97706', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.08)' }}>
                                    Undo Change
                                </button>
                            )}
                            {(user.cluster !== currentCluster || !user.studyPlan) && (
                                <button onClick={handleRegeneratePlan} disabled={isRegenerating} className="text-xs text-white btn-gradient px-4 py-1.5 rounded-xl disabled:opacity-50 font-semibold">
                                    {isRegenerating ? 'Generating...' : 'Update Plan for New Cluster'}
                                </button>
                            )}
                            {user.cluster === currentCluster && user.studyPlan && (
                                <button onClick={handleRegeneratePlan} disabled={isRegenerating} className="text-xs font-medium px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                                    style={{ color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.08)' }}>
                                    {isRegenerating
                                        ? <span className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                                        : <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>
                                    }
                                    {isRegenerating ? 'Refreshing...' : 'Refresh Plan'}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="rounded-xl p-6 prose-dark prose prose-sm max-w-none leading-relaxed" style={{ background: '#fdf8f3', border: '1.5px solid #ebe5e0' }}>
                        {user.studyPlan
                            ? <ReactMarkdown>{user.studyPlan}</ReactMarkdown>
                            : <p className="italic" style={{ color: '#888' }}>No study plan available.</p>}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════
                ACCOUNT SECURITY — original content, new style
            ══════════════════════════════ */}
            <div className="overflow-hidden mb-6" style={card}>
                <div className="p-8">
                    <h3 className="font-bold mb-5 flex items-center gap-3" style={{ color: '#111' }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.08)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="#ef4444">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        Account Security
                    </h3>
                    <div className="rounded-xl p-6" style={{ background: '#fdf8f3', border: '1.5px solid #ebe5e0' }}>
                        {!showPasswordForm ? (
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium text-sm" style={{ color: '#111' }}>Password</h4>
                                    <p className="text-xs mt-1" style={{ color: '#888' }}>Update your password to keep your account secure</p>
                                </div>
                                <button onClick={() => setShowPasswordForm(true)} className="px-4 py-2 text-sm font-medium rounded-xl"
                                    style={{ background: '#f0ece8', border: '1.5px solid #ebe5e0', color: '#444' }}>
                                    Change Password
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-medium text-sm" style={{ color: '#111' }}>Change Password</h4>
                                    <button onClick={() => setShowPasswordForm(false)} style={{ color: '#888' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="space-y-3 max-w-md">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#7d3e1f' }}>Current Password</label>
                                        <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Enter current password" className="dark-input w-full p-3 rounded-xl text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#7d3e1f' }}>New Password</label>
                                        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" className="dark-input w-full p-3 rounded-xl text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#7d3e1f' }}>Confirm New Password</label>
                                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="dark-input w-full p-3 rounded-xl text-sm" />
                                    </div>
                                    {passwordMessage && (
                                        <p className={`text-sm font-medium ${passwordMessage.includes('Success') ? 'text-emerald-600' : 'text-red-500'}`}>{passwordMessage}</p>
                                    )}
                                    <div className="flex gap-3 pt-2">
                                        <button onClick={handleChangePassword} disabled={isChangingPassword} className="px-5 py-2.5 text-sm font-semibold text-white btn-gradient rounded-xl disabled:opacity-50">
                                            {isChangingPassword ? 'Updating...' : 'Update Password'}
                                        </button>
                                        <button onClick={() => { setShowPasswordForm(false); setPasswordMessage(''); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); }}
                                            className="px-5 py-2.5 text-sm font-medium rounded-xl" style={{ background: '#f0ece8', border: '1.5px solid #ebe5e0', color: '#444' }}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Sign Out ── */}
            <div className="flex justify-center py-4">
                <button onClick={handleLogout} className="px-6 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
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