import camosJson from './camos.json';
import type { CamoData, Weapon } from '../types';

// Process the JSON to merge common camos with each weapon's specific camos
const rawData = camosJson as unknown as CamoData;
const processedWeapons: Weapon[] = rawData.weapons.map(weapon => ({
    ...weapon,
    camos: {
        ...weapon.camos,
        ...(rawData.common_camos || {}) // Merge common camos (if any)
    }
}));

export const CAMO_DATA: CamoData = {
    weapons: processedWeapons,
    common_camos: rawData.common_camos
};

export const WEAPON_CLASSES = Array.from(new Set(CAMO_DATA.weapons.map(w => w.class)));

export const CAMO_ORDER: (keyof import('../types').WeaponCamos)[] = [
    "Military",
    "Diamondback",
    "Raptor",
    "Mainframe",
    "Shattered Gold",
    "Arclight",
    "Tempest",
    "Singularity"
];

// Image mapping using local public folder
// import.meta.env.BASE_URL handles both dev ('/') and prod ('/camo/')
const BASE_URL = `${import.meta.env.BASE_URL}camos`;

export const CAMO_IMAGES: Record<string, string> = {
    "Military": `${BASE_URL}/Ruby_Snake.webp`,
    "Diamondback": `${BASE_URL}/diamondback.webp`,
    "Raptor": `${BASE_URL}/raptor.webp`,
    "Mainframe": `${BASE_URL}/mainframe.webp`,
    "Shattered Gold": `${BASE_URL}/Shattered_Gold.webp`,
    "Arclight": `${BASE_URL}/Arclight.webp`,
    "Tempest": `${BASE_URL}/Tempest.webp`,
    "Singularity": `${BASE_URL}/Singularity.webp`,
};
