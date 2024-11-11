import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { MuscleVisualization } from '../components/MuscleVisualization';

interface Exercise {
  id: number;
  name: string;
  duration: string;
  sets: number;
  reps: number;
  description: string;
  muscles: string[];
}

const exercises: Exercise[] = [
  {
    id: 1,
    name: "تمارين تقوية عضلات الظهر",
    duration: "١٥ دقيقة",
    sets: 3,
    reps: 12,
    description: "تمارين مخصصة لتقوية عضلات الظهر السفلية",
    muscles: ['back']
  },
  {
    id: 2,
    name: "تمارين تمدد العمود الفقري",
    duration: "١٠ دقائق",
    sets: 2,
    reps: 10,
    description: "تمارين لزيادة مرونة العمود الفقري",
    muscles: ['back', 'shoulders']
  },
  {
    id: 3,
    name: "تمارين الكتف",
    duration: "٢٠ دقيقة",
    sets: 4,
    reps: 15,
    description: "تمارين لتقوية وتمديد عضلات الكتف",
    muscles: ['shoulders']
  }
];

export default function ExercisesPage() {
  const [_, setLocation] = useLocation();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">التمارين المخصصة</h1>
        <div className="flex gap-2">
          <Button onClick={() => setLocation('/chat')}>
            المحادثة مع المعالج
          </Button>
          <Button variant="outline" onClick={() => setLocation('/')}>
            العودة للرئيسية
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {exercises.map(exercise => (
          <Card key={exercise.id}>
            <CardHeader>
              <CardTitle>{exercise.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-sm space-y-2">
                    <p className="text-muted-foreground">المدة: {exercise.duration}</p>
                    <p className="text-muted-foreground">المجموعات: {exercise.sets}</p>
                    <p className="text-muted-foreground">التكرارات: {exercise.reps}</p>
                  </div>
                  <p>{exercise.description}</p>
                </div>
                <div className="aspect-square max-w-[300px] mx-auto">
                  <MuscleVisualization 
                    highlightedMuscles={exercise.muscles}
                    progress={100}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
