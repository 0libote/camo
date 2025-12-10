import { CAMO_ORDER, CAMO_IMAGES } from '../data';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function CamoGallery({ isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-6xl h-[85vh] flex flex-col rounded-lg shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Camo Gallery</h2>
                        <p className="text-sm text-slate-400">All available patterns</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {CAMO_ORDER.map((camoName, index) => (
                            <div key={camoName} className="group bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-slate-500 transition-colors">
                                <div className="aspect-square bg-black relative">
                                    <img
                                        src={CAMO_IMAGES[camoName]}
                                        alt={camoName}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 rounded text-[10px] text-slate-300">
                                        {(index + 1).toString()}
                                    </div>
                                </div>
                                <div className="p-3 text-center">
                                    <span className="text-sm font-medium text-slate-200">{camoName}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
