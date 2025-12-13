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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
        >
            <div className="bg-slate-900 border border-[var(--color-accent)] w-full max-w-2xl shadow-[0_0_30px_rgba(255,107,0,0.1)] relative">
                {/* Decorative Corner Markers */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--color-accent)]"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--color-accent)]"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[var(--color-accent)]"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[var(--color-accent)]"></div>

                <div className="p-6">
                    <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                        <h2 id="settings-title" className="text-2xl font-bold font-display text-white uppercase tracking-wider">
                            System <span className="text-[var(--color-accent)]">Settings</span>
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-slate-500 hover:text-white transition-colors"
                            aria-label="Close settings"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-8">
                        {/* Display Mode */}
                        <div className="space-y-3">
                            <label className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-widest">Display Protocol</label>
                            <div className="grid grid-cols-2 gap-2 p-1 bg-black border border-slate-800">
                                <button
                                    onClick={() => setDisplayMode('fraction')}
                                    className={`py-2 text-sm font-bold uppercase transition-all ${displayMode === 'fraction'
                                        ? 'bg-slate-900 text-white border-l-2 border-[var(--color-accent)]'
                                        : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    Numeric (5/5)
                                </button>
                                <button
                                    onClick={() => setDisplayMode('percentage')}
                                    className={`py-2 text-sm font-bold uppercase transition-all ${displayMode === 'percentage'
                                        ? 'bg-slate-900 text-white border-l-2 border-[var(--color-accent)]'
                                        : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    Percentage (100%)
                                </button>
                            </div>
                        </div>

                        {/* UI Scale */}
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <label className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-widest">Interface Scale</label>
                                <span className="text-xs font-mono text-white">{Math.round(uiScale * 100)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0.75"
                                max="1.25"
                                step="0.05"
                                value={uiScale}
                                onChange={(e) => setUiScale(parseFloat(e.target.value))}
                                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
                            />
                        </div>

                        {/* Data Management */}
                        <div className="space-y-3">
                            <label className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-widest">Data Io</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={onExport} className="flex items-center justify-center gap-2 px-4 py-2 bg-black hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors uppercase text-xs font-bold tracking-wider">
                                    Export JSON
                                </button>
                                <button onClick={onImport} className="flex items-center justify-center gap-2 px-4 py-2 bg-black hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors uppercase text-xs font-bold tracking-wider">
                                    Import JSON
                                </button>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="pt-4 border-t border-slate-800">
                            <button
                                onClick={handleReset}
                                className={`w-full py-3 px-4 text-xs font-bold tracking-widest uppercase transition-all border ${confirmReset
                                    ? 'bg-red-900/20 text-red-500 border-red-500 hover:bg-red-900/40'
                                    : 'bg-transparent text-slate-500 border-slate-800 hover:text-red-500 hover:border-red-900'
                                    }`}
                            >
                                {confirmReset ? "Confirm Data Wipe?" : "Reset All Progress"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
