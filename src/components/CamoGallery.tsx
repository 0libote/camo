import { CAMO_ORDER, CAMO_IMAGES } from '../data';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function CamoGallery({ isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-black border border-white/20 w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl relative">
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-bo7-orange"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-bo7-orange"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-bo7-orange"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-bo7-orange"></div>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                    <h2 className="text-3xl font-bo7 text-bo7-orange uppercase tracking-wider">Visual Intel Database</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-8 bg-tech-grid">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {CAMO_ORDER.map(camoName => (
                            <div key={camoName} className="group border-tech hover:border-bo7-orange transition-colors duration-300">
                                <div className="aspect-square bg-black relative overflow-hidden">
                                    <img
                                        src={CAMO_IMAGES[camoName]}
                                        alt={camoName}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                                <div className="p-4 text-center border-t border-white/10 bg-white/5">
                                    <div className="font-bo7 text-lg text-slate-200 uppercase tracking-widest group-hover:text-bo7-orange transition-colors">{camoName}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
