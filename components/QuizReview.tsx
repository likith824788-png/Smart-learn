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

    // Parse query param 'q' for starting question index
    const queryParams = new URLSearchParams(location.search);
    const startQ = parseInt(queryParams.get('q') || '0');

    const [result, setResult] = useState<QuizResult | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(startQ);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!resultId) return;
            const history = await getQuizHistory(user.id);
            const foundResult = history.find(r => r.id === resultId);

            if (foundResult) {
                setResult(foundResult);

                // Find questions
                const course = COURSES.find(c => c.id === foundResult.courseId);
                if (course) {
                    let quizQuestions = course.quizQuestions;

                    if (foundResult.topicId) {
                        const topic = course.topics.find(t => t.id === foundResult.topicId);
                        if (topic?.quizzes) {
                            // Determine which quiz it was. 
                            // Since we don't store quizId in QuizResult (only topicId), we assume it's the "assessment" 
                            // or try to match by question count if needed. 
                            // For now, default to the first quiz in the topic (assessment) as per current structure.
                            if (topic.quizzes.length > 0) {
                                quizQuestions = topic.quizzes[0].questions;
                            }
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!result || questions.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <p className="text-slate-500 mb-4">Quiz result not found or content unavailable.</p>
                <button
                    onClick={() => navigate('/history')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    Back to History
                </button>
            </div>
        );
    }

    const question = questions[currentQuestionIndex];
    // If answers map exists, use it. If not (legacy), we can't show selection.
    const selectedOptionIndex = result.answers ? result.answers[question.id] : -1;
    const isCorrect = selectedOptionIndex === question.correctAnswer;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10 relative">
            {/* Header */}
            <div className="max-w-3xl mx-auto mb-8 flex items-center justify-between">
                <button
                    onClick={() => navigate('/history')}
                    className="flex items-center text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to History
                </button>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Review Mode</span>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                        <h2 className="text-xl font-bold text-slate-800">Question {currentQuestionIndex + 1}</h2>
                        <span className="text-sm text-slate-500">{currentQuestionIndex + 1} of {questions.length}</span>
                    </div>
                    {/* Progres Bar (Static/Visual) */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 min-h-[400px] flex flex-col">
                    <p className="text-lg font-medium text-slate-800 mb-8">{question.text}</p>

                    <div className="space-y-3 flex-1">
                        {question.options.map((option, idx) => {
                            const isSelected = selectedOptionIndex === idx;
                            const isTheCorrectAnswer = question.correctAnswer === idx;

                            let buttonStyle = "border-gray-100 text-gray-600";
                            let icon = <span className="inline-block w-6 h-6 rounded-full border border-current text-xs text-center leading-5 mr-3 opacity-50">{String.fromCharCode(65 + idx)}</span>;

                            if (isTheCorrectAnswer) {
                                buttonStyle = "border-green-500 bg-green-50 text-green-800 font-medium";
                                icon = <span className="inline-block w-6 h-6 rounded-full bg-green-600 text-white text-xs text-center leading-6 mr-3">✓</span>;
                            } else if (isSelected && !isTheCorrectAnswer) {
                                buttonStyle = "border-red-500 bg-red-50 text-red-800 font-medium";
                                icon = <span className="inline-block w-6 h-6 rounded-full bg-red-600 text-white text-xs text-center leading-6 mr-3">✕</span>;
                            } else if (!isSelected && !isTheCorrectAnswer) {
                                buttonStyle = "border-gray-100 text-gray-400 opacity-60";
                            }

                            return (
                                <div
                                    key={idx}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center ${buttonStyle}`}
                                >
                                    {icon}
                                    {option}
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex justify-between">
                        <button
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                            className="px-6 py-2 text-slate-500 font-medium disabled:opacity-30 hover:text-slate-800"
                        >
                            Previous
                        </button>

                        <button
                            disabled={currentQuestionIndex === questions.length - 1}
                            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
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
