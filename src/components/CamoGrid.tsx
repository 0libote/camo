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
                        <img
                            src={CAMO_IMAGES[camoName]}
                            alt={camoName}
                            className={`w-full h-full object-cover transition-opacity ${isCompleted ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                            loading="lazy"
                        />

                        {isCompleted && (
                            {/* Arrow */ }
                            < div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-3 h-3 bg-bo7-black border-r border-b border-white/20 transform rotate-45"></div>
                            </div>
                        </div >
                    </button >
                );
})}
        </div >
    );
}
