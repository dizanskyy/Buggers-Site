import { Lesson } from '../../types';

export const FRONTEND_LESSONS: Lesson[] = [
  {
    id: 'fe-01',
    moduleId: 'fe-html-css',
    trackId: 'frontend',
    title: 'Семантический HTML5 и Доступность (a11y)',
    description: 'Иерархия тегов, ориентиры доступности (landmarks) и разметка без лишних div-оберток.',
    durationMinutes: 20,
    xpReward: 60,
    difficulty: 'beginner',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Семантическая структура в современном веб-дизайне

Семантические теги (\`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<aside>\`, \`<footer>\`) сообщают браузеру, поисковикам и скринридерам точный смысл контента.

\`\`\`html
<header>
  <h1>Buggers Academy</h1>
  <nav aria-label="Главная навигация">
    <a href="/tracks">Ветки обучения</a>
  </nav>
</header>
<main>
  <article>
    <h2>Frontend Разработка</h2>
    <p>Изучение веб-технологий...</p>
  </article>
</main>
\`\`\``,
    codeSnippet: `<header>\n  <h1>Платформа</h1>\n</header>`,
    codeTask: {
      initialCode: `<!-- Оберните навигационные ссылки в правильный семантический тег nav -->
<header>
  <h1>CodeForge</h1>
  <div class="nav-links">
    <a href="/courses">Курсы</a>
    <a href="/profile">Профиль</a>
  </div>
</header>`,
      solution: `<header>
  <h1>CodeForge</h1>
  <nav class="nav-links">
    <a href="/courses">Курсы</a>
    <a href="/profile">Профиль</a>
  </nav>
</header>`,
      language: 'html',
      hints: ['Замените <div class="nav-links"> на <nav class="nav-links">'],
      testCases: [{ description: 'Наличие тега nav', validationRegex: '<nav[\\s\\S]*?<\\/nav>' }]
    },
    keyTakeaways: [
      'Семантика улучшает доступность (a11y) и SEO.',
      '<main> должен быть единственным на странице.'
    ]
  },
  {
    id: 'fe-02',
    moduleId: 'fe-html-css',
    trackId: 'frontend',
    title: 'CSS Grid & Flexbox: Адаптивные сетки',
    description: 'Построение гибких сеток без медиа-запросов с использованием minmax и auto-fit.',
    durationMinutes: 25,
    xpReward: 70,
    difficulty: 'beginner',
    type: 'interactive_code',
    order: 2,
    theoryContent: `### Адаптивный CSS Grid

Свойство \`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))\` автоматически переносит карточки при сужении экрана.

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
\`\`\``,
    codeSnippet: `.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }`,
    codeTask: {
      initialCode: `/* Задайте CSS Grid для контейнера с 3 равными колонками */
.grid-container {
  /* Ваш код */
}`,
      solution: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`,
      language: 'javascript',
      hints: ['Используйте display: grid и grid-template-columns: repeat(3, 1fr)'],
      testCases: [{ description: 'display: grid', validationRegex: 'display:\\s*grid' }]
    }
  },
  {
    id: 'fe-03',
    moduleId: 'fe-js-core',
    trackId: 'frontend',
    title: 'Event Loop: Микротаски и Макротаски',
    description: 'Порядок исполнения синхронного кода, промисов (Microtasks) и таймеров (Macrotasks).',
    durationMinutes: 30,
    xpReward: 80,
    difficulty: 'intermediate',
    type: 'quiz',
    order: 1,
    theoryContent: `### Event Loop в V8

Микрозадачи (\`Promise.resolve().then()\`, \`queueMicrotask\`) имеют наивысший приоритет и выполняются сразу после опустошения Call Stack перед макрозадачами (\`setTimeout\`).`,
    quizQuestions: [
      {
        id: 'q-fe-1',
        question: 'Что выполнится раньше: Promise.then() или setTimeout(..., 0)?',
        options: ['setTimeout', 'Promise.then()', 'Случайно', 'Одновременно'],
        correctIndex: 1,
        explanation: 'Очередь микротасок (Promise) опустошается до следующего тика макротасок (setTimeout).'
      }
    ]
  },
  {
    id: 'fe-04',
    moduleId: 'fe-js-core',
    trackId: 'frontend',
    title: 'Замыкания (Closures) и Лексическое окружение',
    description: 'Инкапсуляция приватных переменных и сохранение Scope в функциональном коде.',
    durationMinutes: 25,
    xpReward: 75,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 2,
    theoryContent: `### Замыкание в JavaScript

Функция сохраняет ссылку на переменные родительской области видимости.`,
    codeSnippet: `function makeCounter() { let c = 0; return () => ++c; }`,
    codeTask: {
      initialCode: `function createMultiplier(factor) {
  // Верните функцию, умножающую переданный аргумент x на factor
  
}`,
      solution: `function createMultiplier(factor) {
  return function(x) {
    return x * factor;
  };
}`,
      language: 'javascript',
      hints: ['return (x) => x * factor;'],
      testCases: [{ description: 'Возврат функции', validationRegex: 'return\\s*(function|\\(?\\w*\\)?\\s*=>)' }]
    }
  },
  {
    id: 'fe-05',
    moduleId: 'fe-typescript',
    trackId: 'frontend',
    title: 'TypeScript: Дженерики (Generics) и Утилиты',
    description: 'Создание типобезопасных универсальных структур и работа с Partial, Pick, Record.',
    durationMinutes: 30,
    xpReward: 90,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Дженерики

Дженерики сохраняют тип переданных аргументов.

\`\`\`typescript
function identity<T>(value: T): T {
  return value;
}
\`\`\``,
    codeSnippet: `interface Response<T> { data: T; status: number; }`,
    codeTask: {
      initialCode: `// Напишите типизированную функцию wrapData<T>(data: T)
function wrapData<T>(data: T) {
  // Верните { value: data, timestamp: Date.now() }
  
}`,
      solution: `function wrapData<T>(data: T) {
  return {
    value: data,
    timestamp: Date.now()
  };
}`,
      language: 'typescript',
      hints: ['return { value: data, timestamp: Date.now() };'],
      testCases: [{ description: 'Проверка объекта', validationRegex: 'return\\s*\\{[\\s\\S]*value' }]
    }
  },
  {
    id: 'fe-06',
    moduleId: 'fe-react',
    trackId: 'frontend',
    title: 'React 18: Хуки, useMemo и useCallback',
    description: 'Оптимизация рендеринга и предотвращение паразитных перерисовок компонентов.',
    durationMinutes: 30,
    xpReward: 90,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Мемоизация в React

\`useCallback\` кеширует ссылку на функцию между рендерами, если зависимости не изменились.`,
    codeSnippet: `const memoizedFn = useCallback(() => doSomething(a), [a]);`,
    codeTask: {
      initialCode: `import { useCallback } from 'react';

export function useSaveHandler(saveData) {
  // Оберните функцию сохранения в useCallback с зависимостью [saveData]
  const handleSave = () => {
    saveData();
  };
  return handleSave;
}`,
      solution: `import { useCallback } from 'react';

export function useSaveHandler(saveData) {
  const handleSave = useCallback(() => {
    saveData();
  }, [saveData]);
  return handleSave;
}`,
      language: 'typescript',
      hints: ['useCallback(() => { saveData(); }, [saveData])'],
      testCases: [{ description: 'Использование useCallback', validationRegex: 'useCallback' }]
    }
  },
  {
    id: 'fe-07',
    moduleId: 'fe-state-arch',
    trackId: 'frontend',
    title: 'Zustand: Управление глобальным состоянием',
    description: 'Минималистичный стор без лишних оберток провайдеров и бойлерплейта.',
    durationMinutes: 25,
    xpReward: 85,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Состояние в Zustand

\`\`\`typescript
import { create } from 'zustand';

interface Store {
  xp: number;
  addXP: (amount: number) => void;
}

export const useStore = create<Store>((set) => ({
  xp: 0,
  addXP: (amount) => set((s) => ({ xp: s.xp + amount })),
}));
\`\`\``,
    codeSnippet: `const useStore = create((set) => ({ count: 0, inc: () => set(s => ({ count: s.count + 1 })) }));`,
    codeTask: {
      initialCode: `import { create } from 'zustand';

// Допишите метод toggleDark в стор
export const useThemeStore = create((set) => ({
  isDark: true,
  // Добавьте toggleDark: () => set(state => ({ isDark: !state.isDark }))
  
}));`,
      solution: `import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  isDark: true,
  toggleDark: () => set((state) => ({ isDark: !state.isDark }))
}));`,
      language: 'typescript',
      hints: ['toggleDark: () => set((state) => ({ isDark: !state.isDark }))'],
      testCases: [{ description: 'toggleDark метод', validationRegex: 'toggleDark' }]
    }
  }
];
