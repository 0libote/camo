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
}

export function WeaponCard({ weapon, progress, onToggle, displayMode, onHoverStart, onHoverEnd }: Props) {
    const availableCamos = Object.keys(weapon.camos) as CamoName[];
    const totalCamos = availableCamos.length;
    const completedCount = availableCamos.filter(camo =>
        isCamoCompleted(weapon.name, camo, progress)
    ).length;

    const isMastered = totalCamos > 0 && completedCount === totalCamos;
    const progressPercent = totalCamos > 0 ? (completedCount / totalCamos) * 100 : 0;

    return (
        <div
            className="group bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-500 transition-colors"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-slate-900 border-b border-slate-700">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isMastered ? 'bg-green-500' : 'bg-slate-600'}`}></div>
                    <span className="text-xs font-mono text-slate-400 uppercase">
                        {isMastered ? 'Mastered' : 'Active'}
                    </span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                    {displayMode === 'percentage'
                        ? `${Math.round(progressPercent)}%`
                        : `${completedCount}/${totalCamos}`
                    }
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-4">
                    {weapon.name}
                </h3>

                {/* Integrated Progress Bar */}
                <div className="mb-4 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                <CamoGrid weapon={weapon} progress={progress} onToggle={onToggle} />
            </div>
        </div>
    );
}
