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

// Image mapping to handle the typo in "millitary.webp"
export const CAMO_IMAGES: Record<string, string> = {
    "Military": "/camo/datastuff/millitary.webp", // Note the typo in filename
    "Diamondback": "/camo/datastuff/diamondback.webp",
    "Raptor": "/camo/datastuff/raptor.webp",
    "Mainframe": "/camo/datastuff/mainframe.webp",
    "Shattered Gold": "/camo/datastuff/Shattered-Gold.webp",
    "Arclight": "/camo/datastuff/Arclight.webp",
    "Tempest": "/camo/datastuff/Tempest.webp",
    "Singularity": "/camo/datastuff/Singularity.webp",
};
