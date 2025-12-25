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

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Arclight */}
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl hover:border-neutral-700 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 shrink-0 bg-neutral-800 rounded-lg overflow-hidden">
                        <img
                            src={CAMO_IMAGES["Arclight"]}
                            alt="Arclight"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-base font-semibold text-white">Arclight</h3>
                            <span className="text-sm text-blue-400 font-medium">
                                {displayMode === 'percentage'
                                    ? `${Math.round((arclightCount / TEMPEST_REQ_COUNT) * 100)}%`
                                    : `${arclightCount}/${TEMPEST_REQ_COUNT}`
                                }
                            </span>
                        </div>
                        <ProgressBar
                            progress={(arclightCount / TEMPEST_REQ_COUNT) * 100}
                            colorClass="bg-blue-500"
                            heightClass="h-1.5"
                        />
                    </div>
                </div>
            </div>

            {/* Tempest */}
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl hover:border-neutral-700 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 shrink-0 bg-neutral-800 rounded-lg overflow-hidden">
                        <img
                            src={CAMO_IMAGES["Tempest"]}
                            alt="Tempest"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-base font-semibold text-white">Tempest</h3>
                            <span className="text-sm text-purple-400 font-medium">
                                {displayMode === 'percentage'
                                    ? `${Math.round((tempestCount / SINGULARITY_REQ_COUNT) * 100)}%`
                                    : `${tempestCount}/${SINGULARITY_REQ_COUNT}`
                                }
                            </span>
                        </div>
                        <ProgressBar
                            progress={(tempestCount / SINGULARITY_REQ_COUNT) * 100}
                            colorClass="bg-purple-500"
                            heightClass="h-1.5"
                        />
                    </div>
                </div>
            </div>

            {/* Singularity */}
            <div className={`p-4 rounded-xl border transition-colors ${singularityUnlocked
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-neutral-900 border-neutral-800 opacity-60'
                }`}>
                <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 shrink-0 rounded-lg overflow-hidden ${singularityUnlocked ? '' : 'grayscale'}`}>
                        <img
                            src={CAMO_IMAGES["Singularity"]}
                            alt="Singularity"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className={`text-base font-semibold mb-1 ${singularityUnlocked ? 'text-green-400' : 'text-neutral-500'}`}>
                            Singularity
                        </h3>
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${singularityUnlocked
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-neutral-800 text-neutral-500'
                            }`}>
                            {singularityUnlocked ? "Unlocked" : "Locked"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
