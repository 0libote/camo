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

    // Status Logic
    const progressPercent = totalCamos > 0 ? (completedCount / totalCamos) * 100 : 0;

    return (
        <div
            className="group relative bg-black/40 border border-white/5 hover:border-bo7-orange/50 transition-all duration-300"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            {/* Tactical Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-bo7-orange transition-colors"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-bo7-orange transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-bo7-orange transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-bo7-orange transition-colors"></div>

            {/* Top Data Strip */}
            <div className="flex justify-between items-center bg-white/5 px-4 py-1 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isMastered ? 'bg-bo7-orange animate-pulse' : 'bg-slate-600'}`}></div>
                    <span className="text-[10px] font-tech tracking-widest text-slate-500 uppercase">
                        WPN_ID_0{weapon.name.length} // {isMastered ? 'MASTERED' : 'ACTIVE'}
                    </span>
                </div>
                <div className="text-[10px] font-tech text-bo7-orange tracking-widest">
                    {displayMode === 'percentage'
                        ? `${Math.round(progressPercent)}%`
                        : `${completedCount}/${totalCamos}`
                    }
                </div>
            </div>

            <div className="p-6 relative">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none"></div>

                <div className="flex justify-between items-end mb-6 relative z-10">
                    <div>
                        <h3 className="text-3xl font-bo7 text-white uppercase tracking-wider group-hover:text-bo7-orange transition-colors break-words leading-none">
                            {weapon.name}
                        </h3>
                    </div>
                </div>

                {/* Integrated Progress Bar */}
                <div className="mb-6 relative h-1 bg-white/10 w-full overflow-hidden">
                    <div
                        className="absolute inset-y-0 left-0 bg-bo7-orange shadow-[0_0_10px_rgba(255,159,0,0.5)] transition-all duration-500 ease-out"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                <CamoGrid weapon={weapon} progress={progress} onToggle={onToggle} />
            </div>

            {/* Hover Decor */}
            <div className="absolute inset-0 border border-bo7-orange/0 group-hover:border-bo7-orange/30 pointer-events-none transition-all duration-500 z-0"></div>
        </div>
    );
}
