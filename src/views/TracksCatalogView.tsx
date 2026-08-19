import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { TrackCard } from '../components/tracks/TrackCard';
import { TrackCategory } from '../types';
import { Search, Compass, Filter } from 'lucide-react';
import { ActiveTab } from '../components/layout/Sidebar';

interface TracksCatalogViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const TracksCatalogView: React.FC<TracksCatalogViewProps> = ({ setActiveTab }) => {
  const { tracks, setCurrentTrackId } = useLearning();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Все направления' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & SQL' },
    { id: 'cybersecurity', label: 'Кибербезопасность' },
    { id: 'gamedev', label: 'GameDev' },
    { id: 'gta-mp', label: 'GTA Multiplayer' },
    { id: 'devops', label: 'DevOps' },
  ];

  const filteredTracks = tracks.filter((t) => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.skillsGained.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Каталог образовательных программ</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Ветки изучения и специализации
        </h1>
        <p className="text-xs text-zinc-400">
          Выберите трек, чтобы освоить глубокую теорию, решить практические задачи и построить реальные проекты.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#121216] border border-[#24242c]">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по технологиям..."
            className="w-full bg-[#16161c] border border-[#272730] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            onSelect={() => {
              setCurrentTrackId(track.id);
              setActiveTab('track-detail');
            }}
          />
        ))}
      </div>

      {filteredTracks.length === 0 && (
        <div className="p-12 text-center text-zinc-500 text-xs rounded-xl bg-[#121216] border border-[#22222a]">
          По вашему запросу ничего не найдено. Попробуйте сбросить фильтры.
        </div>
      )}
    </div>
  );
};
