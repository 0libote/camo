import { useState } from 'react';
import { WEAPON_CLASSES, CAMO_DATA } from './data';
import { useProgress } from './hooks/useProgress';
import { WeaponList } from './components/WeaponList';
import { MasterySummary } from './components/MasterySummary';

function App() {
  const { progress, toggleCamo, resetProgress } = useProgress();
  const [selectedClass, setSelectedClass] = useState<string>(WEAPON_CLASSES[0]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-300 bg-clip-text text-transparent">
            BO7 Camo Tracker
          </h1>
          <p className="text-slate-400 mt-2">Track your multiplayer mastery progression</p>
        </div>
        <button
          onClick={resetProgress}
          className="text-xs text-red-500 hover:text-red-400 underline"
        >
          Reset Progress
        </button>
      </header>

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

      <footer className="max-w-7xl mx-auto mt-12 text-center text-slate-600 text-sm">
        <p>BO7 Camo Tracker &copy; 2025</p>
      </footer>
    </div>
  );
}

export default App;
