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
            className="group bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 rounded-xl overflow-hidden shadow-sm"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-800">
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
                        {weapon.name}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 block">Weapon System</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                    {isMastered && (
                        <span className="text-[10px] font-bold text-slate-900 bg-cyan-400 px-2 py-0.5 rounded uppercase tracking-wider">
                            Mastered
                        </span>
                    )}
                    <div className="text-sm font-semibold text-slate-400">
                        {displayMode === 'percentage'
                            ? `${Math.round(progressPercent)}%`
                            : `${completedCount}/${totalCamos}`
                        }
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Clean Progress Bar */}
                <div className="mb-6 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-cyan-500 transition-all duration-700 ease-out"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>

                <CamoGrid weapon={weapon} progress={progress} onToggle={onToggle} />
            </div>
        </div>
    );
}
