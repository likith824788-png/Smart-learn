import React, { useEffect, useState } from 'react';
import { UserProfile, QuizResult } from '../types';
import { COURSES } from '../constants';
import { getQuizHistory } from '../services/storageService';

interface PerformanceChartProps {
    user: UserProfile;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ user }) => {
    const [history, setHistory] = useState<QuizResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBar, setSelectedBar] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            const h = await getQuizHistory(user.id, 200);
            setHistory(h);
            setLoading(false);
        };
        load();
    }, [user.id]);

    // Fixed baseline for chart reference
    const baselineScore = 85;

    // Actual initial assessment score
    const actualAssessmentScore = Math.round((user.initialQuizScore / 9) * 100);

    // Compute per-course average from quiz history
    const courseStats = COURSES.map(course => {
        const courseQuizzes = history.filter(q => q.courseId === course.id);
        const avg = courseQuizzes.length > 0
            ? Math.round(courseQuizzes.reduce((sum, q) => sum + q.percentage, 0) / courseQuizzes.length)
            : null;
        return {
            id: course.id,
            title: course.title,
            icon: course.icon,
            avg,
            quizCount: courseQuizzes.length,
        };
    });

    const maxScore = 100;

    // Color palette per bar
    const barColors = [
        { from: 'from-cyan-500', to: 'to-blue-500', shadow: 'shadow-cyan-500/20', text: 'text-cyan-400' },
        { from: 'from-violet-500', to: 'to-fuchsia-500', shadow: 'shadow-violet-500/20', text: 'text-violet-400' },
        { from: 'from-emerald-500', to: 'to-teal-500', shadow: 'shadow-emerald-500/20', text: 'text-emerald-400' },
        { from: 'from-amber-500', to: 'to-orange-500', shadow: 'shadow-amber-500/20', text: 'text-amber-400' },
        { from: 'from-rose-500', to: 'to-pink-500', shadow: 'shadow-rose-500/20', text: 'text-rose-400' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                    </div>
                    Performance Chart
                </h1>
                <p className="text-slate-500 text-sm mt-2">Compare your average quiz scores across all courses</p>
            </div>

            {/* Initial Assessment Score Card */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500"></div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white">Initial Assessment Score</h3>
                            <p className="text-xs text-slate-500">Your onboarding quiz result — {user.initialQuizScore}/9 correct</p>
                        </div>
                    </div>
                    <div className="text-3xl font-bold gradient-text">{actualAssessmentScore}%</div>
                </div>
                <div className="mt-4 w-full bg-dark-500 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${actualAssessmentScore}%` }}
                    ></div>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500"></div>

                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    Average Score by Course
                </h2>


                {/* Chart Area — fixed height for grid + bars */}
                <div className="relative mt-8" style={{ height: '260px', marginLeft: '2rem' }}>
                    {/* Baseline Reference Line */}
                    <div
                        className="absolute left-0 right-0 border-t-2 border-dashed border-amber-500/40 z-10"
                        style={{ bottom: `${(baselineScore / 100) * 260}px` }}
                    >
                        <span className="absolute -top-5 right-0 text-[10px] font-bold text-amber-400 bg-dark-700 px-2 py-0.5 rounded-md">
                            Baseline {baselineScore}%
                        </span>
                    </div>

                    {/* Y-axis labels */}
                    <div className="absolute top-0 bottom-0 flex flex-col justify-between text-right pr-2" style={{ left: '-2rem', width: '2rem' }}>
                        {[100, 75, 50, 25, 0].map(v => (
                            <span key={v} className="text-[10px] text-slate-600 font-mono leading-none">{v}</span>
                        ))}
                    </div>

                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        {[0, 1, 2, 3, 4].map(i => (
                            <div key={i} className="border-b border-white/5"></div>
                        ))}
                    </div>

                    {/* Bars — grow up from bottom (0 line) */}
                    <div className="absolute inset-0 flex items-end justify-around gap-4 md:gap-8">
                        {courseStats.map((course, idx) => {
                            const color = barColors[idx % barColors.length];
                            const barHeight = course.avg !== null ? (course.avg / maxScore) * 100 : 0;
                            const hasData = course.avg !== null;
                            const isSelected = selectedBar === course.id;

                            return (
                                <div key={course.id} className="flex-1 max-w-[120px] flex justify-center h-full">
                                    <div className="relative w-12 md:w-16 h-full flex items-end">
                                        {hasData ? (
                                            <div
                                                className={`w-full bg-gradient-to-t ${color.from} ${color.to} rounded-t-xl shadow-lg ${color.shadow} transition-all duration-1000 ease-out cursor-pointer ${isSelected ? 'brightness-125 ring-2 ring-white/20' : 'hover:brightness-110'}`}
                                                style={{ height: `${barHeight}%`, minHeight: '8px' }}
                                                onClick={() => setSelectedBar(isSelected ? null : course.id)}
                                            >
                                                {isSelected && (
                                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-sm font-bold text-white bg-dark-700 px-2 py-0.5 rounded-lg border border-white/10 whitespace-nowrap animate-fade-in">
                                                        {course.avg}%
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="w-full bg-white/5 rounded-t-xl h-2"></div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Course labels — completely outside chart, below the 0 line */}
                <div className="flex justify-around gap-4 md:gap-8 border-t border-white/10 pt-4" style={{ marginLeft: '2rem' }}>
                    {courseStats.map(course => (
                        <div key={course.id} className="flex-1 max-w-[120px] text-center">
                            <div className="flex justify-center mb-1">
                                {course.icon.startsWith('http') ? (
                                    <img src={course.icon} alt={course.title} className="h-6 w-6 object-contain" />
                                ) : (
                                    <span className="text-lg">{course.icon}</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-400 font-medium leading-tight">{course.title}</p>
                            <p className="text-[10px] text-slate-600 mt-0.5">
                                {course.quizCount} quiz{course.quizCount !== 1 ? 'zes' : ''}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Per-course Detail Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {courseStats.map((course, idx) => {
                    const color = barColors[idx % barColors.length];
                    const courseQuizzes = history.filter(q => q.courseId === course.id);
                    const best = courseQuizzes.length > 0 ? Math.max(...courseQuizzes.map(q => q.percentage)) : null;
                    const worst = courseQuizzes.length > 0 ? Math.min(...courseQuizzes.map(q => q.percentage)) : null;

                    return (
                        <div key={course.id} className="glass-card rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-4">
                                {course.icon.startsWith('http') ? (
                                    <img src={course.icon} alt={course.title} className="h-8 w-8 object-contain" />
                                ) : (
                                    <span className="text-2xl">{course.icon}</span>
                                )}
                                <div>
                                    <h3 className="text-sm font-bold text-white">{course.title}</h3>
                                    <p className="text-[10px] text-slate-500">{course.quizCount} attempt{course.quizCount !== 1 ? 's' : ''}</p>
                                </div>
                            </div>

                            {course.avg !== null ? (
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-500">Average</span>
                                        <span className={`text-sm font-bold ${color.text}`}>{course.avg}%</span>
                                    </div>
                                    <div className="w-full bg-dark-500 rounded-full h-1.5">
                                        <div
                                            className={`bg-gradient-to-r ${color.from} ${color.to} h-1.5 rounded-full transition-all duration-700`}
                                            style={{ width: `${course.avg}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-500">
                                        <span>Best: <span className="text-emerald-400 font-bold">{best}%</span></span>
                                        <span>Worst: <span className="text-rose-400 font-bold">{worst}%</span></span>
                                    </div>
                                    {/* Comparison to baseline */}
                                    <div className="text-[10px] text-slate-500 pt-1 border-t border-white/5">
                                        vs Baseline:
                                        {course.avg >= baselineScore ? (
                                            <span className="text-emerald-400 font-bold ml-1">+{course.avg - baselineScore}% ↑</span>
                                        ) : (
                                            <span className="text-rose-400 font-bold ml-1">{course.avg - baselineScore}% ↓</span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-600 italic">No quizzes taken yet</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PerformanceChart;
