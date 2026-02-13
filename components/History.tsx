import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { UserProfile, QuizResult } from '../types';
import { getQuizHistory } from '../services/storageService';
import { COURSES, calculateBadge } from '../constants';

interface HistoryProps {
    user: UserProfile;
}

const History: React.FC<HistoryProps> = ({ user }) => {
    const [history, setHistory] = useState<QuizResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState('All');
    const [courseFilter, setCourseFilter] = useState('All');
    const [expandedQuizId, setExpandedQuizId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadHistory = async () => {
            const h = await getQuizHistory(user.id);
            setHistory(h);
            setLoading(false);
        };
        loadHistory();
    }, [user.id]);

    const getCourseName = (id: string) => COURSES.find(c => c.id === id)?.title || id;

    const filteredHistory = history.filter(quiz => {
        const quizDate = new Date(quiz.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);

        const lastMonth = new Date(today);
        lastMonth.setDate(lastMonth.getDate() - 30);

        let dateMatch = true;
        if (dateFilter === 'Today') {
            dateMatch = quizDate >= today;
        } else if (dateFilter === 'Yesterday') {
            dateMatch = quizDate >= yesterday && quizDate < today;
        } else if (dateFilter === 'Last Week') {
            dateMatch = quizDate >= lastWeek;
        } else if (dateFilter === 'Last Month') {
            dateMatch = quizDate >= lastMonth;
        }

        let courseMatch = true;
        if (courseFilter !== 'All') {
            if (courseFilter === 'Python') courseMatch = quiz.courseId === 'python-101';
            if (courseFilter === 'ML') courseMatch = quiz.courseId === 'ml-101';
            if (courseFilter === 'DS') courseMatch = quiz.courseId === 'ds-101';
        }

        return dateMatch && courseMatch;
    });


    const totalQuizzes = filteredHistory.length;
    const averageScore = totalQuizzes > 0
        ? (filteredHistory.reduce((acc, curr) => acc + curr.percentage, 0) / totalQuizzes).toFixed(1)
        : 0;

    const toggleExpand = (id: string) => {
        setExpandedQuizId(prev => prev === id ? null : id);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Quiz Performances</h1>
                    <p className="text-slate-500 mt-2">Track your progress</p>
                </div>

                <div className="flex gap-3">
                    <select
                        className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    >
                        <option value="All">All Dates</option>
                        <option value="Today">Today</option>
                        <option value="Yesterday">Yesterday</option>
                        <option value="Last Week">Last Week</option>
                        <option value="Last Month">Last Month</option>
                    </select>

                    <select
                        className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={courseFilter}
                        onChange={(e) => setCourseFilter(e.target.value)}
                    >
                        <option value="All">All Courses</option>
                        <option value="Python">Python</option>
                        <option value="ML">Machine Learning</option>
                        <option value="DS">Data Science</option>
                    </select>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Quizzes Attempted</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-1">{totalQuizzes}</h3>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Average Quiz Score</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-1">{averageScore}%</h3>
                    </div>
                    <div className="p-3 bg-green-50 rounded-full text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            ) : filteredHistory.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-slate-400">No quizzes found for the selected filters.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredHistory.map((quiz) => (
                        <div
                            key={quiz.id}
                            onClick={() => toggleExpand(quiz.id)}
                            className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition-all hover:shadow-md ${expandedQuizId === quiz.id ? 'ring-2 ring-indigo-500' : ''}`}
                        >
                            <div className="p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                        {getCourseName(quiz.courseId)}
                                        {quiz.topicId && (
                                            <span className="text-slate-500 font-normal text-base">
                                                : {COURSES.find(c => c.id === quiz.courseId)?.topics.find(t => t.id === quiz.topicId)?.title || quiz.topicId}
                                            </span>
                                        )}
                                        {expandedQuizId === quiz.id ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-indigo-500">
                                                <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </h4>
                                    <p className="text-sm text-slate-500">
                                        {new Date(quiz.date).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                    <div className="text-right">
                                        <span className="block font-bold text-lg text-slate-800">{quiz.score}/{quiz.totalQuestions}</span>
                                        <span className={`text-xs font-bold ${quiz.percentage >= 50 ? 'text-green-600' : 'text-red-500'}`}>
                                            {quiz.percentage.toFixed(0)}% Score
                                        </span>
                                    </div>
                                    {(() => {
                                        const badge = calculateBadge(quiz.percentage);
                                        let badgeColor = 'bg-green-50 text-green-700 border-green-200';
                                        let iconColor = 'text-green-600';

                                        if (badge === 'Gold') {
                                            badgeColor = 'bg-yellow-50 text-yellow-700 border-yellow-200';
                                            iconColor = 'text-yellow-500';
                                        } else if (badge === 'Silver') {
                                            badgeColor = 'bg-slate-50 text-slate-700 border-slate-200';
                                            iconColor = 'text-gray-400';
                                        } else if (badge === 'Bronze') {
                                            badgeColor = 'bg-orange-50 text-orange-800 border-orange-200';
                                            iconColor = 'text-amber-700';
                                        }

                                        return (
                                            <div className={`px-4 py-2 rounded-lg text-sm font-bold border min-w-[120px] text-center shadow-sm ${badgeColor} flex items-center justify-center gap-2`}>
                                                {badge === 'Novice' ? (
                                                    <span className="text-lg">🌱</span>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${iconColor}`}>
                                                        <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h14.625c.414 0 .75-.336.75-.75a2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                                {badge}
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedQuizId === quiz.id && (
                                <div className="border-t border-gray-100 bg-slate-50 p-6 animate-fadeIn">
                                    <div className="mb-6">
                                        <h5 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Attempt Summary</h5>
                                        {quiz.questionResults ? (
                                            <div className="flex flex-wrap gap-2">
                                                {quiz.questionResults.map((isCorrect, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/history/review/${quiz.id}?q=${idx}`);
                                                        }}
                                                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-sm cursor-pointer hover:opacity-80 transition-opacity
                                                            ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
                                                        title={`Question ${idx + 1}: ${isCorrect ? 'Correct' : 'Incorrect'} - Click to Review`}
                                                    >
                                                        {idx + 1}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-slate-400 italic">Detailed question history not available for this legacy quiz.</p>
                                        )}
                                    </div>

                                    {quiz.feedback && (
                                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                                            <h5 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                                                💡 Suggestions
                                            </h5>
                                            <div className="text-sm text-indigo-800 leading-relaxed prose prose-indigo max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0">
                                                <ReactMarkdown>{quiz.feedback}</ReactMarkdown>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
