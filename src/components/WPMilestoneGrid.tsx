import { useState } from 'react';
import type { WPMilestone, WPCamoInfo } from '../types';

interface Props {
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

export function WPMilestoneGrid({
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

    return (
        <div className="grid grid-cols-6 gap-2">
            {MILESTONE_ORDER.map((milestone) => {
                const camoInfo = getCamoInfo(milestone);
                const isCompleted = completedMilestones[milestone];
                const isUniversal = milestone === 'prestige1' || milestone === 'prestige2' || milestone === 'master250';

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
                                w-full aspect-square rounded-lg overflow-hidden relative transition-all duration-200
                                ${isCompleted
                                    ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-500/30'
                                    : 'opacity-30 grayscale hover:opacity-60 hover:grayscale-0 hover:scale-105 active:scale-95'
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
                                <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-purple-500 rounded-full flex items-center justify-center animate-scale-in">
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
                        </button>

                        {/* Hover Tooltip */}
                        {hoveredMilestone === milestone && camoInfo && (
                            <div className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-44 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl p-3 pointer-events-none animate-fade-in-up">
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
                            </div>
                        )}

                        {/* Label below */}
                        <div className="text-center text-[10px] text-neutral-500 mt-1">
                            {MILESTONE_LABELS[milestone]}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
