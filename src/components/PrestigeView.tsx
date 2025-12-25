import { useState } from 'react';
import { CAMO_DATA, WEAPON_CLASSES } from '../data';
import { PrestigeCard } from './PrestigeCard';
import type { UserPrestige } from '../types';
import { PrestigeLevel } from '../types';

interface Props {
    prestige: UserPrestige;
    onUpdatePrestige: (weaponName: string, level: PrestigeLevel, masterLevel?: number) => void;
}

export function PrestigeView({ prestige, onUpdatePrestige }: Props) {
    const [selectedClass, setSelectedClass] = useState<string>(WEAPON_CLASSES[0]);

    const weapons = CAMO_DATA.weapons.filter(w => w.class === selectedClass);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Category Selector */}
            <div className="flex flex-wrap gap-2">
                {WEAPON_CLASSES.map(cls => (
                    <button
                        key={cls}
                        onClick={() => setSelectedClass(cls)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${selectedClass === cls
                            ? 'bg-blue-500 text-white'
                            : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                            }`}
                    >
                        {cls}
                    </button>
                ))}
            </div>

            {/* Weapons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weapons.map(weapon => {
                    const weaponPrestige = prestige[weapon.name] || {
                        level: PrestigeLevel.None,
                        masterLevel: 1
                    };

                    return (
                        <PrestigeCard
                            key={weapon.name}
                            weapon={weapon}
                            prestige={weaponPrestige}
                            onUpdatePrestige={(level, masterLevel) => onUpdatePrestige(weapon.name, level, masterLevel)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
