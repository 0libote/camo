import type { Weapon, UserProgress, CamoName } from '../types';
import { WeaponCard } from './WeaponCard';
import { isCamoCompleted, getWeaponsInClass } from '../logic/progression';

interface Props {
    className: string;
    weapons: Weapon[];
    progress: UserProgress;
    onToggle: (weaponName: string, camo: CamoName) => void;
}

export function WeaponList({ className, weapons, progress, onToggle }: Props) {
    // Calculate Class Progress (Arclight readiness)
    // Arclight requires Shattered Gold on ALL weapons in class.
    const weaponsInClass = getWeaponsInClass(className);
    const shatteredGoldCount = weaponsInClass.filter(w => isCamoCompleted(w.name, "Shattered Gold", progress)).length;
    const totalWeapons = weaponsInClass.length;
    const isArclightReady = shatteredGoldCount === totalWeapons;

    return (
        <div className="space-y-6">
            {/* Class Header / Stats */}
            <div className="flex items-center justify-between bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
                <div>
                    <h2 className="text-2xl font-bold text-white">{className}</h2>
                    <p className="text-sm text-slate-400">
                        {shatteredGoldCount} / {totalWeapons} Shattered Gold
                    </p>
                </div>

                {/* Arclight Status Indicator */}
                <div className={`px-4 py-2 rounded-lg border ${isArclightReady
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                    : 'bg-slate-900/50 border-slate-700 text-slate-500'
                    }`}>
                    <div className="text-xs font-bold uppercase tracking-wider">Arclight Access</div>
                    <div className="font-bold">{isArclightReady ? "UNLOCKED" : "LOCKED"}</div>
                </div>
            </div>

            {/* Grid of Weapons */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {weapons.map(weapon => (
                    <WeaponCard
                        key={weapon.name}
                        weapon={weapon}
                        progress={progress}
                        onToggle={onToggle}
                    />
                ))}
            </div>
        </div>
    );
}
