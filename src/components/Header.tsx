import { useProgress } from '../hooks/useProgress';

interface Props {
    onOpenGallery: () => void;
}

export function Header({ onOpenGallery }: Props) {
    const { resetProgress, exportProgress, importProgress } = useProgress();

    const handleImportClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) importProgress(file);
        };
        input.click();
    };

    return (
        <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-6">
            <div>
                <h1 className="text-5xl font-bo7 text-bo7-orange tracking-wider uppercase drop-shadow-[0_0_10px_rgba(255,159,0,0.5)]">
                    BO7 Camo Tracker
                </h1>
                <div className="flex items-center gap-2 mt-2">
                    <div className="h-1 w-8 bg-bo7-orange"></div>
                    <p className="text-slate-400 font-tech uppercase tracking-widest text-sm">Multiplayer Mastery Protocol</p>
                </div>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={onOpenGallery}
                    className="px-6 py-2 bg-bo7-orange/10 hover:bg-bo7-orange/20 text-bo7-orange font-bold uppercase tracking-wider text-sm transition-all border border-bo7-orange/30 hover:border-bo7-orange clip-path-slant"
                >
                    View Intel
                </button>
                <div className="h-8 w-px bg-white/10 mx-2"></div>
                <button
                    onClick={exportProgress}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-tech uppercase tracking-wider text-sm transition-colors border border-slate-700 hover:border-slate-500"
                >
                    Export Data
                </button>
                <button
                    onClick={handleImportClick}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-tech uppercase tracking-wider text-sm transition-colors border border-slate-700 hover:border-slate-500"
                >
                    Import Data
                </button>
                <button
                    onClick={resetProgress}
                    className="px-4 py-2 bg-bo7-red/10 hover:bg-bo7-red/20 text-bo7-red font-tech uppercase tracking-wider text-sm transition-colors border border-bo7-red/30 hover:border-bo7-red"
                >
                    Reset
                </button>
            </div>
        </header>
    );
}
