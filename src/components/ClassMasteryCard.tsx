
interface Props {
    className: string;
    shatteredGoldCount: number;
    requiredForArclight: number;
}

export function ClassMasteryCard({ className, shatteredGoldCount, requiredForArclight }: Props) {
    const isArclightReady = shatteredGoldCount >= requiredForArclight;
    const progressPercent = requiredForArclight > 0 ? (shatteredGoldCount / requiredForArclight) * 100 : 0;


    return (
        <div className="relative overflow-hidden bg-black border border-white/10 group shadow-lg">
            {/* Tech Corners */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20 group-hover:border-bo7-orange transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20 group-hover:border-bo7-orange transition-colors"></div>

            {/* Animated Scanline Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)', backgroundSize: '30px 30px' }}>
            </div>

            {/* Status Bar Top */}
            <div className={`h-1 w-full transition-colors duration-500 ${isArclightReady ? 'bg-bo7-orange shadow-[0_0_10px_#ff9f00]' : 'bg-slate-800'}`}></div>

            <div className="p-6 relative z-10 grid grid-cols-[auto_1fr] gap-8 items-center">

                {/* Visual Data Block */}
                <div className="relative">
                    {/* Ring Chart Simulation */}
                    <div className="w-24 h-24 relative flex items-center justify-center p-2 bg-black/50 rounded-full border border-white/5">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            {/* Track */}
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="6" />
                            {/* Progress */}
                            <circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke={isArclightReady ? "#FF9F00" : "#475569"}
                                strokeWidth="6"
                                strokeDasharray="283"
                                strokeDashoffset={283 - (283 * progressPercent) / 100}
                                className="transition-all duration-1000 ease-out"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-2xl font-bo7 ${isArclightReady ? 'text-bo7-orange drop-shadow-md' : 'text-slate-500'}`}>
                                {Math.round(progressPercent)}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Info Block */}
                <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-start border-b border-white/10 pb-2">
                        <div>
                            <h3 className="text-xs font-tech text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-bo7-orange rounded-full"></span>
                                Class Protocol
                            </h3>
                            <div className="text-2xl font-bo7 text-white uppercase tracking-wider">{className}</div>
                        </div>
                        <div className={`px-2 py-1 text-[10px] font-bold font-mono border uppercase tracking-widest ${isArclightReady
                            ? 'border-bo7-orange text-bo7-orange bg-bo7-orange/10'
                            : 'border-slate-700 text-slate-500'
                            }`}>
                            {isArclightReady ? 'Ready' : 'Pending'}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-tech mb-1">Gold Count</div>
                            <div className="text-xl font-mono text-white tracking-wider">
                                {shatteredGoldCount} <span className="text-slate-600 text-sm">/ {requiredForArclight}</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-tech mb-1">Arclight Camo</div>
                            <div className={`text-sm font-bold uppercase tracking-wider ${isArclightReady ? 'text-bo7-orange drop-shadow-[0_0_5px_rgba(255,159,0,0.5)]' : 'text-slate-600'}`}>
                                {isArclightReady ? 'UNLOCKED' : 'LOCKED'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Decoration */}
            <div className="absolute bottom-0 right-0 p-2 opacity-20 bg-black/50 w-full text-right border-t border-white/5">
                <div className="text-[8px] font-mono text-bo7-orange">
                    REF-ID: {className.substring(0, 3).toUpperCase()}-{(requiredForArclight * 123).toString(16).toUpperCase()} // SECURE
                </div>
            </div>
        </div>
    );
}
