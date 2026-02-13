import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { COURSES } from '../constants';
import { TOPIC_CONTENT } from '../topicContent';

const TopicView: React.FC = () => {
    const { courseId, topicId } = useParams();
    const navigate = useNavigate();
    const course = COURSES.find(c => c.id === courseId);
    const topic = course?.topics.find(t => t.id === topicId);

    if (!course || !topic) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <p className="text-xl text-slate-600 mb-4">Topic not found</p>
                <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    const topicContent = TOPIC_CONTENT[topic.id] || topic.bookContent;

    return (
        <div className="min-h-screen bg-white">
            {/* Minimal Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link
                        to={`/course/${courseId}`}
                        className="flex items-center text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Course
                    </Link>
                    <h1 className="text-lg font-bold text-slate-800 truncate max-w-md">
                        {topic.title}
                    </h1>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Video Section */}
                <div className="bg-black rounded-2xl overflow-hidden shadow-lg mb-8 aspect-video">
                    <iframe
                        src={topic.videoUrl}
                        title={topic.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                {/* Content Section */}
                <div className="prose prose-slate prose-lg max-w-none mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span>📖</span> Reading Material
                    </h2>
                    <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
                        <ReactMarkdown>{topicContent}</ReactMarkdown>
                    </div>
                </div>

                {/* Quizzes Section */}
                {topic.quizzes && topic.quizzes.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span>📝</span> Topic Quizzes
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {topic.quizzes.map((quiz) => (
                                <Link
                                    key={quiz.id}
                                    to={`/course/${courseId}/topic/${topicId}/quiz/${quiz.id}`}
                                    className="bg-white border-2 border-indigo-50 hover:border-indigo-500 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group"
                                >
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 mb-2">
                                        {quiz.title}
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        {quiz.questions.length} Questions
                                    </p>
                                    <div className="mt-4 flex items-center text-sm font-medium text-indigo-600">
                                        Start Quiz
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer Action removed as completion is now automated via quiz */}
            </div>
        </div>
    );
};

export default TopicView;
