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

  const [displayMode, setDisplayMode] = useState<'fraction' | 'percentage'>('fraction');

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
    <div className="min-h-screen text-slate-200 p-4 md:p-8 relative selection:bg-bo7-orange/30 selection:text-bo7-orange overflow-hidden">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Noise / CRT - kept subtle in CSS */}
        <div className="absolute inset-0 scanlines opacity-30 pointer-events-none"></div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none"></div>

        {/* Tactical Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Mouse Torch */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 blur-3xl opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 159, 0, 0.1), transparent 60%)`
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <Header
          onOpenGallery={() => setIsGalleryOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <main className="space-y-16">
          <section>
            <MasterySummary progress={progress} displayMode={displayMode} />
          </section>

          {/* View Controls */}
          <div className="flex flex-col gap-6 ">
            {/* Mode Toggle Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5 p-2 border border-white/5 backdrop-blur-sm">
              <div className="flex gap-1 w-full md:w-auto">
                <button
                  onClick={() => setViewMode('classes')}
                  className={`flex-1 md:flex-none px-8 py-2 text-sm font-bold uppercase tracking-widest transition-all clip-path-slant ${viewMode === 'classes'
                    ? 'bg-bo7-orange text-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  Class View
                </button>
                <button
                  onClick={() => setViewMode('all')}
                  className={`flex-1 md:flex-none px-8 py-2 text-sm font-bold uppercase tracking-widest transition-all clip-path-slant-inv ${viewMode === 'all'
                    ? 'bg-bo7-orange text-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  All Weapons
                </button>
              </div>

              {viewMode === 'all' && (
                <div className="relative w-full md:w-80 group">
                  <div className="absolute inset-0 bg-bo7-orange/20 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  <input
                    type="text"
                    placeholder="SEARCH DATABASE..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="relative w-full bg-black/80 border border-white/20 text-white px-4 py-2 pl-10 focus:border-bo7-orange focus:outline-none font-tech uppercase tracking-wider placeholder:text-slate-600 transition-colors"
                  />
                  <svg className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Class Selector (Only in Class View) */}
            {viewMode === 'classes' && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {WEAPON_CLASSES.map(cls => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border skew-x-[-10deg] ${selectedClass === cls
                      ? 'bg-white text-black border-white'
                      : 'bg-black/50 border-white/10 text-slate-500 hover:border-bo7-orange hover:text-bo7-orange'
                      }`}
                  >
                    <span className="block skew-x-[10deg]">{cls}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="pb-20">
            {viewMode === 'classes' ? (
              <WeaponList
                key={selectedClass}
                className={selectedClass}
                weapons={CAMO_DATA.weapons.filter((w: Weapon) => w.class === selectedClass)}
                progress={progress}
                onToggle={toggleCamo}
                displayMode={displayMode}
              />
            ) : (
              <div className="space-y-8">
                {filteredWeapons.length > 0 ? (
                  <WeaponList
                    className={`Search Results [${filteredWeapons.length}]`}
                    weapons={filteredWeapons}
                    progress={progress}
                    onToggle={toggleCamo}
                    displayMode={displayMode}
                  />
                ) : (
                  <div className="text-center py-32 border border-white/5 border-dashed rounded-lg bg-black/20">
                    <p className="text-slate-500 font-tech uppercase tracking-widest text-xl">No matching weapons found in database</p>
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
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
        />
      </div>
    </div>
  );
}

export default App;
