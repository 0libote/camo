interface Props {
    onOpenGallery: () => void;
    onOpenSettings: () => void;
}

export function Header({ onOpenGallery, onOpenSettings }: Props) {
    return (
        <header className="max-w-7xl mx-auto mb-12 relative z-20">
            {/* Top Bar Decoration */}
            <div className="flex justify-between items-center py-2 border-b border-white/10 mb-8 bg-gradient-to-r from-black/0 via-white/5 to-black/0">
                <div className="flex gap-6 text-[10px] text-slate-500 font-tech uppercase tracking-[0.2em] select-none">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-bo7-orange/50 rounded-full animate-pulse"></span>
                        ONLINE
                    </span>
                    <span>VER_1.0.4</span>
                    <span className="hidden md:inline text-white/20">SECURE_CONNECTION_ESTABLISHED</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-12 h-1 bg-white/10 skew-x-[20deg]"></div>
                    <div className="w-2 h-1 bg-bo7-orange skew-x-[20deg]"></div>
                    <div className="w-2 h-1 bg-bo7-orange/50 skew-x-[20deg]"></div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-6 relative">
                <div className="relative pl-6">
                    {/* Vertical Decor Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 flex flex-col justify-between">
                        <div className="h-4 bg-bo7-orange w-full"></div>
                        <div className="h-16 bg-white/5 w-full"></div>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bo7 text-white tracking-tighter uppercase relative z-10 leading-[0.85]">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">BLACK OPS</span>
                        <span className="text-bo7-orange ml-4 text-glow">7</span>
                        <span className="block text-xl md:text-2xl text-slate-400 font-tech tracking-[0.3em] uppercase mt-2 border-t border-white/10 pt-2 w-max">
                            Mission: Camo Tracker
                        </span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={onOpenGallery}
                        className="group relative px-6 py-3 bg-glass-tech hover:bg-bo7-orange text-slate-300 hover:text-black font-bo7 uppercase tracking-wider text-sm transition-all duration-300 clip-path-slant border-l-2 border-bo7-orange overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-line-pattern opacity-10"></div>
                        <div className="flex flex-col items-start relative z-10">
                            <span className="text-[10px] font-tech opacity-60 mb-0.5 group-hover:text-black/70">DATABASE_ACCESS</span>
                            <span className="text-lg leading-none">Camo Gallery</span>
                        </div>
                        {/* Hover slide effect */}
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    </button>

                    <button
                        onClick={onOpenSettings}
                        className="group w-14 h-14 bg-glass-tech border border-white/10 hover:border-bo7-orange text-slate-400 hover:text-bo7-orange transition-all clip-path-slant-inv flex items-center justify-center relative overflow-hidden"
                        aria-label="Settings"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-bo7-orange/0 to-bo7-orange/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Background decorative big text */}
            <div className="absolute -top-10 right-0 text-[10rem] font-bo7 text-white/5 pointer-events-none select-none overflow-hidden h-40">
                OPS
            </div>
        </header>
    );
}
