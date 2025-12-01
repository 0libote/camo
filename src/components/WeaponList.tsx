import type { Weapon, UserProgress, CamoName } from '../types';
import { WeaponCard } from './WeaponCard';
import { isCamoCompleted, getWeaponsInClass } from '../logic/progression';
import { CAMO_IMAGES } from '../data';
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
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-4 gap-6">
                <div>
                    <h2 className="text-4xl font-bo7 text-white uppercase tracking-wider">{className}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-bo7-orange"></div>
                        <p className="text-sm text-slate-400 font-tech uppercase tracking-widest">
                            Class Mastery Protocol
                        </p>
                    </div>
                </div>

                {/* Arclight Progress Bar (Mastery Style) */}
                <div className="flex-1 max-w-md w-full border-tech p-3 flex items-center gap-4 group hover:bg-white/5 transition-colors">
                    <div className="w-12 h-12 shrink-0 border border-white/10 bg-black relative">
                        <img src={CAMO_IMAGES["Arclight"]} alt="Arclight" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                    <div className="flex-1 min-w-0 font-tech">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className={`font-bold uppercase tracking-wider ${isArclightReady ? 'text-purple-400' : 'text-slate-500'}`}>
                                Arclight Access
                            </h3>
                            <span className="text-xs font-mono text-slate-400">{shatteredGoldCount}<span className="text-slate-600">/</span>{totalWeapons}</span>
                        </div>


                        {/* Progress Bar */}
                        <div className="mb-1">
                            <ProgressBar
                                progress={(shatteredGoldCount / totalWeapons) * 100}
                                colorClass="bg-purple-500"
                                heightClass="h-2"
                            />
                        </div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest truncate">
                            {isArclightReady ? "Access Granted" : "Requires Class Mastery"}
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
