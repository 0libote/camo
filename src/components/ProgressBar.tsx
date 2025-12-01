interface Props {
    progress: number; // 0 to 100
    colorClass?: string; // e.g., "bg-bo7-orange"
    heightClass?: string; // e.g., "h-2"
    showGlow?: boolean;
}

export function ProgressBar({ progress, colorClass = "bg-bo7-orange", heightClass = "h-2", showGlow = true }: Props) {
    return (
        <div className={`w-full ${heightClass} bg-slate-800/50 border border-white/5 relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 100%)', backgroundSize: '8px 8px' }}
            />

            {/* Fill */}
            <div
                className={`h-full ${colorClass} transition-all duration-700 ease-out relative`}
                style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            >
                {/* Glow Effect */}
                {showGlow && (
                    <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/50 blur-[2px] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                )}
            </div>
        </div>
    );
}
