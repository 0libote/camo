
interface Props {
    className: string;
    shatteredGoldCount: number;
    requiredForArclight: number;
    displayMode: 'fraction' | 'percentage';
}

export function ClassMasteryCard({ className, shatteredGoldCount, requiredForArclight, displayMode }: Props) {

    const progressPercent = requiredForArclight > 0 ? (shatteredGoldCount / requiredForArclight) * 100 : 0;

    return (
        <div className="bg-slate-800/80 border border-slate-700 px-6 py-3 min-w-[200px] hover:border-[var(--color-accent)] transition-colors duration-300">
            <div className="flex items-center justify-between gap-8">
                <div>
                    <h3 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-0.5">
                        Class Mastery
                    </h3>
                    <div className="text-lg font-bold text-white uppercase">{className}</div>
                    <div className="h-0.5 w-8 bg-[var(--color-accent)] mt-1"></div>
                </div>

                <div className="text-right">
                    <div className="text-2xl font-bold text-white leading-none">
                        {displayMode === 'percentage'
                            ? `${Math.round(progressPercent)}%`
                            : `${shatteredGoldCount}/${requiredForArclight}`
                        }
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">
                        PROGRESS
                    </div>
                </div>
            </div>
        </div>
    );
}
