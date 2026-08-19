import React, { useState } from 'react';
import { CodeTask } from '../../types';
import { Play, RotateCcw, CheckCircle2, XCircle, Lightbulb, Terminal, Sparkles, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface CodeSandboxProps {
  codeTask: CodeTask;
  onSuccess?: (code: string) => void;
}

export const CodeSandbox: React.FC<CodeSandboxProps> = ({ codeTask, onSuccess }) => {
  const [code, setCode] = useState(codeTask.initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<{ description: string; passed: boolean; message?: string }[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRunCode = async () => {
    setIsRunning(true);
    const logs: string[] = [];
    const results: { description: string; passed: boolean; message?: string }[] = [];
    const startTime = performance.now();

    try {
      logs.push(`[${new Date().toLocaleTimeString()}] Сборка и тестирование (${codeTask.language})...`);

      if (codeTask.language === 'javascript' || codeTask.language === 'typescript') {
        // Intercept logs
        const originalLog = console.log;
        const captured: string[] = [];
        console.log = (...args: any[]) => {
          captured.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        };

        try {
          // Execute user code in isolated Function context
          const cleanCode = code.replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
                                .replace(/export\s+/g, '');
          const fn = new Function(cleanCode);
          fn();
        } catch (err: any) {
          logs.push(`⚠ Лог среды: ${err.message}`);
        } finally {
          console.log = originalLog;
          captured.forEach(c => logs.push(`> ${c}`));
        }
      }

      // Check test cases
      if (codeTask.testCases && codeTask.testCases.length > 0) {
        for (const test of codeTask.testCases) {
          let passed = false;
          if (test.validationRegex) {
            const regex = new RegExp(test.validationRegex, 'i');
            passed = regex.test(code);
          } else {
            passed = true;
          }
          results.push({
            description: test.description,
            passed,
            message: passed ? 'Тест успешно пройден' : 'Условие задания не выполнено'
          });
        }
      } else {
        results.push({ description: 'Синтаксическая проверка и линтинг', passed: true });
      }

      const allPassed = results.every(r => r.passed);
      const duration = Math.round(performance.now() - startTime);

      if (allPassed) {
        logs.push(`✔ Все ${results.length} тестов успешно пройдены за ${duration}мс! Навык закреплен.`);
        if (onSuccess) onSuccess(code);
      } else {
        logs.push(`✖ Часть тестов не прошла (${results.filter(r => r.passed).length}/${results.length}). Изучите подсказки.`);
      }
    } catch (err: any) {
      logs.push(`❌ Ошибка выполнения: ${err.message}`);
    }

    setOutput(logs);
    setTestResults(results);
    setIsRunning(false);
  };

  const handleReset = () => {
    setCode(codeTask.initialCode);
    setOutput([]);
    setTestResults([]);
  };

  const handleShowSolution = () => {
    setCode(codeTask.solution);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3 border border-[#22222a] rounded-xl bg-[#0f0f13] overflow-hidden shadow-sm animate-fade-in">
      {/* Editor Header */}
      <div className="p-3 bg-[#141418] border-b border-[#202026] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="text-xs font-mono text-zinc-400 ml-2 font-medium">
            Интерактивная песочница • {codeTask.language.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHints(!showHints)}
            icon={<Lightbulb className="w-3.5 h-3.5 text-amber-400" />}
          >
            Подсказки
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copied ? 'Скопировано' : 'Копировать'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Сброс
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleRunCode}
            isLoading={isRunning}
            icon={<Play className="w-3.5 h-3.5 fill-black" />}
          >
            Проверить решение
          </Button>
        </div>
      </div>

      {/* Hints Card */}
      {showHints && (
        <div className="p-4 bg-[#161620] border-b border-[#262634] text-xs text-zinc-300 space-y-2 animate-fade-in">
          <div className="font-semibold text-white flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Подсказка к решению:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            {codeTask.hints.map((hint, hIdx) => (
              <li key={hIdx}>{hint}</li>
            ))}
          </ul>
          <button
            onClick={handleShowSolution}
            className="text-[11px] text-zinc-400 hover:text-white underline font-mono pt-1 block"
          >
            Показать эталонный код (вставить в редактор)
          </button>
        </div>
      )}

      {/* Code Textarea */}
      <div className="p-3 font-mono text-xs">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-64 bg-transparent text-zinc-100 placeholder-zinc-600 font-mono resize-y focus:outline-none leading-relaxed selection:bg-zinc-700 selection:text-white"
        />
      </div>

      {/* Test Cases & Console Output */}
      <div className="border-t border-[#202026] bg-[#09090c] p-3.5 text-xs font-mono space-y-3">
        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="space-y-1.5 pb-2 border-b border-[#1c1c22]">
            <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold">
              Результаты проверочных тестов:
            </div>
            {testResults.map((test, tIdx) => (
              <div key={tIdx} className="flex items-center justify-between p-2 rounded-lg bg-[#121217] border border-[#1f1f26]">
                <div className="flex items-center gap-2">
                  {test.passed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  )}
                  <span className={test.passed ? 'text-zinc-200' : 'text-red-300'}>
                    {test.description}
                  </span>
                </div>
                <span className={`text-[10px] uppercase font-bold ${test.passed ? 'text-emerald-400' : 'text-red-400'}`}>
                  {test.passed ? 'PASSED' : 'FAILED'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Terminal Output */}
        <div>
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>Консоль вывода:</span>
          </div>
          {output.length > 0 ? (
            <div className="space-y-1 text-zinc-300 max-h-36 overflow-y-auto">
              {output.map((line, lIdx) => (
                <div key={lIdx} className="leading-snug">{line}</div>
              ))}
            </div>
          ) : (
            <div className="text-zinc-600">
              Нажмите "Проверить решение" для компиляции и валидации кода...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
