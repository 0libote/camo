import { useState } from 'react';
import { CAMO_DATA, WEAPON_CLASSES } from '../data';
import { PrestigeCard } from './PrestigeCard';
import { UserPrestige, PrestigeLevel } from '../types';

interface Props {
    prestige: UserPrestige;
    onUpdatePrestige: (weaponName: string, level: PrestigeLevel, masterLevel?: number) => void;
    onToggleMaxLevel: (weaponName: string) => void;
}

export function PrestigeView({ prestige, onUpdatePrestige, onToggleMaxLevel }: Props) {
    const [selectedClass, setSelectedClass] = useState<string>(WEAPON_CLASSES[0]);

    const weapons = CAMO_DATA.weapons.filter(w => w.class === selectedClass);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Class Selector */}
            <div className="flex flex-wrap gap-2 mb-8">
                {WEAPON_CLASSES.map(cls => (
                    <button
                        key={cls}
                        onClick={() => setSelectedClass(cls)}
                        className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border transition-all ${selectedClass === cls
                            ? 'bg-slate-800 border-[var(--color-accent)] text-[var(--color-accent)]'
                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                            }`}
                        style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                    >
                        {cls}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weapons.map(weapon => {
                    const weaponPrestige = prestige[weapon.name] || {
                        level: PrestigeLevel.None,
                        masterLevel: 1,
                        isMaxLevel: false
                    };

                    return (
                        <PrestigeCard
                            key={weapon.name}
                            weapon={weapon}
                            prestige={weaponPrestige}
                            onUpdatePrestige={(level, masterLevel) => onUpdatePrestige(weapon.name, level, masterLevel)}
                            onToggleMaxLevel={() => onToggleMaxLevel(weapon.name)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
