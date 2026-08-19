import { Track } from '../types';
import { ALL_LESSONS } from './lessonsData';

export const TRACKS: Track[] = [
  {
    id: 'frontend',
    slug: 'frontend',
    title: 'Frontend Разработка',
    shortDescription: 'Современный веб на React, TypeScript, Tailwind и Next.js с архитектурными паттернами.',
    fullDescription: 'Полный трек веб-разработки: от семантического HTML5 и глубокого понимания Event Loop в JavaScript до строгой типизации TypeScript, хуков React 18, управления состоянием и SSR фреймворков.',
    category: 'frontend',
    level: 'Все уровни',
    estimatedHours: 64,
    icon: 'Layout',
    skillsGained: ['HTML5 / CSS3', 'JavaScript ESNext', 'TypeScript', 'React 18', 'State Management', 'Web Performance', 'Next.js'],
    availableLanguages: [
      { id: 'typescript', name: 'TypeScript', tag: 'TS', icon: 'Code', description: 'Строгая статическая типизация, generics и надежность кода' },
      { id: 'react', name: 'React 18 & Next.js', tag: 'React', icon: 'Layout', description: 'Компонентная архитектура, хуки и быстрый рендеринг' },
      { id: 'javascript', name: 'JavaScript ES2024', tag: 'JS', icon: 'FileCode', description: 'Ядро движка V8, Event Loop, промисы и замыкания' },
      { id: 'html_css', name: 'HTML5 & CSS Grid', tag: 'CSS', icon: 'Palette', description: 'Семантическая верстка, доступность a11y и адаптивные сетки' }
    ],
    modules: []
  },
  {
    id: 'backend',
    slug: 'backend',
    title: 'Backend & Архитектура',
    shortDescription: 'Масштабируемые серверные системы на Node.js, Python, Go, PostgreSQL и Redis.',
    fullDescription: 'Изучите разработку отказоустойчивых бэкендов: проектирование реляционных баз данных, транзакции ACID, кеширование с Redis, асинхронные очереди, создание REST и gRPC API, авторизацию JWT/OAuth2 и микросервисную архитектуру.',
    category: 'backend',
    level: 'Все уровни',
    estimatedHours: 72,
    icon: 'Server',
    skillsGained: ['Node.js & Express', 'Python FastAPI', 'Go Concurrency', 'PostgreSQL & SQL', 'Redis Caching', 'REST & gRPC', 'Microservices'],
    availableLanguages: [
      { id: 'golang', name: 'Go (Golang)', tag: 'Go', icon: 'Cpu', description: 'Сверхбыстрая многопоточность, горутины и микросервисы' },
      { id: 'python', name: 'Python (FastAPI)', tag: 'Py', icon: 'FileCode', description: 'Асинхронные REST API, Pydantic валидация и чистота кода' },
      { id: 'nodejs', name: 'Node.js & Express', tag: 'Node', icon: 'Server', description: 'Асинхронные потоки Streams, Buffers и Cluster API' },
      { id: 'postgresql', name: 'PostgreSQL & SQL', tag: 'SQL', icon: 'Database', description: 'B-Tree индексы, EXPLAIN ANALYZE и транзакции ACID' }
    ],
    modules: []
  },
  {
    id: 'cybersecurity',
    slug: 'cybersecurity',
    title: 'Кибербезопасность & Ethical Hacking',
    shortDescription: 'Анализ уязвимостей, защита систем, OWASP Top 10, криптография и аудит кода.',
    fullDescription: 'Погружение в информационную безопасность: сетевой анализ с Wireshark, поиск и эксплуатация веб-уязвимостей (SQL Injection, XSS, CSRF, IDOR, SSRF), принципы симметричной и асимметричной криптографии, безопасность Linux и харденинг серверов.',
    category: 'cybersecurity',
    level: 'Продвинутый',
    estimatedHours: 58,
    icon: 'ShieldCheck',
    skillsGained: ['OWASP Top 10', 'Сетевые протоколы (TCP/IP)', 'Криптография (AES, RSA)', 'AppSec & SAST/DAST', 'Linux Hardening', 'Burp Suite', 'Аудит безопасности'],
    availableLanguages: [
      { id: 'web_sec', name: 'Web AppSec (OWASP Top 10)', tag: 'OWASP', icon: 'Shield', description: 'Поиск и защита от SQLi, XSS, CSRF, IDOR и SSRF' },
      { id: 'crypto', name: 'Прикладная Криптография', tag: 'Crypto', icon: 'Lock', description: 'Шифрование AES/RSA, хеширование паролей Bcrypt/Argon2' },
      { id: 'linux_sec', name: 'Linux Server Hardening', tag: 'Linux', icon: 'Terminal', description: 'Защита портов, SSH ключи, UFW файрвол и Fail2ban' }
    ],
    modules: []
  },
  {
    id: 'gamedev',
    slug: 'gamedev',
    title: 'Разработка Игр (GameDev)',
    shortDescription: 'Создание 2D и 3D игр на Unity, Unreal Engine и Godot: физика, математика, C# и шейдеры.',
    fullDescription: 'Ветка для будущих создателей игр: фундаментальная математика векторов и кватернионов, программирование игровой логики на C# в Unity, работа с Unreal Engine 5 (C++ и Blueprints), физика, анимации, написание шейдеров и искусственный интеллект ботов.',
    category: 'gamedev',
    level: 'Все уровни',
    estimatedHours: 80,
    icon: 'Gamepad2',
    skillsGained: ['Векторная математика', 'Unity 3D & C#', 'Unreal Engine 5 (C++)', 'Godot 4 Engine', 'Шейдеры & Графика', 'Игровой AI (FSM/BT)', 'Оптимизация производительности'],
    availableLanguages: [
      { id: 'csharp_unity', name: 'C# (Unity 3D)', tag: 'C#', icon: 'Gamepad2', description: 'Физика Rigidbody, коллизии, корутины и механики' },
      { id: 'cpp_unreal', name: 'C++ (Unreal Engine 5)', tag: 'C++', icon: 'Cpu', description: 'Архитектура AActor, макросы UPROPERTY и геймплей' },
      { id: 'shaders', name: 'Шейдеры (GLSL / HLSL)', tag: 'Shader', icon: 'Sparkles', description: 'Вершинные и фрагментные шейдеры на GPU' },
      { id: 'math_gamedev', name: 'Математика векторов', tag: 'Math', icon: 'Calculator', description: 'Dot/Cross product, кватернионы и углы видимости' }
    ],
    modules: []
  },
  {
    id: 'gta-mp',
    slug: 'gta-mp',
    title: 'GTA Multiplayer (RAGE:MP / alt:V / FiveM)',
    shortDescription: 'Создание серверов и модов для GTA V: C#, TypeScript, Lua, нативы, OneSync и CEF интерфейсы.',
    fullDescription: 'Эксклюзивный трек по разработке мультиплеерных серверов GTA V: глубокое понимание внутренних механизмов игры (GTA V Natives), серверная архитектура RAGE:MP (C# .NET) и alt:V (TypeScript), скриптинг FiveM (Lua/JS, OneSync, State Bags), верстка внутриигровых меню CEF/NUI на React и синхронизация сущностей.',
    category: 'gta-mp',
    level: 'Все уровни',
    estimatedHours: 68,
    icon: 'Car',
    skillsGained: ['RAGE:MP C# Server API', 'alt:V TypeScript Architecture', 'FiveM Lua & OneSync', 'GTA V Native Invokers', 'CEF / NUI UI Разработка', 'Entity Synchronization', 'RP Базы данных'],
    availableLanguages: [
      { id: 'csharp_rage', name: 'C# .NET (RAGE:MP)', tag: 'C#', icon: 'Server', description: 'Серверная архитектура, команды [Command] и события' },
      { id: 'ts_altv', name: 'TypeScript (alt:V)', tag: 'TS', icon: 'Code', description: 'Стриминг StreamSyncedMeta, виртуальные сущности' },
      { id: 'lua_fivem', name: 'Lua & OneSync (FiveM)', tag: 'Lua', icon: 'FileCode', description: 'State Bags, oxmysql и серверные манифесты' },
      { id: 'cef_react', name: 'React UI (CEF / NUI)', tag: 'CEF', icon: 'Layout', description: 'Прозрачные внутриигровые меню, инвентарь и спидометры' }
    ],
    modules: []
  },
  {
    id: 'devops',
    slug: 'devops',
    title: 'DevOps & Инфраструктура',
    shortDescription: 'Контейнеризация, CI/CD пайплайны, Docker, Linux, Nginx и оркестрация серверов.',
    fullDescription: 'Освойте доставку и масштабирование сервисов: администрирование Linux, написание Dockerfile с многоэтапной сборкой, управление связками сервисов в Docker Compose, настройка реверс-прокси Nginx, автоматизация CI/CD через GitHub Actions и основы Kubernetes.',
    category: 'devops',
    level: 'Базовый',
    estimatedHours: 45,
    icon: 'Cpu',
    skillsGained: ['Linux CLI & Bash', 'Docker Containers', 'Docker Compose', 'Nginx & SSL', 'CI/CD GitHub Actions', 'Мониторинг & Логи', 'Основы K8s'],
    availableLanguages: [
      { id: 'docker', name: 'Docker & Multi-Stage', tag: 'Docker', icon: 'Cpu', description: 'Оптимизация легковесных контейнеров Alpine' },
      { id: 'compose', name: 'Docker Compose & Nginx', tag: 'Stack', icon: 'Layers', description: 'Оркестрация стека Node, React, Postgres и SSL' },
      { id: 'cicd', name: 'CI/CD GitHub Actions', tag: 'CI/CD', icon: 'Zap', description: 'Автоматический запуск тестов и выкатка на VPS' }
    ],
    modules: []
  }
];

// Populate modules dynamically from ALL_LESSONS
export function getTrackWithModules(trackId: string): Track | undefined {
  const track = TRACKS.find(t => t.id === trackId);
  if (!track) return undefined;

  const trackLessons = ALL_LESSONS.filter(l => l.trackId === trackId);
  const moduleMap = new Map<string, { id: string; title: string; description: string; iconName: string; order: number; lessons: typeof trackLessons }>();

  // Extract distinct modules
  for (const lesson of trackLessons) {
    if (!moduleMap.has(lesson.moduleId)) {
      moduleMap.set(lesson.moduleId, {
        id: lesson.moduleId,
        trackId: lesson.trackId,
        title: getModuleTitle(lesson.moduleId),
        description: getModuleDescription(lesson.moduleId),
        iconName: getModuleIcon(lesson.moduleId),
        order: getModuleOrder(lesson.moduleId),
        lessons: []
      });
    }
    moduleMap.get(lesson.moduleId)!.lessons.push(lesson);
  }

  const modules = Array.from(moduleMap.values()).sort((a, b) => a.order - b.order);
  modules.forEach(m => m.lessons.sort((a, b) => a.order - b.order));

  return {
    ...track,
    modules
  };
}

function getModuleTitle(moduleId: string): string {
  const titles: Record<string, string> = {
    // Frontend
    'fe-html-css': '1. Современный HTML5 и Продвинутый CSS3',
    'fe-js-core': '2. Ядро JavaScript: Event Loop, Замыкания и Асинхронность',
    'fe-typescript': '3. TypeScript: Строгая типизация и Generics',
    'fe-react': '4. React 18: Архитектура компонентов, Хуки и Рендеринг',
    'fe-state-arch': '5. Управление состоянием и Продвинутая Архитектура',
    
    // Backend
    'be-node-core': '1. Node.js: Архитектура, Потоки и Event Loop',
    'be-databases': '2. Реляционные БД, SQL и Индексация PostgreSQL',
    'be-fastapi-go': '3. Высокопроизводительный бэкенд на Python & Go',
    'be-redis-arch': '4. Кеширование Redis, Очереди и Микросервисы',
    
    // CyberSec
    'cs-networks': '1. Сетевые протоколы, Анализ трафика и Wireshark',
    'cs-owasp': '2. OWASP Top 10: Уязвимости веб-приложений и Защита',
    'cs-crypto': '3. Прикладная Криптография и Аутентификация',
    'cs-hardening': '4. Безопасность Linux, Харденинг и Аудит систем',

    // GameDev
    'gd-math-physics': '1. Математика GameDev: Векторы, Матрицы и Физика',
    'gd-unity': '2. Unity 3D & C#: Архитектура игровых механик',
    'gd-unreal': '3. Unreal Engine 5: C++, Blueprints и Gameplay Framework',
    'gd-shaders-ai': '4. Шейдеры, Освещение и Игровой Интеллект (AI)',

    // GTA MP
    'gta-core-natives': '1. Архитектура GTA V: Игровой движок, Память и Нативы',
    'gta-ragemp': '2. RAGE:MP: Серверная разработка на C# .NET и JS Client',
    'gta-altv': '3. alt:V Multiplayer: TypeScript, Модульность и Entity Sync',
    'gta-fivem': '4. FiveM: FXServer, Lua, State Bags и OneSync',
    'gta-cef-ui': '5. Внутриигровые интерфейсы: CEF, NUI и React',

    // DevOps
    'do-linux-docker': '1. Linux CLI и Контейнеризация с Docker',
    'do-compose-nginx': '2. Docker Compose, Nginx и Балансировка',
    'do-cicd': '3. CI/CD пайплайны и Управление инфраструктурой'
  };

  return titles[moduleId] || 'Модуль обучения';
}

function getModuleDescription(moduleId: string): string {
  const desc: Record<string, string> = {
    'fe-html-css': 'Семантика, Flexbox, CSS Grid, Container Queries, адаптивность и переменные.',
    'fe-js-core': 'Глубокий разбор движка V8, микро- и макротаски, промисы, прототипы.',
    'fe-typescript': 'Интерфейсы, дженерики, служебные типы (Utility types), сужение типов.',
    'fe-react': 'Virtual DOM, Fiber, useEffect, useMemo, кастомные хуки и мемоизация.',
    'fe-state-arch': 'Zustand, Redux Toolkit, React Query, архитектура FSD и чистый код.',
    
    'be-node-core': 'Асинхронный ввод/вывод, Buffers, Streams, кластеризация процессов.',
    'be-databases': 'Схемы, внешние ключи, нормализация, B-Tree индексы, EXPLAIN ANALYZE.',
    'be-fastapi-go': 'Асинхронный Python FastAPI, горутины, каналы и структуры в Golang.',
    'be-redis-arch': 'Кеширование, Pub/Sub, распределенные блокировки и очереди задач.',

    'cs-networks': 'Модель OSI, разбор TCP handshake, DNS, TLS/SSL, сниффинг пакетов.',
    'cs-owasp': 'SQLi, XSS, CSRF, IDOR, SSRF, Command Injection и практические методы защиты.',
    'cs-crypto': 'Хеширование (bcrypt/argon2), симметричное AES, асимметричное RSA, JWT подписи.',
    'cs-hardening': 'Права доступа, SSH ключи, AppArmor/SELinux, аудит портов и логов.',

    'gd-math-physics': 'Векторы, скалярное и векторное произведение, кватернионы, лучи (Raycasts).',
    'gd-unity': 'MonoBehaviour, паттерны проектирования, физика Rigidbody, анимации.',
    'gd-unreal': 'UObject, Actor, Компоненты, управление памятью и сборка геймплея.',
    'gd-shaders-ai': 'HLSL/GLSL, вершинные и фрагментные шейдеры, конечные автоматы и NavMesh.',

    'gta-core-natives': 'Хеши нативов, модель сущностей (Ped, Vehicle, Object), пулы памяти.',
    'gta-ragemp': 'Клиент-серверное взаимодействие, RPC, работа с БД, создание команд и спавн.',
    'gta-altv': 'Современный движок с полной поддержкой TypeScript, метаданные, виртуальные сущности.',
    'gta-fivem': 'OneSync архитектура, манифест fxmanifest, работа с oxmysql, State Bags.',
    'gta-cef-ui': 'Создание красивых HUD, инвентарей, спидометров и диалогов на React/JS.',

    'do-linux-docker': 'Команды Linux, права доступа, сборка легковесных образов Docker.',
    'do-compose-nginx': 'Оркестрация стека сервисов, настройка reverse proxy, SSL сертификаты.',
    'do-cicd': 'Автоматический деплой, сборка тестов в GitHub Actions, работа с секретами.'
  };

  return desc[moduleId] || 'Изучение ключевых концепций и практических задач модуля.';
}

function getModuleIcon(moduleId: string): string {
  if (moduleId.startsWith('fe-')) return 'Layout';
  if (moduleId.startsWith('be-')) return 'Server';
  if (moduleId.startsWith('cs-')) return 'ShieldCheck';
  if (moduleId.startsWith('gd-')) return 'Gamepad2';
  if (moduleId.startsWith('gta-')) return 'Car';
  if (moduleId.startsWith('do-')) return 'Cpu';
  return 'BookOpen';
}

function getModuleOrder(moduleId: string): number {
  const orders: Record<string, number> = {
    'fe-html-css': 1, 'fe-js-core': 2, 'fe-typescript': 3, 'fe-react': 4, 'fe-state-arch': 5,
    'be-node-core': 1, 'be-databases': 2, 'be-fastapi-go': 3, 'be-redis-arch': 4,
    'cs-networks': 1, 'cs-owasp': 2, 'cs-crypto': 3, 'cs-hardening': 4,
    'gd-math-physics': 1, 'gd-unity': 2, 'gd-unreal': 3, 'gd-shaders-ai': 4,
    'gta-core-natives': 1, 'gta-ragemp': 2, 'gta-altv': 3, 'gta-fivem': 4, 'gta-cef-ui': 5,
    'do-linux-docker': 1, 'do-compose-nginx': 2, 'do-cicd': 3
  };
  return orders[moduleId] || 99;
}
