import type { UserProgress } from '../types';
import { getGlobalArclightCount, getGlobalTempestCount, isSingularityUnlocked } from '../logic/progression';

interface Props {
    progress: UserProgress;
}

export function MasterySummary({ progress }: Props) {
    const arclightCount = getGlobalArclightCount(progress);
    const tempestCount = getGlobalTempestCount(progress);
    const singularityUnlocked = isSingularityUnlocked(progress);

    // Thresholds (hardcoded based on logic assumptions/JSON text)
    const TEMPEST_REQ = 30;
    const SINGULARITY_REQ = 30;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Arclight Progress */}
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-purple-400">Arclight Global</h3>
                    <span className="text-sm font-mono text-slate-400">{arclightCount} / {TEMPEST_REQ}</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                        className="bg-purple-500 h-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (arclightCount / TEMPEST_REQ) * 100)}%` }}
                    />
                </div>
                <p className="text-xs text-slate-500 mt-2">Required for Tempest availability</p>
            </div>

            {/* Tempest Progress */}
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-cyan-400">Tempest Global</h3>
                    <span className="text-sm font-mono text-slate-400">{tempestCount} / {SINGULARITY_REQ}</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                        className="bg-cyan-500 h-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (tempestCount / SINGULARITY_REQ) * 100)}%` }}
                    />
                </div>
                <p className="text-xs text-slate-500 mt-2">Required for Singularity unlock</p>
            </div>

            {/* Singularity Status */}
            <div className={`p-4 rounded-xl border transition-all duration-500 ${singularityUnlocked
                ? 'bg-amber-900/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-slate-900/50 border-slate-700 opacity-75'
                }`}>
                <div className="flex justify-between items-center mb-2">
                    <h3 className={`text-lg font-bold ${singularityUnlocked ? 'text-amber-400' : 'text-slate-500'}`}>
                        Singularity
                    </h3>
                    {singularityUnlocked ? (
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs rounded border border-amber-500/30">UNLOCKED</span>
                    ) : (
                        <span className="text-xs text-slate-500">LOCKED</span>
                    )}
                </div>
                <p className="text-xs text-slate-400">
                    {singularityUnlocked
                        ? "The final mastery is yours. Congratulations."
                        : "Complete Tempest on 30 weapons to unlock."}
                </p>
            </div>
        </div>
    );
}
