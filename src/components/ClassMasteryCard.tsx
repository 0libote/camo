
import { CAMO_IMAGES } from '../data';
import { ProgressBar } from './ProgressBar';

interface Props {
    className: string;
    shatteredGoldCount: number;
    requiredForArclight: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export function ClassMasteryCard({ className, shatteredGoldCount, requiredForArclight, onMouseEnter, onMouseLeave }: Props) {
    const isArclightReady = shatteredGoldCount >= requiredForArclight;
    const progressPercent = requiredForArclight > 0 ? (shatteredGoldCount / requiredForArclight) * 100 : 0;

    return (
        <div
            className="border-tech p-6 flex items-center gap-6 group hover:bg-white/5 transition-colors relative overflow-hidden"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* Background Decoration */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-bo7-orange/10 rounded-full blur-3xl transition-opacity duration-500 ${isArclightReady ? 'opacity-100' : 'opacity-0'}`}></div>

            <div className="w-20 h-20 shrink-0 border border-white/10 bg-black relative shadow-lg">
                <img src={CAMO_IMAGES["Arclight"]} alt="Arclight" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                {/* Lock/Unlock Indicator */}
                <div className="absolute top-1 right-1">
                    {isArclightReady ? (
                        <div className="w-2 h-2 bg-bo7-orange shadow-[0_0_5px_rgba(255,159,0,0.8)]"></div>
                    ) : (
                        <div className="w-2 h-2 bg-slate-600"></div>
                    )}
                </div>
            </div>

            <div className="flex-1 min-w-0 relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="text-xl font-bo7 text-white uppercase tracking-wider mb-1">Class Mastery</div>
                        <div className="text-xs font-tech text-slate-400 uppercase tracking-widest">{className} Protocol</div>
                    </div>
                    <div className="text-right">
                        <span className={`text-3xl font-bor7 font-bold transition-colors ${isArclightReady ? 'text-bo7-orange' : 'text-slate-500'}`}>
                            {shatteredGoldCount}
                        </span>
                        <span className="text-sm text-slate-600 font-tech mx-1">/</span>
                        <span className="text-lg text-slate-600 font-tech">{requiredForArclight}</span>
                    </div>
                </div>

                <div className="mb-3">
                    <ProgressBar
                        progress={progressPercent}
                        colorClass={isArclightReady ? "bg-bo7-orange" : "bg-slate-600"}
                        heightClass="h-2"
                    />
                </div>

                <div className="flex justify-between items-end">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-tech">
                        {isArclightReady
                            ? "Arclight Camo Access Granted"
                            : `Acquire Gold Camo on ${requiredForArclight - shatteredGoldCount} more weapons`}
                    </p>
                    {isArclightReady && (
                        <div className="px-2 py-0.5 border border-bo7-orange/30 bg-bo7-orange/10 text-[10px] text-bo7-orange font-tech uppercase tracking-wider">
                            Unlocked
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
