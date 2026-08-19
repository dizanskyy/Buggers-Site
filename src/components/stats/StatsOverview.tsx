import React from 'react';
import { Award, Zap, CheckCircle2, Flame, TrendingUp, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { Card } from '../ui/Card';

export const StatsOverview: React.FC = () => {
  const { user } = useAuth();
  const { completedLessonIds, userAchievements } = useLearning();

  const getRankTitle = (level: number) => {
    if (level >= 20) return 'Архитектор Систем (Architect)';
    if (level >= 10) return 'Ведущий Инженер (Tech Lead)';
    if (level >= 5) return 'Старший Разработчик (Senior)';
    if (level >= 2) return 'Разработчик (Middle)';
    return 'Младший Кадет (Junior)';
  };

  const stats = [
    {
      title: 'Опыт (Total XP)',
      value: `${user?.xp || 0}`,
      subtext: `До ${ (user?.level || 1) + 1 } уровня: ${ Math.pow((user?.level || 1), 2) * 100 - (user?.xp || 0) } XP`,
      icon: Zap,
      color: 'text-amber-400'
    },
    {
      title: 'Текущий ранг',
      value: `LVL ${user?.level || 1}`,
      subtext: getRankTitle(user?.level || 1),
      icon: Award,
      color: 'text-white'
    },
    {
      title: 'Пройдено уроков',
      value: `${completedLessonIds.length}`,
      subtext: 'Практические модули',
      icon: CheckCircle2,
      color: 'text-emerald-400'
    },
    {
      title: 'Дней в огне (Стрик)',
      value: `${user?.streak || 1} дн.`,
      subtext: 'Непрерывное обучение',
      icon: Flame,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} className="bg-[#121216] border-[#222228] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-medium">{stat.title}</span>
              <div className="p-2 rounded-lg bg-zinc-800/80 border border-zinc-700/60">
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-white font-mono tracking-tight">{stat.value}</div>
              <div className="text-[11px] text-zinc-400 mt-0.5 truncate">{stat.subtext}</div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
