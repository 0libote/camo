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
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex items-center gap-4">
                <div className="w-16 h-16 shrink-0 bg-black rounded overflow-hidden border border-slate-800">
                    <img src={CAMO_IMAGES["Arclight"]} alt="Arclight" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white font-display uppercase tracking-tight">Arclight</h3>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500 font-mono">Completion</span>
                        <span className="text-slate-400 font-mono">
                            {displayMode === 'percentage'
                                ? `${Math.round((arclightCount / TEMPEST_REQ_COUNT) * 100)}%`
                                : `${arclightCount}/${TEMPEST_REQ_COUNT}`
                            }
                        </span>
                    </div>
                    <ProgressBar
                        progress={(arclightCount / TEMPEST_REQ_COUNT) * 100}
                        colorClass="bg-[var(--color-accent)]"
                        heightClass="h-2"
                    />
                </div>
            </div>

            {/* Tempest Panel */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex items-center gap-4">
                <div className="w-16 h-16 shrink-0 bg-black rounded overflow-hidden border border-slate-800">
                    <img src={CAMO_IMAGES["Tempest"]} alt="Tempest" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white font-display uppercase tracking-tight">Tempest</h3>
                    <div className="flex justify-between items-center text-sm text-slate-400 mb-1">
                        <span className="text-slate-500 font-mono">Completion</span>
                        <span className="text-white font-mono">{formatCount(tempestCount, SINGULARITY_REQ_COUNT)}</span>
                    </div>
                    <ProgressBar
                        progress={(tempestCount / SINGULARITY_REQ_COUNT) * 100}
                        colorClass="bg-white"
                        heightClass="h-2"
                    />
                </div>
            </div>

            {/* Singularity Panel */}
            <div className={`border rounded-lg p-4 flex items-center gap-4 transition-colors ${singularityUnlocked
                ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]'
                : 'bg-slate-900/50 border-slate-800 opacity-60'
                }`}>
                <div className={`w-16 h-16 shrink-0 bg-black rounded overflow-hidden border ${singularityUnlocked ? 'border-[var(--color-accent)]' : 'border-slate-800'}`}>
                    <img src={CAMO_IMAGES["Singularity"]} alt="Singularity" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <h3 className={`text-lg font-semibold font-display uppercase tracking-tight ${singularityUnlocked ? 'text-[var(--color-accent)]' : 'text-slate-500'}`}>
                        Singularity
                    </h3>
                    <p className="text-sm text-slate-400">
                        Available weapon patterns {singularityUnlocked ? "Unlocked" : "Locked"}
                    </p>
                </div>
            </div>
        </div>
    );
}
