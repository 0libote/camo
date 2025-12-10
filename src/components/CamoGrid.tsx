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
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-4">
            {CAMO_ORDER.map((camoName) => {
                const camoData = weapon.camos[camoName];
                if (!camoData) return null;

                const status = getCamoStatus(weapon, camoName, progress);
                const isCompleted = status === "completed";
                const isLocked = status === "locked";
                const isInteractive = camoName !== "Singularity";

                return (
                    <button
                        key={camoName}
                        disabled={isLocked || !isInteractive}
                        onClick={() => onToggle(weapon.name, camoName)}
                        title={`${camoName}: ${camoData.requirement}`}
                        className={`
                            relative aspect-square transition-all
                            border rounded overflow-hidden
                            ${isCompleted
                                ? 'border-green-500/50'
                                : isLocked
                                    ? 'border-slate-800 opacity-50 cursor-not-allowed'
                                    : 'border-slate-700 hover:border-slate-500'
                            }
                        `}
                    >
                        <img
                            src={CAMO_IMAGES[camoName]}
                            alt={camoName}
                            className={`w-full h-full object-cover transition-opacity ${isCompleted ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                            loading="lazy"
                        />

                        {isCompleted && (
                            <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
                                <svg className="w-6 h-6 text-green-400 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}

                        {isLocked && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
