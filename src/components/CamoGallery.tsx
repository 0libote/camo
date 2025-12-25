import { useEffect, useCallback } from 'react';
import { CAMO_ORDER, CAMO_IMAGES } from '../data';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function CamoGallery({ isOpen, onClose }: Props) {
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-4xl max-h-[85vh] flex flex-col rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-neutral-800">
                    <h2 className="text-lg font-semibold text-white">Camo Gallery</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-neutral-400 hover:text-white rounded transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {CAMO_ORDER.map((camoName) => (
                            <div
                                key={camoName}
                                className="bg-neutral-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500/50 transition-all"
                            >
                                <div className="aspect-square">
                                    <img
                                        src={CAMO_IMAGES[camoName]}
                                        alt={camoName}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-3 border-t border-neutral-700">
                                    <span className="text-sm font-medium text-white">{camoName}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
