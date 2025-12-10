interface Props {
    progress: number; // 0 to 100
    colorClass?: string; // e.g., "bg-bo7-orange"
    shadowColor?: string; // e.g., "rgba(255,159,0,0.5)"
    heightClass?: string; // e.g., "h-2"
    showGlow?: boolean;
}

export function ProgressBar({ progress, colorClass = "bg-blue-500", heightClass = "h-2" }: Props) {
    return (
        <div className={`w-full bg-slate-700 rounded-full overflow-hidden ${heightClass}`}>
            <div
                className={`h-full transition-all duration-300 rounded-full ${colorClass}`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
        </div>
    );
}
