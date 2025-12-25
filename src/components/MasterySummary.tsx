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
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl group transition-all hover:border-cyan-500/50">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 shrink-0 bg-black rounded-lg overflow-hidden border border-slate-800 transition-colors">
                        <img src={CAMO_IMAGES["Arclight"]} alt="Arclight" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-2">
                            <h3 className="text-xl font-bold text-white tracking-tight">Arclight</h3>
                            <span className="text-xs text-slate-500 font-medium">Stage 1</span>
                        </div>
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-cyan-400 font-semibold">
                                {displayMode === 'percentage'
                                    ? `${Math.round((arclightCount / TEMPEST_REQ_COUNT) * 100)}%`
                                    : `${arclightCount}/${TEMPEST_REQ_COUNT}`
                                }
                            </span>
                        </div>
                        <ProgressBar
                            progress={(arclightCount / TEMPEST_REQ_COUNT) * 100}
                            colorClass="bg-cyan-500"
                            heightClass="h-1.5"
                        />
                    </div>
                </div>
            </div>

            {/* Tempest Panel */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl group transition-all hover:border-white/30">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 shrink-0 bg-black rounded-lg overflow-hidden border border-slate-800 transition-colors">
                        <img src={CAMO_IMAGES["Tempest"]} alt="Tempest" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-2">
                            <h3 className="text-xl font-bold text-white tracking-tight">Tempest</h3>
                            <span className="text-xs text-slate-500 font-medium">Stage 2</span>
                        </div>
                        <div className="flex justify-between items-center text-xs mb-2">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-white font-semibold">{formatCount(tempestCount, SINGULARITY_REQ_COUNT)}</span>
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
            <div className={`p-6 rounded-xl border transition-all duration-500 ${singularityUnlocked
                ? 'bg-cyan-500/5 border-cyan-500/30'
                : 'bg-slate-900 border-slate-800 opacity-60'
                }`}>
                <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 shrink-0 bg-black rounded-lg overflow-hidden border ${singularityUnlocked ? 'border-cyan-500/30' : 'border-slate-800'}`}>
                        <img src={CAMO_IMAGES["Singularity"]} alt="Singularity" className={`w-full h-full object-cover ${singularityUnlocked ? '' : 'grayscale opacity-30'}`} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-2">
                            <h3 className={`text-xl font-bold tracking-tight ${singularityUnlocked ? 'text-cyan-400' : 'text-slate-600'}`}>
                                Singularity
                            </h3>
                            <span className="text-xs text-slate-600 font-medium">Final Stage</span>
                        </div>
                        <div className={`px-2 py-0.5 inline-block rounded text-[10px] font-bold uppercase tracking-wider ${singularityUnlocked ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-600'}`}>
                            {singularityUnlocked ? "Unlocked" : "Locked"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
