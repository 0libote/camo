
interface Props {
    className: string;
    shatteredGoldCount: number;
    requiredForArclight: number;
}

export function ClassMasteryCard({ className, shatteredGoldCount, requiredForArclight }: Props) {
    const isArclightReady = shatteredGoldCount >= requiredForArclight;
    const progressPercent = requiredForArclight > 0 ? (shatteredGoldCount / requiredForArclight) * 100 : 0;

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-6">
                {/* Simple Progress Circle */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="8" />
                        <circle
                            cx="50" cy="50" r="45"
                            fill="none"
                            stroke={isArclightReady ? "#22c55e" : "#3b82f6"}
                            strokeWidth="8"
                            strokeDasharray="283"
                            strokeDashoffset={283 - (283 * progressPercent) / 100}
                            className="transition-all duration-1000 ease-out"
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="absolute text-sm font-bold text-white">
                        {Math.round(progressPercent)}%
                    </span>
                </div>

                <div className="flex-1">
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-1">
                        Class Mastery
                    </h3>
                    <div className="text-xl font-bold text-white mb-2">{className}</div>

                    <div className="flex justify-between items-center text-sm">
                        <div className="text-slate-300">
                            Gold: <span className="font-mono text-white">{shatteredGoldCount}</span> / {requiredForArclight}
                        </div>
                        <div className={`font-bold px-2 py-0.5 rounded ${isArclightReady ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                            {isArclightReady ? 'UNLOCKED' : 'LOCKED'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
