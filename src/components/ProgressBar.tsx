interface Props {
    progress: number; // 0 to 100
    colorClass?: string; // e.g., "bg-bo7-orange"
    heightClass?: string; // e.g., "h-2"
}

export function ProgressBar({ progress, colorClass = "bg-blue-500", heightClass = "h-2" }: Props) {
    return (
        <div className={`w-full bg-neutral-800 rounded-full overflow-hidden ${heightClass}`}>
            <div
                className={`h-full transition-all duration-300 rounded-full ${colorClass}`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
        </div>
    );
}
