import { Achievement } from '../types';

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'welcome_onboard',
    title: 'Первый шаг в кодинг',
    description: 'Создайте аккаунт и присоединитесь к Академии Buggers',
    category: 'progress',
    icon: 'Sparkles',
    xpReward: 50,
    criteriaDescription: 'Зарегистрироваться на платформе'
  },
  {
    id: 'first_step',
    title: 'Код скомпилирован',
    description: 'Успешно завершите свой самый первый урок в любой ветке',
    category: 'progress',
    icon: 'CheckCircle2',
    xpReward: 100,
    criteriaDescription: 'Завершить 1 урок'
  },
  {
    id: 'quick_learner',
    title: 'Быстрый старт',
    description: 'Пройдите 5 полноценных уроков с практическими заданиями',
    category: 'progress',
    icon: 'Zap',
    xpReward: 250,
    criteriaDescription: 'Завершить 5 уроков'
  },
  {
    id: 'code_addict',
    title: 'Марафонец кода',
    description: 'Успешно завершите 15 уроков и решите интерактивные задачи',
    category: 'progress',
    icon: 'Flame',
    xpReward: 500,
    criteriaDescription: 'Завершить 15 уроков'
  },
  {
    id: 'mastery_seeker',
    title: 'Искатель мастерства',
    description: 'Освойте 30 уроков и закрепите фундаментальные навыки',
    category: 'progress',
    icon: 'Award',
    xpReward: 1000,
    criteriaDescription: 'Завершить 30 уроков'
  },
  {
    id: 'grandmaster',
    title: 'Грандмастер Buggers',
    description: 'Пройдите 50+ уроков и войдите в элиту разработчиков',
    category: 'mastery',
    icon: 'Crown',
    xpReward: 2500,
    criteriaDescription: 'Завершить 50 уроков'
  },
  {
    id: 'gta_modder',
    title: 'GTA Multiplayer Dev',
    description: 'Освойте разработку серверов RAGE:MP, alt:V и FiveM',
    category: 'special',
    icon: 'Car',
    xpReward: 400,
    criteriaDescription: 'Завершить 3 урока в ветке GTA MP'
  },
  {
    id: 'cyber_ninja',
    title: 'Этичный хакер',
    description: 'Изучите уязвимости веб-приложений и защиту систем',
    category: 'special',
    icon: 'ShieldCheck',
    xpReward: 400,
    criteriaDescription: 'Завершить 3 урока по Кибербезопасности'
  },
  {
    id: 'game_architect',
    title: 'Архитектор миров',
    description: 'Напишите первые игровые механики и разберитесь в GameDev',
    category: 'special',
    icon: 'Gamepad2',
    xpReward: 400,
    criteriaDescription: 'Завершить 3 урока по GameDev'
  },
  {
    id: 'backend_sorcerer',
    title: 'Повелитель серверов',
    description: 'Создайте отказоустойчивые API и базы данных',
    category: 'special',
    icon: 'Server',
    xpReward: 400,
    criteriaDescription: 'Завершить 3 урока по Бэкенду'
  },
  {
    id: 'frontend_wizard',
    title: 'UI Архитектор',
    description: 'Постройте современные реактивные веб-интерфейсы',
    category: 'special',
    icon: 'Layout',
    xpReward: 400,
    criteriaDescription: 'Завершить 3 урока по Фронтенду'
  },
  {
    id: 'streak_3',
    title: 'Дисциплина самурая',
    description: 'Удерживайте непрерывный стрик обучения в течение 3 дней',
    category: 'streak',
    icon: 'Flame',
    xpReward: 200,
    criteriaDescription: 'Стрик 3 дня подряд'
  },
  {
    id: 'streak_7',
    title: 'Неделя продуктивности',
    description: 'Обучайтесь каждый день в течение целой недели',
    category: 'streak',
    icon: 'Trophy',
    xpReward: 600,
    criteriaDescription: 'Стрик 7 дней подряд'
  }
];
