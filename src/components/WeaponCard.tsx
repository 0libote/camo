import type { Weapon, UserProgress, CamoName } from '../types';
import { CamoGrid } from './CamoGrid';
import { isCamoCompleted } from '../logic/progression';

interface Props {
    weapon: Weapon;
    progress: UserProgress;
    onToggle: (weaponName: string, camo: CamoName) => void;
    displayMode: 'fraction' | 'percentage';
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
    onNavigateToWP?: (weaponName: string) => void;
}

export function WeaponCard({
    weapon,
    progress,
    onToggle,
    displayMode,
    onHoverStart,
    onHoverEnd,
    onNavigateToWP
}: Props) {
    // Access MP camos for now
    const availableCamos = weapon.camos.mp ? (Object.keys(weapon.camos.mp) as CamoName[]) : [];
    const totalCamos = availableCamos.length;
    const completedCount = availableCamos.filter(camo =>
        isCamoCompleted(weapon.name, camo, progress)
    ).length;

    const isMastered = totalCamos > 0 && completedCount === totalCamos;
    const progressPercent = totalCamos > 0 ? (completedCount / totalCamos) * 100 : 0;

    return (
        <div
            className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors rounded-xl overflow-visible"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-white uppercase tracking-tight">
                        {weapon.name}
                    </h3>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToWP?.(weapon.name);
                        }}
                        className="p-1.5 text-neutral-500 hover:text-purple-400 transition-colors rounded-md hover:bg-purple-500/10"
                        title="View Weapon Prestige"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    {isMastered && (
                        <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                            Complete
                        </span>
                    )}
                    <span className="text-sm text-neutral-400">
                        {displayMode === 'percentage'
                            ? `${Math.round(progressPercent)}%`
                            : `${completedCount}/${totalCamos}`
                        }
                    </span>
                </div>
            </div>

            <div className="p-4 overflow-visible">
                {/* Weapon Image */}
                {weapon.image && (
                    <div className="mb-4 flex justify-center">
                        <img
                            src={`${import.meta.env.BASE_URL}${weapon.image}`}
                            alt={weapon.name}
                            className="h-24 object-contain"
                            loading="lazy"
                        />
                    </div>
                )}

                {/* Progress Bar */}
                {totalCamos > 0 ? (
                    <>
                        <div className="mb-4 h-1 bg-neutral-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-300 ${isMastered ? 'bg-green-500' : 'bg-blue-500'}`}
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>

                        <CamoGrid weapon={weapon} progress={progress} onToggle={onToggle} />
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-neutral-500">
                        <p className="text-sm font-medium">Data coming soon</p>
                    </div>
                )}
            </div>
        </div>
    );
}
