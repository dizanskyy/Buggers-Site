export type UserRole = 'developer' | 'architect' | 'security_specialist' | 'gamedev' | 'gta_modder' | 'devops';

export type LearningMode = 'full_track' | 'single_language';

export interface LanguageOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  tag: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  xp: number;
  level: number;
  streak: number;
  selectedTrack?: string;
  learningMode?: LearningMode;
  selectedLanguage?: string;
  created_at?: string;
  last_active?: string;
}

export type TrackCategory = 'frontend' | 'backend' | 'cybersecurity' | 'gamedev' | 'gta-mp' | 'devops' | 'system';
export type LessonDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type ContentType = 'theory' | 'interactive_code' | 'quiz' | 'project';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CodeTask {
  initialCode: string;
  solution: string;
  language: 'javascript' | 'typescript' | 'python' | 'html' | 'lua' | 'csharp' | 'cpp' | 'sql' | 'bash' | 'go' | 'css';
  hints: string[];
  testCases?: {
    input?: string;
    expectedOutput?: string;
    validationRegex?: string;
    description: string;
  }[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  trackId: string;
  title: string;
  description: string;
  durationMinutes: number;
  xpReward: number;
  difficulty: LessonDifficulty;
  type: ContentType;
  primaryLanguage?: string;
  theoryContent: string; // Markdown formatted educational text
  codeSnippet?: string;
  codeTask?: CodeTask;
  quizQuestions?: QuizQuestion[];
  cheatSheetSummary?: string[];
  keyTakeaways?: string[];
  order: number;
}

export interface Module {
  id: string;
  trackId: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
  lessons: Lesson[];
}

export interface Track {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: TrackCategory;
  level: 'С нуля' | 'Базовый' | 'Продвинутый' | 'Все уровни';
  estimatedHours: number;
  icon: string;
  modules: Module[];
  availableLanguages?: LanguageOption[];
  skillsGained: string[];
  colorTheme?: string;
  recommendedRole?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'progress' | 'streak' | 'mastery' | 'special';
  icon: string;
  xpReward: number;
  criteriaDescription: string;
  unlockedAt?: string;
}

export interface UserStats {
  user: User;
  completedLessons: {
    lesson_id: string;
    track_id: string;
    completed_at: string;
    score: number;
  }[];
  achievements: {
    achievement_id: string;
    unlocked_at: string;
  }[];
  bookmarks: {
    lesson_id: string;
    track_id: string;
    created_at: string;
  }[];
  activity: {
    date: string;
    count: number;
    xp_earned: number;
  }[];
  trackStats: Record<string, number>;
}
