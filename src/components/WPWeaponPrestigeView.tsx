import { useState } from 'react';
import { CAMO_DATA, WEAPON_CLASSES } from '../data';
import { WP_WEAPON_DATA } from '../data/wpIndex';
import { WeaponList } from './WeaponList';
import { WPCamoViewerModal } from './WPCamoViewerModal';
import type { WPMilestone, UserWPProgress } from '../types';

interface Props {
    displayMode: 'fraction' | 'percentage';
    wpProgress: UserWPProgress;
    toggleWPMilestone: (weaponName: string, milestone: WPMilestone) => void;
    onNavigateToCamos?: (weaponName: string) => void;
    scrollToWeapon?: string;
    onScrollComplete?: () => void;
}

export function WPWeaponPrestigeView({
    displayMode,
    wpProgress,
    toggleWPMilestone,
    onNavigateToCamos,
    scrollToWeapon,
    onScrollComplete
}: Props) {
    const [selectedClass, setSelectedClass] = useState<string>(WEAPON_CLASSES[0]);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    // Get weapons from manifests (source of truth)
    const weapons = CAMO_DATA.weapons.filter(w => w.class === selectedClass);

    // Calculate overall progress (only weapons with WP data)
    const weaponsWithData = Object.keys(WP_WEAPON_DATA);
    const totalMilestones = weaponsWithData.length * 6;
    const completedMilestones = Object.entries(wpProgress).reduce((acc, [weaponName, progress]) => {
        if (weaponsWithData.includes(weaponName)) {
            return acc + Object.values(progress).filter(Boolean).length;
        }
        return acc;
    }, 0);
    const overallPercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

    // Navigate logic (mostly handled by WeaponList now, but we handle the modal nav here)
    const handleNavigateToWeapon = (weaponName: string) => {
        const weapon = CAMO_DATA.weapons.find(w => w.name === weaponName);
        if (!weapon) return;
        setSelectedClass(weapon.class);
        // Scroll handled by passing props down to WeaponList
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Summary Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-white">Weapon Prestige Progress</h2>
                        <p className="text-sm text-neutral-400 mt-1">
                            {completedMilestones} / {totalMilestones} milestones completed
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-3xl font-bold text-purple-400">
                                {displayMode === 'percentage'
                                    ? `${overallPercent}%`
                                    : `${completedMilestones}/${totalMilestones}`}
                            </div>
                        </div>
                        <button
                            onClick={() => setIsViewerOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            View All Camos
                        </button>
                    </div>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500"
                        style={{ width: `${overallPercent}%` }}
                    />
                </div>
            </div>

            {/* Category Selector */}
            <div className="flex flex-wrap gap-2 py-4 border-b border-neutral-800">
                {WEAPON_CLASSES.map(cls => (
                    <button
                        key={cls}
                        onClick={() => setSelectedClass(cls)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${selectedClass === cls
                            ? 'bg-purple-500 text-white'
                            : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                            }`}
                    >
                        {cls}
                    </button>
                ))}
            </div>

            {/* Unified Weapon List in WP Mode */}
            <WeaponList
                key={selectedClass} // Force re-mount on class change for clean animation
                className={selectedClass}
                weapons={weapons}
                wpProgress={wpProgress}
                onToggle={(name, id) => toggleWPMilestone(name, id as WPMilestone)}
                mode="wp"
                displayMode={displayMode}
                onNavigate={onNavigateToCamos}
                scrollToWeapon={scrollToWeapon}
                onScrollComplete={onScrollComplete}
            />

            {/* Camo Viewer Modal */}
            <WPCamoViewerModal
                isOpen={isViewerOpen}
                onClose={() => setIsViewerOpen(false)}
                onNavigateToWeapon={handleNavigateToWeapon}
            />
        </div>
    );
}
