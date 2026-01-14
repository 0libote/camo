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
    onNavigateToWP?: (weaponName: string) => void;
    scrollToWeapon?: string;
    onScrollComplete?: () => void;
}

import { useRef, useEffect } from 'react';

export function WeaponList({
    className,
    weapons,
    progress,
    onToggle,
    displayMode,
    onHoverStart,
    onHoverEnd,
    onNavigateToWP,
    scrollToWeapon,
    onScrollComplete
}: Props) {
    const weaponRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        if (scrollToWeapon && weaponRefs.current[scrollToWeapon]) {
            setTimeout(() => {
                weaponRefs.current[scrollToWeapon]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                onScrollComplete?.();
            }, 100);
        }
    }, [scrollToWeapon, onScrollComplete]);
    const shatteredGoldCount = getClassShatteredGoldCount(className, progress);
    const requiredForArclight = ARCLIGHT_CLASS_REQUIREMENTS[className] || 0;
    const isActualClass = requiredForArclight > 0 && !className.includes('weapons found');

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-neutral-800">
                <div>
                    <h2 className="text-xl font-semibold text-white">
                        {className}
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                        {weapons.length} {weapons.length === 1 ? 'weapon' : 'weapons'}
                    </p>
                </div>

                {isActualClass && (
                    <ClassMasteryCard
                        className={className}
                        shatteredGoldCount={shatteredGoldCount}
                        requiredForArclight={requiredForArclight}
                        displayMode={displayMode}
                    />
                )}
            </div>

            {/* Weapons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weapons.map(weapon => (
                    <div
                        key={weapon.name}
                        ref={el => { weaponRefs.current[weapon.name] = el; }}
                    >
                        <WeaponCard
                            weapon={weapon}
                            progress={progress}
                            onToggle={onToggle}
                            displayMode={displayMode}
                            onHoverStart={onHoverStart}
                            onHoverEnd={onHoverEnd}
                            onNavigateToWP={onNavigateToWP}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
