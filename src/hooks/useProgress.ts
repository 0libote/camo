import { useState, useEffect } from 'react';
import type { UserProgress, CamoName } from '../types';

const STORAGE_KEY = 'bo7_camo_tracker_progress';

export function useProgress() {
    const [progress, setProgress] = useState<UserProgress>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            // If localStorage is corrupted, clear it and start fresh
            console.warn('Corrupted progress data, resetting...', e);
            localStorage.removeItem(STORAGE_KEY);
            return {};
        }
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

    const exportProgress = () => {
        const dataStr = JSON.stringify(progress);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'bo7_camo_progress.json';

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
                // Basic validation: check if it's an object
                if (typeof json === 'object' && json !== null) {
                    if (confirm("This will overwrite your current progress. Continue?")) {
                        setProgress(json);
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

    return { progress, toggleCamo, resetProgress, exportProgress, importProgress };
}
