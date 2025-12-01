import type { Weapon, UserProgress, CamoName } from '../types';
import { CamoGrid } from './CamoGrid';
import { isCamoCompleted } from '../logic/progression';
import { ProgressBar } from './ProgressBar';

interface Props {
    weapon: Weapon;
    progress: UserProgress;
    onToggle: (weaponName: string, camo: CamoName) => void;
}

export function WeaponCard({ weapon, progress, onToggle }: Props) {
    // Calculate simple progress for the progress bar (excluding Singularity/Tempest from the "base" progress visual if desired, or include all)
    // Let's include all 8 camos for the bar.
    const totalCamos = 8;
    const completedCount = Object.keys(weapon.camos).filter(camo =>
        isCamoCompleted(weapon.name, camo as CamoName, progress)
    ).length;

    const isMastered = completedCount === totalCamos;
    const isGoldComplete = isMastered; // Assuming 'Gold Auth' refers to all camos completed

    return (
        <div className="border-tech p-5 group hover:bg-white/5 transition-colors duration-300">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-bo7 text-white uppercase tracking-wider group-hover:text-bo7-orange transition-colors">
                        {weapon.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-mono px-1.5 py-0.5 border ${isGoldComplete ? 'border-bo7-orange text-bo7-orange bg-bo7-orange/10' : 'border-slate-700 text-slate-500'}`}>
                            {isGoldComplete ? 'GOLD AUTH' : 'PENDING'}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bo7 text-white/20 group-hover:text-white/40 transition-colors">
                        {completedCount}<span className="text-lg">/</span>{totalCamos}
                    </div>
                </div>
            </div>



            {/* Progress Bar */}
            <div className="mb-6">
                <ProgressBar
                    progress={(completedCount / totalCamos) * 100}
                    colorClass="bg-bo7-orange"
                    heightClass="h-1.5"
                />
            </div>

            <CamoGrid weapon={weapon} progress={progress} onToggle={onToggle} />
        </div>
    );
}
