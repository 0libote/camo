import { useState, useEffect } from 'react';
import type { WPMilestone, UserWPProgress } from '../types';

const WP_STORAGE_KEY = 'bo7_wp_progress';

export function useWPProgress() {
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
        localStorage.setItem(WP_STORAGE_KEY, JSON.stringify(wpProgress));
    }, [wpProgress]);

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

    const resetWPProgress = () => {
        if (confirm("Are you sure you want to reset all Weapon Prestige progress?")) {
            setWPProgress({});
        }
    };

    const getWeaponMilestoneCount = (weaponName: string): number => {
        const progress = wpProgress[weaponName];
        if (!progress) return 0;
        return Object.values(progress).filter(Boolean).length;
    };

    const isMilestoneCompleted = (weaponName: string, milestone: WPMilestone): boolean => {
        return wpProgress[weaponName]?.[milestone] ?? false;
    };

    return {
        wpProgress,
        toggleWPMilestone,
        resetWPProgress,
        getWeaponMilestoneCount,
        isMilestoneCompleted
    };
}
