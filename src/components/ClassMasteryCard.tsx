
interface Props {
    className: string;
    shatteredGoldCount: number;
    requiredForArclight: number;
    displayMode: 'fraction' | 'percentage';
}

export function ClassMasteryCard({ className, shatteredGoldCount, requiredForArclight, displayMode }: Props) {

    const progressPercent = requiredForArclight > 0 ? (shatteredGoldCount / requiredForArclight) * 100 : 0;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl px-6 py-4 min-w-[240px] hover:border-cyan-500/30 transition-all shadow-sm">
            <div className="flex items-center justify-between gap-6">
                <div>
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                        Category Mastery
                    </h3>
                    <div className="text-base font-bold text-white tracking-tight">{className}</div>
                    <div className="h-0.5 w-6 bg-cyan-500 mt-1.5 rounded-full"></div>
                </div>

                <div className="text-right">
                    <div className="text-2xl font-bold text-white leading-none">
                        {displayMode === 'percentage'
                            ? `${Math.round(progressPercent)}%`
                            : `${shatteredGoldCount}/${requiredForArclight}`
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
