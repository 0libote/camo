import { useState } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onExport: () => void;
    onImport: () => void;
    onReset: () => void;
    displayMode: 'fraction' | 'percentage';
    setDisplayMode: (mode: 'fraction' | 'percentage') => void;
}

export function SettingsModal({ isOpen, onClose, onExport, onImport, onReset, displayMode, setDisplayMode }: Props) {
    if (!isOpen) return null;

    const [confirmReset, setConfirmReset] = useState(false);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-black border border-white/20 w-full max-w-md flex flex-col shadow-2xl relative">
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-bo7-orange"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-bo7-orange"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-bo7-orange"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-bo7-orange"></div>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                    <h2 className="text-xl font-bo7 text-white uppercase tracking-wider">System Configuration</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 bg-tech-grid">

                    {/* Display Preferences */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-tech text-bo7-orange uppercase tracking-widest border-b border-white/10 pb-2">Preferences</h3>
                        <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                            <div className="text-sm font-tech text-slate-300 uppercase tracking-wide">Progress Display</div>
                            <div className="flex bg-black border border-white/10 p-1 gap-1">
                                <button
                                    onClick={() => setDisplayMode('fraction')}
                                    className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all ${displayMode === 'fraction'
                                            ? 'bg-bo7-orange text-black'
                                            : 'text-slate-500 hover:text-white'
                                        }`}
                                >
                                    Fraction
                                </button>
                                <button
                                    onClick={() => setDisplayMode('percentage')}
                                    className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all ${displayMode === 'percentage'
                                            ? 'bg-bo7-orange text-black'
                                            : 'text-slate-500 hover:text-white'
                                        }`}
                                >
                                    %
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-tech text-bo7-orange uppercase tracking-widest border-b border-white/10 pb-2">Transfer Protocol</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={onExport}
                                className="flex flex-col items-center justify-center p-4 border border-white/10 hover:border-bo7-orange/50 bg-white/5 hover:bg-white/10 transition-all group"
                            >
                                <svg className="w-6 h-6 text-slate-400 group-hover:text-bo7-orange mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white">Export Data</span>
                            </button>
                            <button
                                onClick={onImport}
                                className="flex flex-col items-center justify-center p-4 border border-white/10 hover:border-bo7-orange/50 bg-white/5 hover:bg-white/10 transition-all group"
                            >
                                <svg className="w-6 h-6 text-slate-400 group-hover:text-bo7-orange mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white">Import Data</span>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-tech text-bo7-red uppercase tracking-widest border-b border-white/10 pb-2">Danger Zone</h3>
                        <button
                            onClick={handleReset}
                            className={`w-full p-4 border transition-all flex items-center justify-center gap-2 ${confirmReset
                                ? 'border-bo7-red bg-bo7-red/20 text-white'
                                : 'border-bo7-red/30 bg-bo7-red/5 text-bo7-red hover:bg-bo7-red/10'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className="font-bold uppercase tracking-wider text-sm">
                                {confirmReset ? "Confirm Wipe?" : "Reset All Progress"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
