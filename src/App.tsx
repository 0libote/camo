import { useState } from 'react';
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

          <main className="space-y-12 mt-8">
            {/* Main Tab Switcher */}
            <div className="flex border-b border-slate-800 mb-8">
              <button
                onClick={() => setMainTab('camos')}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${mainTab === 'camos'
                  ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-slate-900/50'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
              >
                Camo Protocol
              </button>
              <button
                onClick={() => setMainTab('prestige')}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${mainTab === 'prestige'
                  ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-slate-900/50'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
              >
                Prestige Protocol
              </button>
            </div>

            {mainTab === 'camos' ? (
              <>
                <section>
                  <MasterySummary progress={progress} displayMode={displayMode} />
                </section>

                {/* View Controls */}
                <div className="flex flex-col gap-8 mt-8">
                  {/* Mode Toggle Bar */}
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-6">
                      {/* ... legacy view controls ... */}
                      <div className="flex bg-slate-900 p-1 border border-slate-800">
                        <button
                          onClick={() => setViewMode('classes')}
                          className={`px-6 py-1.5 text-sm font-bold uppercase tracking-wider transition-all ${viewMode === 'classes'
                            ? 'bg-[var(--color-accent)] text-white shadow-[0_0_15px_rgba(255,107,0,0.3)]'
                            : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                          Class
                        </button>
                        <button
                          onClick={() => setViewMode('all')}
                          className={`px-6 py-1.5 text-sm font-bold uppercase tracking-wider transition-all ${viewMode === 'all'
                            ? 'bg-[var(--color-accent)] text-white shadow-[0_0_15px_rgba(255,92,0,0.3)]'
                            : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                          All Weapons
                        </button>
                      </div>
                    </div>

                    {viewMode === 'all' && (
                      <div className="w-full md:w-80">
                        <input
                          type="text"
                          placeholder="SEARCH DATABASE..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 px-4 py-2 text-slate-200 focus:outline-none focus:border-[var(--color-accent)] placeholder:text-slate-600 font-mono text-sm uppercase"
                        />
                      </div>
                    )}
                  </div>

                  {/* Class Selector (Only in Class View) */}
                  {viewMode === 'classes' && (
                    <div>
                      <div className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-2">Weapon Class Protocol</div>
                      <div className="flex flex-wrap gap-2">
                        {WEAPON_CLASSES.map(cls => (
                          <button
                            key={cls}
                            onClick={() => setSelectedClass(cls)}
                            className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border transition-all ${selectedClass === cls
                              ? 'bg-slate-800 border-[var(--color-accent)] text-[var(--color-accent)]'
                              : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                              }`}
                            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                          >
                            {cls}
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
