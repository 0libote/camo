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
                // Skip camos that don't exist for this weapon
                const camoData = weapon.camos[camoName];
                if (!camoData) return null;

                const status = getCamoStatus(weapon, camoName, progress);
                const reqText = camoData.requirement;
                const isCompleted = status === "completed";
                const isLocked = status === "locked";
                const isInteractive = camoName !== "Singularity";

                return (
                    <button
                        key={camoName}
                        disabled={isLocked || !isInteractive}
                        onClick={() => onToggle(weapon.name, camoName)}
                        className={`
                          group/camo relative aspect-square transition-all duration-300 hover:z-20
                          ${isCompleted
                                ? 'border-2 border-bo7-orange shadow-[0_0_15px_rgba(255,159,0,0.4)]'
                                : isLocked
                                    ? 'border border-white/5 cursor-not-allowed opacity-50'
                                    : 'border border-white/20 hover:border-bo7-orange hover:shadow-[0_0_10px_rgba(255,159,0,0.2)] hover:scale-105 cursor-pointer'
                            }
                        `}
                    >
                        {/* Corner accents for tactical feel */}
                        {!isLocked && !isCompleted && (
                            <>
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50 opacity-0 group-hover/camo:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50 opacity-0 group-hover/camo:opacity-100 transition-opacity"></div>
                            </>
                        )}

                        {/* Background Image Container */}
                        <div className="absolute inset-0 overflow-hidden bg-black">
                            {/* Camo Image */}
                            <img
                                src={CAMO_IMAGES[camoName]}
                                alt={camoName}
                                className={`w-full h-full object-cover transition-transform duration-500 
                                    ${isCompleted ? 'opacity-100 scale-110' : 'opacity-60 grayscale group-hover/camo:opacity-100 group-hover/camo:grayscale-0 group-hover/camo:scale-110'}
                                `}
                                loading="lazy"
                            />

                            {/* Locked Pattern Overlay */}
                            {isLocked && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            )}

                            {/* Completed Overlay - Flash */}
                            {isCompleted && (
                                <div className="absolute inset-0 bg-bo7-orange/10 animate-pulse"></div>
                            )}
                        </div>

                        {/* Checkmark Overlay */}
                        {isCompleted && (
                            <div className="absolute top-0 right-0 p-1">
                                <div className="bg-bo7-orange text-black p-0.5 shadow-sm transform scale-100 clip-path-diamond">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Enhanced Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 opacity-0 group-hover/camo:opacity-100 transition-all duration-200 pointer-events-none z-[50]">
                            <div className="bg-bo7-black border border-white/20 text-white p-3 shadow-2xl relative">
                                {/* Tooltip Tech Borders */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-bo7-orange"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-bo7-orange"></div>

                                <div className="font-bo7 text-bo7-orange mb-1 text-lg uppercase tracking-wider text-center">{camoName}</div>
                                <div className="text-slate-300 text-xs text-center font-tech leading-tight uppercase font-bold border-t border-white/10 pt-2">{reqText}</div>

                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-3 h-3 bg-bo7-black border-r border-b border-white/20 transform rotate-45"></div>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
