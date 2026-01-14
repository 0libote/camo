// WP Data Imports (per-class files)
import assaultRiflesWP from './wp/assault_rifles.json';
import submachineGunsWP from './wp/submachine_guns.json';
import shotgunsWP from './wp/shotguns.json';
import lightMachineGunsWP from './wp/light_machine_guns.json';
import marksmanRiflesWP from './wp/marksman_rifles.json';
import sniperRiflesWP from './wp/sniper_rifles.json';
import pistolsWP from './wp/pistols.json';
import launchersWP from './wp/launchers.json';
import meleeWP from './wp/melee.json';
import specialWP from './wp/special.json';
import wpCommon from './wp/weapon_prestige.json';

import type { WPMilestone, WPCamoInfo } from '../types';

// Merge all WP data into a single lookup
export const WP_WEAPON_DATA: Record<string, Partial<Record<WPMilestone, WPCamoInfo>>> = {
    ...assaultRiflesWP,
    ...submachineGunsWP,
    ...shotgunsWP,
    ...lightMachineGunsWP,
    ...marksmanRiflesWP,
    ...sniperRiflesWP,
    ...pistolsWP,
    ...launchersWP,
    ...meleeWP,
    ...specialWP
};

export const WP_UNIVERSAL_CAMOS = wpCommon.universalCamos as Record<string, WPCamoInfo>;
export const WP_MILESTONE_LABELS = wpCommon.milestoneLabels;
