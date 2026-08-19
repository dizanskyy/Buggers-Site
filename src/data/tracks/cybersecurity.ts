import { Lesson } from '../../types';

export const CYBERSECURITY_LESSONS: Lesson[] = [
  {
    id: 'cs-01',
    moduleId: 'cs-owasp',
    trackId: 'cybersecurity',
    title: 'SQL Injection: Анализ и Защита (Prepared Statements)',
    description: 'Предотвращение внедрения произвольного SQL кода в запросы к базе данных.',
    durationMinutes: 30,
    xpReward: 90,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Защита от SQLi

Использование параметризованных запросов (\`Prepared Statements\`) полностью изолирует пользовательский ввод от синтаксического дерева SQL.`,
    codeSnippet: `db.prepare('SELECT * FROM users WHERE email = ?').get(email);`,
    codeTask: {
      initialCode: `function getUser(db, userId) {
  // Напишите безопасный параметризованный запрос с ? вместо конкатенации
  // SELECT * FROM users WHERE id = ?
  return db.query("SELECT * FROM users WHERE id = ?", [userId]);
}`,
      solution: `function getUser(db, userId) {
  return db.query("SELECT * FROM users WHERE id = ?", [userId]);
}`,
      language: 'javascript',
      hints: ['db.query("SELECT * FROM users WHERE id = ?", [userId])'],
      testCases: [{ description: 'Параметризация ?', validationRegex: 'WHERE\\s+id\\s*=\\s*\\?' }]
    }
  },
  {
    id: 'cs-02',
    moduleId: 'cs-owasp',
    trackId: 'cybersecurity',
    title: 'Cross-Site Scripting (XSS) и Cookie HttpOnly',
    description: 'Защита от кражи сессионных токенов через внедрение вредоносного JS кода.',
    durationMinutes: 30,
    xpReward: 90,
    difficulty: 'intermediate',
    type: 'quiz',
    order: 2,
    theoryContent: `### Защита от XSS

Флаг \`HttpOnly\` запрещает чтение Cookie через \`document.cookie\`, а заголовок CSP блокирует inline-скрипты.`,
    quizQuestions: [
      {
        id: 'q-cs-1',
        question: 'Какой флаг куки запрещает доступ к ней через JavaScript API?',
        options: ['Secure', 'HttpOnly', 'SameSite', 'Path'],
        correctIndex: 1,
        explanation: 'Флаг HttpOnly защищает от чтения Cookie скриптами при XSS уязвимостях.'
      }
    ]
  },
  {
    id: 'cs-03',
    moduleId: 'cs-crypto',
    trackId: 'cybersecurity',
    title: 'Хеширование паролей: Bcrypt и Соль (Salt)',
    description: 'Защита базы учетных записей от Rainbow Tables и атак по словарю.',
    durationMinutes: 25,
    xpReward: 85,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Почему SHA256 не подходит для паролей?

Bcrypt намеренно замедляет вычисление хеша, делая подбор паролей невозможным даже на суперкомпьютерах.`,
    codeSnippet: `const hash = await bcrypt.hash(password, 10);`,
    codeTask: {
      initialCode: `const bcrypt = require('bcryptjs');

async function secureHash(pass) {
  // Захешируйте пароль с солью 10
  return await bcrypt.hash(pass, 10);
}`,
      solution: `const bcrypt = require('bcryptjs');

async function secureHash(pass) {
  return await bcrypt.hash(pass, 10);
}`,
      language: 'javascript',
      hints: ['await bcrypt.hash(pass, 10)'],
      testCases: [{ description: 'bcrypt.hash', validationRegex: 'bcrypt\\.hash' }]
    }
  }
];
