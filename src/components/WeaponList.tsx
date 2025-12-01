import type { Weapon, UserProgress, CamoName } from '../types';
import { WeaponCard } from './WeaponCard';
import { isCamoCompleted, getWeaponsInClass } from '../logic/progression';
import { ProgressBar } from './ProgressBar';

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
        <div className="space-y-8">
            {/* Class Header / Stats */}
            <div className="flex flex-col md:flex-row items-end justify-between border-b border-white/10 pb-4 gap-6">
                <div className="flex-1">
                    <h2 className="text-4xl font-bo7 text-white uppercase tracking-wider leading-none">{className}</h2>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-bo7-orange rotate-45"></div>
                            <p className="text-xs text-slate-400 font-tech uppercase tracking-widest">
                                Class Protocol
                            </p>
                        </div>

                        {/* Compact Class Mastery Indicator */}
                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                            <span className={`text-xs font-bold uppercase tracking-wider ${isArclightReady ? 'text-purple-400' : 'text-slate-500'}`}>
                                Class Mastery
                            </span>
                            <div className="w-32">
                                <ProgressBar
                                    progress={(shatteredGoldCount / totalWeapons) * 100}
                                    colorClass="bg-purple-500"
                                    heightClass="h-1.5"
                                    showGlow={false}
                                />
                            </div>
                            <span className="text-xs font-mono text-slate-500">
                                {shatteredGoldCount}/{totalWeapons}
                            </span>
                        </div>
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
