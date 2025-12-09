interface Props {
    onOpenGallery: () => void;
    onOpenSettings: () => void;
}

export function Header({ onOpenGallery, onOpenSettings }: Props) {
    return (
        <header className="max-w-7xl mx-auto mb-12 relative z-20">
            {/* Top Bar Decoration */}
            <div className="flex justify-between items-center py-2 border-b border-white/10 mb-6">
                <div className="flex gap-4 text-[10px] text-slate-500 font-tech uppercase tracking-widest">
                    <span>SYS.VER.1.0</span>
                    <span>CONNECTED_ TO_SERVER</span>
                    <span>SECURE_LINK</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-16 h-1 bg-white/10"></div>
                    <div className="w-4 h-1 bg-bo7-orange"></div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="relative">
                    <h1 className="text-6xl md:text-7xl font-bo7 text-white tracking-tighter uppercase relative z-10"
                        style={{ textShadow: '0 4px 0 rgba(255, 159, 0, 0.2)' }}>
                        BLACK OPS 7
                        <span className="block text-2xl md:text-3xl text-bo7-orange tracking-[0.2em] -mt-2">CAMO TRACKER</span>
                    </h1>

                    {/* Decorative Elements */}
                    <div className="absolute -left-8 top-0 bottom-0 w-1 bg-white/5 hidden md:block"></div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={onOpenGallery}
                        className="group relative px-8 py-3 bg-white/5 hover:bg-bo7-orange text-white hover:text-black font-bo7 uppercase tracking-wider text-sm transition-all duration-300 clip-path-slant border-l-2 border-bo7-orange"
                    >
                        <span className="relative z-10">Intel Database</span>
                        <div className="absolute inset-0 bg-bo7-orange/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>

                    <button
                        onClick={onOpenSettings}
                        className="px-4 py-3 bg-slate-900 border border-white/10 hover:border-bo7-orange text-slate-400 hover:text-bo7-orange transition-all clip-path-slant-inv"
                        aria-label="Settings"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
