import { useState, useEffect } from 'react';
import type { UserProgress, CamoName } from '../types';

const STORAGE_KEY = 'bo7_camo_tracker_progress';

export function useProgress() {
    const [progress, setProgress] = useState<UserProgress>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);

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

    const resetProgress = () => {
        if (confirm("Are you sure you want to reset all progress?")) {
            setProgress({});
        }
    }

    return { progress, toggleCamo, resetProgress };
}
