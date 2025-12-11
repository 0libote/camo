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

    // Actions
    const handlePrestige1 = () => {
        if (!isMaxLevel) return;
        if (confirm("Enter Prestige 1? Your weapon level will be reset.")) {
            onUpdatePrestige(PrestigeLevel.Prestige1);
        }
    };

    const handlePrestige2 = () => {
        if (level < PrestigeLevel.Prestige1) return;
        if (confirm("Enter Prestige 2? Your weapon level will be reset.")) {
            onUpdatePrestige(PrestigeLevel.Prestige2);
        }
    };



    // Calculate display for percentage
    const getProgressDisplay = () => {
        if (level === PrestigeLevel.Master) return "MASTER";
        if (level === PrestigeLevel.Prestige2) return "P2";
        if (level === PrestigeLevel.Prestige1) return "P1";
        return isMaxLevel ? "MAX" : "BASE";
    };

    return (
        <div className="group bg-slate-900/50 border border-slate-800 hover:border-[var(--color-accent)] transition-all duration-300 relative">
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-slate-800 bg-slate-900/80">
                <h3 className="text-xl font-bold text-slate-100 uppercase tracking-tight font-display">
                    {weapon.name}
                </h3>
                <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-1 ${level === PrestigeLevel.Master ? 'bg-[var(--color-accent)] text-black' : 'bg-slate-800 text-slate-400'}`}>
                        {getProgressDisplay()}
                    </span>
                </div>
            </div>

            <div className="p-4">
                {/* Integrated Progress Bar (Visual Only for Mode Consistency) */}
                <div className="mb-4 h-1.5 bg-slate-800 overflow-hidden">
                    <div
                        className="h-full bg-[var(--color-accent)] transition-all duration-500 ease-out"
                        style={{
                            width: level === PrestigeLevel.Master ? '100%' : level > 0 ? '50%' : '0%',
                            boxShadow: level > 0 ? '0 0 10px var(--color-accent)' : 'none'
                        }}
                    />
                </div>

                {/* Prestige Controls - Simplified to match "Camo Grid" vibe */}
                <div className="grid grid-cols-4 gap-2">
                    {/* Max Level Toggle */}
                    <button
                        onClick={onToggleMaxLevel}
                        className={`aspect-square flex flex-col items-center justify-center border transition-all duration-200 ${isMaxLevel
                            ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-black'
                            : 'bg-black border-slate-800 text-slate-600 hover:border-slate-600'
                            }`}
                        title="Toggle Max Level (Lev 55)"
                    >
                        <span className="text-xs font-bold font-mono">MAX</span>
                    </button>

                    {/* Prestige 1 */}
                    <button
                        onClick={handlePrestige1}
                        disabled={!isMaxLevel || level >= PrestigeLevel.Prestige1}
                        className={`aspect-square flex flex-col items-center justify-center border transition-all duration-200 ${level >= PrestigeLevel.Prestige1
                            ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-black'
                            : !isMaxLevel
                                ? 'bg-black/20 border-slate-900 text-slate-800 cursor-not-allowed' // Locked
                                : 'bg-black border-slate-800 text-slate-400 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]' // Available
                            }`}
                        title="Enter Prestige 1"
                    >
                        <span className="text-xl font-display font-bold">1</span>
                    </button>

                    {/* Prestige 2 */}
                    <button
                        onClick={handlePrestige2}
                        disabled={level < PrestigeLevel.Prestige1 || level >= PrestigeLevel.Prestige2}
                        className={`aspect-square flex flex-col items-center justify-center border transition-all duration-200 ${level >= PrestigeLevel.Prestige2
                            ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-black'
                            : level < PrestigeLevel.Prestige1
                                ? 'bg-black/20 border-slate-900 text-slate-800 cursor-not-allowed' // Locked
                                : 'bg-black border-slate-800 text-slate-400 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]' // Available
                            }`}
                        title="Enter Prestige 2"
                    >
                        <span className="text-xl font-display font-bold">2</span>
                    </button>

                    {/* Master */}
                    {level >= PrestigeLevel.Prestige2 ? (
                        <div className="aspect-square flex flex-col items-center justify-center bg-black border border-[var(--color-accent)] relative group/master">
                            <input
                                type="number"
                                value={masterLevel}
                                onChange={(e) => onUpdatePrestige(PrestigeLevel.Master, parseInt(e.target.value) || 1)}
                                className="w-full h-full bg-transparent text-center text-[var(--color-accent)] font-mono font-bold text-lg focus:outline-none"
                                min={1}
                                max={1000}
                            />
                            <div className="absolute bottom-0.5 text-[8px] text-[var(--color-accent)] uppercase tracking-wider opacity-50">MSTR</div>
                        </div>
                    ) : (
                        <div className="aspect-square flex flex-col items-center justify-center bg-black/20 border border-slate-900 text-slate-800">
                            <span className="text-xs font-bold font-mono">MSTR</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
