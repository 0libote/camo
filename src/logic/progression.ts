import type { Weapon, UserProgress, CamoName } from '../types';
import { CAMO_DATA } from '../data';

const SPECIAL_CAMOS: CamoName[] = ["Diamondback", "Raptor", "Mainframe"];
export const TEMPEST_REQ_COUNT = 30;
export const SINGULARITY_REQ_COUNT = 30;

// Class-specific Arclight requirements (number of Shattered Gold camos needed per class)
export const ARCLIGHT_CLASS_REQUIREMENTS: Record<string, number> = {
    "Assault Rifles": 6,
    "Submachine Guns": 6,
    "Shotguns": 3,
    "Light Machine Guns": 2,
    "Marksman Rifles": 3,
    "Sniper Rifles": 3,
    "Pistols": 3,
    "Launchers": 2,
    "Melee": 2
};

// Helper to check if a specific camo is completed
export function isCamoCompleted(weaponName: string, camo: CamoName, progress: UserProgress): boolean {
    return !!progress[weaponName]?.[camo];
}

// Helper to get total weapons in a class
export function getWeaponsInClass(className: string): Weapon[] {
    return CAMO_DATA.weapons.filter(w => w.class === className);
}

// Helper to get Shattered Gold count for a class
export function getClassShatteredGoldCount(className: string, progress: UserProgress): number {
    const weaponsInClass = getWeaponsInClass(className);
    return weaponsInClass.filter(w => isCamoCompleted(w.name, "Shattered Gold", progress)).length;
}

// 1. Military Logic
export function isMilitaryAvailable(): boolean {
    return true;
}

// 2. Special Camos Logic
export function isSpecialCamoAvailable(weaponName: string, progress: UserProgress): boolean {
    return isCamoCompleted(weaponName, "Military", progress);
}

// 3. Shattered Gold Logic
export function isShatteredGoldAvailable(weaponName: string, progress: UserProgress): boolean {
    return SPECIAL_CAMOS.every(camo => isCamoCompleted(weaponName, camo, progress));
}

// 4. Arclight Logic - Now class-specific!
export function isArclightAvailable(weapon: Weapon, progress: UserProgress): boolean {
    const requiredCount = ARCLIGHT_CLASS_REQUIREMENTS[weapon.class] || 0;
    const currentCount = getClassShatteredGoldCount(weapon.class, progress);
    return currentCount >= requiredCount;
}

// 5. Tempest Logic
export function getGlobalArclightCount(progress: UserProgress): number {
    return CAMO_DATA.weapons.filter(w => isCamoCompleted(w.name, "Arclight", progress)).length;
}

export function isTempestAvailable(weaponName: string, progress: UserProgress): boolean {
    const arclightDone = isCamoCompleted(weaponName, "Arclight", progress);
    const globalArclight = getGlobalArclightCount(progress);
    return arclightDone && globalArclight >= TEMPEST_REQ_COUNT;
}

// 6. Singularity Logic
export function getGlobalTempestCount(progress: UserProgress): number {
    return CAMO_DATA.weapons.filter(w => isCamoCompleted(w.name, "Tempest", progress)).length;
}

export function isSingularityUnlocked(progress: UserProgress): boolean {
    const globalTempest = getGlobalTempestCount(progress);
    return globalTempest >= SINGULARITY_REQ_COUNT;
}

// Master status checker for UI
export type CamoStatus = "locked" | "available" | "completed";

export function getCamoStatus(weapon: Weapon, camo: CamoName, progress: UserProgress): CamoStatus {
    if (isCamoCompleted(weapon.name, camo, progress)) return "completed";

    if (camo === "Singularity") {
        return isSingularityUnlocked(progress) ? "completed" : "locked";
    }

    let available = false;
    switch (camo) {
        case "Military":
            available = true;
            break;
        case "Diamondback":
        case "Raptor":
        case "Mainframe":
            available = isSpecialCamoAvailable(weapon.name, progress);
            break;
        case "Shattered Gold":
            available = isShatteredGoldAvailable(weapon.name, progress);
            break;
        case "Arclight":
            available = isArclightAvailable(weapon, progress);
            break;
        case "Tempest":
            available = isTempestAvailable(weapon.name, progress);
            break;
    }

    return available ? "available" : "locked";
}
