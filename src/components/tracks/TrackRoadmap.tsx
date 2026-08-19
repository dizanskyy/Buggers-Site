import React, { useState } from 'react';
import { Track, LanguageOption } from '../../types';
import { ModuleAccordion } from './ModuleAccordion';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { useLearning } from '../../context/LearningContext';
import { Layers, CheckCircle2, Clock, BookOpen, ArrowLeft, Trophy, SlidersHorizontal, Sparkles, Filter } from 'lucide-react';
import { Button } from '../ui/Button';

interface TrackRoadmapProps {
  track: Track;
  onSelectLesson: (lessonId: string) => void;
  onBack: () => void;
  onOpenWizard?: () => void;
}

export const TrackRoadmap: React.FC<TrackRoadmapProps> = ({
  track,
  onSelectLesson,
  onBack,
  onOpenWizard
}) => {
  const { getTrackProgress } = useLearning();
  const [activeLanguageFilter, setActiveLanguageFilter] = useState<string>('all');
  const progress = getTrackProgress(track.id);

  const totalLessons = track.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  // Filter modules/lessons if language filter active
  const filteredModules = track.modules.map(module => {
    if (activeLanguageFilter === 'all') return module;
    const matchingLessons = module.lessons.filter(l => {
      const q = activeLanguageFilter.toLowerCase();
      return (
        (l.primaryLanguage && l.primaryLanguage.toLowerCase().includes(q)) ||
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        (l.codeTask?.language && l.codeTask.language.toLowerCase().includes(q))
      );
    });
    return {
      ...module,
      lessons: matchingLessons
    };
  }).filter(m => m.lessons.length > 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-fade-in">
      {/* Back button & Header Banner */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />} onClick={onBack}>
            Назад ко всем веткам
          </Button>

          {onOpenWizard && (
            <Button variant="outline" size="sm" icon={<SlidersHorizontal className="w-3.5 h-3.5" />} onClick={onOpenWizard}>
              Сменить формат / язык
            </Button>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-[#121216] border border-[#26262e] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-[10px]">
                  {track.category.toUpperCase()}
                </Badge>
                <Badge variant="default" className="font-mono text-[10px]">
                  {track.level}
                </Badge>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">{track.title}</h1>
              <p className="text-xs text-zinc-300 leading-relaxed">{track.fullDescription}</p>

              {/* Skills badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {track.skillsGained.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1a1a20] border border-[#2c2c36] text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Progress Box */}
            <div className="p-4 rounded-xl bg-[#0c0c0f] border border-[#202026] min-w-[220px] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Освоение трека:</span>
                <span className="text-white font-bold">{progress}%</span>
              </div>
              <ProgressBar progress={progress} size="md" />
              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono pt-1">
                <span>{totalLessons} уроков</span>
                <span>~{track.estimatedHours} часов</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language / Stack Fast Selector Filter */}
      {track.availableLanguages && track.availableLanguages.length > 0 && (
        <div className="p-3 bg-[#131317] border border-[#22222a] rounded-xl flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <Filter className="w-3.5 h-3.5 text-zinc-500" />
            <span>Режим просмотра:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveLanguageFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeLanguageFilter === 'all'
                  ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Полный роадмап (Все темы)
            </button>

            {track.availableLanguages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setActiveLanguageFilter(lang.name.split(' ')[0])}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeLanguageFilter.toLowerCase() === lang.name.split(' ')[0].toLowerCase()
                    ? 'bg-zinc-800 text-white font-bold border border-zinc-600'
                    : 'text-zinc-400 hover:text-white bg-[#18181d] border border-[#26262e]'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modules Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {activeLanguageFilter === 'all' ? 'Все модули программы' : `Уроки по направлению: ${activeLanguageFilter}`}
          </h3>
          <span className="text-xs font-mono text-zinc-500">
            {filteredModules.length} модулей доступно
          </span>
        </div>

        {filteredModules.length > 0 ? (
          <div className="space-y-3">
            {filteredModules.map((module) => (
              <ModuleAccordion
                key={module.id}
                module={module}
                onSelectLesson={onSelectLesson}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#121216] border border-[#22222a] rounded-xl text-zinc-400 text-xs">
            Нет отдельных уроков по выбранному фильтру. Переключитесь на «Полный роадмап».
          </div>
        )}
      </div>
    </div>
  );
};
