import type { Weapon, WeaponPrestige } from '../types';
import { PrestigeLevel } from '../types';

interface Props {
    weapon: Weapon;
    prestige: WeaponPrestige;
    onUpdatePrestige: (level: PrestigeLevel, masterLevel?: number) => void;
}

interface Step {
    label: string;
    shortLabel: string;
    targetLevel: PrestigeLevel;
    targetMasterLevel: number;
}

const STEPS: Step[] = [
    { label: "Prestige 1", shortLabel: "Prestige 1", targetLevel: PrestigeLevel.Prestige1, targetMasterLevel: 0 },
    { label: "Prestige 2", shortLabel: "Prestige 2", targetLevel: PrestigeLevel.Prestige2, targetMasterLevel: 0 },
    { label: "Level 100", shortLabel: "Level 100", targetLevel: PrestigeLevel.Master, targetMasterLevel: 100 },
    { label: "Level 150", shortLabel: "Level 150", targetLevel: PrestigeLevel.Master, targetMasterLevel: 150 },
    { label: "Level 200", shortLabel: "Level 200", targetLevel: PrestigeLevel.Master, targetMasterLevel: 200 },
    { label: "Level 250", shortLabel: "Level 250", targetLevel: PrestigeLevel.Master, targetMasterLevel: 250 },
];

export function PrestigeCard({ weapon, prestige, onUpdatePrestige }: Props) {
    const { level, masterLevel } = prestige;

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

    const isUnlocked = (index: number) => {
        if (index === 0) return true;
        const prevStep = STEPS[index - 1];
        return isCompleted(prevStep);
    };

    const getProgressDisplay = () => {
        if (level === PrestigeLevel.Master) {
            if (masterLevel >= 250) return "Max";
            return `Level ${masterLevel}`;
        }
        if (level === PrestigeLevel.Prestige2) return "Prestige 2";
        if (level === PrestigeLevel.Prestige1) return "Prestige 1";
        return "Base";
    };

    const handleStepClick = (step: Step, index: number) => {
        const matchesCurrentState =
            level === step.targetLevel &&
            (step.targetLevel !== PrestigeLevel.Master || masterLevel === step.targetMasterLevel);

        if (matchesCurrentState) {
            if (index === 0) {
                onUpdatePrestige(PrestigeLevel.None, 1);
            } else {
                const prev = STEPS[index - 1];
                onUpdatePrestige(prev.targetLevel, prev.targetMasterLevel || 1);
            }
            return;
        }

        if (!isUnlocked(index)) return;
        onUpdatePrestige(step.targetLevel, step.targetMasterLevel || 1);
    };

    const progressPercent = level === PrestigeLevel.Master ? 100 : level === PrestigeLevel.Prestige2 ? 66 : level === PrestigeLevel.Prestige1 ? 33 : 0;

    return (
        <div className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-800">
                <h3 className="text-base font-semibold text-white uppercase">
                    {weapon.name}
                </h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${level > 0 ? 'bg-blue-500/10 text-blue-400' : 'bg-neutral-800 text-neutral-500'}`}>
                    {getProgressDisplay()}
                </span>
            </div>

            <div className="p-4">
                {/* Progress Bar */}
                <div className="mb-4 h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                {/* Prestige Buttons */}
                <div className="grid grid-cols-3 gap-2">
                    {STEPS.map((step, index) => {
                        const completed = isCompleted(step);
                        const unlocked = isUnlocked(index);

                        return (
                            <button
                                key={step.label}
                                onClick={() => handleStepClick(step, index)}
                                disabled={!unlocked}
                                className={`
                                    px-2 py-2 rounded-lg text-xs font-medium transition-colors
                                    ${completed
                                        ? 'bg-blue-500 text-white'
                                        : unlocked
                                            ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                                            : 'bg-neutral-900 text-neutral-600 cursor-not-allowed'
                                    }
                                `}
                            >
                                {step.shortLabel}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
