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

    // Only show Arclight card for actual weapon classes (not search results)
    const isActualClass = weaponsInClass.length > 0 && !className.includes('Search Results');

    return (
        <div className="space-y-8">
            {/* Class Header / Stats */}
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-4 gap-6">
                <div>
                    <h2 className="text-4xl font-bo7 text-white uppercase tracking-wider">{className}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-bo7-orange"></div>
                        <p className="text-sm text-slate-400 font-tech uppercase tracking-widest">
                            Class Protocol
                        </p>
                    </div>
                </div>

                {/* Class Mastery Card (Only for actual weapon classes) */}
                {isActualClass && (
                    <div className="flex-1 max-w-md w-full border-tech p-4 flex items-center gap-4 group hover:bg-white/5 transition-colors">
                        <div className="w-16 h-16 shrink-0 border border-white/10 bg-black relative">
                            <img src={CAMO_IMAGES["Arclight"]} alt="Arclight" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        </div>
                        <div className="flex-1 min-w-0 font-tech">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className={`font-bold text-xl uppercase tracking-wider ${isArclightReady ? 'text-purple-400' : 'text-slate-500'}`}>
                                    Arclight
                                </h3>
                                <span className="text-sm font-mono text-slate-400">{shatteredGoldCount}<span className="text-slate-600">/</span>{totalWeapons}</span>
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
                                {isArclightReady ? "Class Mastery Achieved" : `Complete Gold on All ${className}`}
                            </p>
                        </div>
                    </div>
                )}
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
