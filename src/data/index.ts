// Data Imports
import assaultRifles from './mp/assault_rifles.json';
import submachineGuns from './mp/submachine_guns.json';
import shotguns from './mp/shotguns.json';
import lightMachineGuns from './mp/light_machine_guns.json';
import marksmanRifles from './mp/marksman_rifles.json';
import sniperRifles from './mp/sniper_rifles.json';
import pistols from './mp/pistols.json';
import launchers from './mp/launchers.json';
import melee from './mp/melee.json';
import special from './mp/special.json';

// Manifest Imports
import assaultRiflesManifest from './manifests/assault_rifles.json';
import submachineGunsManifest from './manifests/submachine_guns.json';
import shotgunsManifest from './manifests/shotguns.json';
import lightMachineGunsManifest from './manifests/light_machine_guns.json';
import marksmanRiflesManifest from './manifests/marksman_rifles.json';
import sniperRiflesManifest from './manifests/sniper_rifles.json';
import pistolsManifest from './manifests/pistols.json';
import launchersManifest from './manifests/launchers.json';
import meleeManifest from './manifests/melee.json';
import specialManifest from './manifests/special.json';

import type { CamoData, Weapon } from '../types';

const rawDataMap = {
    "Assault Rifles": assaultRifles,
    "Submachine Guns": submachineGuns,
    "Shotguns": shotguns,
    "Light Machine Guns": lightMachineGuns,
    "Marksman Rifles": marksmanRifles,
    "Sniper Rifles": sniperRifles,
    "Pistols": pistols,
    "Launchers": launchers,
    "Melee": melee,
    "Special": special
};

const manifests = [
    { class: "Assault Rifles", data: assaultRiflesManifest },
    { class: "Submachine Guns", data: submachineGunsManifest },
    { class: "Shotguns", data: shotgunsManifest },
    { class: "Light Machine Guns", data: lightMachineGunsManifest },
    { class: "Marksman Rifles", data: marksmanRiflesManifest },
    { class: "Sniper Rifles", data: sniperRiflesManifest },
    { class: "Pistols", data: pistolsManifest },
    { class: "Launchers", data: launchersManifest },
    { class: "Melee", data: meleeManifest },
    { class: "Special", data: specialManifest }
];

// Combine all Weapons using manifests as the master list
const allWeapons: Weapon[] = manifests.flatMap(m =>
    m.data.map(item => {
        const fullData = (rawDataMap[m.class as keyof typeof rawDataMap] as any[]).find(w => w.name === item.name);
        return {
            class: m.class,
            name: item.name,
            image: item.image,
            unlock_level: fullData?.unlock_level ?? 0,
            camos: fullData?.camos ?? { mp: {} }
        } as Weapon;
    })
);

export const CAMO_DATA: CamoData = {
    weapons: allWeapons,
    common_camos: {}
};

export const WEAPON_CLASSES = manifests.map(m => m.class);

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

const BASE_URL = `${import.meta.env.BASE_URL}camos/mp`;

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
