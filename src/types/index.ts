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
    camos: WeaponCamos;
    camo_unlocks?: Record<CamoName, boolean>; // Optional field for explicit camo unlocks
}

export interface CamoData {
    common_camos?: WeaponCamos; // Define common camos once
    weapons: Weapon[];
}

// Progression State
export type WeaponProgress = Record<CamoName, boolean>;
export type UserProgress = Record<string, WeaponProgress>; // Key is weapon name
