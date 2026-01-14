import { useState } from 'react';
import type { WPMilestone, WPCamoInfo } from '../types';

interface Props {
    weaponName: string;
    weaponImage?: string;
    weaponCamos: Partial<Record<WPMilestone, WPCamoInfo>>;
    universalCamos: Record<string, WPCamoInfo>;
    completedMilestones: Record<WPMilestone, boolean>;
    onToggle: (milestone: WPMilestone) => void;
}

const MILESTONE_ORDER: WPMilestone[] = ['prestige1', 'prestige2', 'master100', 'master150', 'master200', 'master250'];

const MILESTONE_LABELS: Record<WPMilestone, string> = {
    prestige1: 'P1',
    prestige2: 'P2',
    master100: '100',
    master150: '150',
    master200: '200',
    master250: '250'
};

export function WPMilestoneRow({
    weaponName,
    weaponImage,
    weaponCamos,
    universalCamos,
    completedMilestones,
    onToggle
}: Props) {
    const [hoveredMilestone, setHoveredMilestone] = useState<WPMilestone | null>(null);

    const getCamoInfo = (milestone: WPMilestone): WPCamoInfo | null => {
        // Universal camos for master100, master150, master200
        if (milestone === 'master100' || milestone === 'master150' || milestone === 'master200') {
            return universalCamos[milestone] || null;
        }
        // Per-gun camos
        return weaponCamos[milestone] || null;
    };

    const completedCount = MILESTONE_ORDER.filter(m => completedMilestones[m]).length;
    const isFullyCompleted = completedCount === 6;
    const progressPercent = (completedCount / 6) * 100;

    return (
        <div className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors rounded-xl overflow-visible relative">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-800">
                <h3 className="text-base font-semibold text-white uppercase">{weaponName}</h3>
                <div className="flex items-center gap-2">
                    {isFullyCompleted && (
                        <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                            Complete
                        </span>
                    )}
                    <span className="text-sm text-neutral-400">{completedCount}/6</span>
                </div>
            </div>

            <div className="p-4">
                {/* Weapon Image */}
                {weaponImage && (
                    <div className="mb-4 flex justify-center">
                        <img
                            src={`${import.meta.env.BASE_URL}${weaponImage}`}
                            alt={weaponName}
                            className="h-20 object-contain"
                            loading="lazy"
                        />
                    </div>
                )}

                {/* Progress Bar */}
                <div className="mb-4 h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-300 ${isFullyCompleted ? 'bg-green-500' : 'bg-purple-500'}`}
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                {/* Milestone Icons */}
                <div className="grid grid-cols-6 gap-2">
                    {MILESTONE_ORDER.map((milestone) => {
                        const camoInfo = getCamoInfo(milestone);
                        const isCompleted = completedMilestones[milestone];
                        const isUniversal = milestone === 'prestige1' || milestone === 'prestige2' || milestone === 'master250';
                        const isPerGun = milestone === 'master100' || milestone === 'master150' || milestone === 'master200';

                        return (
                            <div
                                key={milestone}
                                className="relative"
                                onMouseEnter={() => setHoveredMilestone(milestone)}
                                onMouseLeave={() => setHoveredMilestone(null)}
                            >
                                <button
                                    onClick={() => onToggle(milestone)}
                                    className={`
                                        w-full aspect-square rounded-lg overflow-hidden relative transition-all
                                        ${isCompleted
                                            ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-500/30'
                                            : 'opacity-30 grayscale hover:opacity-60 hover:grayscale-0'
                                        }
                                    `}
                                >
                                    {camoInfo ? (
                                        <img
                                            src={`${import.meta.env.BASE_URL}camos/wp/${camoInfo.image}`}
                                            alt={camoInfo.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
                                            <span className="text-xs text-neutral-400">{MILESTONE_LABELS[milestone]}</span>
                                        </div>
                                    )}

                                    {/* Completed checkmark */}
                                    {isCompleted && (
                                        <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-purple-500 rounded-full flex items-center justify-center">
                                            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Universal indicator (Per user: unique to gun = universal) */}
                                    {isUniversal && (
                                        <div className="absolute bottom-0.5 left-0.5 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                                            <span className="text-[8px] text-white font-bold">U</span>
                                        </div>
                                    )}
                                    {/* Per Gun indicator (Per user: earned on every gun = per gun) */}
                                    {isPerGun && (
                                        <div className="absolute bottom-0.5 left-0.5 w-3.5 h-3.5 bg-neutral-600 rounded-full flex items-center justify-center">
                                            <span className="text-[8px] text-white font-bold">P</span>
                                        </div>
                                    )}
                                </button>

                                {/* Hover Tooltip */}
                                {hoveredMilestone === milestone && camoInfo && (
                                    <div className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-44 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl p-3 pointer-events-none">
                                        <img
                                            src={`${import.meta.env.BASE_URL}camos/wp/${camoInfo.image}`}
                                            alt={camoInfo.name}
                                            className="w-full aspect-square object-cover rounded-md mb-2"
                                        />
                                        <div className="font-medium text-purple-400 text-sm">{camoInfo.name}</div>
                                        <div className="text-neutral-400 text-xs mt-1">{camoInfo.requirement}</div>
                                        {isUniversal && (
                                            <div className="text-blue-400 text-xs mt-1 flex items-center gap-1">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                Universal Camo
                                            </div>
                                        )}
                                        {isPerGun && (
                                            <div className="text-neutral-400 text-xs mt-1 flex items-center gap-1">
                                                <span className="w-2 h-2 bg-neutral-600 rounded-full"></span>
                                                Per Gun Camo
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Milestone Labels */}
                <div className="grid grid-cols-6 gap-2 mt-2">
                    {MILESTONE_ORDER.map((milestone) => (
                        <div key={`label-${milestone}`} className="text-center text-[10px] text-neutral-500">
                            {MILESTONE_LABELS[milestone]}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
