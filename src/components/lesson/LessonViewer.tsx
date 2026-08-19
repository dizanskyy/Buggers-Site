import React from 'react';
import { Lesson } from '../../types';
import { Badge } from '../ui/Badge';
import { BookOpen, CheckCircle2, Clock, Zap, Bookmark, Share2 } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

interface LessonViewerProps {
  lesson: Lesson;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({ lesson }) => {
  const { isLessonCompleted, isLessonBookmarked, toggleBookmark } = useLearning();
  const completed = isLessonCompleted(lesson.id);
  const bookmarked = isLessonBookmarked(lesson.id);

  // Render markdown-like simple paragraphs and headers
  const renderTheory = (content: string) => {
    return content.split('\n\n').map((block, idx) => {
      if (block.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base font-bold text-white mt-4 mb-2 tracking-tight">
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-sm font-semibold text-zinc-200 mt-3 mb-1.5">
            {block.replace('#### ', '')}
          </h4>
        );
      }
      if (block.startsWith('```')) {
        const lines = block.split('\n');
        const lang = lines[0].replace('```', '') || 'code';
        const code = lines.slice(1, lines.length - 1).join('\n');

        return (
          <div key={idx} className="my-3 rounded-xl bg-[#09090c] border border-[#22222a] overflow-hidden">
            <div className="px-3.5 py-1.5 bg-[#121217] border-b border-[#202026] text-[10px] font-mono text-zinc-400 uppercase flex justify-between">
              <span>{lang}</span>
              <span>Код</span>
            </div>
            <pre className="p-4 text-xs font-mono text-zinc-200 overflow-x-auto leading-relaxed whitespace-pre">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      return (
        <p key={idx} className="text-xs text-zinc-300 leading-relaxed mb-3">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="p-5 rounded-xl bg-[#121216] border border-[#24242c] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px]">
              {lesson.trackId.toUpperCase()}
            </Badge>
            <Badge variant="default" className="font-mono text-[10px]">
              {lesson.difficulty}
            </Badge>
            {completed && (
              <Badge variant="success" className="font-mono text-[10px]">
                Завершено
              </Badge>
            )}
          </div>

          <button
            onClick={() => toggleBookmark(lesson.id)}
            className={`p-1.5 rounded-lg border transition-colors ${
              bookmarked
                ? 'bg-amber-950/40 border-amber-700/60 text-amber-300'
                : 'bg-[#18181e] border-[#292934] text-zinc-400 hover:text-white'
            }`}
            title="Добавить в закладки"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        <h1 className="text-xl font-bold text-white tracking-tight">{lesson.title}</h1>
        <p className="text-xs text-zinc-400">{lesson.description}</p>

        <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono pt-2 border-t border-[#202026]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{lesson.durationMinutes} минут</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>+{lesson.xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* Theory Content */}
      <div className="p-6 rounded-xl bg-[#121216] border border-[#22222a] text-zinc-300 text-xs">
        {renderTheory(lesson.theoryContent)}
      </div>

      {/* Key Takeaways */}
      {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
        <div className="p-4 rounded-xl bg-[#141419] border border-[#282832] space-y-2">
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Ключевые выводы урока:</span>
          </div>
          <ul className="space-y-1.5 text-xs text-zinc-300 pl-6 list-disc">
            {lesson.keyTakeaways.map((takeaway, tIdx) => (
              <li key={tIdx}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
