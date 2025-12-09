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
            <div className="relative w-full max-w-md bg-black border border-white/10 shadow-2xl">
                {/* Tech Borders */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-bo7-orange z-10"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-bo7-orange z-10"></div>

                {/* Decorative Header Bar */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-bo7-orange to-transparent opacity-50"></div>

                {/* Header */}
                <div className="flex items-center justify-between p-6 bg-white/5 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none"></div>
                    <div>
                        <div className="text-[10px] font-tech text-bo7-orange uppercase tracking-[0.2em] mb-1">System Config</div>
                        <h2 className="text-2xl font-bo7 text-white uppercase tracking-wider">Settings</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-white/10 rounded"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8 bg-black relative">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none"></div>

                    {/* Display Preferences */}
                    <div className="space-y-4 relative z-10">
                        <h3 className="text-sm font-bo7 text-slate-500 uppercase tracking-widest flex items-center gap-4">
                            <span>Visual Interface</span>
                            <div className="h-px flex-1 bg-white/10"></div>
                        </h3>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-tech text-slate-300 uppercase tracking-wide">Progress Display</span>
                            <div className="flex bg-black p-1 border border-white/10 clip-path-slant min-w-[200px] relative">
                                {/* Active Glint */}
                                <div className={`absolute top-0 bottom-0 w-1/2 bg-white/5 transition-transform duration-300 pointer-events-none ${displayMode === 'percentage' ? 'translate-x-full' : 'translate-x-0'}`}></div>

                                <button
                                    onClick={() => setDisplayMode('fraction')}
                                    className={`flex-1 px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all relative z-10 ${displayMode === 'fraction'
                                        ? 'bg-bo7-orange text-black shadow-[0_0_10px_rgba(255,159,0,0.4)]'
                                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    NUMERIC
                                </button>
                                <button
                                    onClick={() => setDisplayMode('percentage')}
                                    className={`flex-1 px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all relative z-10 ${displayMode === 'percentage'
                                        ? 'bg-bo7-orange text-black shadow-[0_0_10px_rgba(255,159,0,0.4)]'
                                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    PERCENT
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Data Management */}
                    <div className="space-y-4 relative z-10">
                        <h3 className="text-sm font-bo7 text-slate-500 uppercase tracking-widest flex items-center gap-4">
                            <span>Data Protocol</span>
                            <div className="h-px flex-1 bg-white/10"></div>
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={onExport} className="btn-tech-outline group">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    Export
                                </span>
                            </button>
                            <button onClick={onImport} className="btn-tech-outline group">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                    Import
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="pt-4 border-t border-white/10 relative z-10">
                        <button
                            onClick={handleReset}
                            className={`w-full py-3 px-4 font-bo7 uppercase tracking-wider transition-all border ${confirmReset
                                ? 'bg-bo7-red text-white border-bo7-red shadow-[0_0_15px_rgba(255,51,51,0.4)]'
                                : 'bg-transparent text-bo7-red border-bo7-red/30 hover:bg-bo7-red/10'
                                }`}
                        >
                            {confirmReset ? "CONFIRM WIPE // EXECUTE" : "RESET PROGRESS"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
