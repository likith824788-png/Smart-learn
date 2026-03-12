import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { getSubjectAnalysis } from '../services/geminiService';
import { UserProfile } from '../types';

interface AIAssistantProps {
    user: UserProfile;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ user }) => {
    const [subject, setSubject] = useState('');
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim()) return;

        setIsLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const result = await getSubjectAnalysis(subject);
            setAnalysis(result);
        } catch (err) {
            setError("Failed to generate analysis. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3" style={{ background: 'linear-gradient(135deg, #5c2e0e, #a0522d, #c87941)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI Assistant</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Enter course to get a complete learning roadmap
                </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-12 relative group">
                <div className="absolute inset-0 blur-xl group-focus-within:opacity-100 opacity-50 transition-opacity rounded-2xl" style={{ background: 'linear-gradient(90deg, rgba(109, 51, 24, 0.15), rgba(160, 82, 45, 0.15))' }}></div>
                <div className="relative flex flex-col sm:flex-row gap-3 p-2 glass-card rounded-2xl">
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g., Quantum Computing, Machine Learning, Modern History..."
                        className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-base md:text-lg placeholder:text-slate-500"
                        style={{ color: '#111111' }}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !subject.trim()}
                        className="btn-gradient disabled:opacity-50 disabled:cursor-not-allowed px-6 sm:px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                        style={{ boxShadow: '0 10px 15px -3px rgba(109, 51, 24, 0.2)' }}
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        )}
                        {isLoading ? 'Analyzing...' : 'Explore'}
                    </button>
                </div>
            </form>

            {/* Results */}
            {error && (
                <div className="glass-card border-rose-500/20 p-6 rounded-2xl text-center text-rose-400 mb-10 animate-shake">
                    {error}
                </div>
            )}

            {analysis && (
                <div className="glass-card rounded-2xl overflow-hidden relative animate-slide-up">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6b3318] via-[#a0522d] to-[#c8a070]"></div>
                    <div className="p-5 md:p-8 lg:p-10">
                        <div className="prose-dark prose prose-lg max-w-none">
                            <ReactMarkdown>{analysis}</ReactMarkdown>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="bg-white/5 border-t border-white/5 p-6 flex justify-center">
                        <p className="text-xs text-slate-500 italic">
                            Roadmap generated specifically for {user.name}'s learning query.
                        </p>
                    </div>
                </div>
            )}

            {/* Empty State / Suggestions */}
            {!analysis && !isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-60">
                    {['Web Development', 'Data Structures', 'Cyber Security'].map((spec) => (
                        <button
                            key={spec}
                            onClick={() => setSubject(spec)}
                            className="glass-card p-4 rounded-xl text-sm transition-all text-center hover:text-[#a0522d]"
                            style={{ color: '#666666' }}
                        >
                            Try "{spec}"
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AIAssistant;
