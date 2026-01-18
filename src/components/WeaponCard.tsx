import { memo } from 'react';
import type { Weapon, WeaponProgress, CamoName, WPMilestone, WPCamoInfo, UserWPProgress } from '../types';
import { CamoGrid } from './CamoGrid';
import { WPMilestoneGrid } from './WPMilestoneGrid';
import { WP_WEAPON_DATA, WP_UNIVERSAL_CAMOS } from '../data/wpIndex';

interface Props {
    weapon: Weapon;
    // MP Props
    weaponProgress?: WeaponProgress;
    arclightUnlocked?: boolean;
    tempestUnlocked?: boolean;
    singularityUnlocked?: boolean;
    // WP Props
    wpProgress?: Record<WPMilestone, boolean>;

    // Shared Props
    mode: 'mp' | 'wp';
    onToggle: (weaponName: string, id: string) => void; // id is CamoName or WPMilestone
    displayMode: 'fraction' | 'percentage';
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
    onNavigate?: (weaponName: string) => void;
    index: number;
}

export const WeaponCard = memo(function WeaponCard({
    weapon,
    weaponProgress,
    arclightUnlocked,
    tempestUnlocked,
    singularityUnlocked,
    wpProgress,
    mode,
    onToggle,
    displayMode,
    onHoverStart,
    onHoverEnd,
    onNavigate,
    index
}: Props) {
    // --- Progress Calculation ---
    let totalItems = 0;
    let completedCount = 0;

    // Check if data is missing (for "Coming Soon" state)
    let isDataMissing = false;

    if (mode === 'mp') {
        const availableCamos = weapon.camos.mp ? (Object.keys(weapon.camos.mp) as CamoName[]) : [];
        totalItems = availableCamos.length;

        if (totalItems === 0) isDataMissing = true;
        else {
            completedCount = availableCamos.reduce((count, camo) => {
                if (camo === 'Singularity') return count + (singularityUnlocked ? 1 : 0);
                return count + (weaponProgress?.[camo] ? 1 : 0);
            }, 0);
        }
    } else {
        // WP Mode
        const hasWPData = !!WP_WEAPON_DATA[weapon.name];
        if (!hasWPData) {
            isDataMissing = true;
        } else {
            totalItems = 6; // Fixed number of milestones
            const currentProgress = wpProgress || {};
            completedCount = Object.values(currentProgress).filter(Boolean).length;
        }
    }

    const isMastered = totalItems > 0 && completedCount === totalItems;
    const progressPercent = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

    // Unified Colors
    const primaryColor = mode === 'mp' ? 'bg-blue-500' : 'bg-purple-500';
    const highlightColor = mode === 'mp' ? 'group-hover:text-blue-400' : 'group-hover:text-purple-400';
    const buttonHoverBg = mode === 'mp' ? 'hover:bg-blue-500/10' : 'hover:bg-purple-500/10';

    return (
        <div
            className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:scale-[1.01] transition-all duration-200 rounded-xl overflow-visible animate-fade-in-up"
            style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-white uppercase tracking-tight">
                        {weapon.name}
                    </h3>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigate?.(weapon.name);
                        }}
                        className={`p-1.5 text-neutral-500 transition-colors rounded-md ${buttonHoverBg} ${highlightColor}`}
                        title={mode === 'mp' ? "View Weapon Prestige" : "View Camos"}
                    >
                        {mode === 'mp' ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    {isMastered && (
                        <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded animate-scale-in">
                            Complete
                        </span>
                    )}
                    <span className="text-sm text-neutral-400">
                        {displayMode === 'percentage'
                            ? `${Math.round(progressPercent)}%`
                            : `${completedCount}/${totalItems}`
                        }
                    </span>
                </div>
            </div>

            <div className="p-4 overflow-visible">
                {/* Weapon Image */}
                {weapon.image && (
                    <div className="mb-4 flex justify-center group-hover:scale-105 transition-transform duration-300">
                        <img
                            src={`${import.meta.env.BASE_URL}${weapon.image}`}
                            alt={weapon.name}
                            className={`h-24 object-contain ${isDataMissing ? 'grayscale opacity-50' : ''}`}
                            loading="lazy"
                        />
                    </div>
                )}

                {/* Progress Bar or Data Missing */}
                {!isDataMissing ? (
                    <>
                        <div className="mb-4 h-1 bg-neutral-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-500 ease-out ${isMastered ? 'bg-green-500' : primaryColor}`}
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>

                        {mode === 'mp' ? (
                            <CamoGrid
                                weapon={weapon}
                                weaponProgress={weaponProgress || {}}
                                arclightUnlocked={!!arclightUnlocked}
                                tempestUnlocked={!!tempestUnlocked}
                                singularityUnlocked={!!singularityUnlocked}
                                onToggle={onToggle}
                            />
                        ) : (
                            <WPMilestoneGrid
                                weaponCamos={WP_WEAPON_DATA[weapon.name] || {}}
                                universalCamos={WP_UNIVERSAL_CAMOS}
                                completedMilestones={wpProgress || {} as Record<WPMilestone, boolean>}
                                onToggle={(milestone) => onToggle(weapon.name, milestone)}
                            />
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-neutral-500">
                        <p className="text-sm font-medium">Data coming soon</p>
                    </div>
                )}
            </div>
        </div>
    );
});
