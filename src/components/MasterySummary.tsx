import type { UserProgress } from '../types';
import { getGlobalArclightCount, getGlobalTempestCount, isSingularityUnlocked, TEMPEST_REQ_COUNT, SINGULARITY_REQ_COUNT } from '../logic/progression';
import { CAMO_IMAGES } from '../data';
import { ProgressBar } from './ProgressBar';

interface Props {
    progress: UserProgress;
    displayMode: 'fraction' | 'percentage';
}

export function MasterySummary({ progress, displayMode }: Props) {
    const arclightCount = getGlobalArclightCount(progress);
    const tempestCount = getGlobalTempestCount(progress);
    const singularityUnlocked = isSingularityUnlocked(progress);

    const formatCount = (count: number, total: number) => {
        if (displayMode === 'percentage') {
            return `${Math.round((count / total) * 100)}%`;
        }
        return `${count}/${total}`;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Arclight Panel */}
            <div className="bg-slate-900/20 border border-slate-800/50 p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--color-accent)]/5 to-transparent pointer-events-none"></div>
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 shrink-0 bg-black p-1 border border-slate-800 group-hover:border-[var(--color-accent)]/30 transition-colors">
                        <img src={CAMO_IMAGES["Arclight"]} alt="Arclight" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-2">
                            <h3 className="text-xl font-black text-white font-display uppercase tracking-tighter">Arclight</h3>
                            <span className="text-[10px] text-slate-500 font-mono mb-1">LVL // 01</span>
                        </div>
                        <div className="flex justify-between text-[10px] mb-1.5 px-0.5">
                            <span className="text-slate-500 font-mono uppercase tracking-widest">Progress</span>
                            <span className="text-[var(--color-accent)] font-mono font-bold">
                                {displayMode === 'percentage'
                                    ? `${Math.round((arclightCount / TEMPEST_REQ_COUNT) * 100)}%`
                                    : `${arclightCount}/${TEMPEST_REQ_COUNT}`
                                }
                            </span>
                        </div>
                        <ProgressBar
                            progress={(arclightCount / TEMPEST_REQ_COUNT) * 100}
                            colorClass="bg-[var(--color-accent)]"
                            heightClass="h-1.5"
                        />
                    </div>
                </div>
            </div>

            {/* Tempest Panel */}
            <div className="bg-slate-900/20 border border-slate-800/50 p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none"></div>
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 shrink-0 bg-black p-1 border border-slate-800 group-hover:border-white/30 transition-colors">
                        <img src={CAMO_IMAGES["Tempest"]} alt="Tempest" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-2">
                            <h3 className="text-xl font-black text-white font-display uppercase tracking-tighter">Tempest</h3>
                            <span className="text-[10px] text-slate-500 font-mono mb-1">LVL // 02</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] mb-1.5 px-0.5">
                            <span className="text-slate-500 font-mono uppercase tracking-widest">Progress</span>
                            <span className="text-white font-mono font-bold">{formatCount(tempestCount, SINGULARITY_REQ_COUNT)}</span>
                        </div>
                        <ProgressBar
                            progress={(tempestCount / SINGULARITY_REQ_COUNT) * 100}
                            colorClass="bg-white"
                            heightClass="h-1.5"
                        />
                    </div>
                </div>
            </div>

            {/* Singularity Panel */}
            <div className={`relative p-5 overflow-hidden transition-all duration-500 ${singularityUnlocked
                ? 'bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/40'
                : 'bg-slate-900/10 border border-slate-800/30 opacity-60 hover:opacity-100'
                }`}>
                <div className="flex items-center gap-5">
                    <div className={`w-20 h-20 shrink-0 bg-black p-1 border ${singularityUnlocked ? 'border-[var(--color-accent)]/50 shadow-[0_0_20px_var(--color-accent)]/10' : 'border-slate-800'}`}>
                        <img src={CAMO_IMAGES["Singularity"]} alt="Singularity" className={`w-full h-full object-cover ${singularityUnlocked ? '' : 'grayscale'}`} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-2">
                            <h3 className={`text-xl font-black font-display uppercase tracking-tighter ${singularityUnlocked ? 'text-[var(--color-accent)]' : 'text-slate-600'}`}>
                                Singularity
                            </h3>
                            <span className="text-[10px] text-slate-600 font-mono mb-1">LVL // MAX</span>
                        </div>
                        <p className={`text-[10px] uppercase tracking-widest font-bold ${singularityUnlocked ? 'text-[var(--color-accent)] animate-pulse' : 'text-slate-600'}`}>
                            {singularityUnlocked ? "// ACCESS GRANTED" : "// DATABASE LOCKED"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
