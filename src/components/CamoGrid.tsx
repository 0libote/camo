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
        <div className="grid grid-cols-4 gap-2 mt-4">
            {CAMO_ORDER.map((camoName) => {
                const camoData = weapon.camos[camoName];
                if (!camoData) return null;

                const status = getCamoStatus(weapon, camoName, progress);
                const isCompleted = status === "completed";
                const isLocked = status === "locked";
                const isInteractive = camoName !== "Singularity";

                return (
                    <div key={camoName} className="relative group/camo">
                        <button
                            disabled={isLocked || !isInteractive}
                            onClick={() => onToggle(weapon.name, camoName)}
                            className={`
                                w-full aspect-square transition-all duration-200
                                border rounded-lg overflow-hidden relative
                                ${isCompleted
                                    ? 'border-cyan-500/50 bg-cyan-500/10'
                                    : isLocked
                                        ? 'border-slate-800 opacity-40 cursor-not-allowed bg-slate-900'
                                        : 'border-slate-700 hover:border-slate-400 bg-slate-800'
                                }
                            `}
                        >
                            <img
                                src={CAMO_IMAGES[camoName]}
                                alt={camoName}
                                className={`w-full h-full object-cover transition-all duration-300 ${isLocked ? 'grayscale' : 'group-hover/camo:scale-110'}`}
                                loading="lazy"
                            />

                            {/* Status Indicator */}
                            {isCompleted && (
                                <div className="absolute top-1 right-1">
                                    <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full border-2 border-slate-950"></div>
                                </div>
                            )}

                            {isLocked && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            )}
                        </button>

                        {/* Tooltip */}
                        <div className="opacity-0 invisible group-hover/camo:opacity-100 group-hover/camo:visible transition-all duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2.5 bg-slate-900 border border-slate-700 text-xs text-slate-200 pointer-events-none z-50 w-48 shadow-xl rounded-lg">
                            <div className="font-bold text-cyan-400 mb-1">{camoName}</div>
                            <div className="text-slate-400 leading-snug text-[11px]">
                                {camoData.requirement}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
