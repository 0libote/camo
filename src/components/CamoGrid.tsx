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
        <div className="grid grid-cols-4 gap-2 overflow-visible">
            {CAMO_ORDER.map((camoName, index) => {
                const camoData = weapon.camos[camoName];
                if (!camoData) return null;

                const status = getCamoStatus(weapon, camoName, progress);
                const isCompleted = status === "completed";
                const isLocked = status === "locked";
                const isInteractive = camoName !== "Singularity";

                // Determine if tooltip should appear below (for top row items)
                const isTopRow = index < 4;

                return (
                    <div key={camoName} className="relative group">
                        <button
                            disabled={isLocked || !isInteractive}
                            onClick={() => onToggle(weapon.name, camoName)}
                            className={`
                                w-full aspect-square rounded-lg overflow-hidden relative transition-all
                                ${isCompleted
                                    ? 'ring-2 ring-green-500 ring-offset-1 ring-offset-neutral-900'
                                    : isLocked
                                        ? 'opacity-30 cursor-not-allowed'
                                        : 'hover:ring-2 hover:ring-neutral-600 hover:ring-offset-1 hover:ring-offset-neutral-900'
                                }
                            `}
                        >
                            <img
                                src={CAMO_IMAGES[camoName]}
                                alt={camoName}
                                className={`w-full h-full object-cover ${isLocked ? 'grayscale' : ''}`}
                                loading="lazy"
                            />

                            {/* Completed checkmark */}
                            {isCompleted && (
                                <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}

                            {/* Locked icon */}
                            {isLocked && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            )}
                        </button>

                        {/* Tooltip - shows below for top row, above for bottom row */}
                        <div className={`
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                            transition-opacity absolute left-1/2 -translate-x-1/2 
                            px-3 py-2 bg-neutral-800 border border-neutral-700 
                            text-xs text-white pointer-events-none z-[100] w-40 rounded-lg shadow-lg
                            ${isTopRow ? 'top-full mt-2' : 'bottom-full mb-2'}
                        `}>
                            <div className="font-medium text-blue-400 mb-1">{camoName}</div>
                            <div className="text-neutral-400 text-[11px] leading-relaxed">
                                {camoData.requirement}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
