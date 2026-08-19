import React, { useState } from 'react';
import { Module, Lesson } from '../../types';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Clock, Code, HelpCircle, ArrowRight } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

interface ModuleAccordionProps {
  module: Module;
  onSelectLesson: (lessonId: string) => void;
  defaultExpanded?: boolean;
}

export const ModuleAccordion: React.FC<ModuleAccordionProps> = ({
  module,
  onSelectLesson,
  defaultExpanded = true
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { isLessonCompleted, currentLesson } = useLearning();

  const completedCount = module.lessons.filter(l => isLessonCompleted(l.id)).length;
  const isAllCompleted = completedCount === module.lessons.length && module.lessons.length > 0;

  const getTypeIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'interactive_code': return Code;
      case 'quiz': return HelpCircle;
      default: return Code;
    }
  };

  return (
    <div className="border border-[#22222a] rounded-xl bg-[#121216] overflow-hidden transition-all">
      {/* Module Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-[#16161b] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
              isAllCompleted
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
            }`}
          >
            {isAllCompleted ? <CheckCircle2 className="w-4 h-4" /> : module.order}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              {module.title}
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">{module.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs font-mono text-zinc-400">
            <span className="text-white font-semibold">{completedCount}</span> / {module.lessons.length} уроков
          </div>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          )}
        </div>
      </button>

      {/* Lessons List */}
      {isExpanded && (
        <div className="border-t border-[#202026] divide-y divide-[#1c1c22]">
          {module.lessons.map((lesson) => {
            const completed = isLessonCompleted(lesson.id);
            const isCurrent = currentLesson?.id === lesson.id;
            const TypeIcon = getTypeIcon(lesson.type);

            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`p-3.5 px-5 flex items-center justify-between cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-[#1a1a22] border-l-2 border-l-white'
                    : 'hover:bg-[#15151a]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium truncate ${completed ? 'text-zinc-300' : 'text-white'}`}>
                        {lesson.title}
                      </span>
                      {isCurrent && (
                        <span className="text-[9px] font-mono uppercase bg-white text-black px-1.5 py-0.2 rounded font-bold">
                          Текущий
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-mono mt-0.5">
                      <span className="flex items-center gap-1">
                        <TypeIcon className="w-3 h-3 text-zinc-500" />
                        {lesson.type === 'interactive_code' ? 'Практика с кодом' : 'Тест / Квиз'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        {lesson.durationMinutes} мин
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs font-mono text-zinc-400 font-semibold">
                    +{lesson.xpReward} XP
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
