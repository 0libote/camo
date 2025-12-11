import type { Weapon, WeaponPrestige } from '../types';
import { PrestigeLevel } from '../types';

interface Props {
    weapon: Weapon;
    prestige: WeaponPrestige;
    onUpdatePrestige: (level: PrestigeLevel, masterLevel?: number) => void;
    onToggleMaxLevel: () => void;
}

export function PrestigeCard({ weapon, prestige, onUpdatePrestige, onToggleMaxLevel }: Props) {
    const { level, masterLevel, isMaxLevel } = prestige;

    const handlePrestigeClick = () => {
        if (!isMaxLevel) return;

        const nextLevel = level + 1;
        if (nextLevel <= PrestigeLevel.Master) {
            if (confirm(`Enter Prestige ${nextLevel}? This will reset your weapon level.`)) {
                onUpdatePrestige(nextLevel as PrestigeLevel);
            }
        }
    };

    // calculate progress bar width
    const getProgressInfo = () => {
        if (level === PrestigeLevel.Master) {
            // Master levels 1-1000
            const percent = (masterLevel / 1000) * 100;
            return { percent, label: `Lv ${masterLevel}` };
        }
        // Base levels 1-50 (simplified for UI, assuming max level is reached if isMaxLevel is true)
        const percent = isMaxLevel ? 100 : 50; // Visual approximation
        return { percent, label: isMaxLevel ? 'MAX' : 'In Progress' };
    };

    const { percent, label } = getProgressInfo();

    return (
        <div className="bg-slate-900 border border-slate-800 p-6 relative overflow-hidden group hover:border-[var(--color-accent)] transition-all duration-300">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-bold mb-1">
                        {weapon.class} // {weapon.name}
                    </div>
                    <div className="text-2xl font-display font-bold text-white uppercase flex items-center gap-3">
                        {level === PrestigeLevel.None && "Base Ops"}
                        {level === PrestigeLevel.Prestige1 && "Prestige 1"}
                        {level === PrestigeLevel.Prestige2 && "Prestige 2"}
                        {level === PrestigeLevel.Master && <span className="text-[var(--color-accent)] text-shadow-glow">Master Prestige</span>}
                    </div>
                </div>

                {/* Level Badge */}
                <div className="flex flex-col items-end">
                    <div className="text-3xl font-bold font-display text-slate-200">
                        {label}
                    </div>
                    {level !== PrestigeLevel.Master && (
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Weapon Level</div>
                    )}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-black w-full mb-6 border border-slate-800 relative">
                <div
                    className="h-full bg-[var(--color-accent)] transition-all duration-500 shadow-[0_0_10px_var(--color-accent)]"
                    style={{ width: `${percent}%` }}
                />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
                {level < PrestigeLevel.Master && (
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer group/check">
                            <div className={`w-5 h-5 border transition-all flex items-center justify-center ${isMaxLevel
                                ? 'bg-[var(--color-accent)] border-[var(--color-accent)]'
                                : 'bg-black border-slate-600 group-hover/check:border-slate-400'
                                }`}>
                                {isMaxLevel && <svg className="w-3.5 h-3.5 text-black font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <input type="checkbox" className="hidden" checked={isMaxLevel} onChange={onToggleMaxLevel} />
                            <span className={`text-sm font-mono uppercase tracking-wider ${isMaxLevel ? 'text-white' : 'text-slate-500'}`}>Max Level Reached</span>
                        </label>
                    </div>
                )}

                {level < PrestigeLevel.Master && (
                    <button
                        onClick={handlePrestigeClick}
                        disabled={!isMaxLevel}
                        className={`px-6 py-2 uppercase font-bold text-xs tracking-widest border transition-all ${isMaxLevel
                            ? 'bg-[var(--color-accent)] text-black border-[var(--color-accent)] hover:bg-white hover:text-black hover:border-white shadow-[0_0_15px_rgba(255,107,0,0.4)]'
                            : 'bg-transparent text-slate-700 border-slate-800 cursor-not-allowed'
                            }`}
                    >
                        Enter Prestige {level + 1}
                    </button>
                )}

                {level === PrestigeLevel.Master && (
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-[var(--color-accent)] uppercase tracking-widest">Master Level</span>
                            <div className="flex items-center gap-2">
                                <button className="w-8 h-8 bg-black border border-slate-700 text-slate-400 hover:text-white hover:border-[var(--color-accent)] flex items-center justify-center" onClick={() => onUpdatePrestige(3, Math.max(1, masterLevel - 10))}>-</button>
                                <input
                                    type="number"
                                    value={masterLevel}
                                    onChange={(e) => onUpdatePrestige(3, Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
                                    className="bg-black border border-slate-700 text-center w-20 py-1 text-white font-mono focus:border-[var(--color-accent)] focus:outline-none"
                                />
                                <button className="w-8 h-8 bg-black border border-slate-700 text-slate-400 hover:text-white hover:border-[var(--color-accent)] flex items-center justify-center" onClick={() => onUpdatePrestige(3, Math.min(1000, masterLevel + 10))}>+</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Rewards Mini-Preview */}
            <div className="mt-6 pt-4 border-t border-slate-800/50 flex gap-2 overflow-x-auto pb-1">
                {/* This would be dynamic based on level, simplified for now */}
                <div className={`px-2 py-1 text-[10px] border ${level >= 1 ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-slate-800 text-slate-600'}`}>P1 REWARD</div>
                <div className={`px-2 py-1 text-[10px] border ${level >= 2 ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-slate-800 text-slate-600'}`}>P2 REWARD</div>
                <div className={`px-2 py-1 text-[10px] border ${level >= 3 ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-slate-800 text-slate-600'}`}>MASTER UNLOCK</div>
            </div>
        </div>
    );
}
