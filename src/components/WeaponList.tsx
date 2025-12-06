import type { Weapon, UserProgress, CamoName } from '../types';
import { WeaponCard } from './WeaponCard';
import { ClassMasteryCard } from './ClassMasteryCard';
import { getClassShatteredGoldCount, ARCLIGHT_CLASS_REQUIREMENTS } from '../logic/progression';
import { ProgressBar } from './ProgressBar';

interface Props {
    className: string;
    weapons: Weapon[];
    progress: UserProgress;
    onToggle: (weaponName: string, camo: CamoName) => void;
    displayMode: 'fraction' | 'percentage';
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
}

export function WeaponList({ className, weapons, progress, onToggle, displayMode, onHoverStart, onHoverEnd }: Props) {
    // Calculate Class Progress (Arclight readiness)
    const shatteredGoldCount = getClassShatteredGoldCount(className, progress);
    const requiredForArclight = ARCLIGHT_CLASS_REQUIREMENTS[className] || 0;

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
                    <div className="flex-1 max-w-md w-full" onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd}>
                        <ClassMasteryCard
                            className={className}
                            shatteredGoldCount={shatteredGoldCount}
                            requiredForArclight={requiredForArclight}
                        />
                    </div>
                )}
            </div>

            {/* Grid of Weapons */}
            <div
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
            >
                {weapons.map(weapon => (
                    <WeaponCard
                        key={weapon.name}
                        weapon={weapon}
                        progress={progress}
                        onToggle={onToggle}
                        displayMode={displayMode}
                        onHoverStart={onHoverStart}
                        onHoverEnd={onHoverEnd}
                    />
                ))}
            </div>
        </div>
    );
}
