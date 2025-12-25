interface Props {
    onOpenGallery: () => void;
    onOpenSettings: () => void;
}

export function Header({ onOpenGallery, onOpenSettings }: Props) {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center py-8 border-b border-slate-800 mb-10">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
                <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center rounded-lg">
                    <span className="text-xl font-bold text-cyan-400">B7</span>
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight leading-none">
                        BO7 <span className="text-cyan-400">Tracker</span>
                    </h1>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                        Camo Tracking Database // System Active
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={onOpenGallery}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-md transition-all border border-slate-700"
                >
                    Camo Gallery
                </button>

                <button
                    onClick={onOpenSettings}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-md transition-all border border-slate-700"
                    aria-label="Settings"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
