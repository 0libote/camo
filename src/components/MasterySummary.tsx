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
        return `${count} / ${total}`; // Clean simple fraction
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-tech"> {/* Reduced gap */}
            {/* Arclight */}
            <div className="border-tech p-4 flex items-center gap-4 group hover:bg-white/5 transition-colors">
                <div className="w-14 h-14 shrink-0 border border-white/10 bg-black relative"> {/* Reduced size */}
                    <img src={CAMO_IMAGES["Arclight"]} alt="Arclight" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bo7 text-lg text-purple-400 tracking-wider uppercase">Arclight</h3>
                        <span className="text-sm font-bold text-slate-400 font-tech"> {/* Consistent typography */}
                            {formatCount(arclightCount, TEMPEST_REQ_COUNT)}
                        </span>
                    </div>


                    {/* Progress Bar */}
                    <div className="mb-1">
                        <ProgressBar
                            progress={(arclightCount / TEMPEST_REQ_COUNT) * 100}
                            colorClass="bg-purple-500"
                            heightClass="h-1.5"
                        />
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Complete Arclight on 30 Weapons</p>
                </div>
            </div>

            {/* Tempest */}
            <div className="border-tech p-4 flex items-center gap-4 group hover:bg-white/5 transition-colors">
                <div className="w-14 h-14 shrink-0 border border-white/10 bg-black relative">
                    <img src={CAMO_IMAGES["Tempest"]} alt="Tempest" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bo7 text-lg text-bo7-cyan tracking-wider uppercase">Tempest</h3>
                        <span className="text-sm font-bold text-slate-400 font-tech">
                            {formatCount(tempestCount, SINGULARITY_REQ_COUNT)}
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="mb-1">
                        <ProgressBar
                            progress={(tempestCount / SINGULARITY_REQ_COUNT) * 100}
                            colorClass="bg-bo7-cyan"
                            heightClass="h-1.5"
                        />
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Complete Tempest on 30 Weapons</p>
                </div>
            </div>

            {/* Singularity */}
            <div className={`border-tech p-4 flex items-center gap-4 transition-all duration-500 ${singularityUnlocked
                ? 'bg-bo7-orange/5 border-bo7-orange/30'
                : 'opacity-75'
                }`}>
                <div className={`w-16 h-16 shrink-0 border bg-black relative ${singularityUnlocked ? 'border-bo7-orange' : 'border-white/10'}`}>
                    <img src={CAMO_IMAGES["Singularity"]} alt="Singularity" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className={`font-bo7 text-xl tracking-wider uppercase ${singularityUnlocked ? 'text-bo7-orange' : 'text-slate-500'}`}>Singularity</h3>
                        {singularityUnlocked && <span className="text-[10px] px-2 py-0.5 bg-bo7-orange/20 text-bo7-orange border border-bo7-orange/30 tracking-widest">UNLOCKED</span>}
                    </div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">
                        {singularityUnlocked ? "Mastery Achieved" : "Complete Tempest on 30 weapons"}
                    </p>
                </div>
            </div>
        </div>
    );
}
