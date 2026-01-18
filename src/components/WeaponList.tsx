import { useRef, useEffect } from 'react';
import type { Weapon, UserProgress, UserWPProgress, WPMilestone, CamoName } from '../types';
import { WeaponCard } from './WeaponCard';
import { ClassMasteryCard } from './ClassMasteryCard';
import {
    getClassShatteredGoldCount,
    ARCLIGHT_CLASS_REQUIREMENTS,
    isArclightAvailable,
    isTempestAvailable,
    isSingularityUnlocked
} from '../logic/progression';

interface Props {
    className: string;
    weapons: Weapon[];
    // Progress
    progress?: UserProgress;
    wpProgress?: UserWPProgress;

    // Actions
    onToggle: (weaponName: string, id: string) => void;

    // Config
    mode: 'mp' | 'wp';
    displayMode: 'fraction' | 'percentage';

    // Interaction
    onHoverStart?: () => void;
    onHoverEnd?: () => void;

    // Navigation
    onNavigate?: (weaponName: string) => void;
    scrollToWeapon?: string;
    onScrollComplete?: () => void;
}

export function WeaponList({
    className,
    weapons,
    progress = {},
    wpProgress = {},
    onToggle,
    mode,
    displayMode,
    onHoverStart,
    onHoverEnd,
    onNavigate,
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

    // MP-Specific Logic
    const shatteredGoldCount = mode === 'mp' ? getClassShatteredGoldCount(className, progress) : 0;
    const requiredForArclight = mode === 'mp' ? (ARCLIGHT_CLASS_REQUIREMENTS[className] || 0) : 0;
    const isActualMPClass = mode === 'mp' && requiredForArclight > 0 && !className.includes('weapons found');

    // Global singular unlock check (same for all weapons, calculated once)
    const singularityUnlocked = mode === 'mp' ? isSingularityUnlocked(progress) : false;

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

                {isActualMPClass && (
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
                {weapons.map((weapon, index) => {
                    // Calculated per weapon but primitives are stable across renders if values don't change
                    let arclightUnlocked = false;
                    let tempestUnlocked = false;

                    if (mode === 'mp') {
                        arclightUnlocked = isArclightAvailable(weapon, progress);
                        tempestUnlocked = isTempestAvailable(weapon.name, progress);
                    }

                    return (
                        <div
                            key={weapon.name}
                            ref={el => { weaponRefs.current[weapon.name] = el; }}
                        >
                            <WeaponCard
                                weapon={weapon}
                                // MP Props
                                weaponProgress={progress[weapon.name] || {}}
                                arclightUnlocked={arclightUnlocked}
                                tempestUnlocked={tempestUnlocked}
                                singularityUnlocked={singularityUnlocked}

                                // WP Props
                                wpProgress={wpProgress[weapon.name]}

                                // Shared
                                mode={mode}
                                onToggle={onToggle}
                                displayMode={displayMode}
                                onHoverStart={onHoverStart}
                                onHoverEnd={onHoverEnd}
                                onNavigate={onNavigate}
                                index={index}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
