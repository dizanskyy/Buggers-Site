import React from 'react';
import { Sparkles, CheckCircle2, Zap, Flame, Award, Crown, Car, ShieldCheck, Gamepad2, Server, Layout, Trophy, Lock } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const AchievementsList: React.FC = () => {
  const { achievements, userAchievements } = useLearning();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'CheckCircle2': return CheckCircle2;
      case 'Zap': return Zap;
      case 'Flame': return Flame;
      case 'Award': return Award;
      case 'Crown': return Crown;
      case 'Car': return Car;
      case 'ShieldCheck': return ShieldCheck;
      case 'Gamepad2': return Gamepad2;
      case 'Server': return Server;
      case 'Layout': return Layout;
      case 'Trophy': return Trophy;
      default: return Award;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Достижения и Награды</h3>
          <p className="text-xs text-zinc-400">Открывайте трофеи за решение задач и изучение сложных тем</p>
        </div>
        <Badge variant="outline" className="font-mono">
          {userAchievements.length} / {achievements.length} ОТКРЫТО
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {achievements.map((ach) => {
          const isUnlocked = userAchievements.includes(ach.id);
          const Icon = getIcon(ach.icon);

          return (
            <Card
              key={ach.id}
              className={`p-3.5 border transition-all ${
                isUnlocked
                  ? 'bg-[#15151a] border-zinc-700/80'
                  : 'bg-[#0e0e11] border-[#1f1f26] opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                    isUnlocked
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-600'
                  }`}
                >
                  {isUnlocked ? <Icon className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold truncate ${isUnlocked ? 'text-white' : 'text-zinc-400'}`}>
                      {ach.title}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400">+{ach.xpReward} XP</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                    {ach.description}
                  </p>
                  <div className="text-[10px] text-zinc-500 font-mono mt-2 flex items-center gap-1">
                    <span>Условие:</span>
                    <span className="truncate">{ach.criteriaDescription}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
