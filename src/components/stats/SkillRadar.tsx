import React from 'react';
import { useLearning } from '../../context/LearningContext';

export const SkillRadar: React.FC = () => {
  const { getSkillLevel } = useLearning();

  const skills = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'cybersecurity', label: 'Кибербезопасность' },
    { id: 'gamedev', label: 'GameDev' },
    { id: 'gta-mp', label: 'GTA MP' },
    { id: 'devops', label: 'DevOps' },
  ];

  const size = 260;
  const center = size / 2;
  const radius = size * 0.38;
  const count = skills.length;

  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (Math.PI * 2 / count) * index - Math.PI / 2;
    const r = radius * valueRatio;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate web rings (25%, 50%, 75%, 100%)
  const rings = [0.25, 0.5, 0.75, 1.0];

  // User polygon points
  const points = skills.map((skill, index) => {
    const rawVal = getSkillLevel(skill.id);
    // Minimum 15% visibility for aesthetic radar
    const ratio = Math.max(0.15, rawVal / 100);
    const { x, y } = getCoordinates(index, ratio);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="overflow-visible select-none">
          {/* Background Grid Rings */}
          {rings.map((ring, rIdx) => {
            const ringPoints = skills.map((_, index) => {
              const { x, y } = getCoordinates(index, ring);
              return `${x},${y}`;
            }).join(' ');

            return (
              <polygon
                key={rIdx}
                points={ringPoints}
                fill="transparent"
                stroke="#24242c"
                strokeWidth="1"
                strokeDasharray={ring < 1 ? '2 2' : undefined}
              />
            );
          })}

          {/* Radial Axis Lines */}
          {skills.map((_, index) => {
            const { x, y } = getCoordinates(index, 1.0);
            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#24242c"
                strokeWidth="1"
              />
            );
          })}

          {/* Filled User Polygon */}
          <polygon
            points={points}
            fill="rgba(255, 255, 255, 0.12)"
            stroke="#ffffff"
            strokeWidth="1.5"
            className="transition-all duration-500 ease-out"
          />

          {/* Data Points and Labels */}
          {skills.map((skill, index) => {
            const rawVal = getSkillLevel(skill.id);
            const ratio = Math.max(0.15, rawVal / 100);
            const pointCoord = getCoordinates(index, ratio);
            const labelCoord = getCoordinates(index, 1.25);

            return (
              <g key={skill.id}>
                {/* Dot */}
                <circle
                  cx={pointCoord.x}
                  cy={pointCoord.y}
                  r="3.5"
                  fill="#ffffff"
                  stroke="#121215"
                  strokeWidth="1.5"
                />

                {/* Label text */}
                <text
                  x={labelCoord.x}
                  y={labelCoord.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#a1a1aa"
                  fontSize="10"
                  fontFamily="Inter, sans-serif"
                  fontWeight="500"
                >
                  {skill.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Numerical breakdown */}
      <div className="grid grid-cols-3 gap-2 w-full mt-4 text-[11px] font-mono">
        {skills.map(s => {
          const val = getSkillLevel(s.id);
          return (
            <div key={s.id} className="p-2 rounded-lg bg-[#141418] border border-[#22222a] flex justify-between items-center">
              <span className="text-zinc-400 truncate">{s.label}:</span>
              <span className="text-white font-bold">{val}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
