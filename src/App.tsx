import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WeaponList } from './components/WeaponList';
import { MasterySummary } from './components/MasterySummary';
import { CamoGallery } from './components/CamoGallery';
import { SettingsModal } from './components/SettingsModal';
import { useProgress } from './hooks/useProgress';
import { CAMO_DATA, WEAPON_CLASSES } from './data';
import type { Weapon } from './types';

function App() {
  const { progress, toggleCamo, resetProgress, exportProgress, importProgress } = useProgress();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'classes' | 'all'>('classes');
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [selectedClass, setSelectedClass] = useState<string>(WEAPON_CLASSES[0]);

  // Mouse Gradient Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  // Filter weapons for "All Guns" view
  const allWeapons = CAMO_DATA.weapons;
  const filteredWeapons = allWeapons.filter(w =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bo7-black text-slate-200 p-4 md:p-8 relative selection:bg-bo7-orange/30 selection:text-bo7-orange">
      {/* Mouse Gradient */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-300 blur-xl"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 159, 0, 0.15), rgba(255, 159, 0, 0.05) 40%, transparent 60%)`
        }}
      />

      <div className="relative z-10">
        <Header
          onOpenGallery={() => setIsGalleryOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <main className="max-w-7xl mx-auto space-y-12">
          <MasterySummary progress={progress} />

          {/* View Controls */}
          <div className="flex flex-col gap-6 border-b border-white/10 pb-6">
            {/* Mode Toggle */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 bg-slate-900/50 p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => setViewMode('classes')}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all rounded ${viewMode === 'classes'
                    ? 'bg-bo7-orange text-black shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  Class View
                </button>
                <button
                  onClick={() => setViewMode('all')}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all rounded ${viewMode === 'all'
                    ? 'bg-bo7-orange text-black shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  All Weapons
                </button>
              </div>

              {viewMode === 'all' && (
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="SEARCH WEAPON..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/50 border border-white/20 text-white px-4 py-2 pl-10 focus:border-bo7-orange focus:outline-none font-tech uppercase tracking-wider placeholder:text-slate-600"
                  />
                  <svg className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Class Selector (Only in Class View) */}
            {viewMode === 'classes' && (
              <div className="flex flex-wrap gap-2">
                {WEAPON_CLASSES.map(cls => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${selectedClass === cls
                      ? 'bg-bo7-orange/20 border-bo7-orange text-bo7-orange shadow-[0_0_10px_rgba(255,159,0,0.2)]'
                      : 'bg-slate-900/50 border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                      } clip-path-slant`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-16">
            {viewMode === 'classes' ? (
              <WeaponList
                key={selectedClass}
                className={selectedClass}
                weapons={CAMO_DATA.weapons.filter((w: Weapon) => w.class === selectedClass)}
                progress={progress}
                onToggle={toggleCamo}
              />
            ) : (
              <div className="space-y-8">
                {filteredWeapons.length > 0 ? (
                  <WeaponList
                    className={`Search Results (${filteredWeapons.length})`}
                    weapons={filteredWeapons}
                    progress={progress}
                    onToggle={toggleCamo}
                  />
                ) : (
                  <div className="text-center py-20 text-slate-500 font-tech uppercase tracking-widest">
                    No weapons found matching protocol
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        <CamoGallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onExport={exportProgress}
          onImport={handleImportClick}
          onReset={resetProgress}
        />
      </div>
    </div>
  );
}

export default App;
