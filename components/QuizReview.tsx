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
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: 'rgba(160, 82, 45, 0.2)' }}></div>
                    <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#a0522d' }}></div>
                </div>
            </div>
        );
    }

    if (!result || questions.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
                <p className="mb-4" style={{ color: '#666666' }}>Quiz result not found or content unavailable.</p>
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
        <div className="min-h-screen p-6 md:p-10 relative" style={{ background: '#ffffff' }}>
            <div className="max-w-3xl mx-auto mb-8 flex items-center justify-between">
                <button
                    onClick={() => navigate('/history')}
                    className="flex items-center font-medium transition-colors text-sm hover:text-[#a0522d]"
                    style={{ color: '#666666' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to History
                </button>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border" style={{ color: '#a0522d', background: 'rgba(160, 82, 45, 0.1)', borderColor: 'rgba(160, 82, 45, 0.2)' }}>Review Mode</span>
            </div>

            <div className="max-w-3xl mx-auto animate-fade-in">
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-3">
                        <h2 className="text-lg font-bold" style={{ color: '#111111' }}>Question {currentQuestionIndex + 1}</h2>
                        <span className="text-sm font-medium" style={{ color: '#666666' }}>{currentQuestionIndex + 1} of {questions.length}</span>
                    </div>
                    <div className="w-full rounded-full h-1.5" style={{ background: 'rgba(160, 82, 45, 0.1)' }}>
                        <div
                            className="h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6b3318, #a0522d)' }}
                        ></div>
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-8 min-h-[400px] flex flex-col">
                    <p className="text-lg font-bold mb-8" style={{ color: '#111111' }}>{question.text}</p>

                    <div className="space-y-3 flex-1">
                        {question.options.map((option, idx) => {
                            const isSelected = selectedOptionIndex === idx;
                            const isTheCorrectAnswer = question.correctAnswer === idx;

                            let style = 'bg-transparent text-[#666666] opacity-70';
                            let iconEl = (
                                <span className="inline-block w-6 h-6 rounded-full border text-xs text-center leading-6 mr-3 border-slate-300 text-slate-500">
                                    {String.fromCharCode(65 + idx)}
                                </span>
                            );

                            if (isTheCorrectAnswer) {
                                style = 'bg-emerald-500/5 border-emerald-500/40 text-emerald-700 font-medium';
                                iconEl = (
                                    <span className="inline-block w-6 h-6 rounded-full bg-emerald-500 text-white text-xs text-center leading-6 mr-3 shadow-lg shadow-emerald-500/20">✓</span>
                                );
                            } else if (isSelected && !isTheCorrectAnswer) {
                                style = 'bg-rose-500/5 border-rose-500/40 text-rose-700 font-medium';
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
                            className="px-6 py-2.5 font-medium disabled:opacity-30 hover:text-[#a0522d] transition-colors text-sm"
                            style={{ color: '#888888' }}
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
