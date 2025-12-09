interface Props {
    progress: number; // 0 to 100
    colorClass?: string; // e.g., "bg-bo7-orange"
    heightClass?: string; // e.g., "h-2"
    showGlow?: boolean;
}

export function ProgressBar({ progress, colorClass = "bg-bo7-orange", heightClass = "h-2", showGlow = true }: Props) {
    const segments = 20; // Number of segments
    const activeSegments = Math.round((progress / 100) * segments);

    return (
        <div className={`w-full flex gap-0.5 ${heightClass}`}>
            {Array.from({ length: segments }).map((_, i) => (
                <div
                    key={i}
                    className={`flex-1 transition-all duration-300 ${
                        i < activeSegments 
                            ? `${colorClass} ${showGlow ? 'shadow-[0_0_5px_rgba(255,159,0,0.5)]' : ''}` 
                            : 'bg-white/5'
                    }`}
                />
            ))}
        </div>
    );
}
