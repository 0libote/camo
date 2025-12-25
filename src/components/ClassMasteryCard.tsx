interface Props {
    className: string;
    shatteredGoldCount: number;
    requiredForArclight: number;
    displayMode: 'fraction' | 'percentage';
}

export function ClassMasteryCard({ shatteredGoldCount, requiredForArclight, displayMode }: Props) {
    const progressPercent = requiredForArclight > 0 ? (shatteredGoldCount / requiredForArclight) * 100 : 0;
    const isComplete = shatteredGoldCount >= requiredForArclight;

    return (
        <div className={`bg-neutral-900 border rounded-lg px-4 py-2 ${isComplete ? 'border-green-500/50' : 'border-neutral-800'}`}>
            <div className="flex items-center gap-4">
                <div className="text-sm text-neutral-400">
                    Arclight Ready
                </div>
                <div className={`text-sm font-medium ${isComplete ? 'text-green-400' : 'text-white'}`}>
                    {displayMode === 'percentage'
                        ? `${Math.round(progressPercent)}%`
                        : `${shatteredGoldCount}/${requiredForArclight}`
                    }
                </div>
            </div>
        </div>
    );
}
