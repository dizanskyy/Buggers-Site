import { Lesson } from '../../types';

export const BACKEND_LESSONS: Lesson[] = [
  {
    id: 'be-01',
    moduleId: 'be-node-core',
    trackId: 'backend',
    title: 'Node.js: Buffers, Streams и Экономия памяти',
    description: 'Обработка терабайтов данных без переполнения оперативной памяти с помощью Streams.',
    durationMinutes: 30,
    xpReward: 85,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Streams в Node.js

Потоки передают данные небольшими порциями (chunks), снижая потребление памяти с гигабайт до пары мегабайт.`,
    codeSnippet: `fs.createReadStream('large.mp4').pipe(res);`,
    codeTask: {
      initialCode: `const fs = require('fs');

function streamFile(src, dest) {
  // Направьте read stream в dest stream через pipe
  
}`,
      solution: `const fs = require('fs');

function streamFile(src, dest) {
  const readStream = fs.createReadStream(src);
  readStream.pipe(dest);
}`,
      language: 'javascript',
      hints: ['fs.createReadStream(src).pipe(dest)'],
      testCases: [{ description: 'createReadStream и pipe', validationRegex: 'createReadStream[\\s\\S]*\\.pipe' }]
    }
  },
  {
    id: 'be-02',
    moduleId: 'be-databases',
    trackId: 'backend',
    title: 'PostgreSQL: Индексы B-Tree и Оптимизация запросов',
    description: 'Ускорение поиска от O(N) до O(log N) и использование EXPLAIN ANALYZE.',
    durationMinutes: 35,
    xpReward: 95,
    difficulty: 'advanced',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### B-Tree индексы

Индекс позволяет СУБД мгновенно находить строки без полного последовательного сканирования (Seq Scan) всей таблицы.`,
    codeSnippet: `CREATE INDEX idx_orders_user ON orders (user_id);`,
    codeTask: {
      initialCode: `-- Создайте уникальный индекс idx_users_email для колонки email таблицы users:
`,
      solution: `CREATE UNIQUE INDEX idx_users_email ON users (email);`,
      language: 'sql',
      hints: ['CREATE UNIQUE INDEX idx_users_email ON users (email);'],
      testCases: [{ description: 'CREATE UNIQUE INDEX', validationRegex: 'CREATE\\s+UNIQUE\\s+INDEX' }]
    }
  },
  {
    id: 'be-03',
    moduleId: 'be-fastapi-go',
    trackId: 'backend',
    title: 'Golang: Горутины и Многопоточность через Каналы',
    description: 'Параллельная обработка запросов с минимальным оверхедом памяти в Go.',
    durationMinutes: 35,
    xpReward: 100,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Горутины в Go

Горутина запускается ключевым словом \`go\` и обменивается данными через типизированные каналы (channels).`,
    codeSnippet: `go func() { ch <- "Done" }();`,
    codeTask: {
      initialCode: `package main
import "fmt"

func process(ch chan string) {
    // Отправьте сообщение "OK" в канал ch
    
}`,
      solution: `package main
import "fmt"

func process(ch chan string) {
    ch <- "OK"
}`,
      language: 'go',
      hints: ['ch <- "OK"'],
      testCases: [{ description: 'Отправка в канал', validationRegex: 'ch\\s*<-\\s*"OK"' }]
    }
  },
  {
    id: 'be-04',
    moduleId: 'be-redis-arch',
    trackId: 'backend',
    title: 'Redis: Паттерн Cache-Aside и Ускорение API',
    description: 'Кеширование горячих данных в RAM с установкой времени жизни (TTL).',
    durationMinutes: 30,
    xpReward: 90,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Cache-Aside подход

1. Проверяем Redis (0.5мс).
2. При промахе — берем из PostgreSQL и пишем в Redis с TTL.`,
    codeSnippet: `await redis.setex('key', 3600, JSON.stringify(data));`,
    codeTask: {
      initialCode: `async function saveToCache(redis, key, data, ttlSeconds) {
  // Сохраните JSON строку в Redis с помощью setex
  
}`,
      solution: `async function saveToCache(redis, key, data, ttlSeconds) {
  await redis.setex(key, ttlSeconds, JSON.stringify(data));
}`,
      language: 'javascript',
      hints: ['await redis.setex(key, ttlSeconds, JSON.stringify(data));'],
      testCases: [{ description: 'redis.setex', validationRegex: 'redis\\.setex' }]
    }
  }
];
