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
        <div className="space-y-8 animate-fade-in">
            {/* Category Selector */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
                {WEAPON_CLASSES.map(cls => (
                    <button
                        key={cls}
                        onClick={() => setSelectedClass(cls)}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wide border rounded-md transition-all ${selectedClass === cls
                            ? 'bg-white border-white text-slate-950'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                            }`}
                    >
                        {cls}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
