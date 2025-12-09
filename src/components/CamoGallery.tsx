import { CAMO_ORDER, CAMO_IMAGES } from '../data';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function CamoGallery({ isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
            {/* Fullscreen Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-tech-grid opacity-20"></div>

            <div className="bg-black border border-white/10 w-full max-w-6xl h-[85vh] flex flex-col shadow-2xl relative z-10 overflow-hidden">
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-bo7-orange z-20"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-bo7-orange z-20"></div>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 relative shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-8 bg-bo7-orange"></div>
                        <div>
                            <h2 className="text-3xl font-bo7 text-white uppercase tracking-wider">Visual Intel Database</h2>
                            <p className="text-xs font-tech text-slate-400 uppercase tracking-[0.3em]">Classified Materials // Level 1 Clearance</p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-bo7-orange hover:text-black text-white transition-colors border border-white/10"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 relative scrollbar-hide">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {CAMO_ORDER.map((camoName, index) => (
                            <div key={camoName} className="group relative border border-white/10 bg-black overflow-hidden hover:border-bo7-orange transition-colors duration-300">
                                {/* Index Number */}
                                <div className="absolute top-2 left-2 z-20 text-[10px] font-mono text-slate-500 group-hover:text-white">
                                    {(index + 1).toString().padStart(2, '0')}
                                </div>

                                <div className="aspect-square bg-white/5 relative">
                                    <div className="absolute inset-0 bg-bo7-orange/0 group-hover:bg-bo7-orange/10 transition-colors z-10"></div>
                                    <img
                                        src={CAMO_IMAGES[camoName]}
                                        alt={camoName}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="p-3 border-t border-white/10 bg-white/5 relative z-20">
                                    <div className="font-bo7 text-sm text-center text-slate-300 uppercase tracking-widest group-hover:text-bo7-orange transition-colors truncate">
                                        {camoName}
                                    </div>
                                    {/* Scan line decoration */}
                                    <div className="absolute bottom-0 left-0 h-[2px] bg-bo7-orange w-0 group-hover:w-full transition-all duration-300"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Status Bar */}
                <div className="p-2 border-t border-white/10 bg-black text-[10px] font-mono text-slate-600 flex justify-between uppercase shrink-0">
                    <span>Database Connection: Stable</span>
                    <span>Encrypted // TLS 1.3</span>
                </div>
            </div>
        </div>
    );
}
