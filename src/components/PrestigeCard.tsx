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
        // If already completed or not unlocked, do nothing
        // "Shouldn't be able to unmark those below" -> implies we can't un-toggle.
        // "Unmark those below the highest one selected" -> If I am at P2, I can't click P1 to unmark it.
        // Can I click P1 to GO BACK to P1? "You shouldn't be able to unmark those below".
        // If I go back to P1, I implicitly unmark P2.
        // Let's assume STRICT FORWARD ONLY for now based on "Shouldn't be able to click on one before the next" (locking future) and "shouldn't be able to unmark" (locking past).
        // Actually, if I make a mistake, I need a way to go back.
        // But the user said "You shouldn't be able to unmark those below the highest one selected."
        // This usually implies a checkbox list where unchecking item 1 unchecks item 2.
        // Here we have buttons.
        // Interpretation: "Once you achieve P1, it stays P1. If you achieve P2, P1 stays checked."
        // If I click P2 (and I am currently P1), I set it to P2.
        // If I click Master (and I am P2), I set to Master.
        // If I click P1 (and I am P2) -> Should this go back?
        // User says "You shouldn't be able to unmark those below...". If I go back to P1, I am technically unmarking P2 (which is 'above' P1, not 'below').
        // "Below" usually means "Lower in the list".
        // "Unmark those below the highest one selected".
        // If Highest is P2. P1 is below P2. I shouldn't be able to unmark P1.
        // This is satisfied by the "State is numeric" model. Being P2 implies P1 is done.
        // The only question is "Can I toggle OFF the highest one?"
        // User says "Remove prompt".
        // I will implement: Click is valid checks "Is Unlocked".
        // If I click a step that is already completed (e.g. clicking P1 when I am P2), check if it's the *Current* step?
        // Actually, easiest valid UX: You can always click any "Unlocked" step. If I click P1 (when P2), I downgrade to P1. This "unmarks" P2 (which is allowed, P2 is 'above' P1). It does NOT unmark P1 (clicked) or Base.
        // Wait, "unmark those below the highest".
        // If I am P2. Highest is P2.
        // P1 is below P2.
        // I should not be able to "Unmark P1".
        // Downgrading to P1 keeps P1 active. So that's fine.
        // Downgrading to Base would unmark P1.
        // So clicking P1 sets state to P1.
        // Effectively: You can set state to any [Unlocked] step.
        // There is no "toggle off". You can't click P1 to go to Base. You can only go up.
        // Exception: How to reset? Maybe a "Reset" button elsewhere, or the "Base" state is inaccessible?
        // User didn't ask for a Reset button here (there is one in Settings).
        // So I will make it so you can only click the buttons. Clicking an active button does nothing.

        if (isCompleted(step) && level === step.targetLevel && (level !== PrestigeLevel.Master || masterLevel <= step.targetMasterLevel)) {
            // Already at this exact step (or higher master level but same prestige tier? No, exact step check needed)
            // If I am Master 150. Click 150. Do nothing.
            // If I am Master 150. Click 100. Downgrade to 100?
            // "Unmark those below". Level 100 is below 150.
            // If I go to 100, 100 remains marked. 150 becomes unmarked.
            // This seems consistent.
            return;
        }

        // Only allow clicking the NEXT Step?
        // "You shouldnt be able to click on one before the next."
        // If I am P1. Next is P2. Can I click Master? No.
        // So only `index === currentStepIndex + 1` is clickable?
        // That makes it very strict.
        // But what if I want to just view?
        // I will stick to: interactive if `isUnlocked` (previous is done).
        // This allows clicking P2 if P1 is done.

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
