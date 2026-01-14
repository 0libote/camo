import { useState } from 'react';
import { CAMO_DATA, WEAPON_CLASSES } from '../data';
import { WP_WEAPON_DATA, WP_UNIVERSAL_CAMOS } from '../data/wpIndex';
import { WPMilestoneRow } from './WPMilestoneRow';
import { WPCamoViewerModal } from './WPCamoViewerModal';
import { useWPProgress } from '../hooks/useWPProgress';
import type { WPMilestone } from '../types';

export function WPWeaponPrestigeView() {
    const { wpProgress, toggleWPMilestone } = useWPProgress();
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
                            <div className="text-3xl font-bold text-purple-400">{overallPercent}%</div>
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
            <div className="flex flex-wrap gap-2">
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

            {/* Weapons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weapons.map(weapon => {
                    const weaponCamos = WP_WEAPON_DATA[weapon.name];
                    const hasWPData = !!weaponCamos;
                    const completedMilestones = wpProgress[weapon.name] || {} as Record<WPMilestone, boolean>;

                    // Show "Data coming soon" card for weapons without WP data
                    if (!hasWPData) {
                        return (
                            <div
                                key={weapon.name}
                                className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden"
                            >
                                <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-800">
                                    <h3 className="text-base font-semibold text-white uppercase">{weapon.name}</h3>
                                </div>
                                <div className="p-4">
                                    {weapon.image && (
                                        <div className="mb-4 flex justify-center opacity-50">
                                            <img
                                                src={`${import.meta.env.BASE_URL}${weapon.image}`}
                                                alt={weapon.name}
                                                className="h-20 object-contain grayscale"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col items-center justify-center py-4 text-neutral-500">
                                        <p className="text-sm font-medium">Data coming soon</p>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <WPMilestoneRow
                            key={weapon.name}
                            weaponName={weapon.name}
                            weaponImage={weapon.image}
                            weaponCamos={weaponCamos}
                            universalCamos={WP_UNIVERSAL_CAMOS}
                            completedMilestones={completedMilestones}
                            onToggle={(milestone) => toggleWPMilestone(weapon.name, milestone)}
                        />
                    );
                })}
            </div>

            {/* Camo Viewer Modal */}
            <WPCamoViewerModal
                isOpen={isViewerOpen}
                onClose={() => setIsViewerOpen(false)}
            />
        </div>
    );
}
