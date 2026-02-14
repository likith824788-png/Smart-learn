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
    const progress = course.topics.length > 0 ? (completedTopicsSet.size / course.topics.length) * 100 : 0;

    // Get extended content or fallback to basic content
    const getTopicContent = (topic: { id: string; bookContent: string }) => {
        return TOPIC_CONTENT[topic.id] || topic.bookContent;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <Link to="/dashboard" className="mb-6 inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors">
                <span className="mr-2">←</span> Back to Dashboard
            </Link>

            <div className="max-w-5xl mx-auto pb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            {course.icon.startsWith('http') ? (
                                <img src={course.icon} alt={course.title} className="h-10 w-10 object-contain" />
                            ) : (
                                <span>{course.icon}</span>
                            )}
                            <span>{course.title}</span>
                        </h1>
                    </div>

                    {/* Speedometer Gauge - Moved to top right */}
                    <div className="relative w-32 h-16 mr-4">
                        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                            {/* Background Arc */}
                            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e2e8f0" strokeWidth="10" strokeLinecap="round" />
                            {/* Foreground Arc */}
                            <path
                                d={`M 10 50 A 40 40 0 0 1 ${50 - 40 * Math.cos((progress / 100) * Math.PI)} ${50 - 40 * Math.sin((progress / 100) * Math.PI)}`}
                                fill="none"
                                stroke={progress === 100 ? "#22c55e" : "#4f46e5"}
                                strokeWidth="10"
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center -mb-2">
                            <span className={`text-lg font-bold ${progress === 100 ? 'text-green-600' : 'text-indigo-600'}`}>
                                {Math.round(progress)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {course.topics.map((topic, index) => (
                    <Link
                        key={topic.id}
                        to={`/course/${course.id}/topic/${topic.id}`}
                        className={`block bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all ${completedTopicsSet.has(topic.id) ? 'border-green-300 bg-green-50/30' : 'border-gray-200 hover:border-indigo-300'
                            }`}
                    >
                        <div className="w-full flex items-center justify-between p-5">
                            <div className="flex items-center gap-4">
                                <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${completedTopicsSet.has(topic.id)
                                    ? 'bg-green-500 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                    }`}>
                                    {completedTopicsSet.has(topic.id) ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        index + 1
                                    )}
                                </span>
                                <span className={`font-semibold ${completedTopicsSet.has(topic.id) ? 'text-green-800' : 'text-slate-800'
                                    }`}>{topic.title}</span>
                            </div>
                            <span className="text-slate-400 group-hover:text-indigo-500">
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