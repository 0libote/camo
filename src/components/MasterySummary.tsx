import type { UserProgress } from '../types';
import { getGlobalArclightCount, getGlobalTempestCount, isSingularityUnlocked } from '../logic/progression';
import { CAMO_IMAGES } from '../data';

interface Props {
    progress: UserProgress;
}

export function MasterySummary({ progress }: Props) {
    const arclightCount = getGlobalArclightCount(progress);
    const tempestCount = getGlobalTempestCount(progress);
    const singularityUnlocked = isSingularityUnlocked(progress);

    const TEMPEST_REQ = 30;
    const SINGULARITY_REQ = 30;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Arclight */}
            <div className="relative overflow-hidden bg-slate-900 rounded-xl border border-slate-700 p-4 flex items-center gap-4 group hover:border-purple-500/50 transition-colors">
                <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-600 bg-black">
                    <img src={CAMO_IMAGES["Arclight"]} alt="Arclight" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-purple-400 truncate">Arclight</h3>
                        <span className="text-xs font-mono text-slate-400">{arclightCount}/{TEMPEST_REQ}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${Math.min(100, (arclightCount / TEMPEST_REQ) * 100)}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">Global progress for Tempest</p>
                </div>
            </div>

            {/* Tempest */}
            <div className="relative overflow-hidden bg-slate-900 rounded-xl border border-slate-700 p-4 flex items-center gap-4 group hover:border-cyan-500/50 transition-colors">
                <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-600 bg-black">
                    <img src={CAMO_IMAGES["Tempest"]} alt="Tempest" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-cyan-400 truncate">Tempest</h3>
                        <span className="text-xs font-mono text-slate-400">{tempestCount}/{SINGULARITY_REQ}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className="bg-cyan-500 h-full transition-all duration-500" style={{ width: `${Math.min(100, (tempestCount / SINGULARITY_REQ) * 100)}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">Global progress for Singularity</p>
                </div>
            </div>

            {/* Singularity */}
            <div className={`relative overflow-hidden rounded-xl border p-4 flex items-center gap-4 transition-all duration-500 ${singularityUnlocked
                    ? 'bg-amber-950/30 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                    : 'bg-slate-900 border-slate-700 opacity-75'
                }`}>
                <div className={`w-16 h-16 shrink-0 rounded-lg overflow-hidden border bg-black ${singularityUnlocked ? 'border-amber-500/50' : 'border-slate-600'}`}>
                    <img src={CAMO_IMAGES["Singularity"]} alt="Singularity" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className={`font-bold truncate ${singularityUnlocked ? 'text-amber-400' : 'text-slate-500'}`}>Singularity</h3>
                        {singularityUnlocked && <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">UNLOCKED</span>}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">
                        {singularityUnlocked ? "The final mastery is yours." : "Complete Tempest on 30 weapons."}
                    </p>
                </div>
            </div>
        </div>
    );
}
