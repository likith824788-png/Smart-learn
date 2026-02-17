import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { COURSES } from '../constants';
import { PYTHON_CODING_CHALLENGES } from '../pythonCodingChallenges';
import { CodingChallenge } from '../types';

// --- localStorage helpers ---
interface SavedProgress {
    codes: Record<number, string>;
    results: Record<number, boolean>;
    currentIdx: number;
}

const getStorageKey = (topicId: string) => `coding_progress_${topicId}`;

const saveProgress = (topicId: string, data: SavedProgress) => {
    localStorage.setItem(getStorageKey(topicId), JSON.stringify(data));
};

const loadProgress = (topicId: string): SavedProgress | null => {
    const raw = localStorage.getItem(getStorageKey(topicId));
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
};

const clearProgress = (topicId: string) => {
    localStorage.removeItem(getStorageKey(topicId));
};

// --- Component ---
const CodingEditor: React.FC = () => {
    const { courseId, topicId } = useParams();
    const navigate = useNavigate();

    const course = COURSES.find(c => c.id === courseId);
    const topic = course?.topics.find(t => t.id === topicId);
    const challenges = topicId ? PYTHON_CODING_CHALLENGES[topicId] || [] : [];

    const [currentIdx, setCurrentIdx] = useState(0);
    const [code, setCode] = useState('');
    const [actualOutput, setActualOutput] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [revealedHints, setRevealedHints] = useState(0);
    const [pyodideReady, setPyodideReady] = useState(false);
    const [pyodideLoading, setPyodideLoading] = useState(false);
    const [outputMatch, setOutputMatch] = useState<boolean | null>(null);
    const [challengeResults, setChallengeResults] = useState<Record<number, boolean>>({});
    const [savedCodes, setSavedCodes] = useState<Record<number, string>>({});

    // Modals
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const pyodideRef = useRef<any>(null);
    const initialLoadDone = useRef(false);

    const challenge: CodingChallenge | undefined = challenges[currentIdx];

    // --- On mount: check for saved progress ---
    useEffect(() => {
        if (!topicId || initialLoadDone.current) return;
        initialLoadDone.current = true;
        const saved = loadProgress(topicId);
        if (saved && Object.keys(saved.codes).length > 0) {
            setShowResumeModal(true);
        }
    }, [topicId]);

    const handleResume = () => {
        if (!topicId) return;
        const saved = loadProgress(topicId);
        if (saved) {
            setSavedCodes(saved.codes);
            setChallengeResults(saved.results);
            setCurrentIdx(saved.currentIdx);
            setCode(saved.codes[saved.currentIdx] || challenges[saved.currentIdx]?.starterCode || '');
        }
        setShowResumeModal(false);
    };

    const handleStartFresh = () => {
        if (topicId) clearProgress(topicId);
        setSavedCodes({});
        setChallengeResults({});
        setCurrentIdx(0);
        if (challenges[0]) setCode(challenges[0].starterCode);
        setShowResumeModal(false);
    };

    // --- When challenge changes: load saved code or starter code ---
    useEffect(() => {
        if (challenge) {
            setCode(savedCodes[currentIdx] || challenge.starterCode);
            setActualOutput(null);
            setRevealedHints(0);
            setOutputMatch(challengeResults[currentIdx] ?? null);
        }
    }, [currentIdx]);

    // --- Auto-save on code change ---
    useEffect(() => {
        if (!topicId || !challenge) return;
        const newCodes = { ...savedCodes, [currentIdx]: code };
        setSavedCodes(newCodes);
        saveProgress(topicId, { codes: newCodes, results: challengeResults, currentIdx });
    }, [code]);

    // --- Auto-save on result change ---
    useEffect(() => {
        if (!topicId) return;
        saveProgress(topicId, { codes: savedCodes, results: challengeResults, currentIdx });
    }, [challengeResults]);

    // Lazy-load Pyodide via CDN script tag
    const loadPyodide = useCallback(async () => {
        if (pyodideRef.current) return pyodideRef.current;
        setPyodideLoading(true);
        try {
            if (!(window as any).loadPyodide) {
                await new Promise<void>((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js';
                    script.onload = () => resolve();
                    script.onerror = () => reject(new Error('Failed to load Pyodide script'));
                    document.head.appendChild(script);
                });
            }
            const pyodide = await (window as any).loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/',
            });
            pyodideRef.current = pyodide;
            setPyodideReady(true);
            return pyodide;
        } catch (err) {
            console.error('Pyodide load error:', err);
            return null;
        } finally {
            setPyodideLoading(false);
        }
    }, []);

    const runCode = async () => {
        setIsRunning(true);
        setActualOutput(null);
        setOutputMatch(null);

        try {
            const pyodide = await loadPyodide();
            if (!pyodide) {
                setActualOutput('Error: Failed to load Python runtime');
                setIsRunning(false);
                return;
            }

            pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
            `);

            try {
                pyodide.runPython(code);
                const stdout = pyodide.runPython('sys.stdout.getvalue()');
                const output = stdout.trimEnd();
                setActualOutput(output || '(No output)');

                if (challenge) {
                    const expected = challenge.expectedOutput.trimEnd();
                    const passed = output === expected;
                    setOutputMatch(passed);
                    setChallengeResults(prev => ({ ...prev, [currentIdx]: passed }));
                }
            } catch (pyErr: any) {
                const stderr = pyodide.runPython('sys.stderr.getvalue()');
                setActualOutput(`Error: ${pyErr.message || stderr || 'Unknown error'}`);
                setOutputMatch(false);
                setChallengeResults(prev => ({ ...prev, [currentIdx]: false }));
            }
        } catch (err: any) {
            setActualOutput(`Runtime Error: ${err.message}`);
            setOutputMatch(false);
            setChallengeResults(prev => ({ ...prev, [currentIdx]: false }));
        }

        setIsRunning(false);
    };

    const resetCode = () => {
        if (challenge) {
            setCode(challenge.starterCode);
            setActualOutput(null);
            setOutputMatch(null);
        }
    };

    const handleSubmit = () => {
        if (topicId) clearProgress(topicId);
        setSubmitted(true);
        setShowSubmitModal(false);
    };

    const getDifficultyColor = (d: string) => {
        if (d === 'Easy') return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
        if (d === 'Medium') return 'text-amber-400 bg-amber-500/15 border-amber-500/30';
        return 'text-rose-400 bg-rose-500/15 border-rose-500/30';
    };

    const passedCount = Object.values(challengeResults).filter(v => v === true).length;
    const failedCount = Object.values(challengeResults).filter(v => v === false).length;

    if (!course || !topic || challenges.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-dark-950">
                <p className="text-xl text-slate-400 mb-4">No coding challenges found</p>
                <button onClick={() => navigate(-1)} className="text-cyan-400 hover:text-cyan-300 font-medium">Go Back</button>
            </div>
        );
    }

    // --- Submitted Result Screen ---
    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-dark-950 gap-6">
                <div className="glass-card rounded-2xl p-10 max-w-md w-full text-center">
                    <div className="text-5xl mb-4">{passedCount === challenges.length ? '🎉' : '📊'}</div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {passedCount === challenges.length ? 'All Challenges Passed!' : 'Challenges Submitted'}
                    </h2>
                    <p className="text-slate-400 mb-6">
                        You scored <span className="text-emerald-400 font-bold">{passedCount}</span> / {challenges.length} challenges
                    </p>
                    <div className="space-y-2 mb-8">
                        {challenges.map((c, i) => {
                            const result = challengeResults[i];
                            return (
                                <div key={c.id} className={`flex items-center justify-between px-4 py-2.5 rounded-lg border ${result === true ? 'bg-emerald-500/10 border-emerald-500/20' : result === false ? 'bg-rose-500/10 border-rose-500/20' : 'bg-white/5 border-white/10'
                                    }`}>
                                    <span className="text-sm text-white font-medium">{i + 1}. {c.title}</span>
                                    <span className={`text-xs font-bold ${result === true ? 'text-emerald-400' : result === false ? 'text-rose-400' : 'text-slate-500'}`}>
                                        {result === true ? '✓ Pass' : result === false ? '✗ Fail' : '— Skipped'}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <button
                        onClick={() => navigate(`/course/${courseId}/topic/${topicId}`)}
                        className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold hover:from-cyan-400 hover:to-violet-400 transition-all shadow-lg shadow-cyan-500/20"
                    >
                        Back to Topic
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-dark-950 overflow-hidden">

            {/* --- Resume Modal --- */}
            {showResumeModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-dark-800 p-8 rounded-2xl shadow-2xl border border-white/10 max-w-sm w-full">
                        <h2 className="text-xl font-bold text-white mb-2">📂 Resume Progress?</h2>
                        <p className="text-sm text-slate-400 mb-6">You have saved progress for this coding challenge. Would you like to continue where you left off?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={handleStartFresh} className="px-5 py-2 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition-colors text-sm">
                                Start Fresh
                            </button>
                            <button onClick={handleResume} className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold hover:from-cyan-400 hover:to-violet-400 transition-all text-sm shadow-lg shadow-cyan-500/20">
                                Resume
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Submit Confirmation Modal --- */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-dark-800 p-8 rounded-2xl shadow-2xl border border-white/10 max-w-md w-full">
                        <h2 className="text-xl font-bold text-white mb-2">📋 Submit Coding Challenges</h2>
                        <p className="text-sm text-slate-400 mb-5">Review your progress before submitting:</p>
                        <div className="space-y-2 mb-6">
                            {challenges.map((c, i) => {
                                const result = challengeResults[i];
                                return (
                                    <div key={c.id} className={`flex items-center justify-between px-4 py-2.5 rounded-lg border ${result === true ? 'bg-emerald-500/10 border-emerald-500/20' : result === false ? 'bg-rose-500/10 border-rose-500/20' : 'bg-white/5 border-white/10'
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${result === true ? 'bg-emerald-500/20 text-emerald-400' : result === false ? 'bg-rose-500/20 text-rose-400' : 'bg-white/10 text-slate-500'
                                                }`}>{i + 1}</span>
                                            <span className="text-sm text-white font-medium">{c.title}</span>

                                        </div>
                                        <span className={`text-xs font-bold ${result === true ? 'text-emerald-400' : result === false ? 'text-rose-400' : 'text-slate-500'}`}>
                                            {result === true ? '✓ Pass' : result === false ? '✗ Fail' : '— Not Attempted'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center justify-between mb-5 px-2">
                            <span className="text-xs text-slate-500">
                                <span className="text-emerald-400 font-bold">{passedCount}</span> passed · <span className="text-rose-400 font-bold">{failedCount}</span> failed · <span className="text-slate-400 font-bold">{challenges.length - passedCount - failedCount}</span> unattempted
                            </span>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowSubmitModal(false)} className="px-5 py-2 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition-colors text-sm">
                                Cancel
                            </button>
                            <button onClick={handleSubmit} className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold hover:from-cyan-400 hover:to-violet-400 transition-all text-sm shadow-lg shadow-cyan-500/20">
                                Confirm Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Bar */}
            <div className="glass border-b border-white/5 px-4 h-14 flex items-center justify-between shrink-0 z-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/course/${courseId}/topic/${topicId}`)}
                        className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back
                    </button>
                    <div className="h-5 w-px bg-white/10" />
                    <h1 className="text-sm font-bold text-white truncate">
                        💻 {topic.title} — Coding Challenges
                    </h1>
                </div>
                {/* Challenge navigation tabs + prev/next + submit */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
                        disabled={currentIdx === 0}
                        className="text-sm font-medium text-slate-400 hover:text-cyan-400 disabled:text-slate-700 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Prev
                    </button>
                    <div className="flex items-center gap-1">
                        {challenges.map((c, i) => {
                            const result = challengeResults[i];
                            let btnClass = 'text-slate-500 hover:text-slate-300 hover:bg-white/5';
                            if (i === currentIdx) {
                                btnClass = 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40';
                            } else if (result === true) {
                                btnClass = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';
                            } else if (result === false) {
                                btnClass = 'bg-rose-500/20 text-rose-400 border border-rose-500/40';
                            }
                            return (
                                <button
                                    key={c.id}
                                    onClick={() => setCurrentIdx(i)}
                                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${btnClass}`}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        onClick={() => setCurrentIdx(i => Math.min(challenges.length - 1, i + 1))}
                        disabled={currentIdx === challenges.length - 1}
                        className="text-sm font-medium text-slate-400 hover:text-cyan-400 disabled:text-slate-700 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                    >
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <div className="h-5 w-px bg-white/10 mx-1" />
                    <button
                        onClick={() => setShowSubmitModal(true)}
                        className="text-xs font-bold text-white px-4 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 transition-all shadow-lg shadow-violet-500/20 flex items-center gap-1.5"
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/* Split Pane */}
            <div className="flex flex-1 overflow-hidden">
                {/* LEFT PANEL — Problem Statement */}
                <div className="w-[40%] border-r border-white/5 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        {/* Title & Difficulty */}
                        <div className="flex items-center gap-3 mb-5">
                            <h2 className="text-xl font-bold text-white">{challenge.title}</h2>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getDifficultyColor(challenge.difficulty)}`}>
                                {challenge.difficulty}
                            </span>
                        </div>

                        {/* Problem Statement */}
                        <div className="mb-6">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">📋 Problem</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">{challenge.problemStatement}</p>
                        </div>

                        {/* Task */}
                        <div className="mb-6">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">🎯 Task</h3>
                            <div className="bg-cyan-500/5 border border-cyan-500/15 rounded-xl p-4">
                                <p className="text-sm text-cyan-200 leading-relaxed">{challenge.task}</p>
                            </div>
                        </div>

                        {/* Hints */}
                        <div className="mb-6">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">💡 Hints</h3>
                            <div className="space-y-2">
                                {challenge.hints.map((hint, i) => (
                                    <div key={i}>
                                        {i < revealedHints ? (
                                            <div className="bg-amber-500/5 border border-amber-500/15 rounded-lg p-3 animate-fade-in">
                                                <p className="text-sm text-amber-200">{hint}</p>
                                            </div>
                                        ) : i === revealedHints ? (
                                            <button
                                                onClick={() => setRevealedHints(r => r + 1)}
                                                className="text-sm text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                </svg>
                                                Reveal Hint {i + 1}
                                            </button>
                                        ) : null}
                                    </div>
                                ))}
                                {revealedHints >= challenge.hints.length && (
                                    <p className="text-xs text-slate-600 italic">All hints revealed</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT PANEL — Code Editor & Output */}
                <div className="w-[60%] flex flex-col overflow-hidden">
                    {/* Editor Header */}
                    <div className="flex items-center justify-between px-4 h-11 bg-dark-900 border-b border-white/5 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500/70"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500/70"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500/70"></div>
                            </div>
                            <span className="text-xs text-slate-500 ml-2 font-mono">solution.py</span>
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className="flex-1 overflow-hidden" style={{ minHeight: 0 }}>
                        <CodeMirror
                            value={code}
                            height="100%"
                            theme={vscodeDark}
                            extensions={[python()]}
                            onChange={(val) => setCode(val)}
                            style={{ height: '100%', fontSize: '14px' }}
                            basicSetup={{
                                lineNumbers: true,
                                highlightActiveLineGutter: true,
                                highlightActiveLine: true,
                                tabSize: 4,
                                foldGutter: true,
                                autocompletion: true,
                                bracketMatching: true,
                                closeBrackets: true,
                                indentOnInput: true,
                            }}
                        />
                    </div>

                    {/* Run / Reset bar */}
                    <div className="flex items-center justify-end gap-2 px-4 py-2 border-t border-white/5 bg-dark-900 shrink-0">
                        <button
                            onClick={resetCode}
                            className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all flex items-center gap-1.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                            Reset
                        </button>
                        <button
                            onClick={runCode}
                            disabled={isRunning}
                            className="text-xs font-bold text-white px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                        >
                            {isRunning ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Running...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    ▶ Run Code
                                </>
                            )}
                        </button>
                    </div>

                    {/* Output Area */}
                    <div className="border-t border-white/5 bg-dark-900 shrink-0" style={{ maxHeight: '40%', minHeight: '120px' }}>
                        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                📤 Output
                                {outputMatch !== null && (
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${outputMatch ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                                        }`}>
                                        {outputMatch ? '✓ PASS' : '✗ FAIL'}
                                    </span>
                                )}
                            </h3>
                        </div>

                        <div className="overflow-y-auto p-4 custom-scrollbar" style={{ maxHeight: 'calc(100% - 36px)' }}>
                            <div className="grid gap-4 grid-cols-2">
                                {/* Expected Output */}
                                <div>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                                        Expected Output
                                    </p>
                                    <div className="font-mono text-sm whitespace-pre-wrap bg-cyan-500/5 text-cyan-300 border border-cyan-500/15 rounded-lg p-3 min-h-[60px]">
                                        {challenge.expectedOutput}
                                    </div>
                                </div>

                                {/* Actual Output */}
                                <div>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                                        Actual Output
                                    </p>
                                    <div className={`font-mono text-sm whitespace-pre-wrap rounded-lg p-3 min-h-[60px] border ${actualOutput === null
                                        ? 'bg-dark-800/50 text-slate-600 border-white/5'
                                        : outputMatch === true
                                            ? 'bg-emerald-500/5 text-emerald-300 border-emerald-500/20'
                                            : outputMatch === false
                                                ? 'bg-rose-500/5 text-rose-300 border-rose-500/20'
                                                : 'bg-dark-800/50 text-slate-300 border-white/5'
                                        }`}>
                                        {isRunning ? (
                                            <span className="text-slate-500 flex items-center gap-2">
                                                <div className="w-3 h-3 border-2 border-slate-600 border-t-cyan-400 rounded-full animate-spin"></div>
                                                {pyodideLoading ? 'Loading Python runtime...' : 'Executing...'}
                                            </span>
                                        ) : actualOutput !== null ? (
                                            actualOutput
                                        ) : (
                                            <span className="text-slate-600 italic">Click "▶ Run Code" to see output</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodingEditor;
