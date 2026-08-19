import React from 'react';
import { Lesson } from '../../types';
import { ALL_LESSONS } from '../../data/lessonsData';
import { useLearning } from '../../context/LearningContext';
import { Button } from '../ui/Button';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LessonNavigationProps {
  currentLesson: Lesson;
  onSelectLesson: (lessonId: string) => void;
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({
  currentLesson,
  onSelectLesson
}) => {
  const { completeLesson, isLessonCompleted } = useLearning();
  const completed = isLessonCompleted(currentLesson.id);

  // Find prev & next in same track
  const trackLessons = ALL_LESSONS.filter(l => l.trackId === currentLesson.trackId);
  const currentIndex = trackLessons.findIndex(l => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? trackLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < trackLessons.length - 1 ? trackLessons[currentIndex + 1] : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#121216] border border-[#22222a] mt-8">
      <div>
        {prevLesson ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectLesson(prevLesson.id)}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            <span className="truncate max-w-[140px]">{prevLesson.title}</span>
          </Button>
        ) : <div />}
      </div>

      <Button
        variant={completed ? 'secondary' : 'primary'}
        size="md"
        onClick={() => completeLesson(currentLesson.id)}
        icon={<CheckCircle2 className={`w-4 h-4 ${completed ? 'text-emerald-400' : 'text-black'}`} />}
      >
        {completed ? 'Урок уже завершен (Засчитать повтор)' : 'Завершить урок (+XP)'}
      </Button>

      <div>
        {nextLesson ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectLesson(nextLesson.id)}
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            <span className="truncate max-w-[140px]">{nextLesson.title}</span>
          </Button>
        ) : <div />}
      </div>
    </div>
  );
};
