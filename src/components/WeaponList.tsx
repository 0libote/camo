import type { Weapon, UserProgress, CamoName } from '../types';
import { WeaponCard } from './WeaponCard';
import { ClassMasteryCard } from './ClassMasteryCard';
import { getClassShatteredGoldCount, ARCLIGHT_CLASS_REQUIREMENTS } from '../logic/progression';

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
        <div className="space-y-10 animate-fade-in">
            {/* Category Header */}
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-800 pb-8 gap-6">
                <div>
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block mb-2">
                        {isActualClass ? 'Weapon Category' : 'Search Database'}
                    </span>
                    <h2 className="text-3xl font-bold text-white tracking-tight leading-none">
                        {className}
                    </h2>
                </div>

                {/* Class Mastery Status */}
                {isActualClass && (
                    <div className="w-full md:w-auto" onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd}>
                        <ClassMasteryCard
                            className={className}
                            shatteredGoldCount={shatteredGoldCount}
                            requiredForArclight={requiredForArclight}
                            displayMode={displayMode}
                        />
                    </div>
                )}
            </div>

            {/* Grid of Weapons */}
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
