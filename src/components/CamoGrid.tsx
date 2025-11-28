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
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-4">
            {CAMO_ORDER.map((camoName) => {
                const status = getCamoStatus(weapon, camoName, progress);
                const reqText = weapon.camos[camoName].requirement;
                const isCompleted = status === "completed";
                const isLocked = status === "locked";

                // Singularity is auto-unlocked, so we don't allow toggling it manually if it's locked (it's impossible) 
                // or if it's completed (it's global).
                // Actually, user might want to toggle others.
                // Singularity is special.
                const isInteractive = camoName !== "Singularity";

                return (
                    <button
                        key={camoName}
                        disabled={isLocked || !isInteractive}
                        onClick={() => onToggle(weapon.name, camoName)}
                        className={`
              group relative aspect-square rounded-lg border overflow-hidden transition-all
              ${isCompleted
                                ? 'border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
                                : isLocked
                                    ? 'border-slate-800 opacity-50 cursor-not-allowed grayscale'
                                    : 'border-slate-600 hover:border-slate-400 hover:shadow-lg cursor-pointer'
                            }
            `}
                        title={`${camoName}: ${reqText}`}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 bg-slate-900">
                            <img
                                src={CAMO_IMAGES[camoName]}
                                alt={camoName}
                                className={`w-full h-full object-cover transition-transform duration-300 ${isCompleted ? 'scale-110' : 'group-hover:scale-110'}`}
                                loading="lazy"
                            />
                            {/* Overlay for Locked/Completed */}
                            <div className={`absolute inset-0 transition-colors ${isCompleted ? 'bg-green-500/10' : isLocked ? 'bg-black/60' : 'group-hover:bg-white/5'
                                }`} />
                        </div>

                        {/* Status Icon */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {isLocked && (
                                <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            )}
                            {isCompleted && (
                                <div className="bg-green-500/80 rounded-full p-1 shadow-sm">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Tooltip on Hover (Simple CSS based) */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[10px] text-center py-1 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity truncate px-1">
                            {camoName}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
