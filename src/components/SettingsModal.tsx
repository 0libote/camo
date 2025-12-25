import { useState, useEffect, useCallback } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onExport: () => void;
    onImport: () => void;
    onReset: () => void;
    displayMode: 'fraction' | 'percentage';
    setDisplayMode: (mode: 'fraction' | 'percentage') => void;
    uiScale: number;
    setUiScale: (scale: number) => void;
}

export function SettingsModal({
    isOpen,
    onClose,
    onExport,
    onImport,
    onReset,
    displayMode,
    setDisplayMode,
    uiScale,
    setUiScale
}: Props) {
    const [confirmReset, setConfirmReset] = useState(false);

    // Handle escape key to close modal
    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    const handleReset = () => {
        if (confirmReset) {
            onReset();
            setConfirmReset(false);
            onClose();
        } else {
            setConfirmReset(true);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
        >
            <div className="bg-[#0a0c10] border border-slate-800 w-full max-w-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent"></div>
                <div className="absolute top-0 left-0 w-12 h-12 bg-slate-800/10 rotate-45 -translate-x-8 -translate-y-8 pointer-events-none"></div>

                <div className="p-8">
                    <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
                        <div>
                            <span className="text-xs text-slate-500 font-bold tracking-wider block mb-2 uppercase">General Setup</span>
                            <h2 id="settings-title" className="text-3xl font-bold text-white tracking-tight">
                                Settings
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-slate-800 border border-slate-700 p-2 text-slate-400 hover:text-white rounded-md transition-all"
                            aria-label="Close settings"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-10">
                        {/* Display Mode */}
                        <div className="space-y-4">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tracking Format</label>
                            <div className="flex bg-slate-900 p-1 border border-slate-800 rounded-lg">
                                <button
                                    onClick={() => setDisplayMode('fraction')}
                                    className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wide transition-all rounded-md ${displayMode === 'fraction'
                                        ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    Fraction (X/Y)
                                </button>
                                <button
                                    onClick={() => setDisplayMode('percentage')}
                                    className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wide transition-all rounded-md ${displayMode === 'percentage'
                                        ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    Percentage (%)
                                </button>
                            </div>
                        </div>

                        {/* UI Scale */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">UI Scaling</label>
                                <span className="text-sm font-bold text-cyan-400">{Math.round(uiScale * 100)}%</span>
                            </div>
                            <div className="flex items-center h-2 bg-slate-900 border border-slate-800 rounded-full p-1">
                                <input
                                    type="range"
                                    min="0.75"
                                    max="1.25"
                                    step="0.05"
                                    value={uiScale}
                                    onChange={(e) => setUiScale(parseFloat(e.target.value))}
                                    className="w-full bg-transparent appearance-none cursor-pointer accent-cyan-500"
                                />
                            </div>
                        </div>

                        {/* Data Management */}
                        <div className="space-y-4">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Data Backup</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={onExport} className="px-6 py-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 rounded-lg transition-all text-xs font-bold uppercase tracking-wide">
                                    Export Records
                                </button>
                                <button onClick={onImport} className="px-6 py-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 rounded-lg transition-all text-xs font-bold uppercase tracking-wide">
                                    Import Records
                                </button>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="pt-8 border-t border-slate-800">
                            <button
                                onClick={handleReset}
                                className={`w-full py-4 px-6 text-xs font-bold tracking-widest uppercase transition-all border rounded-lg ${confirmReset
                                    ? 'bg-red-500 text-white border-red-500'
                                    : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-red-500/50 hover:text-red-400'
                                    }`}
                            >
                                {confirmReset ? "Confirm Reset All Data" : "Reset Database"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
