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
    <div className="min-h-screen pb-10">
      <div style={{ transform: `scale(${uiScale})`, transformOrigin: 'top center' }}>
        <div className="max-w-5xl mx-auto px-4">
          <Header
            onOpenGallery={() => setIsGalleryOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          <main className="mt-8">
            {/* Main Tab Switcher */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-neutral-900 p-1 rounded-lg">
                <button
                  onClick={() => setMainTab('camos')}
                  className={`px-6 py-2 text-sm font-medium transition-colors rounded-md ${mainTab === 'camos'
                    ? 'bg-blue-500 text-white'
                    : 'text-neutral-400 hover:text-white'
                    }`}
                >
                  Camos
                </button>
                <button
                  onClick={() => setMainTab('prestige')}
                  className={`px-6 py-2 text-sm font-medium transition-colors rounded-md ${mainTab === 'prestige'
                    ? 'bg-blue-500 text-white'
                    : 'text-neutral-400 hover:text-white'
                    }`}
                >
                  Weapon Levels
                </button>
              </div>
            </div>

            {mainTab === 'camos' ? (
              <div className="space-y-8 animate-fade-in">
                <MasterySummary progress={progress} displayMode={displayMode} />

                {/* View Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-neutral-800">
                  <div className="inline-flex bg-neutral-900 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode('classes')}
                      className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-md ${viewMode === 'classes'
                        ? 'bg-neutral-700 text-white'
                        : 'text-neutral-400 hover:text-white'
                        }`}
                    >
                      By Category
                    </button>
                    <button
                      onClick={() => setViewMode('all')}
                      className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-md ${viewMode === 'all'
                        ? 'bg-neutral-700 text-white'
                        : 'text-neutral-400 hover:text-white'
                        }`}
                    >
                      All Weapons
                    </button>
                  </div>

                  {viewMode === 'all' && (
                    <div className="w-full sm:w-64 relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search weapons..."
                        value={searchQuery}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Class Selector */}
                {viewMode === 'classes' && (
                  <div className="flex flex-wrap gap-2">
                    {WEAPON_CLASSES.map(cls => (
                      <button
                        key={cls}
                        onClick={() => setSelectedClass(cls)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${selectedClass === cls
                          ? 'bg-blue-500 text-white'
                          : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                          }`}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="pb-10">
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
                    <div>
                      {filteredWeapons.length > 0 ? (
                        <WeaponList
                          className={`${filteredWeapons.length} weapons found`}
                          weapons={filteredWeapons}
                          progress={progress}
                          onToggle={toggleCamo}
                          displayMode={displayMode}
                        />
                      ) : (
                        <div className="text-center py-12 text-neutral-500">
                          No weapons found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="animate-fade-in pb-10">
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
    </div>
  );
}

export default App;
