interface Props {
    onOpenGallery: () => void;
    onOpenSettings: () => void;
}

export function Header({ onOpenGallery, onOpenSettings }: Props) {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center py-8 border-b border-slate-800 mb-8 relative">
            <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]"></div>

            <div className="flex items-center gap-4 mb-6 md:mb-0">
                <div className="w-12 h-12 bg-black border border-slate-800 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[var(--color-accent)] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <span className="text-2xl font-bold text-[var(--color-accent)] font-display">B7</span>
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-tighter font-display uppercase leading-none">
                        Black Ops 7 <span className="text-[var(--color-accent)]">Camo Tracker</span>
                    </h1>
                    <p className="text-xs text-slate-500 font-mono tracking-[0.2em] uppercase mt-1">
                        Operator Progression Database // BO7
                    </p>
                </div>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={onOpenGallery}
                    className="px-6 py-2 bg-slate-900 hover:bg-[var(--color-accent)] hover:text-white text-slate-400 border border-slate-700 hover:border-[var(--color-accent)] transition-all duration-200 uppercase font-bold tracking-wider text-xs clip-corners"
                    style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                >
                    View Gallery
                </button>

                <button
                    onClick={onOpenSettings}
                    className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-[var(--color-accent)] border border-slate-700 transition-colors"
                    aria-label="Settings"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
