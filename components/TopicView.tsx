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
            <div className="flex flex-col items-center justify-center min-h-screen bg-dark-950">
                <p className="text-xl text-slate-400 mb-4">Topic not found</p>
                <Link to="/dashboard" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    const topicContent = TOPIC_CONTENT[topic.id] || topic.bookContent;

    return (
        <div className="min-h-screen bg-dark-950">
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
                    <div className="glass-card rounded-2xl p-8">
                        <div className="prose-dark prose prose-lg max-w-none">
                            <ReactMarkdown>{topicContent}</ReactMarkdown>
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
                            {topic.quizzes.map((quiz) => (
                                <Link
                                    key={quiz.id}
                                    to={`/course/${courseId}/topic/${topicId}/quiz/${quiz.id}`}
                                    className="glass-card rounded-xl p-6 group"
                                >
                                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 mb-2 transition-colors">
                                        {quiz.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-4">
                                        {quiz.questions.length} Questions
                                    </p>
                                    <div className="flex items-center text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors gap-1">
                                        Start Quiz
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopicView;
