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
  const [selectedClass, setSelectedClass] = useState<string>(WEAPON_CLASSES[0]);
  const [displayMode, setDisplayMode] = useState<'fraction' | 'percentage'>('fraction');


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
    <div className="min-h-screen bg-slate-900 text-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        <Header
          onOpenGallery={() => setIsGalleryOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <main className="space-y-12 mt-8">
          <section>
            <MasterySummary progress={progress} displayMode={displayMode} />
          </section>

          {/* View Controls */}
          <div className="flex flex-col gap-6">
            {/* Mode Toggle Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-700 pb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('classes')}
                  className={`px-4 py-2 rounded font-medium transition-colors ${viewMode === 'classes'
                    ? 'bg-slate-200 text-slate-900'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                >
                  Class Loadout
                </button>
                <button
                  onClick={() => setViewMode('all')}
                  className={`px-4 py-2 rounded font-medium transition-colors ${viewMode === 'all'
                    ? 'bg-slate-200 text-slate-900'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                >
                  Database
                </button>
              </div>

              {viewMode === 'all' && (
                <div className="w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search weapons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-slate-200 focus:outline-none focus:border-slate-500 placeholder:text-slate-500"
                  />
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
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors border ${selectedClass === cls
                      ? 'bg-slate-700 border-slate-500 text-white'
                      : 'bg-slate-800 border-transparent text-slate-400 hover:bg-slate-700'
                      }`}
                  >
                    {cls}
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
                  <div className="text-center py-20 border border-dashed border-slate-700 rounded-lg">
                    <p className="text-slate-500">No matching weapons found</p>
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
