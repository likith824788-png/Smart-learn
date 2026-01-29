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
    const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

    if (!course) return <div className="p-8 text-center text-slate-500">Course not found</div>;

    const handleMarkComplete = (topicId: string) => {
        setCompletedTopics(prev => {
            const newSet = new Set(prev);
            if (newSet.has(topicId)) {
                newSet.delete(topicId);
            } else {
                newSet.add(topicId);
            }
            return newSet;
        });
    };

    const progress = (completedTopics.size / course.topics.length) * 100;

    // Get extended content or fallback to basic content
    const getTopicContent = (topic: { id: string; bookContent: string }) => {
        return TOPIC_CONTENT[topic.id] || topic.bookContent;
    };

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <Link to="/dashboard" className="text-slate-500 hover:text-slate-800 text-sm mb-2 inline-block">&larr; Back to Dashboard</Link>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <span>{course.icon}</span> {course.title}
                    </h1>
                    <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                            <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-sm text-slate-500">{completedTopics.size}/{course.topics.length} completed</span>
                    </div>
                </div>
                <Link
                    to={`/quiz/${course.id}`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 text-center"
                >
                    Take Quiz 📝
                </Link>
            </div>

            <div className="space-y-4">
                {course.topics.map((topic, index) => (
                    <div key={topic.id} className={`bg-white border rounded-xl overflow-hidden shadow-sm ${completedTopics.has(topic.id) ? 'border-green-300 bg-green-50/30' : 'border-gray-200'
                        }`}>
                        <button
                            onClick={() => setActiveTopic(activeTopic === topic.id ? null : topic.id)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${completedTopics.has(topic.id)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-slate-100 text-slate-600'
                                    }`}>
                                    {completedTopics.has(topic.id) ? '✓' : index + 1}
                                </span>
                                <span className={`font-semibold ${completedTopics.has(topic.id) ? 'text-green-800' : 'text-slate-800'
                                    }`}>{topic.title}</span>
                            </div>
                            <span className="text-slate-400">
                                {activeTopic === topic.id ? '−' : '+'}
                            </span>
                        </button>

                        {activeTopic === topic.id && (
                            <div className="p-6 bg-slate-50 border-t border-gray-100">
                                {/* Video Section */}
                                <div className="mb-6">
                                    <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                        📺 Video Lecture
                                    </h4>
                                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
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
                                <div>
                                    <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                        📖 Reading Material
                                    </h4>
                                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm prose prose-slate prose-sm max-w-none">
                                        <ReactMarkdown>{getTopicContent(topic)}</ReactMarkdown>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                                    <button
                                        onClick={() => handleMarkComplete(topic.id)}
                                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${completedTopics.has(topic.id)
                                                ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                : 'bg-green-600 text-white hover:bg-green-700'
                                            }`}
                                    >
                                        {completedTopics.has(topic.id) ? 'Mark Incomplete' : 'Mark as Complete ✓'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseView;