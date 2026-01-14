import { useState, useEffect } from 'react';
import type { UserProgress, CamoName } from '../types';

const STORAGE_KEY = 'bo6_camo_tracker_progress';
const PRESTIGE_KEY = 'bo6_camo_tracker_prestige';
const WP_STORAGE_KEY = 'bo7_wp_progress';

import type { UserPrestige, WPMilestone, UserWPProgress } from '../types';
import { PrestigeLevel } from '../types';

export function useProgress() {
    const [progress, setProgress] = useState<UserProgress>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.warn('Corrupted progress data, resetting...', e);
            localStorage.removeItem(STORAGE_KEY);
            return {};
        }
    });

    const [prestige, setPrestige] = useState<UserPrestige>(() => {
        try {
            const stored = localStorage.getItem(PRESTIGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.warn('Corrupted prestige data, resetting...', e);
            localStorage.removeItem(PRESTIGE_KEY);
            return {};
        }
    });

    const [wpProgress, setWPProgress] = useState<UserWPProgress>(() => {
        try {
            const stored = localStorage.getItem(WP_STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.warn('Corrupted WP progress data, resetting...', e);
            localStorage.removeItem(WP_STORAGE_KEY);
            return {};
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);

    useEffect(() => {
        localStorage.setItem(PRESTIGE_KEY, JSON.stringify(prestige));
    }, [prestige]);

    useEffect(() => {
        localStorage.setItem(WP_STORAGE_KEY, JSON.stringify(wpProgress));
    }, [wpProgress]);

    const toggleCamo = (weaponName: string, camo: CamoName) => {
        setProgress((prev: UserProgress) => {
            const weaponProgress = prev[weaponName] || {};
            const newStatus = !weaponProgress[camo];

            return {
                ...prev,
                [weaponName]: {
                    ...weaponProgress,
                    [camo]: newStatus
                }
            };
        });
    };

    const updatePrestige = (weaponName: string, level: PrestigeLevel, masterLevel: number = 1) => {
        setPrestige((prev: UserPrestige) => ({
            ...prev,
            [weaponName]: {
                level,
                masterLevel
            }
        }));
    };

    const toggleWPMilestone = (weaponName: string, milestone: WPMilestone) => {
        setWPProgress((prev: UserWPProgress) => {
            const weaponProgress = prev[weaponName] || {} as Record<WPMilestone, boolean>;
            const newStatus = !weaponProgress[milestone];

            return {
                ...prev,
                [weaponName]: {
                    ...weaponProgress,
                    [milestone]: newStatus
                }
            };
        });
    };

    const resetProgress = () => {
        if (confirm("Are you sure you want to reset all progress? This includes Camos and Weapon Prestige.")) {
            setProgress({});
            setPrestige({});
            setWPProgress({});
        }
    }

    const exportProgress = () => {
        const payload = {
            camos: progress,
            prestige: prestige,
            wp: wpProgress
        };
        const dataStr = JSON.stringify(payload);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'bo6_tracker_data.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const importProgress = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);

                if (typeof json === 'object' && json !== null) {
                    if (confirm("This will overwrite your current progress. Continue?")) {
                        // Handle legacy (just camos) or new structure
                        if (json.camos && typeof json.camos === 'object') setProgress(json.camos);
                        if (json.prestige && typeof json.prestige === 'object') setPrestige(json.prestige);
                        if (json.wp && typeof json.wp === 'object') setWPProgress(json.wp);

                        // Legacy handling
                        if (!json.camos && !json.prestige && !json.wp) {
                            // Assume legacy file is just camo progress if it's a flat object
                            setProgress(json);
                        }
                    }
                } else {
                    alert("Invalid progress file.");
                }
            } catch {
                alert("Error reading file.");
            }
        };
        reader.readAsText(file);
    };

    return {
        progress,
        prestige,
        wpProgress,
        toggleCamo,
        updatePrestige,
        toggleWPMilestone,
        resetProgress,
        exportProgress,
        importProgress
    };
}
