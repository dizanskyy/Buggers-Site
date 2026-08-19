import React from 'react';
import { useLearning } from '../context/LearningContext';
import { TrackRoadmap } from '../components/tracks/TrackRoadmap';
import { ActiveTab } from '../components/layout/Sidebar';

interface TrackDetailViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenWizard?: () => void;
}

export const TrackDetailView: React.FC<TrackDetailViewProps> = ({ setActiveTab, onOpenWizard }) => {
  const { currentTrack, setCurrentLessonId } = useLearning();

  if (!currentTrack) {
    return (
      <div className="p-12 text-center text-zinc-500 text-xs">
        Ветка обучения не выбрана. Выберите трек в каталоге.
      </div>
    );
  }

  const handleSelectLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setActiveTab('lesson');
  };

  return (
    <TrackRoadmap
      track={currentTrack}
      onSelectLesson={handleSelectLesson}
      onBack={() => setActiveTab('catalog')}
      onOpenWizard={onOpenWizard}
    />
  );
};
