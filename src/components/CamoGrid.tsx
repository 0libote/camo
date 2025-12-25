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
        <div className="grid grid-cols-4 gap-3 mt-4">
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
                                w-full aspect-square transition-all duration-300
                                border uppercase font-black text-[8px] tracking-tighter relative overflow-hidden
                                ${isCompleted
                                    ? 'border-[var(--color-accent)]/60 bg-[var(--color-accent)]/5'
                                    : isLocked
                                        ? 'border-slate-900 opacity-20 cursor-not-allowed bg-black'
                                        : 'border-slate-800/80 hover:border-slate-500 bg-slate-900/40'
                                }
                            `}
                        >
                            <img
                                src={CAMO_IMAGES[camoName]}
                                alt={camoName}
                                className={`w-full h-full object-cover transition-all duration-500 ${isLocked ? 'grayscale scale-110 blur-[1px]' : 'group-hover/camo:scale-110'}`}
                                loading="lazy"
                            />

                            {/* Status Overlay */}
                            {isCompleted && (
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/40 to-transparent flex items-end justify-center pb-1">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"></div>
                                </div>
                            )}

                            {!isLocked && !isCompleted && (
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
                            )}
                        </button>

                        {/* Tooltip */}
                        <div className="opacity-0 group-hover/camo:opacity-100 transition-all duration-300 absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 bg-[#0a0c10] border border-slate-800 text-[10px] text-slate-300 pointer-events-none z-50 w-52 shadow-[0_10px_30px_rgba(0,0,0,0.8)] translate-y-2 group-hover/camo:translate-y-0">
                            <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
                                <div className="font-black text-[var(--color-accent)] uppercase tracking-widest">{camoName}</div>
                                <div className="text-[8px] text-slate-600 font-mono">CODE // {camoName.slice(0, 4).toUpperCase()}</div>
                            </div>
                            <div className="leading-relaxed font-medium">
                                {camoData.requirement}
                            </div>
                            {/* Decorative line */}
                            <div className="mt-2 h-[1px] bg-gradient-to-r from-[var(--color-accent)]/40 to-transparent w-full"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
