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
              group relative aspect-square rounded-xl border-2 overflow-visible transition-all duration-300
              ${isCompleted
                                ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] z-0'
                                : isLocked
                                    ? 'border-slate-800 opacity-40 cursor-not-allowed grayscale z-0'
                                    : 'border-slate-600 hover:border-slate-300 hover:shadow-xl hover:scale-105 hover:z-10 cursor-pointer'
                            }
            `}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 rounded-lg overflow-hidden bg-slate-900">
                            <img
                                src={CAMO_IMAGES[camoName]}
                                alt={camoName}
                                className={`w-full h-full object-cover transition-transform duration-500 ${isCompleted ? 'scale-110' : 'group-hover:scale-110'}`}
                                loading="lazy"
                            />
                            {/* Overlay */}
                            <div className={`absolute inset-0 transition-colors duration-300 ${isCompleted ? 'bg-green-500/10' : isLocked ? 'bg-black/70' : 'group-hover:bg-white/5'
                                }`} />
                        </div>

                        {/* Status Icon */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {isLocked && (
                                <svg className="w-8 h-8 text-slate-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            )}
                            {isCompleted && (
                                <div className="bg-green-500 rounded-full p-1.5 shadow-lg transform scale-110">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Enhanced Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
                            <div className="bg-slate-900/95 backdrop-blur-md border border-slate-600 text-slate-200 text-xs rounded-lg p-3 shadow-2xl text-center">
                                <div className="font-bold text-orange-400 mb-1 text-sm">{camoName}</div>
                                <div className="text-slate-300 leading-relaxed">{reqText}</div>
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-600" />
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
