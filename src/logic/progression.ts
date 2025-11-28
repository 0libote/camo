import type { Weapon, UserProgress, CamoName } from '../types';
import { CAMO_DATA } from '../data';

const SPECIAL_CAMOS: CamoName[] = ["Diamondback", "Raptor", "Mainframe"];

// Helper to check if a specific camo is completed
export function isCamoCompleted(weaponName: string, camo: CamoName, progress: UserProgress): boolean {
    return !!progress[weaponName]?.[camo];
}

// Helper to get total weapons in a class
export function getWeaponsInClass(className: string): Weapon[] {
    return CAMO_DATA.weapons.filter(w => w.class === className);
}

// 1. Military Logic
// Always available to start (assuming weapon is unlocked)
export function isMilitaryAvailable(): boolean {
    return true;
}

// 2. Special Camos Logic
// Available if Military is completed
export function isSpecialCamoAvailable(weaponName: string, progress: UserProgress): boolean {
    return isCamoCompleted(weaponName, "Military", progress);
}

// 3. Shattered Gold Logic
// Available if ALL Special camos are completed
export function isShatteredGoldAvailable(weaponName: string, progress: UserProgress): boolean {
    return SPECIAL_CAMOS.every(camo => isCamoCompleted(weaponName, camo, progress));
}

// 4. Arclight Logic
// Available if:
// - Shattered Gold is completed for THIS weapon (Wait, user said "Per-weapon challenge completed" implies Arclight challenge is available? No, usually Mastery is available to ATTEMPT after criteria met.
// User said: "Arclight requires two things: 1. Per-weapon challenge completed 2. Shattered Gold unlocked on EVERY WEAPON in the same weapon class"
// "Per-weapon challenge completed" usually refers to the previous mastery or the base camos?
// Context: "Arclight requires ... 1. Per-weapon challenge completed". This likely means "Shattered Gold" is completed?
// Or does it mean the Arclight challenge ITSELF is the "Per-weapon challenge"?
// "Arclight requires ... 1. Per-weapon challenge completed" -> This is confusing.
// Usually: To UNLOCK Arclight (the camo itself), you need to do the challenge. To ACCESS the challenge, you need dependencies.
// User: "Arclight requires two things: 1. Per-weapon challenge completed 2. Shattered Gold unlocked on EVERY WEAPON in the same weapon class"
// This likely means: To UNLOCK Arclight (get the skin), you must do the Arclight Challenge (10x Double Kills).
// BUT, you can only ATTEMPT it if: Shattered Gold is unlocked on EVERY WEAPON in the class.
// Wait, usually "Per-weapon challenge completed" in this context might mean "Shattered Gold" is done?
// Let's assume:
// Availability Condition: Shattered Gold completed on ALL weapons in class.
// Completion Condition: User marks Arclight as done (which implies they did the 10x Double Kills).

export function isArclightAvailable(weapon: Weapon, progress: UserProgress): boolean {
    const weaponsInClass = getWeaponsInClass(weapon.class);
    const allShatteredGold = weaponsInClass.every(w => isCamoCompleted(w.name, "Shattered Gold", progress));
    return allShatteredGold;
}

// 5. Tempest Logic
// User: "Tempest requires: 1. Per-weapon challenge completed 2. Arclight unlocked on a required number of total weapons"
// Availability Condition: Arclight completed on 30 weapons (Global).
// Note: User said "Tempest becomes available only after the global threshold of Arclight weapons is met."
// Also usually requires Arclight to be done on the weapon itself?
// User: "Tempest requires: 1. Per-weapon challenge completed". This is ambiguous.
// Does it mean "Arclight completed on this weapon"? Yes, usually.
// So: Availability = Arclight completed on THIS weapon AND Global Arclight Count >= 30.

export function getGlobalArclightCount(progress: UserProgress): number {
    return CAMO_DATA.weapons.filter(w => isCamoCompleted(w.name, "Arclight", progress)).length;
}

export function isTempestAvailable(weaponName: string, progress: UserProgress): boolean {
    const arclightDone = isCamoCompleted(weaponName, "Arclight", progress);
    const globalArclight = getGlobalArclightCount(progress);
    // Threshold from Singularity requirement text "Unlock Tempest on 30 Weapons" -> implies 30 is the magic number.
    return arclightDone && globalArclight >= 30;
}

// 6. Singularity Logic
// User: "Singularity requires: Tempest unlocked on the required number of weapons (e.g., 30)"
// "Once global Tempest count hits the required number → Singularity is unlocked for ALL weapons automatically."
// This means Singularity doesn't have a per-weapon challenge?
// User: "No per-weapon challenge".
// So if Global Tempest >= 30, Singularity is TRUE for everyone.

export function getGlobalTempestCount(progress: UserProgress): number {
    return CAMO_DATA.weapons.filter(w => isCamoCompleted(w.name, "Tempest", progress)).length;
}

export function isSingularityUnlocked(progress: UserProgress): boolean {
    const globalTempest = getGlobalTempestCount(progress);
    return globalTempest >= 30;
}

// Master status checker for UI
export type CamoStatus = "locked" | "available" | "completed";

export function getCamoStatus(weapon: Weapon, camo: CamoName, progress: UserProgress): CamoStatus {
    if (isCamoCompleted(weapon.name, camo, progress)) return "completed";

    // If Singularity, it's auto-unlocked (completed) if global condition met?
    // User said "Singularity is unlocked for ALL weapons automatically".
    // Does "unlocked" mean "Available to use" (Completed) or "Available to earn"?
    // "No per-weapon challenge" -> implies it's given. So if condition met, it's Completed.
    if (camo === "Singularity") {
        return isSingularityUnlocked(progress) ? "completed" : "locked";
    }

    let available = false;
    switch (camo) {
        case "Military":
            available = isMilitaryAvailable();
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
