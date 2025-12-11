import { useState, useEffect } from 'react';
import type { UserProgress, CamoName } from '../types';

const STORAGE_KEY = 'bo7_camo_tracker_progress';
const PRESTIGE_KEY = 'bo7_camo_tracker_prestige';

import type { UserPrestige } from '../types';
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

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);

    useEffect(() => {
        localStorage.setItem(PRESTIGE_KEY, JSON.stringify(prestige));
    }, [prestige]);

    const toggleCamo = (weaponName: string, camo: CamoName) => {
        setProgress(prev => {
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
        setPrestige(prev => ({
            ...prev,
            [weaponName]: {
                level,
                masterLevel,
                isMaxLevel: prev[weaponName]?.isMaxLevel ?? false
            }
        }));
    };

    const toggleMaxLevel = (weaponName: string) => {
        setPrestige(prev => ({
            ...prev,
            [weaponName]: {
                ...(prev[weaponName] || { level: PrestigeLevel.None, masterLevel: 1 }),
                isMaxLevel: !prev[weaponName]?.isMaxLevel
            }
        }));
    };

    const resetProgress = () => {
        if (confirm("Are you sure you want to reset all progress? This includes Camos and Prestige.")) {
            setProgress({});
            setPrestige({});
        }
    }

    const exportProgress = () => {
        const payload = {
            camos: progress,
            prestige: prestige
        };
        const dataStr = JSON.stringify(payload);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'bo7_tracker_data.json';

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
                        if ('camos' in json || 'prestige' in json) {
                            if (json.camos) setProgress(json.camos);
                            if (json.prestige) setPrestige(json.prestige);
                        } else {
                            // Assume legacy file is just camo progress
                            setProgress(json);
                        }
                    }
                } else {
                    alert("Invalid progress file.");
                }
            } catch (e) {
                alert("Error reading file.");
            }
        };
        reader.readAsText(file);
    };

    return {
        progress,
        prestige,
        toggleCamo,
        updatePrestige,
        toggleMaxLevel,
        resetProgress,
        exportProgress,
        importProgress
    };
}
