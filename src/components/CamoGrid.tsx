import type { Weapon, UserProgress, CamoName } from '../types';
import { CAMO_ORDER, CAMO_IMAGES } from '../data';
import { getCamoStatus } from '../logic/progression';

interface Props {
    weapon: Weapon;
    progress: UserProgress;
    onToggle: (weaponName: string, camo: CamoName) => void;
}

export function CamoGrid({ weapon, progress, onToggle }: Props) {
    return (
        <div className="grid grid-cols-4 gap-3 mt-6">
            {CAMO_ORDER.map((camoName) => {
                const status = getCamoStatus(weapon, camoName, progress);
                const reqText = weapon.camos[camoName].requirement;
                const isCompleted = status === "completed";
                const isLocked = status === "locked";

                const isInteractive = camoName !== "Singularity";

                return (
                    <button
                        key={camoName}
                        disabled={isLocked || !isInteractive}
                        onClick={() => onToggle(weapon.name, camoName)}
                        className={`
              group/camo relative aspect-square border transition-all duration-300
              ${isCompleted
                                ? 'border-bo7-orange shadow-[0_0_15px_rgba(255,159,0,0.3)] z-10'
                                : isLocked
                                    ? 'border-white/5 cursor-not-allowed z-0'
                                    : 'border-white/20 hover:border-bo7-orange hover:shadow-[0_0_10px_rgba(255,159,0,0.2)] hover:z-10 cursor-pointer'
                            }
            `}
                    >
                        {/* Background Image Container */}
                        <div className={`absolute inset-0 overflow-hidden ${isLocked ? 'opacity-20 grayscale' : ''}`}>
                            <img
                                src={CAMO_IMAGES[camoName]}
                                alt={camoName}
                                className={`w-full h-full object-cover transition-transform duration-500 bg-black ${isCompleted ? 'scale-110' : 'group-hover/camo:scale-110'}`}
                                loading="lazy"
                            />
                            {/* Overlay */}
                            <div className={`absolute inset-0 transition-colors duration-300 pointer-events-none ${isCompleted ? 'bg-bo7-orange/10' : isLocked ? 'bg-black/80' : ''
                                }`} />

                            {/* Locked Pattern */}
                            {isLocked && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-[1px] bg-white/10 -rotate-45 transform scale-150"></div>
                                    <div className="w-full h-[1px] bg-white/10 rotate-45 transform scale-150"></div>
                                </div>
                            )}
                        </div>

                        {/* Status Icon */}
                        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${isLocked ? 'opacity-40' : ''}`}>
                            {isLocked && (
                                <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            )}
                            {isCompleted && (
                                <div className="bg-bo7-orange text-black p-1 shadow-lg transform scale-110 clip-path-diamond">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Enhanced Tooltip - Always readable even if locked */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 opacity-0 group-hover/camo:opacity-100 transition-all duration-200 pointer-events-none z-50">
                            <div className="bg-black/95 backdrop-blur-md border border-white/20 text-slate-200 text-xs p-3 shadow-2xl text-center font-tech">
                                <div className="font-bold text-bo7-orange mb-1 text-sm uppercase tracking-wider">{camoName}</div>
                                <div className="text-slate-300 leading-relaxed uppercase text-[10px] tracking-wide">{reqText}</div>
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 bg-black border-r border-b border-white/20 transform rotate-45"></div>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
