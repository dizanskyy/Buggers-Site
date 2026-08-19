import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Layers, ArrowRight, X } from 'lucide-react';
import { ALL_LESSONS } from '../../data/lessonsData';
import { TRACKS } from '../../data/tracks';
import { useLearning } from '../../context/LearningContext';
import { ActiveTab } from './Sidebar';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  setActiveTab
}) => {
  const [query, setQuery] = useState('');
  const { setCurrentLessonId, setCurrentTrackId } = useLearning();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredLessons = query.trim() === ''
    ? ALL_LESSONS.slice(0, 6)
    : ALL_LESSONS.filter(l =>
        l.title.toLowerCase().includes(query.toLowerCase()) ||
        l.description.toLowerCase().includes(query.toLowerCase()) ||
        l.trackId.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);

  const filteredTracks = query.trim() === ''
    ? []
    : TRACKS.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.shortDescription.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Palette Box */}
      <div className="relative w-full max-w-xl bg-[#121216] border border-[#2c2c36] rounded-2xl shadow-modal overflow-hidden z-10 animate-scale-in">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#24242c]">
          <Search className="w-4 h-4 text-zinc-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Быстрый поиск по урокам, темам, коду (например: React, SQL, GTA, C#)..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-zinc-500 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-3">
          {filteredTracks.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Ветки обучения
              </div>
              <div className="space-y-1 mt-1">
                {filteredTracks.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCurrentTrackId(t.id);
                      setActiveTab('track-detail');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-800/70 text-left text-xs transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                      <div>
                        <div className="font-semibold text-white">{t.title}</div>
                        <div className="text-zinc-400 text-[11px] truncate max-w-sm">{t.shortDescription}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              {query.trim() === '' ? 'Популярные уроки' : 'Найденные уроки'}
            </div>
            <div className="space-y-1 mt-1">
              {filteredLessons.map(l => (
                <button
                  key={l.id}
                  onClick={() => {
                    setCurrentLessonId(l.id);
                    setActiveTab('lesson');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-800/70 text-left text-xs transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                    <div>
                      <div className="font-semibold text-white flex items-center gap-2">
                        <span>{l.title}</span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase px-1.5 py-0.2 rounded bg-zinc-800/80">
                          {l.trackId}
                        </span>
                      </div>
                      <div className="text-zinc-400 text-[11px] truncate max-w-md">{l.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 font-mono text-[11px]">
                    <span>+{l.xpReward} XP</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:text-white" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#0c0c0f] border-t border-[#202026] text-[11px] text-zinc-500 flex justify-between">
          <span>Навигация клавишами ↑ ↓ для выбора</span>
          <span>ESC для закрытия</span>
        </div>
      </div>
    </div>
  );
};
