import type { Weapon, UserProgress, CamoName } from '../types';
import { WeaponCard } from './WeaponCard';
import { getClassShatteredGoldCount, ARCLIGHT_CLASS_REQUIREMENTS } from '../logic/progression';
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
    const shatteredGoldCount = getClassShatteredGoldCount(className, progress);
    const requiredForArclight = ARCLIGHT_CLASS_REQUIREMENTS[className] || 0;
    const isArclightReady = shatteredGoldCount >= requiredForArclight;

    // Only show Arclight card for actual weapon classes (not search results)
    const isActualClass = requiredForArclight > 0 && !className.includes('Search Results');

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
                        <div className="flex-1">
                            <div className="text-xl font-bo7 text-white mb-2 uppercase tracking-wider">Class Mastery</div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className={`text-3xl font-bo7 transition-colors ${isArclightReady ? 'text-bo7-orange' : 'text-white'}`}>
                                    {shatteredGoldCount}
                                </span>
                                <span className="text-lg text-white/40">/</span>
                                <span className="text-lg text-white/40">{requiredForArclight}</span>
                            </div>
                            <div className="mb-2">
                                <ProgressBar
                                    progress={(shatteredGoldCount / requiredForArclight) * 100}
                                    colorClass="bg-bo7-orange"
                                    heightClass="h-2"
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest truncate">
                                {isArclightReady ? "Arclight Unlocked for Class" : `Get ${requiredForArclight} Gold Camos to Unlock Arclight`}
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
