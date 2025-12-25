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
                <div className="flex items-end justify-between p-8 border-b border-slate-800/40 relative">
                    <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-[var(--color-accent)]"></div>
                    <div>
                        <span className="text-[10px] text-slate-500 font-mono font-bold tracking-[0.3em] block mb-2 uppercase">Reference Database</span>
                        <h2 id="gallery-title" className="text-4xl font-black text-white uppercase font-display leading-none tracking-tighter">Pattern <span className="text-[var(--color-accent)]">Archive</span></h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="bg-slate-900 border border-slate-800 p-3 hover:bg-slate-800 hover:text-[var(--color-accent)] transition-all group"
                        aria-label="Close gallery"
                    >
                        <svg className="w-6 h-6 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        {CAMO_ORDER.map((camoName, index) => (
                            <div key={camoName} className="group relative">
                                <div className="absolute -inset-[1px] bg-gradient-to-br from-white/10 to-transparent group-hover:from-[var(--color-accent)]/30 transition-all duration-500"></div>
                                <div className="relative bg-[#0d1016] overflow-hidden border border-slate-800 p-1">
                                    <div className="aspect-square bg-black relative overflow-hidden">
                                        <img
                                            src={CAMO_IMAGES[camoName]}
                                            alt={camoName}
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md text-[8px] font-mono text-slate-400 font-bold border border-slate-800">
                                            SEC // {(index + 1).toString().padStart(2, '0')}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-900/40">
                                        <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest block text-center group-hover:text-[var(--color-accent)] transition-colors">{camoName}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
