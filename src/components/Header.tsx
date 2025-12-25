interface Props {
    onOpenGallery: () => void;
    onOpenSettings: () => void;
}

export function Header({ onOpenGallery, onOpenSettings }: Props) {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center py-6 border-b border-slate-800/50 mb-8 relative">
            <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-[var(--color-accent)]/50 shadow-[0_0_15px_var(--color-accent)]"></div>

            <div className="flex items-center gap-5 mb-6 md:mb-0">
                <div className="w-14 h-14 bg-black border border-[var(--color-accent)]/30 flex items-center justify-center relative overflow-hidden group rotate-45">
                    <div className="absolute inset-0 bg-[var(--color-accent)] opacity-5 group-hover:opacity-20 transition-opacity"></div>
                    <span className="text-2xl font-black text-[var(--color-accent)] font-display -rotate-45 tracking-tighter">B7</span>
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight font-display uppercase leading-none">
                        Black Ops 7 <span className="text-[var(--color-accent)]">Tracker</span>
                    </h1>
                    <p className="text-[10px] text-slate-500 font-bold font-mono tracking-[0.3em] uppercase mt-1.5 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[var(--color-accent)] animate-pulse rounded-full"></span>
                        Neural Interface // System Active
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={onOpenGallery}
                    className="px-5 py-2 bg-slate-900/40 hover:bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 hover:border-[var(--color-accent)] transition-all duration-300 uppercase font-black tracking-[0.1em] text-[10px] relative group"
                >
                    <span className="relative z-10 transition-colors group-hover:text-white">Pattern Archive</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent"></div>
                </button>

                <button
                    onClick={onOpenSettings}
                    className="p-2.5 bg-slate-900/40 hover:bg-slate-800/60 text-slate-500 hover:text-[var(--color-accent)] border border-slate-800/50 transition-all rounded-sm"
                    aria-label="Settings"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
