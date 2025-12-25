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
                    <div className="flex justify-between items-end mb-12 border-b border-slate-800/40 pb-6 relative">
                        <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-[var(--color-accent)]"></div>
                        <div>
                            <span className="text-[10px] text-slate-500 font-mono font-bold tracking-[0.3em] block mb-2 uppercase">Core Configuration</span>
                            <h2 id="settings-title" className="text-3xl font-black font-display text-white uppercase tracking-tighter leading-none">
                                SYSTEM <span className="text-[var(--color-accent)]">INTERFACE</span>
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-slate-900 border border-slate-800 p-2 hover:bg-slate-800 hover:text-[var(--color-accent)] transition-all"
                            aria-label="Close settings"
                        >
                            <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-10">
                        {/* Display Mode */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.3em]">PROGRESS_TRACKING_PROTOCOL</label>
                            <div className="grid grid-cols-2 gap-4 p-1 bg-black/40 border border-slate-800">
                                <button
                                    onClick={() => setDisplayMode('fraction')}
                                    className={`py-3 text-[10px] font-black uppercase tracking-widest transition-all ${displayMode === 'fraction'
                                        ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                        : 'text-slate-600 hover:text-slate-400'
                                        }`}
                                >
                                    Numeric // (X/Y)
                                </button>
                                <button
                                    onClick={() => setDisplayMode('percentage')}
                                    className={`py-3 text-[10px] font-black uppercase tracking-widest transition-all ${displayMode === 'percentage'
                                        ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                        : 'text-slate-600 hover:text-slate-400'
                                        }`}
                                >
                                    Percentage // (%)
                                </button>
                            </div>
                        </div>

                        {/* UI Scale */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.3em]">VISUAL_SCALE_MODIFIER</label>
                                <span className="text-xs font-mono font-bold text-[var(--color-accent)]">{Math.round(uiScale * 100)}%</span>
                            </div>
                            <div className="relative flex items-center h-2 bg-slate-900 border border-slate-800 p-1">
                                <input
                                    type="range"
                                    min="0.75"
                                    max="1.25"
                                    step="0.05"
                                    value={uiScale}
                                    onChange={(e) => setUiScale(parseFloat(e.target.value))}
                                    className="w-full bg-transparent appearance-none cursor-pointer accent-[var(--color-accent)]"
                                />
                            </div>
                        </div>

                        {/* Data Management */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.3em]">DATABASE_BACKUP_SEQUENCES</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={onExport} className="group relative overflow-hidden px-6 py-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                                    <span className="relative z-10">Export Records</span>
                                    <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-white/5 transition-all"></div>
                                </button>
                                <button onClick={onImport} className="group relative overflow-hidden px-6 py-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                                    <span className="relative z-10">Import Records</span>
                                    <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-white/5 transition-all"></div>
                                </button>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="pt-8 border-t border-slate-800/40">
                            <button
                                onClick={handleReset}
                                className={`w-full py-4 px-6 text-[10px] font-black tracking-[0.4em] uppercase transition-all border group relative overflow-hidden ${confirmReset
                                    ? 'bg-red-500/10 text-red-500 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.1)]'
                                    : 'bg-transparent text-slate-700 border-slate-900 hover:text-red-500 hover:border-red-900'
                                    }`}
                            >
                                <span className="relative z-10">{confirmReset ? "TERMINATE ALL DATA" : "INITIATE SYSTEM WIPE"}</span>
                                {confirmReset && (
                                    <div className="absolute inset-0 bg-red-500 opacity-5 animate-pulse"></div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
