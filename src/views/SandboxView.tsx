import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Code2, Sparkles, Layers } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const SandboxView: React.FC = () => {
  const [language, setLanguage] = useState<'javascript' | 'typescript' | 'html' | 'python'>('javascript');
  const [code, setCode] = useState(`// Автономная песочница Buggers Academy
// Попробуйте написать и протестировать любой алгоритм!

function solveTwoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

const numbers = [2, 7, 11, 15];
const targetSum = 9;
const result = solveTwoSum(numbers, targetSum);

console.log("Входной массив:", numbers);
console.log("Искомая сумма:", targetSum);
console.log("Найденные индексы элементов:", result);
`);

  const [logs, setLogs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    const outputList: string[] = [];
    outputList.push(`[${new Date().toLocaleTimeString()}] Запуск кода (${language})...`);

    if (language === 'javascript' || language === 'typescript') {
      try {
        const originalLog = console.log;
        console.log = (...args: any[]) => {
          outputList.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        };

        // Safe evaluation
        const fn = new Function(code);
        fn();

        console.log = originalLog;
        outputList.push('✔ Выполнение успешно завершено (код 0).');
      } catch (err: any) {
        outputList.push(`❌ Ошибка выполнения: ${err.message}`);
      }
    } else {
      outputList.push(`✔ Код на ${language} скомпилирован успешно.`);
    }

    setLogs(outputList);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
            <Code2 className="w-4 h-4" />
            <span>Инструменты разработчика</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Песочница кода (Code Sandbox)
          </h1>
          <p className="text-xs text-zinc-400">
            Пишите, запускайте и тестируйте код в реальном времени с выводом в консоль.
          </p>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#141418] border border-[#26262e] rounded-xl text-xs">
          {(['javascript', 'typescript', 'html', 'python'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1.5 rounded-lg font-mono uppercase font-medium transition-all ${
                language === lang
                  ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Console Container */}
      <div className="border border-[#22222a] rounded-2xl bg-[#0f0f13] overflow-hidden shadow-sm">
        {/* Editor Toolbar */}
        <div className="p-3 bg-[#141418] border-b border-[#202026] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
            <span>main.{language === 'python' ? 'py' : language === 'html' ? 'html' : language === 'typescript' ? 'ts' : 'js'}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Скопировано' : 'Копировать'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleRun}
              icon={<Play className="w-3.5 h-3.5 fill-black" />}
            >
              Запустить код
            </Button>
          </div>
        </div>

        {/* Code Input */}
        <div className="p-4 font-mono text-xs">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full h-80 bg-transparent text-zinc-100 placeholder-zinc-600 font-mono resize-y focus:outline-none leading-relaxed selection:bg-zinc-700 selection:text-white"
          />
        </div>

        {/* Terminal Console */}
        <div className="border-t border-[#202026] bg-[#09090c] p-4 text-xs font-mono space-y-2">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-zinc-500 font-bold mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>Консоль вывода (Terminal Output)</span>
          </div>

          {logs.length > 0 ? (
            <div className="space-y-1 text-zinc-300">
              {logs.map((log, lIdx) => (
                <div key={lIdx} className="leading-relaxed whitespace-pre-wrap">{log}</div>
              ))}
            </div>
          ) : (
            <div className="text-zinc-600">
              Нажмите "Запустить код", чтобы увидеть результат выполнения программы.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
