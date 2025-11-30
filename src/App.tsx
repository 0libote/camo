import { useState } from 'react';
import { WEAPON_CLASSES, CAMO_DATA } from './data';
import { useProgress } from './hooks/useProgress';
import { WeaponList } from './components/WeaponList';
import { MasterySummary } from './components/MasterySummary';
import { CamoGallery } from './components/CamoGallery';
import { Header } from './components/Header';

function App() {
  const { progress, toggleCamo } = useProgress();
  const [selectedClass, setSelectedClass] = useState<string>(WEAPON_CLASSES[0]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <CamoGallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />

      <Header onOpenGallery={() => setIsGalleryOpen(true)} />

      <main className="max-w-7xl mx-auto space-y-8">
        {/* Mastery Dashboard */}
        <section className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 text-orange-400">Global Mastery</h2>
          <MasterySummary progress={progress} />
        </section>

        {/* Class Navigation */}
        <nav className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide">
          {WEAPON_CLASSES.map(cls => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${selectedClass === cls
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/50'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
            >
              {cls}
            </button>
          ))}
        </nav>

        {/* Weapon List */}
        <WeaponList
          className={selectedClass}
          weapons={CAMO_DATA.weapons.filter(w => w.class === selectedClass)}
          progress={progress}
          onToggle={toggleCamo}
        />
      </main>


    </div>
  );
}

export default App;
