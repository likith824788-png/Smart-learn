import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { COURSES } from '../constants';
import { TOPIC_CONTENT } from '../topicContent';
import { UserProfile, QuizResult } from '../types';
import { getQuizHistory } from '../services/storageService';

interface TopicViewProps {
    user: UserProfile;
}

const TopicView: React.FC<TopicViewProps> = ({ user }) => {
    const { courseId, topicId } = useParams();
    const navigate = useNavigate();
    const course = COURSES.find(c => c.id === courseId);
    const topic = course?.topics.find(t => t.id === topicId);

    const [completedQuizIds, setCompletedQuizIds] = useState<Set<string>>(new Set());
    const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
    const [historyLoaded, setHistoryLoaded] = useState(false);

    // Modal state for previous attempts
    const [showAttemptsModal, setShowAttemptsModal] = useState(false);
    const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
    const [selectedQuizTitle, setSelectedQuizTitle] = useState('');

    // State for content expansion
    const [isExpanded, setIsExpanded] = useState(false);

    // Load quiz history on mount
    useEffect(() => {
        const load = async () => {
            if (!user?.id) return;
            const history = await getQuizHistory(user.id, 500);
            setQuizHistory(history);

            // Find which quiz IDs this user has completed for this topic
            const completed = new Set<string>();
            history.forEach(h => {
                if (h.topicId === topicId && h.quizId) {
                    completed.add(h.quizId);
                }
            });
            setCompletedQuizIds(completed);
            setHistoryLoaded(true);
        };
        load();
    }, [user?.id, topicId]);

    if (!course || !topic) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-dark-950">
                <p className="text-xl text-slate-400 mb-4">Topic not found</p>
                <Link to="/dashboard" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    const topicContent = TOPIC_CONTENT[topic.id] || topic.bookContent;

    // Get previous attempts for a specific quiz
    const getQuizAttempts = (quizId: string) => {
        return quizHistory.filter(h => h.topicId === topicId && h.quizId === quizId);
    };

    // Handle quiz card click — check for previous attempts
    const handleQuizClick = (e: React.MouseEvent, quizId: string, quizTitle: string, isCoding: boolean) => {
        if (isCoding) return; // coding challenges navigate directly via Link

        const attempts = getQuizAttempts(quizId);
        if (attempts.length > 0) {
            e.preventDefault();
            setSelectedQuizId(quizId);
            setSelectedQuizTitle(quizTitle);
            setShowAttemptsModal(true);
        }
        // If no attempts, let the Link navigate normally
    };

    const getBadgeStyle = (badge: string) => {
        if (badge.includes('Gold')) return 'text-yellow-400 bg-yellow-500/15 border-yellow-500/30';
        if (badge.includes('Silver')) return 'text-slate-300 bg-slate-400/15 border-slate-400/30';
        if (badge.includes('Bronze')) return 'text-amber-500 bg-amber-600/15 border-amber-600/30';
        return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
    };

    const selectedAttempts = selectedQuizId ? getQuizAttempts(selectedQuizId) : [];

    return (
        <div className="min-h-screen bg-dark-950">

            {/* Previous Attempts Modal */}
            {showAttemptsModal && selectedQuizId && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-dark-800 rounded-2xl shadow-2xl border border-white/10 max-w-md w-full p-8">
                        <h2 className="text-xl font-bold text-white mb-1">📝 {selectedQuizTitle}</h2>
                        <p className="text-sm text-slate-400 mb-5">You have {selectedAttempts.length} previous attempt{selectedAttempts.length !== 1 ? 's' : ''}:</p>

                        <div className="space-y-2 mb-6 max-h-60 overflow-y-auto custom-scrollbar">
                            {selectedAttempts.map((attempt, i) => (
                                <button
                                    key={attempt.id}
                                    onClick={() => {
                                        setShowAttemptsModal(false);
                                        navigate('/history');
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg border bg-white/5 border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all text-left group"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-slate-500 font-mono w-14 shrink-0">
                                            #{selectedAttempts.length - i}
                                        </span>
                                        <div>
                                            <p className="text-sm text-white font-medium">
                                                {attempt.score}/{attempt.totalQuestions} — {attempt.percentage.toFixed(0)}%
                                            </p>
                                            <p className="text-[11px] text-slate-500">
                                                {new Date(attempt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(attempt.badge)}`}>
                                        {attempt.badge}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowAttemptsModal(false)}
                                className="px-5 py-2 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition-colors text-sm"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => {
                                    setShowAttemptsModal(false);
                                    navigate(`/course/${courseId}/topic/${topicId}/quiz/${selectedQuizId}`);
                                }}
                                className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold hover:from-cyan-400 hover:to-violet-400 transition-all text-sm shadow-lg shadow-cyan-500/20"
                            >
                                Continue (New Attempt)
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="glass border-b border-white/5 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link
                        to={`/course/${courseId}`}
                        className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Course
                    </Link>
                    <h1 className="text-sm font-bold text-white truncate max-w-md">
                        {topic.title}
                    </h1>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
                {/* Video */}
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30 mb-10 border border-white/5">
                    <div className="aspect-video bg-dark-800">
                        <iframe
                            src={topic.videoUrl}
                            title={topic.title}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>

                {/* Reading Material */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                        </div>
                        Reading Material
                    </h2>
                    <div className="glass-card rounded-2xl p-8 relative">
                        <div className={`prose-dark prose prose-lg max-w-none transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none' : 'max-h-[500px] overflow-hidden'}`}>
                            <ReactMarkdown>{topicContent}</ReactMarkdown>
                        </div>

                        {/* Gradient Overlay for collapsed state */}
                        {!isExpanded && (
                            <div className="absolute bottom-16 left-0 w-full h-32 bg-gradient-to-t from-dark-800 to-transparent pointer-events-none rounded-b-2xl" />
                        )}

                        {/* Toggle Button */}
                        <div className={`flex justify-center mt-6 ${!isExpanded ? 'relative z-10' : ''}`}>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-cyan-400 font-medium transition-all shadow-lg hover:shadow-cyan-500/10"
                            >
                                {isExpanded ? (
                                    <>
                                        <span>Show Less</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                        </svg>
                                    </>
                                ) : (
                                    <>
                                        <span>Show More</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-y-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quizzes */}
                {topic.quizzes && topic.quizzes.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            Topic Quizzes
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {topic.quizzes.map((quiz) => {
                                const isCoding = quiz.id === 'coding';
                                const isCompleted = !isCoding && completedQuizIds.has(quiz.id);
                                const linkTo = isCoding
                                    ? `/course/${courseId}/topic/${topicId}/coding`
                                    : `/course/${courseId}/topic/${topicId}/quiz/${quiz.id}`;
                                return (
                                    <Link
                                        key={quiz.id}
                                        to={linkTo}
                                        onClick={(e) => handleQuizClick(e, quiz.id, isCoding ? 'Coding Challenge' : quiz.title, isCoding)}
                                        className={`glass-card rounded-xl p-6 group relative ${isCompleted ? 'border-emerald-500/20' : ''}`}
                                    >
                                        {/* Tick mark for completed quizzes */}
                                        {isCompleted && (
                                            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                        <h3 className="text-base font-bold text-white group-hover:text-cyan-400 mb-2 transition-colors">
                                            {isCoding ? '💻 Coding Challenge' : quiz.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-4">
                                            {isCoding ? '5 Challenges' : `${quiz.questions.length} Questions`}
                                        </p>
                                        <div className="flex items-center text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors gap-1">
                                            {isCoding ? 'Open Editor' : (isCompleted ? 'Retake Quiz' : 'Start Quiz')}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopicView;
