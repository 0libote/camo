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
          <div className="flex flex-col gap-8 relative z-10">
            {/* Mode Toggle Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-end gap-6 bg-gradient-to-r from-black/60 to-transparent p-4 border-l-2 border-bo7-orange backdrop-blur-sm">
              <div className="flex gap-2 w-full lg:w-auto">
                <button
                  onClick={() => setViewMode('classes')}
                  className={`flex-1 lg:flex-none relative px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all clip-path-slant ${viewMode === 'classes'
                    ? 'bg-bo7-orange text-black clip-path-slant'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-sm ${viewMode === 'classes' ? 'bg-black' : 'bg-bo7-orange'}`}></span>
                    Class Loadout
                  </span>
                </button>
                <button
                  onClick={() => setViewMode('all')}
                  className={`flex-1 lg:flex-none relative px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all clip-path-slant-inv ${viewMode === 'all'
                    ? 'bg-bo7-orange text-black'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-sm ${viewMode === 'all' ? 'bg-black' : 'bg-bo7-orange'}`}></span>
                    Database
                  </span>
                </button>
              </div>

              {viewMode === 'all' && (
                <div className="relative w-full lg:w-96 group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-bo7-orange/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity blur-sm"></div>
                  <div className="relative flex items-center bg-black border border-white/10 clip-path-slant-inv">
                    <span className="pl-4 text-bo7-orange">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="SEARCH WEAPON DATABASE..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-white px-4 py-3 focus:outline-none font-tech uppercase tracking-wider placeholder:text-slate-600"
                    />
                    <div className="pr-2">
                      <div className="flex gap-0.5">
                        <div className="w-1 h-1 bg-white/20"></div>
                        <div className="w-1 h-1 bg-white/20"></div>
                        <div className="w-1 h-1 bg-white/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Class Selector (Only in Class View) */}
            {viewMode === 'classes' && (
              <div className="relative">
                {/* Decorative background strip */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px bg-white/5 -z-10"></div>

                <div className="flex flex-wrap gap-2 justify-start items-center">
                  <span className="text-[10px] bg-black px-2 font-tech text-slate-500 mr-2 uppercase tracking-widest border border-white/5">
                    Class Filter
                  </span>
                  {WEAPON_CLASSES.map(cls => (
                    <button
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      className={`relative px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 border transform skew-x-[-12deg] overflow-hidden group ${selectedClass === cls
                        ? 'bg-white text-black border-white'
                        : 'bg-black/80 border-white/10 text-slate-500 hover:border-bo7-orange hover:text-bo7-orange'
                        }`}
                    >
                      {/* Active Indicator */}
                      {selectedClass === cls && (
                        <div className="absolute top-0 right-0 w-2 h-2 bg-bo7-orange"></div>
                      )}
                      <span className="block skew-x-[12deg] relative z-10">{cls}</span>
                    </button>
                  ))}
                </div>
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
