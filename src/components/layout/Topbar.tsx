import React, { useState } from 'react';
import { Search, Flame, Bell, User as UserIcon, Moon, Sun, Check, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { Button } from '../ui/Button';
import { ActiveTab } from './Sidebar';

interface TopbarProps {
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenSearch,
  onOpenAuth,
  setActiveTab
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { notification, clearNotification } = useLearning();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <header className="h-14 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-[#1f1f24] px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Trigger (Ctrl+K) */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1b1b22] border border-[#26262e] text-zinc-400 text-xs transition-all w-64 justify-between group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
            <span>Поиск уроков и тем...</span>
          </div>
          <kbd className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Notification Toast Banner if active */}
      {notification && (
        <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-xs animate-fade-in shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-zinc-200 font-medium">{notification.title}: {notification.message}</span>
          <button onClick={clearNotification} className="text-zinc-500 hover:text-white ml-2 text-xs">✕</button>
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Streak Counter */}
        {user && (
          <div
            onClick={() => setActiveTab('stats')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-300 text-xs font-semibold font-mono cursor-pointer hover:bg-amber-900/40 transition-colors"
            title="Текущая серия дней обучения"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{user.streak} ДНЯ СТРИК</span>
          </div>
        )}

        {/* XP Total */}
        {user && (
          <div
            onClick={() => setActiveTab('stats')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono cursor-pointer hover:bg-zinc-800 transition-colors"
          >
            <span className="text-zinc-500">XP:</span>
            <span className="text-white font-bold">{user.xp}</span>
          </div>
        )}

        {/* Profile / Auth Button */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-zinc-800/60 transition-colors"
            >
              <div className="w-7 h-7 rounded-md bg-white text-black font-bold text-xs flex items-center justify-center font-mono">
                {user.username.substring(0, 2).toUpperCase()}
              </div>
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-[#141418] border border-[#282830] rounded-xl shadow-modal py-2 z-50 animate-scale-in text-xs">
                <div className="px-4 py-2 border-b border-[#24242c]">
                  <div className="font-semibold text-white">{user.username}</div>
                  <div className="text-[11px] text-zinc-400 truncate">{user.email}</div>
                  <div className="mt-1 text-[10px] font-mono text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded inline-block">
                    Уровень {user.level} • {user.role}
                  </div>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveTab('stats');
                      setShowProfileDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  >
                    Статистика и Навыки
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('catalog');
                      setShowProfileDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  >
                    Все ветки обучения
                  </button>
                </div>
                <div className="border-t border-[#24242c] pt-1">
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-950/30"
                    >
                      Выйти из аккаунта
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onOpenAuth();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-zinc-200 hover:bg-zinc-800"
                    >
                      Войти / Зарегистрироваться
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button size="sm" onClick={onOpenAuth}>
            Войти
          </Button>
        )}
      </div>
    </header>
  );
};
