import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MuscleSelectorProps {
  onSelect: (area: string) => void;
  selected: string;
}

export const MuscleSelector: React.FC<MuscleSelectorProps> = ({ onSelect, selected }) => {
  const muscleGroups = [
    { id: 'neck', name: 'الرقبة', icon: '🤕' },
    { id: 'shoulder', name: 'الكتف', icon: '💪' },
    { id: 'back', name: 'الظهر', icon: '⚡' },
    { id: 'knee', name: 'الركبة', icon: '🦿' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {muscleGroups.map((group) => (
        <Card 
          key={group.id}
          className={`cursor-pointer transition-colors hover:bg-gray-50 
            ${selected === group.id ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => onSelect(group.id)}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <span className="text-4xl mb-2">{group.icon}</span>
            <span className="text-lg font-medium">{group.name}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
