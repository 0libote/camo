import { useState, type ChangeEvent } from 'react';
import { Header } from './components/Header';
import { WeaponList } from './components/WeaponList';
import { MasterySummary } from './components/MasterySummary';
import { CamoGallery } from './components/CamoGallery';
import { SettingsModal } from './components/SettingsModal';
import { PrestigeView } from './components/PrestigeView';
import { useProgress } from './hooks/useProgress';
import { CAMO_DATA, WEAPON_CLASSES } from './data';
import type { Weapon } from './types';

function App() {
  const {
    progress,
    prestige,
    toggleCamo,
    updatePrestige,
    resetProgress,
    exportProgress,
    importProgress
  } = useProgress();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'classes' | 'all'>('classes');
  const [mainTab, setMainTab] = useState<'camos' | 'prestige'>('camos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>(WEAPON_CLASSES[0]);
  const [displayMode, setDisplayMode] = useState<'fraction' | 'percentage'>('fraction');
  const [uiScale, setUiScale] = useState(1);


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
    <div className="min-h-screen pb-10 overflow-x-hidden">
      <div style={{ transform: `scale(${uiScale})`, transformOrigin: 'top center' }}>
        <div className="max-w-6xl mx-auto">
          <Header
            onOpenGallery={() => setIsGalleryOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          <main className="space-y-12 mt-12 px-4 md:px-0">
            {/* Main Tab Switcher */}
            <div className="flex justify-center border-b border-white/5 mb-12">
              <div className="flex bg-slate-900/20 p-1 border border-slate-800 relative">
                <button
                  onClick={() => setMainTab('camos')}
                  className={`px-10 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative z-10 ${mainTab === 'camos'
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-400'
                    }`}
                >
                  Pattern Tracker
                  {mainTab === 'camos' && (
                    <div className="absolute inset-0 bg-[var(--color-accent)] shadow-[0_0_20px_var(--color-accent)]/20 -z-10"></div>
                  )}
                </button>
                <button
                  onClick={() => setMainTab('prestige')}
                  className={`px-10 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative z-10 ${mainTab === 'prestige'
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-400'
                    }`}
                >
                  Exp Database
                  {mainTab === 'prestige' && (
                    <div className="absolute inset-0 bg-[var(--color-accent)] shadow-[0_0_20px_var(--color-accent)]/20 -z-10"></div>
                  )}
                </button>
              </div>
            </div>

            {mainTab === 'camos' ? (
              <>
                <section className="animate-fade-in">
                  <MasterySummary progress={progress} displayMode={displayMode} />
                </section>

                {/* View Controls */}
                <div className="flex flex-col gap-10 mt-12">
                  {/* Mode Toggle Bar */}
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800/40 pb-6">
                    <div className="flex items-center gap-6">
                      <div className="flex bg-black/40 p-1 border border-slate-800">
                        <button
                          onClick={() => setViewMode('classes')}
                          className={`px-8 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'classes'
                            ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                            : 'text-slate-600 hover:text-slate-400'
                            }`}
                        >
                          Categories
                        </button>
                        <button
                          onClick={() => setViewMode('all')}
                          className={`px-8 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'all'
                            ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                            : 'text-slate-600 hover:text-slate-400'
                            }`}
                        >
                          Complete Grid
                        </button>
                      </div>
                    </div>

                    {viewMode === 'all' && (
                      <div className="w-full md:w-96 relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                          <svg className="w-4 h-4 text-slate-600 group-focus-within:text-[var(--color-accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          placeholder="SEARCH DATABASE // SCANNING..."
                          value={searchQuery}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                          className="w-full bg-slate-900/40 border border-slate-800 pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)]/50 focus:bg-slate-900/60 placeholder:text-slate-700 font-mono text-[10px] uppercase tracking-widest transition-all"
                        />
                      </div>
                    )}
                  </div>

                  {/* Class Selector (Only in Class View) */}
                  {viewMode === 'classes' && (
                    <div className="animate-fade-in">
                      <div className="text-slate-600 text-[9px] font-mono font-black uppercase tracking-[0.4em] mb-4 text-center md:text-left">ARMORY SECTIONS // SELECTION REQUIRED</div>
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {WEAPON_CLASSES.map(cls => (
                          <button
                            key={cls}
                            onClick={() => setSelectedClass(cls)}
                            className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-all relative group overflow-hidden ${selectedClass === cls
                              ? 'bg-white border-white text-black shadow-[0_8px_20px_rgba(255,255,255,0.1)]'
                              : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-600 hover:text-white'
                              }`}
                          >
                            <span className="relative z-10">{cls}</span>
                            {selectedClass !== cls && (
                              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="pb-20 mt-8">
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
                        <div className="text-center py-20 border border-dashed border-slate-700 rounded-lg">
                          <p className="text-slate-500">No matching weapons found</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="mt-8 pb-20">
                <PrestigeView
                  prestige={prestige}
                  onUpdatePrestige={updatePrestige}
                />
              </div>
            )}
          </main>
        </div>
      </div>

      <CamoGallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onExport={exportProgress}
        onImport={handleImportClick}
        onReset={resetProgress}
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        uiScale={uiScale}
        setUiScale={setUiScale}
      />
    </div >
  );
}

export default App;
