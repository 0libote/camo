export interface CamoRequirement {
    requirement: string;
}

export interface WeaponCamos {
    "Military": CamoRequirement;
    "Diamondback": CamoRequirement;
    "Raptor": CamoRequirement;
    "Mainframe": CamoRequirement;
    "Shattered Gold": CamoRequirement;
    "Arclight": CamoRequirement;
    "Tempest": CamoRequirement;
    "Singularity": CamoRequirement;
}

export type CamoName = keyof WeaponCamos;

export interface Weapon {
    class: string;
    name: string;
    unlock_level: number;
    camos: WeaponCamos;
}

export interface CamoData {
    weapons: Weapon[];
}

// Progression State
export type WeaponProgress = Record<CamoName, boolean>;
export type UserProgress = Record<string, WeaponProgress>; // Key is weapon name
