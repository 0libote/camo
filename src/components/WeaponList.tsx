import type { Weapon, UserProgress, CamoName } from '../types';
import { WeaponCard } from './WeaponCard';
import { isCamoCompleted, getWeaponsInClass } from '../logic/progression';
import { CAMO_IMAGES } from '../data';

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
            <div className="flex flex-col md:flex-row items-center justify-between bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">{className}</h2>
                    <p className="text-sm text-slate-400">
                        Complete Shattered Gold on all weapons to unlock Arclight
                    </p>
                </div>

                {/* Arclight Progress Bar (Mastery Style) */}
                <div className="flex-1 max-w-md w-full relative overflow-hidden bg-slate-900 rounded-xl border border-slate-700 p-3 flex items-center gap-4 group hover:border-purple-500/50 transition-colors">
                    <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-slate-600 bg-black">
                        <img src={CAMO_IMAGES["Arclight"]} alt="Arclight" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className={`font-bold truncate ${isArclightReady ? 'text-purple-400' : 'text-slate-500'}`}>
                                Arclight Access
                            </h3>
                            <span className="text-xs font-mono text-slate-400">{shatteredGoldCount} / {totalWeapons}</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1">
                            <div
                                className={`h-full transition-all duration-500 ${isArclightReady ? 'bg-purple-500' : 'bg-slate-600'}`}
                                style={{ width: `${Math.min(100, (shatteredGoldCount / totalWeapons) * 100)}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-slate-500 truncate">
                            {isArclightReady ? "UNLOCKED - Challenge Available" : "LOCKED - Requires Class Mastery"}
                        </p>
                    </div>
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
