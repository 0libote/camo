import assaultRifles from './assault_rifles.json';
import submachineGuns from './submachine_guns.json';
import shotguns from './shotguns.json';
import lightMachineGuns from './light_machine_guns.json';
import marksmanRifles from './marksman_rifles.json';
import sniperRifles from './sniper_rifles.json';
import pistols from './pistols.json';
import launchers from './launchers.json';
import melee from './melee.json';

import type { CamoData, Weapon } from '../types';

// Combine all Weapons
const allWeapons: Weapon[] = [
    ...assaultRifles,
    ...submachineGuns,
    ...shotguns,
    ...lightMachineGuns,
    ...marksmanRifles,
    ...sniperRifles,
    ...pistols,
    ...launchers,
    ...melee
] as Weapon[];

export const CAMO_DATA: CamoData = {
    weapons: allWeapons,
    common_camos: {} // No longer using common_camos structure as it's denormalized
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
const BASE_URL = `${import.meta.env.BASE_URL}camos/mp`;

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
