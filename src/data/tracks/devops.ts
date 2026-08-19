import { Lesson } from '../../types';

export const DEVOPS_LESSONS: Lesson[] = [
  {
    id: 'do-01',
    moduleId: 'do-linux-docker',
    trackId: 'devops',
    title: 'Docker: Multi-stage Builds и Оптимизация образов',
    description: 'Уменьшение размера production образов и удаление уязвимых инструментов сборки.',
    durationMinutes: 25,
    xpReward: 80,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Многоэтапные сборки Docker

Multi-stage build собирает проект в первом контейнере (builder) и копирует только скомпилированные артефакты в легковесный финальный образ (runner).`,
    codeSnippet: `FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nCMD ["node", "index.js"]`,
    codeTask: {
      initialCode: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD ["node", "dist/index.js"]`,
      solution: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD ["node", "dist/index.js"]`,
      language: 'bash',
      hints: ['EXPOSE 4000', 'CMD ["node", "dist/index.js"]'],
      testCases: [{ description: 'EXPOSE и CMD', validationRegex: 'EXPOSE[\\s\\S]*CMD' }]
    }
  },
  {
    id: 'do-02',
    moduleId: 'do-compose-nginx',
    trackId: 'devops',
    title: 'Docker Compose: Оркестрация стека сервисов',
    description: 'Связывание React, Node.js API, PostgreSQL и Redis в изолированную внутреннюю сеть.',
    durationMinutes: 30,
    xpReward: 85,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Docker Compose

\`docker-compose.yml\` объявляет все зависимые контейнеры, пробрасывает порты и монтирует volumes для хранения данных.`,
    codeSnippet: `version: '3.8'\nservices:\n  app:\n    build: .\n    ports: ["4000:4000"]`,
    codeTask: {
      initialCode: `version: '3.8'
services:
  database:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: secretpassword
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:`,
      solution: `version: '3.8'
services:
  database:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: secretpassword
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:`,
      language: 'bash',
      hints: ['volumes: pgdata'],
      testCases: [{ description: 'postgres image', validationRegex: 'postgres:16-alpine' }]
    }
  },
  {
    id: 'do-03',
    moduleId: 'do-cicd',
    trackId: 'devops',
    title: 'GitHub Actions: Непрерывная интеграция (CI/CD)',
    description: 'Автоматический запуск тестов, линтеров и деплой на сервер при коммите в main.',
    durationMinutes: 30,
    xpReward: 90,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### GitHub Actions

Workflow файл в \`.github/workflows/ci.yml\` выполняет проверку кода на виртуальных машинах GitHub при каждом pull request.`,
    codeSnippet: `name: CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test`,
    codeTask: {
      initialCode: `name: Build & Test
on: [push]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test`,
      solution: `name: Build & Test
on: [push]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test`,
      language: 'bash',
      hints: ['actions/checkout@v4 and setup-node@v4'],
      testCases: [{ description: 'actions/checkout', validationRegex: 'actions/checkout@v4' }]
    }
  }
];
