import { useState, useMemo, useEffect, useCallback } from 'react';
import type { WPMilestone } from '../types';
import { WP_WEAPON_DATA, WP_UNIVERSAL_CAMOS } from '../data/wpIndex';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onNavigateToWeapon?: (weaponName: string) => void;
}

type FilterTier = 'all' | 'prestige1' | 'prestige2' | 'master' | 'max';
type FilterType = 'all' | 'universal' | 'unique';

interface CamoEntry {
    name: string;
    image: string;
    weapon: string;
    milestone: WPMilestone;
    isUniversal: boolean; // true for per-gun camos (P1, P2, Max) - per user request
    isPerGun: boolean;    // true for master camos (100, 150, 200) - per user request
}

const MILESTONE_DISPLAY: Record<WPMilestone, string> = {
    prestige1: 'Prestige 1',
    prestige2: 'Prestige 2',
    master100: 'Master 100',
    master150: 'Master 150',
    master200: 'Master 200',
    master250: 'Master 250'
};

export function WPCamoViewerModal({ isOpen, onClose, onNavigateToWeapon }: Props) {
    const [search, setSearch] = useState('');
    const [filterTier, setFilterTier] = useState<FilterTier>('all');
    const [filterType, setFilterType] = useState<FilterType>('all');

    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, handleEscape]);

    // Build flat list of all camos
    const allCamos = useMemo(() => {
        const camos: CamoEntry[] = [];

        // Add universal camos (master100, 150, 200 - same for all guns, labeled PER GUN per user)
        Object.entries(WP_UNIVERSAL_CAMOS).forEach(([milestone, camo]) => {
            camos.push({
                name: camo.name,
                image: camo.image,
                weapon: 'All Weapons',
                milestone: milestone as WPMilestone,
                isUniversal: false,
                isPerGun: true
            });
        });

        // Add per-weapon camos (P1, P2, Max - unique to each gun, labeled UNIVERSAL per user)
        Object.entries(WP_WEAPON_DATA).forEach(([weaponName, weaponCamos]) => {
            if (!weaponCamos) return;
            Object.entries(weaponCamos).forEach(([milestone, camo]) => {
                if (camo) {
                    camos.push({
                        name: camo.name,
                        image: camo.image,
                        weapon: weaponName,
                        milestone: milestone as WPMilestone,
                        isUniversal: true,
                        isPerGun: false
                    });
                }
            });
        });

        return camos;
    }, []);

    // Filter camos based on search and filters
    const filteredCamos = useMemo(() => {
        return allCamos.filter(camo => {
            // Search filter
            if (search) {
                const searchLower = search.toLowerCase();
                if (!camo.name.toLowerCase().includes(searchLower) &&
                    !camo.weapon.toLowerCase().includes(searchLower)) {
                    return false;
                }
            }

            // Tier filter
            if (filterTier !== 'all') {
                if (filterTier === 'prestige1' && camo.milestone !== 'prestige1') return false;
                if (filterTier === 'prestige2' && camo.milestone !== 'prestige2') return false;
                if (filterTier === 'master' && !['master100', 'master150', 'master200'].includes(camo.milestone)) return false;
                if (filterTier === 'max' && camo.milestone !== 'master250') return false;
            }

            // Type filter (per user: unique = universal, every gun = per gun)
            if (filterType !== 'all') {
                if (filterType === 'universal' && !camo.isUniversal) return false;
                if (filterType === 'unique' && !camo.isPerGun) return false;
            }

            return true;
        });
    }, [allCamos, search, filterTier, filterType]);

    const handleWeaponClick = (weaponName: string) => {
        if (weaponName !== 'All Weapons' && onNavigateToWeapon) {
            onNavigateToWeapon(weaponName);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
                    <h2 className="text-xl font-bold text-white">Prestige Camo Viewer</h2>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Filters */}
                <div className="px-6 py-4 border-b border-neutral-800 space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search camos or weapons..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none"
                        />
                        <svg className="w-5 h-5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Filter Row */}
                    <div className="flex gap-4 flex-wrap">
                        {/* Tier Filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-neutral-400">Tier:</span>
                            <div className="flex gap-1">
                                {(['all', 'prestige1', 'prestige2', 'master', 'max'] as FilterTier[]).map(tier => (
                                    <button
                                        key={tier}
                                        onClick={() => setFilterTier(tier)}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${filterTier === tier
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-neutral-800 text-neutral-400 hover:text-white'
                                            }`}
                                    >
                                        {tier === 'all' ? 'All' : tier === 'prestige1' ? 'P1' : tier === 'prestige2' ? 'P2' : tier === 'master' ? 'Master' : 'Max'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Type Filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-neutral-400">Type:</span>
                            <div className="flex gap-1">
                                {(['all', 'universal', 'unique'] as FilterType[]).map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setFilterType(type)}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${filterType === type
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-neutral-800 text-neutral-400 hover:text-white'
                                            }`}
                                    >
                                        {type === 'all' ? 'All' : type === 'universal' ? 'Universal' : 'Per Gun'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="ml-auto text-sm text-neutral-500">
                            {filteredCamos.length} camos
                        </div>
                    </div>
                </div>

                {/* Camo Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredCamos.map((camo, index) => (
                            <div
                                key={`${camo.weapon}-${camo.milestone}-${index}`}
                                className="bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden hover:border-purple-500 transition-colors"
                            >
                                <div className="aspect-square relative">
                                    <img
                                        src={`${import.meta.env.BASE_URL}camos/wp/${camo.image}`}
                                        alt={camo.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    {camo.isUniversal && (
                                        <div className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                            UNIVERSAL
                                        </div>
                                    )}
                                    {camo.isPerGun && (
                                        <div className="absolute top-2 right-2 bg-neutral-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                            PER GUN
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <div className="font-medium text-white text-sm truncate">{camo.name}</div>
                                    <button
                                        onClick={() => handleWeaponClick(camo.weapon)}
                                        className={`text-xs truncate block w-full text-left ${camo.weapon !== 'All Weapons'
                                            ? 'text-purple-400 hover:text-purple-300 hover:underline cursor-pointer'
                                            : 'text-neutral-400 cursor-default'
                                            }`}
                                    >
                                        {camo.weapon}
                                    </button>
                                    <div className="text-xs text-neutral-500 mt-1">{MILESTONE_DISPLAY[camo.milestone]}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCamos.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
                            <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <p className="text-lg font-medium">No camos found</p>
                            <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
