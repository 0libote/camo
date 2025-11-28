import camosJson from '../../datastuff/camos.json';
import type { CamoData } from '../types';

// Cast the JSON to our type
export const CAMO_DATA: CamoData = camosJson as unknown as CamoData;

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

// Image mapping using GitHub raw URLs
const BASE_URL = "https://raw.githubusercontent.com/0libote/camo/refs/heads/main/datastuff";

export const CAMO_IMAGES: Record<string, string> = {
    "Military": `${BASE_URL}/millitary.webp`, // Note the typo in filename
    "Diamondback": `${BASE_URL}/diamondback.webp`,
    "Raptor": `${BASE_URL}/raptor.webp`,
    "Mainframe": `${BASE_URL}/mainframe.webp`,
    "Shattered Gold": `${BASE_URL}/Shattered-Gold.webp`,
    "Arclight": `${BASE_URL}/Arclight.webp`,
    "Tempest": `${BASE_URL}/Tempest.webp`,
    "Singularity": `${BASE_URL}/Singularity.webp`,
};
