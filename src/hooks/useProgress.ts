import { useState, useEffect, useCallback } from 'react';
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

    // Debounce storage updates to prevent performance hit during rapid changes
    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        }, 500); // 500ms debounce
        return () => clearTimeout(timeout);
    }, [progress]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem(PRESTIGE_KEY, JSON.stringify(prestige));
        }, 500);
        return () => clearTimeout(timeout);
    }, [prestige]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem(WP_STORAGE_KEY, JSON.stringify(wpProgress));
        }, 500);
        return () => clearTimeout(timeout);
    }, [wpProgress]);

    const toggleCamo = useCallback((weaponName: string, camo: CamoName) => {
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
    }, []);

    const updatePrestige = useCallback((weaponName: string, level: PrestigeLevel, masterLevel: number = 1) => {
        setPrestige((prev: UserPrestige) => ({
            ...prev,
            [weaponName]: {
                level,
                masterLevel
            }
        }));
    }, []);

    const toggleWPMilestone = useCallback((weaponName: string, milestone: WPMilestone) => {
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
    }, []);

    const resetProgress = useCallback(() => {
        if (confirm("Are you sure you want to reset all progress? This includes Camos and Weapon Prestige.")) {
            setProgress({});
            setPrestige({});
            setWPProgress({});
        }
    }, []);

    const exportProgress = useCallback(() => {
        const payload = {
            version: 1, // Add versioning for future migrations
            timestamp: new Date().toISOString(),
            camos: progress,
            prestige: prestige,
            wp: wpProgress
        };

        try {
            const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const linkElement = document.createElement('a');
            linkElement.href = url;
            linkElement.download = `bo6_tracker_backup_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(linkElement);
            linkElement.click();

            // Cleanup
            document.body.removeChild(linkElement);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export data. See console for details.');
        }
    }, [progress, prestige, wpProgress]);

    const importProgress = useCallback((file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                if (!content) throw new Error("Empty file");

                const json = JSON.parse(content);

                if (typeof json !== 'object' || json === null) {
                    throw new Error("Invalid JSON structure");
                }

                if (confirm("This will overwrite your current progress. Continue?")) {
                    let imported = false;

                    // Handle v1 structure
                    if ('version' in json || ('camos' in json && 'prestige' in json)) {
                        if (json.camos) { setProgress(json.camos); imported = true; }
                        if (json.prestige) { setPrestige(json.prestige); imported = true; }
                        if (json.wp) { setWPProgress(json.wp); imported = true; }
                    }
                    // Handle Legacy (Flat Object)
                    else if (Object.keys(json).length > 0) {
                        // Basic heuristic: check if values look like weapon progress
                        // Safe to assume it's likely camo progress if it doesn't match above keys
                        setProgress(json);
                        imported = true;
                    }

                    if (imported) {
                        alert("Progress imported successfully!");
                    } else {
                        alert("No valid data found in file.");
                    }
                }
            } catch (error) {
                console.error('Import Error:', error);
                alert("Error importing file. Unrecognized format.");
            }
        };
        reader.readAsText(file);
    }, []);

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
