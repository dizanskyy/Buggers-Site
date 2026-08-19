import React from 'react';
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Code2,
  BarChart3,
  Trophy,
  ShieldCheck,
  Server,
  Gamepad2,
  Car,
  Cpu,
  Layers,
  ChevronRight,
  Flame
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { ProgressBar } from '../ui/ProgressBar';

export type ActiveTab = 'dashboard' | 'catalog' | 'track-detail' | 'lesson' | 'sandbox' | 'stats' | 'leaderboard';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAuth: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth
}) => {
  const { user, isAuthenticated } = useAuth();
  const { tracks, currentTrack, setCurrentTrackId, getTrackProgress } = useLearning();

  const navItems = [
    { id: 'dashboard', label: 'Главная', icon: LayoutDashboard },
    { id: 'catalog', label: 'Ветки и Каталог', icon: Compass },
    { id: 'lesson', label: 'Текущий урок', icon: BookOpen },
    { id: 'sandbox', label: 'Песочница кода', icon: Code2 },
    { id: 'stats', label: 'Статистика аккаунта', icon: BarChart3 },
    { id: 'leaderboard', label: 'Рейтинг разработчиков', icon: Trophy },
  ];

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return Layers;
      case 'Server': return Server;
      case 'ShieldCheck': return ShieldCheck;
      case 'Gamepad2': return Gamepad2;
      case 'Car': return Car;
      case 'Cpu': return Cpu;
      default: return Layers;
    }
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0e0e11] border-r border-[#222227] flex flex-col justify-between h-screen select-none z-20">
      {/* Brand & Logo */}
      <div className="p-4 px-5 border-b border-[#1f1f24] flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
          <div className="w-8 h-8 rounded-lg bg-[#15151a] border border-[#282832] group-hover:border-zinc-500 flex items-center justify-center text-zinc-300 transition-all duration-200 shadow-sm">
            <Code2 className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              <span>BUGGERS</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1c1c24] border border-[#2c2c36] text-zinc-400 font-mono font-normal">
                ACADEMY
              </span>
            </div>
            <div className="text-[10px] text-zinc-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
              <span>Платформа обучения</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
            Навигация
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-[#18181d]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tracks List */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center justify-between">
            <span>Ветки обучения</span>
            <span className="text-[10px] text-zinc-600 font-mono">{tracks.length}</span>
          </div>
          <div className="space-y-1">
            {tracks.map((track) => {
              const Icon = getTrackIcon(track.icon);
              const isSelected = currentTrack?.id === track.id;
              const progress = getTrackProgress(track.id);

              return (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrackId(track.id);
                    setActiveTab('track-detail');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all text-xs group ${
                    isSelected
                      ? 'bg-[#18181f] border border-[#2f2f38] text-white'
                      : 'text-zinc-400 hover:bg-[#141418] hover:text-zinc-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 font-medium truncate">
                      <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-white' : 'text-zinc-500'}`} />
                      <span className="truncate">{track.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 ml-1">{progress}%</span>
                  </div>
                  <div className="w-full bg-zinc-800/80 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-zinc-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Profile Mini-Card */}
      <div className="p-3 border-t border-[#1f1f24] bg-[#0c0c0f]">
        {user ? (
          <div
            onClick={() => setActiveTab('stats')}
            className="flex items-center gap-3 p-2 rounded-xl bg-[#141418] hover:bg-[#1c1c22] border border-[#23232a] cursor-pointer transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono font-bold text-xs text-white">
              {user.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white truncate">{user.username}</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-1.5 py-0.2 rounded">
                  LVL {user.level}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono mt-0.5">
                <span>{user.xp} XP</span>
                <span>•</span>
                <span className="flex items-center text-amber-400 font-semibold">
                  <Flame className="w-3 h-3 mr-0.5 fill-amber-400" />
                  {user.streak}д
                </span>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full py-2 bg-white text-black font-semibold text-xs rounded-lg hover:bg-zinc-200 transition-colors shadow-sm"
          >
            Войти в аккаунт
          </button>
        )}
      </div>
    </aside>
  );
};
