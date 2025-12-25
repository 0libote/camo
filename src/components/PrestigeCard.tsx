import type { Weapon, WeaponPrestige } from '../types';
import { PrestigeLevel } from '../types';

interface Props {
    weapon: Weapon;
    prestige: WeaponPrestige;
    onUpdatePrestige: (level: PrestigeLevel, masterLevel?: number) => void;
}

// Define the progression steps (static, doesn't need to be inside component)
interface Step {
    label: string;
    shortLabel: string;
    targetLevel: PrestigeLevel;
    targetMasterLevel: number;
}

const STEPS: Step[] = [
    { label: "Prestige 1", shortLabel: "P1", targetLevel: PrestigeLevel.Prestige1, targetMasterLevel: 0 },
    { label: "Prestige 2", shortLabel: "P2", targetLevel: PrestigeLevel.Prestige2, targetMasterLevel: 0 },
    { label: "Level 100", shortLabel: "L100", targetLevel: PrestigeLevel.Master, targetMasterLevel: 100 },
    { label: "Level 150", shortLabel: "L150", targetLevel: PrestigeLevel.Master, targetMasterLevel: 150 },
    { label: "Level 200", shortLabel: "L200", targetLevel: PrestigeLevel.Master, targetMasterLevel: 200 },
    { label: "Level 250", shortLabel: "L250", targetLevel: PrestigeLevel.Master, targetMasterLevel: 250 },
];

export function PrestigeCard({ weapon, prestige, onUpdatePrestige }: Props) {
    const { level, masterLevel } = prestige;

    // Helper to determine if a step is completed
    const isCompleted = (step: Step) => {
        if (level > step.targetLevel) return true;
        if (level === step.targetLevel) {
            if (level === PrestigeLevel.Master) {
                return masterLevel >= step.targetMasterLevel;
            }
            return true;
        }
        return false;
    };

    // Helper to determine if a step is clickable (the immediate next step)
    const isUnlocked = (index: number) => {
        if (index === 0) return true; // Always allow P1 (assume Base is starting point)
        const prevStep = STEPS[index - 1];
        return isCompleted(prevStep);
    };

    // Helper to get current progress display
    const getProgressDisplay = () => {
        if (level === PrestigeLevel.Master) {
            if (masterLevel >= 250) return "MAX MSTR";
            return `MSTR ${masterLevel}`;
        }
        if (level === PrestigeLevel.Prestige2) return "PRESTIGE 2";
        if (level === PrestigeLevel.Prestige1) return "PRESTIGE 1";
        return "BASE";
    };

    // Handle click
    const handleStepClick = (step: Step, index: number) => {
        // Helper comments:
        // A step is "Current" if it matches the current level/masterLevel exactly.

        // If I am at P1. P1 target is Level=P1, Master=0.
        // My state is Level=P1, Master=1 (default fallback).
        // If I am at Master 150. State is Level=Master, Master=150.
        // Step 150 target is Level=Master, Master=150.

        // Logic for re-clicking the exact same milestone: Revert to previous.
        const matchesCurrentState =
            level === step.targetLevel &&
            (step.targetLevel !== PrestigeLevel.Master || masterLevel === step.targetMasterLevel);

        if (matchesCurrentState) {
            // Revert!
            if (index === 0) {
                // Go back to absolute base
                onUpdatePrestige(PrestigeLevel.None, 1);
            } else {
                // Go back to previous step
                const prev = STEPS[index - 1];
                onUpdatePrestige(prev.targetLevel, prev.targetMasterLevel || 1);
            }
            return;
        }

        // If not current, allow forward progress if unlocked
        if (!isUnlocked(index)) return;

        // Execute Update
        onUpdatePrestige(step.targetLevel, step.targetMasterLevel || 1);
    };

    return (
        <div className="group bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white tracking-tight">
                    {weapon.name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${level > 0 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                        {getProgressDisplay()}
                    </span>
                </div>
            </div>

            <div className="p-5">
                {/* Visual Progress Bar */}
                <div className="mb-6 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-cyan-500 transition-all duration-500 ease-out"
                        style={{
                            width: level === PrestigeLevel.Master ? '100%' : level === PrestigeLevel.Prestige2 ? '66%' : level === PrestigeLevel.Prestige1 ? '33%' : '0%'
                        }}
                    />
                </div>

                {/* Prestige Button Grid */}
                <div className="grid grid-cols-2 gap-2">
                    {STEPS.map((step, index) => {
                        const completed = isCompleted(step);
                        const unlocked = isUnlocked(index);
                        const isNext = unlocked && !completed;

                        return (
                            <button
                                key={step.label}
                                onClick={() => handleStepClick(step, index)}
                                disabled={!unlocked}
                                className={`
                                    relative flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all duration-200
                                    ${completed
                                        ? 'bg-cyan-500 border-cyan-500 text-slate-950'
                                        : unlocked
                                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
                                            : 'bg-slate-900/50 border-slate-800/50 text-slate-600 cursor-not-allowed opacity-50'
                                    }
                                `}
                            >
                                <span className="text-xs font-bold uppercase tracking-wide">
                                    {step.shortLabel}
                                </span>
                                <div className="w-4 h-4 flex items-center justify-center">
                                    {completed && (
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                    {isNext && (
                                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
