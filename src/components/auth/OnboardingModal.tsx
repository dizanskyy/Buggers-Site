import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { TRACKS } from '../../data/tracks';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { Track, LearningMode, LanguageOption } from '../../types';
import {
  Layers,
  Server,
  ShieldCheck,
  Gamepad2,
  Car,
  Cpu,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Compass,
  Code2,
  BookOpen,
  Zap,
  Flame
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinished: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onFinished
}) => {
  const { user, updateProfile } = useAuth();
  const { setCurrentTrackId, setCurrentLessonId } = useLearning();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTrackId, setSelectedTrackId] = useState<string>('frontend');
  const [learningMode, setLearningMode] = useState<LearningMode>('full_track');
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>('');

  const currentTrack = TRACKS.find(t => t.id === selectedTrackId) || TRACKS[0];

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return Layers;
      case 'Server': return Server;
      case 'ShieldCheck': return ShieldCheck;
      case 'Gamepad2': return Gamepad2;
      case 'Car': return Car;
      case 'Cpu': return Cpu;
      default: return Layers;
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (learningMode === 'single_language') {
        // Default to first language in track
        if (!selectedLanguageId && currentTrack.availableLanguages && currentTrack.availableLanguages.length > 0) {
          setSelectedLanguageId(currentTrack.availableLanguages[0].id);
        }
        setStep(3);
      } else {
        handleFinish();
      }
    } else if (step === 3) {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    // Save to user profile
    await updateProfile({
      selectedTrack: selectedTrackId,
      learningMode,
      selectedLanguage: learningMode === 'single_language' ? selectedLanguageId : undefined
    });

    setCurrentTrackId(selectedTrackId);
    onClose();
    onFinished();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center justify-between w-full pr-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-sm text-white">
              {step === 1 && 'Шаг 1 из 3: Выбор направления обучения'}
              {step === 2 && 'Шаг 2 из 3: Формат программы'}
              {step === 3 && 'Шаг 3 из 3: Выбор технологии'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">
            {step === 1 ? '1/3' : step === 2 ? '2/3' : '3/3'}
          </span>
        </div>
      }
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* STEP 1: Выбор глобального направления */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">
                Какое направление вы хотите освоить?
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Выберите специализацию. Вы сможете в любой момент переключиться или изучать несколько веток параллельно.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {TRACKS.map((track) => {
                const Icon = getTrackIcon(track.icon);
                const isSelected = selectedTrackId === track.id;

                return (
                  <div
                    key={track.id}
                    onClick={() => setSelectedTrackId(track.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all interactive-card relative ${
                      isSelected
                        ? 'bg-[#181822] border-white ring-1 ring-white/20'
                        : 'bg-[#121216] border-[#22222a] hover:border-zinc-600 hover:bg-[#15151a]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg border ${
                        isSelected ? 'bg-zinc-800 border-zinc-500 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="mt-3">
                      <h3 className="text-xs font-bold text-white">{track.title}</h3>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {track.shortDescription}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#1f1f26] text-[10px] font-mono text-zinc-500">
                      <span>~{track.estimatedHours} ч.</span>
                      <span>•</span>
                      <span>{track.level}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Выбор режима (Комплексный набор vs Конкретный язык) */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">
                Как вы хотите обучаться в ветке «{currentTrack.title}»?
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Выберите комфортный для вас темп и структуру учебного плана.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option A: Комплексный набор */}
              <div
                onClick={() => setLearningMode('full_track')}
                className={`p-5 rounded-xl border cursor-pointer transition-all interactive-card flex flex-col justify-between ${
                  learningMode === 'full_track'
                    ? 'bg-[#181822] border-white ring-1 ring-white/20'
                    : 'bg-[#121216] border-[#22222a] hover:border-zinc-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white">
                      <Compass className="w-5 h-5" />
                    </div>
                    {learningMode === 'full_track' && (
                      <Badge variant="default" className="font-mono text-[9px]">
                        РЕКОМЕНДУЕТСЯ
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white">Комплексный набор (Полный роадмап)</h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    Все необходимые языки, библиотеки и архитектурные паттерны уже упакованы в пошаговую цепочку от азов до Senior уровня.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-[11px] text-zinc-300">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Не нужно выбирать отдельные языки</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Гармоничный рост от синтаксиса к архитектуре</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Полное покрытие всех модулей трека</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Option B: Фокус на одном языке */}
              <div
                onClick={() => setLearningMode('single_language')}
                className={`p-5 rounded-xl border cursor-pointer transition-all interactive-card flex flex-col justify-between ${
                  learningMode === 'single_language'
                    ? 'bg-[#181822] border-white ring-1 ring-white/20'
                    : 'bg-[#121216] border-[#22222a] hover:border-zinc-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white">
                      <Code2 className="w-5 h-5" />
                    </div>
                    {learningMode === 'single_language' && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white">Фокус на одном языке / технологии</h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    Вы выбираете только один конкретный язык (например, только TypeScript, только C#, только Go, только Lua) и концентрируетесь исключительно на нем.
                  </p>
                  <ul className="mt-4 space-y-1.5 text-[11px] text-zinc-300">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Углубленный разбор одной технологии</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Ничего лишнего — только выбранный стек</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Быстрое решение узкоспециализированных задач</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Выбор конкретного языка (если выбран single_language) */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">
                Выберите основной язык / технологию
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Доступные технологии для специализации «{currentTrack.title}»:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentTrack.availableLanguages?.map((lang: LanguageOption) => {
                const isSelected = selectedLanguageId === lang.id;

                return (
                  <div
                    key={lang.id}
                    onClick={() => setSelectedLanguageId(lang.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all interactive-card ${
                      isSelected
                        ? 'bg-[#181822] border-white ring-1 ring-white/20'
                        : 'bg-[#121216] border-[#22222a] hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-white font-bold">
                        {lang.tag}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <h4 className="text-xs font-bold text-white mt-2">{lang.name}</h4>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{lang.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-[#202026]">
          {step > 1 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep((step - 1) as 1 | 2)}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Назад
            </Button>
          ) : (
            <div />
          )}

          <Button
            size="md"
            onClick={handleNextStep}
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            {step === 1 ? 'Далее к формату' : step === 2 && learningMode === 'full_track' ? 'Начать обучение' : step === 2 ? 'Выбрать технологию' : 'Завершить настройку'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
