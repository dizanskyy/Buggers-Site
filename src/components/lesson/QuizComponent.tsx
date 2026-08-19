import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { Button } from '../ui/Button';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({ questions, onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const allCorrect = questions.every(q => answers[q.id] === q.correctIndex);
    if (allCorrect) {
      onComplete();
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allAnswered = questions.every(q => answers[q.id] !== undefined);
  const correctCount = questions.filter(q => answers[q.id] === q.correctIndex).length;

  return (
    <div className="space-y-6 p-6 rounded-xl bg-[#121216] border border-[#22222a]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-white" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Контрольный тест по теме урока
          </h3>
        </div>
        <span className="text-xs font-mono text-zinc-400">
          {questions.length} вопроса
        </span>
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div key={q.id} className="space-y-3 p-4 rounded-xl bg-[#15151a] border border-[#24242e]">
              <div className="text-xs font-semibold text-white whitespace-pre-wrap leading-relaxed">
                {qIdx + 1}. {q.question}
              </div>

              <div className="space-y-2">
                {q.options.map((option, optIdx) => {
                  const isSelected = selected === optIdx;
                  let optStyle = 'bg-[#1a1a20] border-[#292934] text-zinc-300 hover:bg-[#202028]';

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      optStyle = 'bg-emerald-950/60 border-emerald-700 text-emerald-200 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'bg-red-950/60 border-red-800 text-red-300';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-zinc-800 border-zinc-500 text-white font-semibold ring-1 ring-zinc-400/30';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span>{option}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`p-3 rounded-lg text-xs leading-relaxed ${isCorrect ? 'bg-emerald-950/30 border border-emerald-800/40 text-emerald-300' : 'bg-red-950/30 border border-red-800/40 text-red-300'}`}>
                  <strong>{isCorrect ? 'Верно!' : 'Неверно!'}</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#202026]">
        {submitted ? (
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-zinc-300">
              Результат: <strong className="text-white">{correctCount} / {questions.length}</strong>
            </span>
            <Button size="sm" variant="outline" onClick={handleReset}>
              Пройти снова
            </Button>
          </div>
        ) : (
          <Button
            size="md"
            onClick={handleSubmit}
            disabled={!allAnswered}
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Проверить ответы
          </Button>
        )}
      </div>
    </div>
  );
};
