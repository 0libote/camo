import type { Weapon, UserProgress, CamoName } from '../types';
import { CamoGrid } from './CamoGrid';
import { isCamoCompleted } from '../logic/progression';

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

    const progressPercent = (completedCount / totalCamos) * 100;
    const isMastered = completedCount === totalCamos;

    return (
        <div className={`
      bg-slate-800 rounded-xl border p-4 transition-all duration-300
      ${isMastered ? 'border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'border-slate-700 hover:border-slate-600'}
    `}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-100">{weapon.name}</h3>
                    <p className="text-sm text-slate-400">{weapon.class} • Unlock Level {weapon.unlock_level}</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-slate-200">{completedCount}<span className="text-slate-500 text-lg">/{totalCamos}</span></div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 h-1.5 rounded-full mb-4 overflow-hidden">
                <div
                    className={`h-full transition-all duration-500 ${isMastered ? 'bg-amber-500' : 'bg-blue-500'}`}
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            <CamoGrid weapon={weapon} progress={progress} onToggle={onToggle} />
        </div>
    );
}
