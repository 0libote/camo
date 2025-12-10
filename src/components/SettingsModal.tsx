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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 bg-slate-800 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-slate-700 rounded"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">
                    {/* Display Preferences */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Visual Interface</h3>

                        <div className="flex items-center justify-between">
                            <span className="text-slate-200">Progress Display</span>
                            <div className="flex bg-slate-800 p-1 rounded border border-slate-700">
                                <button
                                    onClick={() => setDisplayMode('fraction')}
                                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${displayMode === 'fraction'
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                        }`}
                                >
                                    Numeric
                                </button>
                                <button
                                    onClick={() => setDisplayMode('percentage')}
                                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${displayMode === 'percentage'
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                        }`}
                                >
                                    Percent
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Data Management */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Data Protocol</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={onExport} className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Export
                            </button>
                            <button onClick={onImport} className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                Import
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="pt-4 border-t border-slate-700">
                        <button
                            onClick={handleReset}
                            className={`w-full py-2 px-4 font-medium rounded transition-colors ${confirmReset
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-transparent text-red-500 border border-red-500/30 hover:bg-red-500/10'
                                }`}
                        >
                            {confirmReset ? "Confirm Wipe" : "Reset Progress"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
