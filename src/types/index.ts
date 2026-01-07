export interface CamoRequirement {
    requirement: string;
}

export interface WeaponCamos {
    "Military"?: CamoRequirement;
    "Diamondback"?: CamoRequirement;
    "Raptor"?: CamoRequirement;
    "Mainframe"?: CamoRequirement;
    "Shattered Gold"?: CamoRequirement;
    "Arclight"?: CamoRequirement;
    "Tempest"?: CamoRequirement;
    "Singularity"?: CamoRequirement;
}

export type CamoName = keyof WeaponCamos;

export interface Weapon {
    class: string;
    name: string;
    unlock_level: number;
    image?: string;
    camos: {
        mp: WeaponCamos;
        zombies?: WeaponCamos;
        campaign?: WeaponCamos;
    };
    camo_unlocks?: Record<CamoName, boolean>;
}

export interface CamoData {
    common_camos?: WeaponCamos; // Define common camos once
    weapons: Weapon[];
}

// Progression State
export type WeaponProgress = Record<CamoName, boolean>;
export type UserProgress = Record<string, WeaponProgress>; // Key is weapon name

// Prestige System
export const PrestigeLevel = {
    None: 0,
    Prestige1: 1,
    Prestige2: 2,
    Master: 3
} as const;

export type PrestigeLevel = typeof PrestigeLevel[keyof typeof PrestigeLevel];

export interface WeaponPrestige {
    level: PrestigeLevel;
    masterLevel: number; // 1-1000, only active if level === Master
}

export type UserPrestige = Record<string, WeaponPrestige>; // Key is weapon name
