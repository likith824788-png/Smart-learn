import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { COURSES } from '../constants';
import { TOPIC_CONTENT } from '../topicContent';
import { UserProfile } from '../types';

interface CourseViewProps {
    user: UserProfile;
}

const CourseView: React.FC<CourseViewProps> = ({ user }) => {
    const { id } = useParams();
    const course = COURSES.find(c => c.id === id);
    const [activeTopic, setActiveTopic] = useState<string | null>(null);
    const completedTopicsSet = new Set(user.completedTopics || []);
    const completedInCourse = course.topics.filter(t => completedTopicsSet.has(t.id)).length;
    const progress = course.topics.length > 0 ? (completedInCourse / course.topics.length) * 100 : 0;

    const getTopicContent = (topic: { id: string; bookContent: string }) => {
        return TOPIC_CONTENT[topic.id] || topic.bookContent;
    };

    return (
        <div className="min-h-screen bg-dark-950 p-6 md:p-10">
            <Link to="/dashboard" className="mb-8 inline-flex items-center text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Dashboard
            </Link>

            <div className="max-w-5xl mx-auto pb-12 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3 tracking-tight">
                            {course.icon.startsWith('http') ? (
                                <img src={course.icon} alt={course.title} className="h-10 w-10 object-contain" />
                            ) : (
                                <span>{course.icon}</span>
                            )}
                            <span>{course.title}</span>
                        </h1>
                        <p className="text-slate-400 mt-2 text-sm">{course.description}</p>
                    </div>

                    {/* Progress Gauge */}
                    <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20">
                            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                <path
                                    d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="rgba(148, 163, 184, 0.1)"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="3"
                                    strokeDasharray={`${progress}, 100`}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out"
                                />
                                <defs>
                                    <linearGradient id="progressGradient">
                                        <stop offset="0%" stopColor="#06b6d4" />
                                        <stop offset="100%" stopColor="#8b5cf6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-bold text-white">{Math.round(progress)}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto space-y-3">
                {course.topics.map((topic, index) => (
                    <Link
                        key={topic.id}
                        to={`/course/${course.id}/topic/${topic.id}`}
                        className={`block glass-card rounded-xl overflow-hidden ${completedTopicsSet.has(topic.id) ? 'border-emerald-500/20' : ''}`}
                    >
                        <div className="w-full flex items-center justify-between p-5">
                            <div className="flex items-center gap-4">
                                <span className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${completedTopicsSet.has(topic.id)
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                    : 'bg-dark-500 text-slate-400'
                                    }`}>
                                    {completedTopicsSet.has(topic.id) ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        index + 1
                                    )}
                                </span>
                                <span className={`font-medium text-sm ${completedTopicsSet.has(topic.id) ? 'text-emerald-400' : 'text-slate-200'}`}>
                                    {topic.title}
                                </span>
                            </div>
                            <span className="text-slate-600 group-hover:text-cyan-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CourseView;