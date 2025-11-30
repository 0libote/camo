import camosJson from './camos.json';
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

// Image mapping using local public folder
// Note: 'base' in vite.config.ts is '/camo/', so public assets are at /camo/...
const BASE_URL = "/camo/camos";

export const CAMO_IMAGES: Record<string, string> = {
    "Military": `${BASE_URL}/Ruby_Snake.webp`,
    "Diamondback": `${BASE_URL}/Diamondback.webp`,
    "Raptor": `${BASE_URL}/Raptor.webp`,
    "Mainframe": `${BASE_URL}/Mainframe.webp`,
    "Shattered Gold": `${BASE_URL}/Shattered_Gold.webp`,
    "Arclight": `${BASE_URL}/Arclight.webp`,
    "Tempest": `${BASE_URL}/Tempest.webp`,
    "Singularity": `${BASE_URL}/Singularity.webp`,
};
