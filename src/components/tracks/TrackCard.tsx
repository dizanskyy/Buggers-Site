import React from 'react';
import { Track } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { useLearning } from '../../context/LearningContext';
import { Layers, Server, ShieldCheck, Gamepad2, Car, Cpu, Clock, ChevronRight, BookOpen } from 'lucide-react';

interface TrackCardProps {
  track: Track;
  onSelect: () => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track, onSelect }) => {
  const { getTrackProgress } = useLearning();
  const progress = getTrackProgress(track.id);

  const getIcon = (iconName: string) => {
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

  const Icon = getIcon(track.icon);

  return (
    <Card
      hoverable
      onClick={onSelect}
      className="p-5 flex flex-col justify-between group border-[#24242c] hover:border-zinc-500 transition-all bg-[#131317]"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] font-mono">
              {track.level}
            </Badge>
          </div>
        </div>

        <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
          {track.title}
        </h3>

        <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-2">
          {track.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {track.skillsGained.slice(0, 4).map((skill, sIdx) => (
            <span
              key={sIdx}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c22] border border-[#292934] text-zinc-300"
            >
              {skill}
            </span>
          ))}
          {track.skillsGained.length > 4 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 text-zinc-500">
              +{track.skillsGained.length - 4}
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#202026] space-y-3">
        <ProgressBar progress={progress} showLabel size="sm" />

        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>~{track.estimatedHours} ч.</span>
          </div>
          <span className="text-white group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold text-[11px]">
            Открыть роадмап <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Card>
  );
};
