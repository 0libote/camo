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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-tech">
            {/* Arclight Panel */}
            <div className="border-tech p-6 flex flex-col justify-between group relative overflow-hidden h-32">
                <div className="absolute top-0 right-0 p-2 opacity-10 font-bo7 text-4xl text-white">01</div>
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 shrink-0 border border-white/10 bg-black relative p-1">
                        <img src={CAMO_IMAGES["Arclight"]} alt="Arclight" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bo7 text-xl text-purple-400 tracking-wider uppercase mb-1">Arclight</h3>
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-xs text-slate-500 uppercase tracking-widest">Protocol Progress</span>
                            <span className="text-lg font-bold text-white font-bo7">{formatCount(arclightCount, TEMPEST_REQ_COUNT)}</span>
                        </div>
                        <ProgressBar
                            progress={(arclightCount / TEMPEST_REQ_COUNT) * 100}
                            colorClass="bg-purple-500"
                            shadowColor="rgba(168, 85, 247, 0.5)"
                            heightClass="h-2"
                        />
                    </div>
                </div>
            </div>

            {/* Tempest Panel */}
            <div className="border-tech p-6 flex flex-col justify-between group relative overflow-hidden h-32">
                <div className="absolute top-0 right-0 p-2 opacity-10 font-bo7 text-4xl text-white">02</div>
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 shrink-0 border border-white/10 bg-black relative p-1">
                        <img src={CAMO_IMAGES["Tempest"]} alt="Tempest" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bo7 text-xl text-bo7-cyan tracking-wider uppercase mb-1">Tempest</h3>
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-xs text-slate-500 uppercase tracking-widest">Protocol Progress</span>
                            <span className="text-lg font-bold text-white font-bo7">{formatCount(tempestCount, SINGULARITY_REQ_COUNT)}</span>
                        </div>
                        <ProgressBar
                            progress={(tempestCount / SINGULARITY_REQ_COUNT) * 100}
                            colorClass="bg-bo7-cyan"
                            shadowColor="rgba(0, 240, 255, 0.5)"
                            heightClass="h-2"
                        />
                    </div>
                </div>
            </div>

            {/* Singularity Panel */}
            <div className={`p-6 flex items-center gap-4 relative overflow-hidden h-32 transition-all duration-500 border border-white/10 ${singularityUnlocked
                ? 'bg-bo7-orange/10 border-bo7-orange'
                : 'bg-black/40 opacity-70'
                }`}>

                {/* Status Indicator */}
                <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${singularityUnlocked ? 'bg-bo7-orange text-black' : 'bg-slate-800 text-slate-500'}`}>
                    {singularityUnlocked ? 'UNLOCKED' : 'LOCKED'}
                </div>

                <div className={`w-20 h-20 shrink-0 border bg-black relative p-1 ${singularityUnlocked ? 'border-bo7-orange shadow-[0_0_15px_rgba(255,159,0,0.3)]' : 'border-white/10'}`}>
                    <img src={CAMO_IMAGES["Singularity"]} alt="Singularity" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 z-10">
                    <h3 className={`font-bo7 text-2xl tracking-widest uppercase mb-1 ${singularityUnlocked ? 'text-bo7-orange drop-shadow-lg' : 'text-slate-600'}`}>
                        Singularity
                    </h3>
                    <p className="text-xs text-slate-400 font-tech uppercase tracking-wide">
                        {singularityUnlocked ? "Ultimate Mastery Achieved" : "Requires full Tempest completion"}
                    </p>
                </div>
            </div>
        </div>
    );
}
