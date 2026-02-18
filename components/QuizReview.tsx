import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserProfile, QuizResult, Question } from '../types';
import { getQuizHistory } from '../services/storageService';
import { COURSES } from '../constants';

interface QuizReviewProps {
    user: UserProfile;
}

const QuizReview: React.FC<QuizReviewProps> = ({ user }) => {
    const { resultId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const startQ = parseInt(queryParams.get('q') || '0');

    const [result, setResult] = useState<QuizResult | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(startQ);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!resultId) return;
            const history = await getQuizHistory(user.id, 500);
            const foundResult = history.find(r => r.id === resultId);

            if (foundResult) {
                setResult(foundResult);
                const course = COURSES.find(c => c.id === foundResult.courseId);
                if (course) {
                    let quizQuestions = course.quizQuestions;
                    if (foundResult.topicId) {
                        const topic = course.topics.find(t => t.id === foundResult.topicId);
                        if (topic?.quizzes && foundResult.quizId) {
                            const matchedQuiz = topic.quizzes.find(q => q.id === foundResult.quizId);
                            if (matchedQuiz && matchedQuiz.questions.length > 0) {
                                quizQuestions = matchedQuiz.questions;
                            }
                        } else if (topic?.quizzes && topic.quizzes.length > 0) {
                            quizQuestions = topic.quizzes[0].questions;
                        }
                    }
                    setQuestions(quizQuestions);
                }
            }
            setLoading(false);
        };
        loadData();
    }, [resultId, user.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-950">
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!result || questions.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-dark-950 p-4">
                <p className="text-slate-400 mb-4">Quiz result not found or content unavailable.</p>
                <button
                    onClick={() => navigate('/history')}
                    className="px-6 py-2.5 btn-gradient text-white rounded-xl font-medium text-sm"
                >
                    Back to History
                </button>
            </div>
        );
    }

    const question = questions[currentQuestionIndex];
    const selectedOptionIndex = result.answers ? result.answers[question.id] : -1;
    const isCorrect = selectedOptionIndex === question.correctAnswer;
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-dark-950 p-6 md:p-10 relative">
            {/* Header */}
            <div className="max-w-3xl mx-auto mb-8 flex items-center justify-between">
                <button
                    onClick={() => navigate('/history')}
                    className="flex items-center text-slate-400 hover:text-cyan-400 font-medium transition-colors text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to History
                </button>
                <span className="text-xs font-bold text-violet-400 uppercase tracking-wider bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20">Review Mode</span>
            </div>

            <div className="max-w-3xl mx-auto animate-fade-in">
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-3">
                        <h2 className="text-lg font-bold text-white">Question {currentQuestionIndex + 1}</h2>
                        <span className="text-sm text-slate-500 font-medium">{currentQuestionIndex + 1} of {questions.length}</span>
                    </div>
                    <div className="w-full bg-dark-600 rounded-full h-1.5">
                        <div
                            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-8 min-h-[400px] flex flex-col">
                    <p className="text-lg font-medium text-white mb-8">{question.text}</p>

                    <div className="space-y-3 flex-1">
                        {question.options.map((option, idx) => {
                            const isSelected = selectedOptionIndex === idx;
                            const isTheCorrectAnswer = question.correctAnswer === idx;

                            let style = 'bg-dark-700/50 border-white/5 text-slate-500 opacity-60';
                            let iconEl = (
                                <span className="inline-block w-6 h-6 rounded-full border border-slate-600 text-xs text-center leading-6 mr-3 text-slate-500">
                                    {String.fromCharCode(65 + idx)}
                                </span>
                            );

                            if (isTheCorrectAnswer) {
                                style = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300';
                                iconEl = (
                                    <span className="inline-block w-6 h-6 rounded-full bg-emerald-500 text-white text-xs text-center leading-6 mr-3 shadow-lg shadow-emerald-500/20">✓</span>
                                );
                            } else if (isSelected && !isTheCorrectAnswer) {
                                style = 'bg-rose-500/10 border-rose-500/40 text-rose-300';
                                iconEl = (
                                    <span className="inline-block w-6 h-6 rounded-full bg-rose-500 text-white text-xs text-center leading-6 mr-3 shadow-lg shadow-rose-500/20">✕</span>
                                );
                            }

                            return (
                                <div
                                    key={idx}
                                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center ${style}`}
                                >
                                    {iconEl}
                                    <span className="text-sm">{option}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex justify-between">
                        <button
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                            className="px-6 py-2.5 text-slate-400 font-medium disabled:opacity-30 hover:text-white transition-colors text-sm"
                        >
                            Previous
                        </button>

                        <button
                            disabled={currentQuestionIndex === questions.length - 1}
                            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                            className="px-6 py-2.5 btn-gradient text-white rounded-xl font-medium disabled:opacity-50 transition-all text-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizReview;
