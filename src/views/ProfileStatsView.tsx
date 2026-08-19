import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { StatsOverview } from '../components/stats/StatsOverview';
import { SkillRadar } from '../components/stats/SkillRadar';
import { ActivityCalendar } from '../components/stats/ActivityCalendar';
import { AchievementsList } from '../components/stats/AchievementsList';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { User, Mail, Shield, Award, Edit3, Check, Flame, Zap, Bookmark, BookOpen } from 'lucide-react';
import { UserRole } from '../types';

interface ProfileStatsViewProps {
  onOpenWizard?: () => void;
}

export const ProfileStatsView: React.FC<ProfileStatsViewProps> = ({ onOpenWizard }) => {
  const { user, updateProfile } = useAuth();
  const { completedLessonIds, bookmarkedLessonIds, getTrackProgress, tracks } = useLearning();

  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');
  const [role, setRole] = useState<UserRole>(user?.role || 'developer');

  const handleSaveProfile = async () => {
    await updateProfile({ bio, role });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-fade-in">
      {/* Profile Header Banner */}
      <div className="p-6 rounded-2xl bg-[#121216] border border-[#24242c] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-600 flex items-center justify-center font-mono font-black text-2xl text-white shadow-sm">
            {user?.username.substring(0, 2).toUpperCase() || 'CD'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">{user?.username}</h1>
              <Badge variant="outline" className="font-mono text-[10px]">
                LVL {user?.level || 1}
              </Badge>
              {user?.selectedLanguage && (
                <Badge variant="purple" className="font-mono text-[10px]">
                  {user.selectedLanguage.toUpperCase()}
                </Badge>
              )}
            </div>
            <div className="text-xs text-zinc-400 font-mono flex items-center gap-3">
              <span>{user?.email}</span>
              <span>•</span>
              <span className="capitalize">{user?.role}</span>
            </div>
            <p className="text-xs text-zinc-300 max-w-lg mt-1">
              {user?.bio || 'Изучаю программирование и архитектуру в Buggers Academy.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenWizard && (
            <Button variant="secondary" size="sm" onClick={onOpenWizard}>
              Сменить фокус / язык
            </Button>
          )}
          {isEditing ? (
            <Button size="sm" onClick={handleSaveProfile} icon={<Check className="w-4 h-4" />}>
              Сохранить
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} icon={<Edit3 className="w-4 h-4" />}>
              Редактировать
            </Button>
          )}
        </div>
      </div>

      {/* Edit Form if open */}
      {isEditing && (
        <Card className="p-5 bg-[#141419] border-zinc-700 animate-fade-in space-y-4 text-xs">
          <h3 className="font-bold text-white">Редактирование профиля</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 mb-1">Специализация / Роль</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full bg-[#1c1c22] border border-[#2a2a34] rounded-lg px-3 py-2 text-white focus:outline-none"
              >
                <option value="developer">Fullstack Developer</option>
                <option value="architect">System Architect</option>
                <option value="security_specialist">CyberSecurity Engineer</option>
                <option value="gamedev">Game Developer</option>
                <option value="gta_modder">GTA Multiplayer Dev</option>
                <option value="devops">DevOps Engineer</option>
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">О себе (Bio)</label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#1c1c22] border border-[#2a2a34] rounded-lg px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Stats Cards */}
      <StatsOverview />

      {/* Grid: Skill Radar & Activity Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5 bg-[#121216] border-[#22222a] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Радар компетенций
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">6 ключевых областей</span>
          </div>
          <SkillRadar />
        </Card>

        <Card className="p-5 bg-[#121216] border-[#22222a] space-y-4">
          <ActivityCalendar />

          {/* Quick Track Progress Summary */}
          <div className="space-y-2 pt-4 border-t border-[#1f1f26]">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Прогресс по веткам
            </div>
            <div className="space-y-2 text-xs font-mono">
              {tracks.map(t => (
                <div key={t.id} className="flex justify-between items-center text-zinc-400">
                  <span>{t.title}</span>
                  <span className="text-white font-semibold">{getTrackProgress(t.id)}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Achievements Section */}
      <AchievementsList />
    </div>
  );
};
