
interface Props {
    className: string;
    shatteredGoldCount: number;
    requiredForArclight: number;
    displayMode: 'fraction' | 'percentage';
}

export function ClassMasteryCard({ className, shatteredGoldCount, requiredForArclight, displayMode }: Props) {

    const progressPercent = requiredForArclight > 0 ? (shatteredGoldCount / requiredForArclight) * 100 : 0;

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-sm w-full md:w-auto">
            <div className="flex items-center justify-between gap-8">
                <div>
                    <h3 className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">
                        Class Mastery
                    </h3>
                    <div className="text-lg font-bold text-slate-200">{className}</div>
                </div>

                <div className="text-right">
                    <div className="text-xl font-bold text-slate-200 mb-1">
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
