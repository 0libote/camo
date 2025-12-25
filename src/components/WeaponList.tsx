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
        <div className="space-y-8">
            {/* Class Header */}
            <div className="flex flex-col md:flex-row items-end justify-between border-b border-slate-800/40 pb-6 gap-6 relative">
                <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-[var(--color-accent)]"></div>

                <div className="pl-6 border-l-2 border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono font-bold tracking-[0.3em] block mb-2">
                        {isActualClass ? 'TACTICAL CATEGORY' : 'SEARCH RESULTS'}
                    </span>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none font-display">
                        {className}
                    </h2>
                </div>

                {/* Class Mastery Card */}
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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
