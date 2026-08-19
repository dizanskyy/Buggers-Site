import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lesson, Track, Achievement } from '../types';
import { ALL_LESSONS } from '../data/lessonsData';
import { TRACKS, getTrackWithModules } from '../data/tracks';
import { ALL_ACHIEVEMENTS } from '../data/achievements';
import { useAuth } from './AuthContext';

interface LearningContextType {
  tracks: Track[];
  currentTrack: Track | null;
  currentLesson: Lesson | null;
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  achievements: Achievement[];
  userAchievements: string[];
  recentActivity: { date: string; count: number; xp: number }[];
  setCurrentTrackId: (trackId: string) => void;
  setCurrentLessonId: (lessonId: string) => void;
  completeLesson: (lessonId: string, score?: number, codeSubmission?: string) => Promise<{ success: boolean; earnedXp: number }>;
  toggleBookmark: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isLessonBookmarked: (lessonId: string) => boolean;
  getTrackProgress: (trackId: string) => number;
  getSkillLevel: (trackId: string) => number;
  notification: { title: string; message: string; type: 'success' | 'info' | 'achievement' } | null;
  clearNotification: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token, updateProfile } = useAuth();
  const [currentTrackId, setCurrentTrackIdState] = useState<string>('frontend');
  const [currentLessonId, setCurrentLessonIdState] = useState<string>('fe-01');
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [bookmarkedLessonIds, setBookmarkedLessonIds] = useState<string[]>([]);
  const [userAchievements, setUserAchievements] = useState<string[]>(['welcome_onboard']);
  const [notification, setNotification] = useState<{ title: string; message: string; type: 'success' | 'info' | 'achievement' } | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const savedCompleted = localStorage.getItem('academy_completed');
    if (savedCompleted) {
      try {
        setCompletedLessonIds(JSON.parse(savedCompleted));
      } catch {}
    } else {
      // Default initial completed lessons for demo immersion
      const initial = ['fe-01'];
      setCompletedLessonIds(initial);
      localStorage.setItem('academy_completed', JSON.stringify(initial));
    }

    const savedBookmarks = localStorage.getItem('academy_bookmarks');
    if (savedBookmarks) {
      try { setBookmarkedLessonIds(JSON.parse(savedBookmarks)); } catch {}
    }

    const savedAchievements = localStorage.getItem('academy_achievements');
    if (savedAchievements) {
      try { setUserAchievements(JSON.parse(savedAchievements)); } catch {}
    }
  }, []);

  const currentTrack = getTrackWithModules(currentTrackId) || null;
  const currentLesson = ALL_LESSONS.find(l => l.id === currentLessonId) || null;

  const setCurrentTrackId = (trackId: string) => {
    setCurrentTrackIdState(trackId);
    const firstLesson = ALL_LESSONS.find(l => l.trackId === trackId);
    if (firstLesson) {
      setCurrentLessonIdState(firstLesson.id);
    }
  };

  const setCurrentLessonId = (lessonId: string) => {
    setCurrentLessonIdState(lessonId);
    const lesson = ALL_LESSONS.find(l => l.id === lessonId);
    if (lesson) {
      setCurrentTrackIdState(lesson.trackId);
    }
  };

  const completeLesson = async (lessonId: string, score = 100, codeSubmission = '') => {
    const lesson = ALL_LESSONS.find(l => l.id === lessonId);
    const earnedXp = lesson ? lesson.xpReward : 50;

    const isFirstTime = !completedLessonIds.includes(lessonId);
    const nextCompleted = isFirstTime ? [...completedLessonIds, lessonId] : completedLessonIds;

    setCompletedLessonIds(nextCompleted);
    localStorage.setItem('academy_completed', JSON.stringify(nextCompleted));

    // Update user XP & Level
    if (user) {
      const newXp = user.xp + (isFirstTime ? earnedXp : 15);
      const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
      updateProfile({ xp: newXp, level: newLevel });
    }

    // Check achievement unlocks
    checkAchievements(nextCompleted.length, lesson?.trackId);

    // Show celebratory banner
    setNotification({
      title: isFirstTime ? 'Урок завершен!' : 'Урок повторен!',
      message: `Вы получили +${isFirstTime ? earnedXp : 15} XP и закрепили навык.`,
      type: 'success'
    });

    if (token) {
      try {
        await fetch('/api/progress/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            lessonId,
            trackId: lesson?.trackId || currentTrackId,
            xpBonus: earnedXp,
            codeSubmission
          })
        });
      } catch (err) {
        console.error('Failed to sync lesson progress to server:', err);
      }
    }

    return { success: true, earnedXp };
  };

  const checkAchievements = (totalCount: number, trackId?: string) => {
    const newAchs = [...userAchievements];
    const trigger = (achId: string, title: string) => {
      if (!newAchs.includes(achId)) {
        newAchs.push(achId);
        setNotification({
          title: '🏆 Новое Достижение!',
          message: title,
          type: 'achievement'
        });
      }
    };

    if (totalCount >= 1) trigger('first_step', 'Код скомпилирован — Завершен 1 урок');
    if (totalCount >= 5) trigger('quick_learner', 'Быстрый старт — Пройдено 5 уроков');
    if (totalCount >= 15) trigger('code_addict', 'Марафонец кода — Пройдено 15 уроков');
    if (trackId === 'gta-mp') trigger('gta_modder', 'GTA Multiplayer Dev');
    if (trackId === 'cybersecurity') trigger('cyber_ninja', 'Этичный хакер');
    if (trackId === 'gamedev') trigger('game_architect', 'Архитектор миров');
    if (trackId === 'backend') trigger('backend_sorcerer', 'Повелитель серверов');
    if (trackId === 'frontend') trigger('frontend_wizard', 'UI Архитектор');

    setUserAchievements(newAchs);
    localStorage.setItem('academy_achievements', JSON.stringify(newAchs));
  };

  const toggleBookmark = (lessonId: string) => {
    const next = bookmarkedLessonIds.includes(lessonId)
      ? bookmarkedLessonIds.filter(id => id !== lessonId)
      : [...bookmarkedLessonIds, lessonId];

    setBookmarkedLessonIds(next);
    localStorage.setItem('academy_bookmarks', JSON.stringify(next));
  };

  const isLessonCompleted = (lessonId: string) => completedLessonIds.includes(lessonId);
  const isLessonBookmarked = (lessonId: string) => bookmarkedLessonIds.includes(lessonId);

  const getTrackProgress = (trackId: string) => {
    const trackLessons = ALL_LESSONS.filter(l => l.trackId === trackId);
    if (trackLessons.length === 0) return 0;
    const completed = trackLessons.filter(l => completedLessonIds.includes(l.id)).length;
    return Math.round((completed / trackLessons.length) * 100);
  };

  const getSkillLevel = (trackId: string) => {
    const trackLessons = ALL_LESSONS.filter(l => l.trackId === trackId);
    const completed = trackLessons.filter(l => completedLessonIds.includes(l.id)).length;
    return Math.min(100, Math.round((completed / Math.max(1, trackLessons.length)) * 100));
  };

  const clearNotification = () => setNotification(null);

  return (
    <LearningContext.Provider value={{
      tracks: TRACKS,
      currentTrack,
      currentLesson,
      completedLessonIds,
      bookmarkedLessonIds,
      achievements: ALL_ACHIEVEMENTS,
      userAchievements,
      recentActivity: [
        { date: '2026-08-15', count: 2, xp: 120 },
        { date: '2026-08-16', count: 4, xp: 260 },
        { date: '2026-08-17', count: 1, xp: 75 },
        { date: '2026-08-18', count: 3, xp: 190 },
        { date: '2026-08-19', count: 5, xp: 350 }
      ],
      setCurrentTrackId,
      setCurrentLessonId,
      completeLesson,
      toggleBookmark,
      isLessonCompleted,
      isLessonBookmarked,
      getTrackProgress,
      getSkillLevel,
      notification,
      clearNotification
    }}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
