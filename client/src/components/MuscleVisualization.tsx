import React from 'react';
import { cn } from '@/lib/utils';

interface MuscleVisualizationProps {
  highlightedMuscles: string[];
  progress?: number;
}

export function MuscleVisualization({ highlightedMuscles, progress = 0 }: MuscleVisualizationProps) {
  const muscleGroups = {
    neck: "M120,50 Q150,60 180,50",
    shoulders: "M80,80 L120,85 M180,85 L220,80",
    back: "M120,90 Q150,100 180,90 L180,150 Q150,160 120,150 Z",
    arms: "M70,90 L100,120 M200,120 L230,90",
    legs: "M120,160 L140,250 M160,160 L180,250"
  };

  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset={`${progress}%`} stopColor="#22C55E" />
          <stop offset={`${progress}%`} stopColor="#E5E7EB" />
          <stop offset="100%" stopColor="#E5E7EB" />
        </linearGradient>
      </defs>
      
      {Object.entries(muscleGroups).map(([muscle, path]) => (
        <path
          key={muscle}
          d={path}
          className={cn(
            "stroke-2",
            highlightedMuscles.includes(muscle)
              ? "stroke-primary fill-primary/20"
              : "stroke-muted-foreground/50 fill-muted/20"
          )}
        />
      ))}
      
      {/* Outline */}
      <path
        d="M150,30 Q200,30 200,80 Q200,150 200,200 Q200,250 150,250 Q100,250 100,200 Q100,150 100,80 Q100,30 150,30"
        className="stroke-muted-foreground fill-none stroke-1"
      />
    </svg>
  );
}
