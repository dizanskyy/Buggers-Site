import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { StatsOverview } from '../components/stats/StatsOverview';
import { TrackCard } from '../components/tracks/TrackCard';
import { ActivityCalendar } from '../components/stats/ActivityCalendar';
import { SkillRadar } from '../components/stats/SkillRadar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ActiveTab } from '../components/layout/Sidebar';
import { ArrowRight, BookOpen, Sparkles, Flame, Code2, Compass, Play } from 'lucide-react';

interface DashboardViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenOnboarding?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setActiveTab, onOpenOnboarding }) => {
  const { user } = useAuth();
  const { tracks, currentTrack, currentLesson, setCurrentTrackId, setCurrentLessonId } = useLearning();

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="p-8 rounded-2xl bg-[#121216] border border-[#26262e] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px]">
              BUGGERS ACADEMY
            </Badge>
            <Badge variant="success" className="font-mono text-[10px]">
              ONLINE
            </Badge>
            {user?.selectedLanguage && (
              <Badge variant="purple" className="font-mono text-[10px]">
                ФОКУС: {user.selectedLanguage.toUpperCase()}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            С возвращением, {user?.username || 'Кадет'}!
          </h1>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Погружайтесь в современные технологии: веб-разработка, бэкенд-архитектура, кибербезопасность, движки Unity/UE5 и мультиплеерные сервера GTA V.
          </p>
          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <Button
              size="md"
              onClick={() => setActiveTab('lesson')}
              icon={<Play className="w-4 h-4 fill-black" />}
            >
              Продолжить обучение
            </Button>
            {onOpenOnboarding && (
              <Button
                variant="secondary"
                size="md"
                onClick={onOpenOnboarding}
                icon={<Sparkles className="w-4 h-4 text-amber-400" />}
              >
                Настроить ветку / Язык
              </Button>
            )}
            <Button
              variant="outline"
              size="md"
              onClick={() => setActiveTab('catalog')}
              icon={<Compass className="w-4 h-4" />}
            >
              Каталог веток
            </Button>
          </div>
        </div>

        {/* Current Lesson Fast Resume Card */}
        {currentLesson && (
          <Card className="p-4 bg-[#0a0a0d] border-[#222228] min-w-[280px] max-w-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                Текущий урок
              </span>
              <span className="text-amber-400 font-bold">+{currentLesson.xpReward} XP</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white truncate">{currentLesson.title}</h4>
              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{currentLesson.description}</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-between"
              onClick={() => setActiveTab('lesson')}
              iconRight={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Открыть урок
            </Button>
          </Card>
        )}
      </div>

      {/* Account Stats Grid */}
      <StatsOverview />

      {/* Main Grid: Learning Tracks & Radar / Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Popular Tracks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Compass className="w-4 h-4 text-zinc-400" />
              Ветки обучения (Направления)
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('catalog')}
              iconRight={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Все ветки
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tracks.slice(0, 4).map((track) => (
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
        </div>

        {/* Right Col: Skill Radar & Activity */}
        <div className="space-y-6">
          {/* Radar */}
          <Card className="bg-[#121216] border-[#22222a] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Радар навыков
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">Баланс опыта</span>
            </div>
            <SkillRadar />
          </Card>

          {/* Activity */}
          <Card className="bg-[#121216] border-[#22222a] p-5">
            <ActivityCalendar />
          </Card>
        </div>
      </div>
    </div>
  );
};
