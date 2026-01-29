import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { UserProfile, QuizResult, ClusterType } from '../types';
import { getQuizHistory, saveUser } from '../services/storageService';
import { COURSES, determineCluster } from '../constants';
import { generatePersonalizedStudyPlan } from '../services/geminiService';

interface ProfileProps {
    user: UserProfile;
    setUser: (u: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
    const [history, setHistory] = useState<QuizResult[]>([]);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [previousPlan, setPreviousPlan] = useState<string | null>(null);

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

        const updatedUser = {
            ...user,
            cluster: currentCluster, // Update the stored cluster to match current performance
            studyPlan: newPlan
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
                        <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
                        <p className="text-slate-500">{user.email}</p>
                        <div className="flex flex-wrap gap-3 mt-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentCluster === ClusterType.TOPPER ? 'bg-green-100 text-green-700 border-green-200' :
                                    currentCluster === ClusterType.AVERAGE ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                        currentCluster === ClusterType.BELOW_AVERAGE ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                            'bg-red-100 text-red-700 border-red-200'
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
            </div>

            <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Quiz History</h2>
                {history.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-slate-400">No quizzes taken yet. Go to dashboard to start learning!</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {history.map((quiz) => (
                            <div key={quiz.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800">{getCourseName(quiz.courseId)}</h4>
                                    <p className="text-xs text-slate-500">{new Date(quiz.date).toLocaleDateString()} at {new Date(quiz.date).toLocaleTimeString()}</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <span className="block font-bold text-lg text-slate-800">{quiz.score}/{quiz.totalQuestions}</span>
                                        <span className={`text-xs font-bold ${quiz.percentage >= 50 ? 'text-green-600' : 'text-red-500'}`}>
                                            {quiz.percentage}%
                                        </span>
                                    </div>
                                    <div className="px-4 py-2 bg-yellow-50 text-yellow-800 rounded-lg text-sm font-bold border border-yellow-100 min-w-[140px] text-center">
                                        {quiz.badge}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;