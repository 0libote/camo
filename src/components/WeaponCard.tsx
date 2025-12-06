import type { Weapon, UserProgress, CamoName } from '../types';
import { CamoGrid } from './CamoGrid';
import { isCamoCompleted } from '../logic/progression';
import { ProgressBar } from './ProgressBar';

interface Props {
    weapon: Weapon;
    progress: UserProgress;
    onToggle: (weaponName: string, camo: CamoName) => void;
    displayMode: 'fraction' | 'percentage';
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
}

export function WeaponCard({ weapon, progress, onToggle, displayMode, onHoverStart, onHoverEnd }: Props) {
    // Calculate progress based on actually available camos for this weapon
    const availableCamos = Object.keys(weapon.camos) as CamoName[];
    const totalCamos = availableCamos.length;
    const completedCount = availableCamos.filter(camo =>
        isCamoCompleted(weapon.name, camo, progress)
    ).length;

    const isMastered = totalCamos > 0 && completedCount === totalCamos;
    const isGoldComplete = isMastered;

    return (
        <div
            className="border-tech p-5 group hover:bg-white/5 transition-colors duration-300"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-bo7 text-white uppercase tracking-wider group-hover:text-bo7-orange transition-colors">
                        {weapon.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-bo7 px-2 py-0.5 border ${isGoldComplete ? 'border-bo7-orange text-bo7-orange bg-bo7-orange/10' : 'border-slate-700 text-slate-500'}`}>
                            {isGoldComplete ? 'GOLD AUTH' : 'PENDING'}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xl font-bold text-white/30 group-hover:text-white/50 transition-colors font-tech tracking-wider">
                        {displayMode === 'percentage'
                            ? `${totalCamos > 0 ? Math.round((completedCount / totalCamos) * 100) : 0}%`
                            : `${completedCount} / ${totalCamos}`}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <ProgressBar
                    progress={totalCamos > 0 ? (completedCount / totalCamos) * 100 : 0}
                    colorClass="bg-bo7-orange"
                    heightClass="h-1.5"
                />
            </div>

            <CamoGrid weapon={weapon} progress={progress} onToggle={onToggle} />
        </div>
    );
}
