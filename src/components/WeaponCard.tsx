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
    const availableCamos = Object.keys(weapon.camos) as CamoName[];
    const totalCamos = availableCamos.length;
    const completedCount = availableCamos.filter(camo =>
        isCamoCompleted(weapon.name, camo, progress)
    ).length;

    const isMastered = totalCamos > 0 && completedCount === totalCamos;

    // Determine status color
    const statusColor = isMastered ? 'text-bo7-orange' : 'text-slate-500';
    const statusBorder = isMastered ? 'border-bo7-orange' : 'border-white/10';

    return (
        <div
            className="border-tech p-5 group hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            {/* Corner Markers */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-bo7-orange/50 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/10 group-hover:border-bo7-orange/50 transition-colors"></div>

            {/* Header */}
            <div className="flex justify-between items-start mb-6 z-10 relative">
                <div>
                    <h3 className="text-2xl font-bo7 text-white uppercase tracking-wider group-hover:text-bo7-orange transition-colors">
                        {weapon.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-tech font-bold px-2 py-0.5 border ${statusBorder} ${statusColor} uppercase tracking-widest`}>
                            {isMastered ? 'COMPLETE' : 'IN PROGRESS'}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-white/20 group-hover:text-white transition-colors font-bo7">
                        {displayMode === 'percentage'
                            ? `${totalCamos > 0 ? Math.round((completedCount / totalCamos) * 100) : 0}%`
                            : `${completedCount}/${totalCamos}`}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                <ProgressBar
                    progress={totalCamos > 0 ? (completedCount / totalCamos) * 100 : 0}
                    colorClass="bg-bo7-orange"
                    heightClass="h-2"
                />
            </div>

            <CamoGrid weapon={weapon} progress={progress} onToggle={onToggle} />
        </div>
    );
}
