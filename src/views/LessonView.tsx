import React from 'react';
import { useLearning } from '../context/LearningContext';
import { LessonViewer } from '../components/lesson/LessonViewer';
import { CodeSandbox } from '../components/lesson/CodeSandbox';
import { QuizComponent } from '../components/lesson/QuizComponent';
import { LessonNavigation } from '../components/lesson/LessonNavigation';
import { Button } from '../components/ui/Button';
import { ActiveTab } from '../components/layout/Sidebar';
import { ArrowLeft, BookOpen, Layers } from 'lucide-react';

interface LessonViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ setActiveTab }) => {
  const { currentLesson, currentTrack, completeLesson, setCurrentLessonId } = useLearning();

  if (!currentLesson) {
    return (
      <div className="p-12 text-center text-zinc-500 text-xs">
        Урок не выбран. Перейдите в каталог и выберите ветку обучения.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-16 animate-fade-in space-y-6">
      {/* Top breadcrumb & return to roadmap */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveTab('track-detail')}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Вернуться к роадмапу {currentTrack?.title}
        </Button>

        <span className="text-xs font-mono text-zinc-500">
          Модуль: {currentLesson.moduleId}
        </span>
      </div>

      {/* Main Theory */}
      <LessonViewer lesson={currentLesson} />

      {/* Interactive Code Task / Sandbox if available */}
      {currentLesson.codeTask && (
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>Практическое задание к уроку</span>
          </h3>
          <CodeSandbox
            codeTask={currentLesson.codeTask}
            onSuccess={(code) => completeLesson(currentLesson.id, 100, code)}
          />
        </div>
      )}

      {/* Quiz if available */}
      {currentLesson.quizQuestions && currentLesson.quizQuestions.length > 0 && (
        <div className="space-y-2">
          <QuizComponent
            questions={currentLesson.quizQuestions}
            onComplete={() => completeLesson(currentLesson.id, 100)}
          />
        </div>
      )}

      {/* Bottom Lesson Navigation */}
      <LessonNavigation
        currentLesson={currentLesson}
        onSelectLesson={(lessonId) => setCurrentLessonId(lessonId)}
      />
    </div>
  );
};
