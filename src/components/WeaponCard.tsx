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
            className="group bg-slate-900/10 border border-slate-800/60 hover:border-[var(--color-accent)]/80 transition-all duration-500 relative overflow-hidden"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            {/* Tactical Corner Decoration */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-slate-800/30 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-12 h-[1px] bg-[var(--color-accent)]/20 rotate-45 translate-x-3 -translate-y-1"></div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-end px-5 py-5 border-b border-slate-800/40 relative">
                <div>
                    <span className="text-[10px] text-[var(--color-accent)] font-mono font-bold tracking-[0.2em] block mb-0.5 opacity-60">ID // {weapon.name.slice(0, 3).toUpperCase()}</span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter font-display leading-none">
                        {weapon.name}
                    </h3>
                </div>
                <div className="flex flex-col items-end gap-1">
                    {isMastered && <span className="text-[10px] font-black text-black bg-[var(--color-accent)] px-1.5 py-0.5 leading-none shadow-[0_0_10px_var(--color-accent)]/30">MAX</span>}
                    <div className="text-xs font-mono font-bold text-slate-500 group-hover:text-[var(--color-accent)] transition-colors">
                        {displayMode === 'percentage'
                            ? `${Math.round(progressPercent)}%`
                            : `${completedCount}/${totalCamos}`
                        }
                    </div>
                </div>
            </div>

            <div className="p-5">
                {/* Integrated Progress Bar */}
                <div className="mb-6 h-1 bg-slate-800/40 relative">
                    <div
                        className="h-full bg-[var(--color-accent)] transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] relative shadow-[0_0_15px_var(--color-accent)]"
                        style={{ width: `${progressPercent}%` }}
                    >
                        <div className="absolute top-0 right-0 w-1 h-full bg-white opacity-50 shadow-[0_0_5px_white]"></div>
                    </div>
                </div>

                <CamoGrid weapon={weapon} progress={progress} onToggle={onToggle} />
            </div>
        </div>
    );
}
