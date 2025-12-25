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
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-xl shadow-2xl">
                <div className="flex justify-between items-center p-5 border-b border-neutral-800">
                    <h2 className="text-lg font-semibold text-white">Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-neutral-400 hover:text-white rounded transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-5 space-y-6">
                    {/* Display Mode */}
                    <div>
                        <label className="block text-sm text-neutral-400 mb-2">Display Format</label>
                        <div className="inline-flex bg-neutral-800 p-1 rounded-lg">
                            <button
                                onClick={() => setDisplayMode('fraction')}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${displayMode === 'fraction'
                                    ? 'bg-neutral-700 text-white'
                                    : 'text-neutral-400 hover:text-white'
                                    }`}
                            >
                                Fraction
                            </button>
                            <button
                                onClick={() => setDisplayMode('percentage')}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${displayMode === 'percentage'
                                    ? 'bg-neutral-700 text-white'
                                    : 'text-neutral-400 hover:text-white'
                                    }`}
                            >
                                Percentage
                            </button>
                        </div>
                    </div>

                    {/* UI Scale */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm text-neutral-400">UI Scale</label>
                            <span className="text-sm text-white">{Math.round(uiScale * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="0.75"
                            max="1.25"
                            step="0.05"
                            value={uiScale}
                            onChange={(e) => setUiScale(parseFloat(e.target.value))}
                            className="w-full accent-blue-500"
                        />
                    </div>

                    {/* Data Management */}
                    <div>
                        <label className="block text-sm text-neutral-400 mb-2">Data</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={onExport}
                                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm font-medium rounded-lg transition-colors"
                            >
                                Export
                            </button>
                            <button
                                onClick={onImport}
                                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm font-medium rounded-lg transition-colors"
                            >
                                Import
                            </button>
                        </div>
                    </div>

                    {/* Reset */}
                    <div className="pt-4 border-t border-neutral-800">
                        <button
                            onClick={handleReset}
                            className={`w-full py-2.5 text-sm font-medium rounded-lg transition-colors ${confirmReset
                                ? 'bg-red-500 text-white'
                                : 'bg-neutral-800 text-neutral-400 hover:text-red-400 hover:bg-red-500/10'
                                }`}
                        >
                            {confirmReset ? "Confirm Reset" : "Reset All Data"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
