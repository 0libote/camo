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
        <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <h1 className="text-4xl font-bold text-orange-500">
                    BO7 Camo Tracker
                </h1>
                <p className="text-slate-400 mt-2">Track your multiplayer mastery progression</p>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={onOpenGallery}
                    className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg text-sm transition-colors border border-orange-500/20"
                >
                    View All Camos
                </button>
                <button
                    onClick={exportProgress}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors border border-slate-700"
                >
                    Export JSON
                </button>
                <button
                    onClick={handleImportClick}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors border border-slate-700"
                >
                    Import JSON
                </button>
                <button
                    onClick={resetProgress}
                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition-colors border border-red-500/20"
                >
                    Reset
                </button>
            </div>
        </header>
    );
}
