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
            {/* Class Selector */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-12">
                {WEAPON_CLASSES.map(cls => (
                    <button
                        key={cls}
                        onClick={() => setSelectedClass(cls)}
                        className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-all relative group overflow-hidden ${selectedClass === cls
                            ? 'bg-white border-white text-black shadow-[0_8px_20px_rgba(255,255,255,0.1)]'
                            : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-600 hover:text-white'
                            }`}
                    >
                        <span className="relative z-10">{cls}</span>
                        {selectedClass !== cls && (
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity"></div>
                        )}
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
