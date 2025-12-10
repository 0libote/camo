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
            className="group bg-slate-900/50 border border-slate-800 hover:border-[var(--color-accent)] transition-all duration-300 relative"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-slate-800 bg-slate-900/80">
                <h3 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
                    {weapon.name}
                </h3>
                <div className="flex items-center gap-3">
                    {isMastered && <span className="text-[10px] font-bold text-slate-900 bg-[var(--color-accent)] px-1">MSTR</span>}
                    <div className="text-xs font-mono text-slate-500 group-hover:text-slate-300">
                        {displayMode === 'percentage'
                            ? `${Math.round(progressPercent)}%`
                            : `${completedCount}/${totalCamos}`
                        }
                    </div>
                </div>
            </div>

            <div className="p-4">
                {/* Integrated Progress Bar */}
                <div className="mb-4 h-1.5 bg-slate-800 overflow-hidden">
                    <div
                        className="h-full bg-[var(--color-accent)] transition-all duration-500 ease-out"
                        style={{ width: `${progressPercent}%`, boxShadow: '0 0 10px var(--color-accent)' }}
                    />
                </div>

                <CamoGrid weapon={weapon} progress={progress} onToggle={onToggle} />
            </div>
        </div>
    );
}
