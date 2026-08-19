import React from 'react';
import { Flame } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ActivityCalendar: React.FC = () => {
  const { user } = useAuth();

  // Generate 12 weeks of dates (84 days)
  const days: { date: string; level: number; dayOfWeek: number }[] = [];
  const today = new Date();

  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Simulate activity levels: 0 (empty), 1, 2, 3
    // Give recent days activity based on user streak
    let level = 0;
    if (i < (user?.streak || 3) * 2) {
      level = (i % 3) + 1;
    } else if (i % 7 === 1 || i % 5 === 2) {
      level = 1;
    }

    days.push({
      date: dateStr,
      level,
      dayOfWeek: d.getDay()
    });
  }

  const getColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-[#18181d] border-[#222228]';
      case 1: return 'bg-zinc-700 border-zinc-600';
      case 2: return 'bg-zinc-400 border-zinc-300';
      case 3: return 'bg-white border-white';
      default: return 'bg-[#18181d]';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold text-zinc-300">Календарь активности и решения задач</div>
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Текущий стрик: <strong className="text-white">{user?.streak || 1} дней</strong></span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#141418] border border-[#22222a] overflow-x-auto">
        <div className="flex gap-1.5 min-w-[500px]">
          {Array.from({ length: 12 }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1.5">
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const day = days[weekIdx * 7 + dayIdx];
                if (!day) return null;
                return (
                  <div
                    key={day.date}
                    className={`w-3.5 h-3.5 rounded-sm border ${getColor(day.level)} transition-all hover:scale-125 cursor-pointer`}
                    title={`${day.date}: ${day.level > 0 ? `${day.level * 2} активности` : 'Нет активности'}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono mt-3">
          <span>84 дня назад</span>
          <div className="flex items-center gap-1">
            <span>Меньше</span>
            <div className="w-2.5 h-2.5 rounded-sm bg-[#18181d] border border-[#222228]" />
            <div className="w-2.5 h-2.5 rounded-sm bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-sm bg-zinc-400" />
            <div className="w-2.5 h-2.5 rounded-sm bg-white" />
            <span>Больше</span>
          </div>
          <span>Сегодня</span>
        </div>
      </div>
    </div>
  );
};
