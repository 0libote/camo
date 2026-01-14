import { useState } from 'react';
import { Header } from './components/Header';
import { WeaponList } from './components/WeaponList';
import { MasterySummary } from './components/MasterySummary';
import { SettingsModal } from './components/SettingsModal';
import { WPWeaponPrestigeView } from './components/WPWeaponPrestigeView';
import { useProgress } from './hooks/useProgress';
import { CAMO_DATA, WEAPON_CLASSES } from './data';
import type { Weapon } from './types';

function App() {
  const {
    progress,
    wpProgress,
    toggleCamo,
    toggleWPMilestone,
    resetProgress,
    exportProgress,
    importProgress
  } = useProgress();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mainTab, setMainTab] = useState<'camos' | 'wp'>('camos');
  const [selectedClass, setSelectedClass] = useState<string>(WEAPON_CLASSES[0]);
  const [displayMode, setDisplayMode] = useState<'fraction' | 'percentage'>('fraction');
  const [uiScale, setUiScale] = useState(1);
  const [scrollToWeapon, setScrollToWeapon] = useState<string | null>(null);


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

  const handleNavigateToWP = (weaponName: string) => {
    const weapon = CAMO_DATA.weapons.find(w => w.name === weaponName);
    if (weapon) {
      setSelectedClass(weapon.class);
      setMainTab('wp');
      setScrollToWeapon(weaponName);
    }
  };

  const handleNavigateToCamos = (weaponName: string) => {
    const weapon = CAMO_DATA.weapons.find(w => w.name === weaponName);
    if (weapon) {
      setSelectedClass(weapon.class);
      setMainTab('camos');
      setScrollToWeapon(weaponName);
    }
  };

  return (
    <div className="min-h-screen pb-10">
      <div style={{ transform: `scale(${uiScale})`, transformOrigin: 'top center' }}>
        <div className="max-w-5xl mx-auto px-4">
          <Header
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
                  onClick={() => setMainTab('wp')}
                  className={`px-6 py-2 text-sm font-medium transition-colors rounded-md ${mainTab === 'wp'
                    ? 'bg-purple-500 text-white'
                    : 'text-neutral-400 hover:text-white'
                    }`}
                >
                  Weapon Prestige
                </button>
              </div>
            </div>

            {mainTab === 'camos' ? (
              <div className="space-y-8 animate-fade-in">
                <MasterySummary progress={progress} displayMode={displayMode} />

                {/* Class Selector */}
                <div className="flex flex-wrap gap-2 py-4 border-b border-neutral-800">
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

                {/* Content */}
                <div className="pb-10">
                  <WeaponList
                    key={selectedClass}
                    className={selectedClass}
                    weapons={CAMO_DATA.weapons.filter((w: Weapon) => w.class === selectedClass)}
                    progress={progress}
                    onToggle={toggleCamo}
                    displayMode={displayMode}
                    onNavigateToWP={handleNavigateToWP}
                    scrollToWeapon={scrollToWeapon === null ? undefined : (mainTab === 'camos' ? scrollToWeapon : undefined)}
                    onScrollComplete={() => setScrollToWeapon(null)}
                  />
                </div>
              </div>
            ) : (
              <div className="animate-fade-in pb-10">
                <WPWeaponPrestigeView
                  displayMode={displayMode}
                  wpProgress={wpProgress}
                  toggleWPMilestone={toggleWPMilestone}
                  onNavigateToCamos={handleNavigateToCamos}
                  scrollToWeapon={scrollToWeapon === null ? undefined : (mainTab === 'wp' ? scrollToWeapon : undefined)}
                  onScrollComplete={() => setScrollToWeapon(null)}
                />
              </div>
            )}
          </main>
        </div>
      </div>


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
