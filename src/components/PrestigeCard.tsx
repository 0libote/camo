import type { Weapon, WeaponPrestige } from '../types';
import { PrestigeLevel } from '../types';

interface Props {
    weapon: Weapon;
    prestige: WeaponPrestige;
    onUpdatePrestige: (level: PrestigeLevel, masterLevel?: number) => void;
}

export function PrestigeCard({ weapon, prestige, onUpdatePrestige }: Props) {
    const { level, masterLevel } = prestige;

    // Define the progression steps
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
        // Check if we are clicking the CURRENT active step (to toggle off)
        const isCurrentStep =
            level === step.targetLevel &&
            (level !== PrestigeLevel.Master || masterLevel <= step.targetMasterLevel) && // Current level
            (index === STEPS.length - 1 || !isCompleted(STEPS[index + 1])); // And next one is NOT done (meaning this is the peak)

        // Wait, simpler logic:
        // A step is "Current" if it is Completed, but the NEXT step (if any) is NOT Completed.
        // Actually, let's just use precise matching.
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
        <div className="group bg-slate-900/50 border border-slate-800 hover:border-[var(--color-accent)] transition-all duration-300 relative">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-800 bg-slate-900/80">
                <h3 className="text-lg font-bold text-slate-100 uppercase tracking-tight font-display">
                    {weapon.name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${level > 0 ? 'bg-[var(--color-accent)] text-black' : 'bg-slate-800 text-slate-500'}`}>
                        {getProgressDisplay()}
                    </span>
                </div>
            </div>

            <div className="p-4">
                {/* Visual Progress Bar */}
                <div className="mb-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[var(--color-accent)] transition-all duration-500 ease-out"
                        style={{
                            width: level === PrestigeLevel.Master ? '100%' : level === PrestigeLevel.Prestige2 ? '66%' : level === PrestigeLevel.Prestige1 ? '33%' : '0%',
                            boxShadow: level > 0 ? '0 0 10px var(--color-accent)' : 'none'
                        }}
                    />
                </div>

                {/* Prestige Button Grid */}
                <div className="grid grid-cols-2 gap-2">
                    {STEPS.map((step, index) => {
                        const completed = isCompleted(step);
                        const unlocked = isUnlocked(index);
                        const isNext = unlocked && !completed; // Clean state for "Next to click"

                        return (
                            <button
                                key={step.label}
                                onClick={() => handleStepClick(step, index)}
                                disabled={!unlocked}
                                className={`
                                    relative flex items-center justify-between px-3 py-2 text-left border transition-all duration-200 group/btn
                                    ${completed
                                        ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-black'
                                        : unlocked
                                            ? 'bg-black border-slate-700 text-slate-300 hover:border-[var(--color-accent)] hover:text-white'
                                            : 'bg-black/40 border-slate-900 text-slate-700 cursor-not-allowed'
                                    }
                                    ${index >= 3 ? 'col-span-1' : 'col-span-2 sm:col-span-1 even:col-span-1'} 
                                    /* Custom Grid Span Logic: Make the first 3 fill nicer? Actually simple grid is fine. */
                                    /* Let's just do grid-cols-2. 7 items. Last one will be alone or we can span? */
                                    /* Let's make "Master Prestige" span full width to break up the sections? */
                                    ${step.label === 'Master Prestige' ? 'col-span-2' : ''}
                                `}
                            >
                                <span className="text-xs font-bold font-display uppercase tracking-wider">
                                    {step.label}
                                </span>
                                {completed && (
                                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                                {isNext && (
                                    <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
