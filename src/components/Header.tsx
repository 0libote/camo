interface Props {
    onOpenGallery: () => void;
    onOpenSettings: () => void;
}

export function Header({ onOpenGallery, onOpenSettings }: Props) {
    return (
        <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-6">
            <div>
                <h1 className="text-5xl font-bo7 text-bo7-orange tracking-wider uppercase drop-shadow-[0_0_10px_rgba(255,159,0,0.5)]">
                    BO7 Camo Tracker
                </h1>
                <div className="flex items-center gap-2 mt-2">
                    <div className="h-1 w-8 bg-bo7-orange"></div>
                    <p className="text-slate-400 font-tech uppercase tracking-widest text-sm">Multiplayer Mastery Protocol</p>
                </div>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={onOpenGallery}
                    className="px-6 py-2 bg-bo7-orange/10 hover:bg-bo7-orange/20 text-bo7-orange font-bold uppercase tracking-wider text-sm transition-all border border-bo7-orange/30 hover:border-bo7-orange clip-path-slant"
                >
                    View Intel
                </button>
                <div className="h-8 w-px bg-white/10 mx-2"></div>
                <button
                    onClick={onOpenSettings}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 hover:border-slate-500"
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
