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
            <div className="flex justify-center border-b border-slate-800 mb-12">
              <div className="flex bg-slate-900 p-1 border border-slate-800 rounded-lg">
                <button
                  onClick={() => setMainTab('camos')}
                  className={`px-8 py-2 text-sm font-semibold transition-all rounded-md ${mainTab === 'camos'
                    ? 'bg-cyan-500 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  Camo Progress
                </button>
                <button
                  onClick={() => setMainTab('prestige')}
                  className={`px-8 py-2 text-sm font-semibold transition-all rounded-md ${mainTab === 'prestige'
                    ? 'bg-cyan-500 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  Weapon Levels
                </button>
              </div>
            </div>

            {mainTab === 'camos' ? (
              <>
                <section className="animate-fade-in">
                  <MasterySummary progress={progress} displayMode={displayMode} />
                </section>

                {/* View Controls */}
                <div className="flex flex-col gap-8 mt-12">
                  {/* Mode Toggle Bar */}
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800 pb-8">
                    <div className="flex items-center gap-4">
                      <div className="flex bg-slate-900 p-1 border border-slate-800 rounded-lg">
                        <button
                          onClick={() => setViewMode('classes')}
                          className={`px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-md ${viewMode === 'classes'
                            ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                            : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                          Categories
                        </button>
                        <button
                          onClick={() => setViewMode('all')}
                          className={`px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-md ${viewMode === 'all'
                            ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                            : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                          All Weapons
                        </button>
                      </div>
                    </div>

                    {viewMode === 'all' && (
                      <div className="w-full md:w-80 relative group">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          placeholder="Search weapons..."
                          value={searchQuery}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 rounded-lg transition-all"
                        />
                      </div>
                    )}
                  </div>

                  {/* Class Selector (Only in Class View) */}
                  {viewMode === 'classes' && (
                    <div className="animate-fade-in">
                      <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-4">Weapon Categories</div>
                      <div className="flex flex-wrap gap-2">
                        {WEAPON_CLASSES.map(cls => (
                          <button
                            key={cls}
                            onClick={() => setSelectedClass(cls)}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wide border rounded-md transition-all ${selectedClass === cls
                              ? 'bg-white border-white text-slate-950'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                              }`}
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
