import { useEffect, useCallback } from 'react';
import { CAMO_ORDER, CAMO_IMAGES } from '../data';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function CamoGallery({ isOpen, onClose }: Props) {
    // Handle escape key to close modal
    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-title"
        >
            <div className="bg-[#0a0c10] border border-slate-800 w-full max-w-6xl h-[85vh] flex flex-col shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/5 rotate-45 translate-x-16 -translate-y-16 pointer-events-none"></div>

                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-slate-800">
                    <div>
                        <span className="text-xs text-slate-500 font-bold tracking-wider block mb-2 uppercase">Camo Collection</span>
                        <h2 id="gallery-title" className="text-3xl font-bold text-white tracking-tight">Camo <span className="text-cyan-400">Gallery</span></h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="bg-slate-800 border border-slate-700 p-2 text-slate-400 hover:text-white rounded-md transition-all"
                        aria-label="Close gallery"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {CAMO_ORDER.map((camoName) => (
                            <div key={camoName} className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all shadow-md">
                                <div className="aspect-square bg-black relative overflow-hidden">
                                    <img
                                        src={CAMO_IMAGES[camoName]}
                                        alt={camoName}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-4 border-t border-slate-800">
                                    <span className="text-sm font-bold text-slate-200 text-center block group-hover:text-cyan-400 transition-colors uppercase tracking-wide">{camoName}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
