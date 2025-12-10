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
        <div className="grid grid-cols-4 gap-4 mt-6">
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
                                border-2 relative
                                ${isCompleted
                                    ? 'border-[var(--color-accent)] shadow-[0_0_10px_rgba(255,107,0,0.4)] z-10'
                                    : isLocked
                                        ? 'border-slate-900 opacity-40 cursor-not-allowed bg-black'
                                        : 'border-slate-800 hover:border-[var(--color-accent)] hover:scale-105 hover:z-20 bg-[#0f0f0f]'
                                }
                            `}
                        >
                            <img
                                src={CAMO_IMAGES[camoName]}
                                alt={camoName}
                                className={`w-full h-full object-cover ${isLocked ? 'grayscale opacity-50' : ''}`}
                                loading="lazy"
                            />

                            {isCompleted && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-accent)]/20">
                                    <svg className="w-5 h-5 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}

                            {isLocked && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            )}
                        </button>

                        {/* Tooltip - Scoped to group/camo */}
                        <div className="opacity-0 group-hover/camo:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/95 border border-[var(--color-accent)] text-xs text-white whitespace-normal text-center pointer-events-none z-50 w-40 shadow-[0_0_15px_rgba(0,0,0,1)]">
                            <div className="font-bold text-[var(--color-accent)] uppercase text-[10px] tracking-wider mb-1">{camoName}</div>
                            {camoData.requirement}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black border-r border-b border-[var(--color-accent)]"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
