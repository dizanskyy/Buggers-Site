import React, { useState } from 'react';
import { Trophy, Medal, Crown, Flame, Award, Zap, Shield, Search } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';

interface LeaderEntry {
  rank: number;
  username: string;
  role: string;
  xp: number;
  level: number;
  streak: number;
  completedLessons: number;
}

export const LeaderboardView: React.FC = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  // Sample rich leaderboard
  const leaders: LeaderEntry[] = [
    { rank: 1, username: 'neo_matrix', role: 'CyberSecurity Lead', xp: 14850, level: 12, streak: 42, completedLessons: 68 },
    { rank: 2, username: 'rage_master', role: 'GTA MP Dev', xp: 12400, level: 11, streak: 28, completedLessons: 55 },
    { rank: 3, username: 'vlad_architect', role: 'System Architect', xp: 11200, level: 10, streak: 31, completedLessons: 49 },
    { rank: 4, username: 'elena_front', role: 'React Core Dev', xp: 9800, level: 9, streak: 19, completedLessons: 44 },
    { rank: 5, username: 'unreal_god', role: 'GameDev Specialist', xp: 8750, level: 9, streak: 15, completedLessons: 39 },
    { rank: 6, username: user?.username || 'Cadet_Developer', role: user?.role || 'developer', xp: user?.xp || 350, level: user?.level || 2, streak: user?.streak || 3, completedLessons: 6 },
    { rank: 7, username: 'docker_samurai', role: 'DevOps Engineer', xp: 7400, level: 8, streak: 14, completedLessons: 32 },
    { rank: 8, username: 'go_concurrency', role: 'Backend Dev', xp: 6200, level: 7, streak: 9, completedLessons: 28 },
    { rank: 9, username: 'altv_creator', role: 'GTA MP Dev', xp: 5100, level: 7, streak: 8, completedLessons: 24 },
    { rank: 10, username: 'pwn_junior', role: 'AppSec Cadet', xp: 4300, level: 6, streak: 12, completedLessons: 21 },
  ].sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));

  const filteredLeaders = leaders.filter(l =>
    l.username.toLowerCase().includes(search.toLowerCase()) ||
    l.role.toLowerCase().includes(search.toLowerCase())
  );

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/60 text-amber-300 flex items-center justify-center font-bold text-xs">
            <Crown className="w-4 h-4 fill-amber-400" />
          </div>
        );
      case 2:
        return (
          <div className="w-7 h-7 rounded-lg bg-zinc-400/20 border border-zinc-400/60 text-zinc-200 flex items-center justify-center font-bold text-xs">
            2
          </div>
        );
      case 3:
        return (
          <div className="w-7 h-7 rounded-lg bg-amber-800/20 border border-amber-800/60 text-amber-600 flex items-center justify-center font-bold text-xs">
            3
          </div>
        );
      default:
        return (
          <div className="w-7 h-7 rounded-lg bg-zinc-800/60 text-zinc-400 flex items-center justify-center font-mono text-xs">
            {rank}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Глобальный рейтинг студентов</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Таблица лидеров Buggers Academy
        </h1>
        <p className="text-xs text-zinc-400">
          Студенты с наибольшим количеством набранного опыта (XP), завершенных уроков и серий обучения.
        </p>
      </div>

      {/* Search Input */}
      <div className="p-3 bg-[#121216] border border-[#22222a] rounded-xl flex items-center gap-3">
        <Search className="w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по имени или роли..."
          className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
        />
      </div>

      {/* Leaders Table */}
      <div className="border border-[#22222a] rounded-2xl bg-[#121216] overflow-hidden">
        <div className="p-3 px-5 bg-[#16161b] border-b border-[#202026] text-[11px] font-mono text-zinc-400 uppercase tracking-wider grid grid-cols-12 gap-2">
          <span className="col-span-1">Ранг</span>
          <span className="col-span-5">Разработчик</span>
          <span className="col-span-2 text-center">Уровень</span>
          <span className="col-span-2 text-center">Стрик</span>
          <span className="col-span-2 text-right">Опыт (XP)</span>
        </div>

        <div className="divide-y divide-[#1c1c22] text-xs font-mono">
          {filteredLeaders.map((leader) => {
            const isMe = leader.username === user?.username;

            return (
              <div
                key={leader.rank}
                className={`p-4 px-5 grid grid-cols-12 gap-2 items-center transition-colors ${
                  isMe
                    ? 'bg-zinc-800/40 border-l-2 border-l-white'
                    : 'hover:bg-[#15151a]'
                }`}
              >
                <div className="col-span-1 flex items-center">
                  {getRankBadge(leader.rank)}
                </div>

                <div className="col-span-5 flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-white text-xs">
                    {leader.username.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-white flex items-center gap-2 truncate">
                      <span>{leader.username}</span>
                      {isMe && (
                        <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-white text-black font-bold">
                          Вы
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-400 truncate">{leader.role}</div>
                  </div>
                </div>

                <div className="col-span-2 text-center text-zinc-300">
                  LVL {leader.level}
                </div>

                <div className="col-span-2 text-center text-amber-400 flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{leader.streak}д</span>
                </div>

                <div className="col-span-2 text-right font-bold text-white">
                  {leader.xp} XP
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
