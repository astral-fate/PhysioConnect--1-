import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Exercise categories data
const exerciseCategories = [
  {
    id: 1,
    name: 'تمارين العمود الفقري',
    exercises: [
      {
        id: 1,
        name: 'تمديد العمود الفقري',
        duration: '10 دقائق',
        difficulty: 'متوسط',
        sets: '3 مجموعات',
        reps: '10 تكرارات',
        description: 'استلقِ على ظهرك مع ثني ركبتيك. اسحب ركبتيك برفق نحو صدرك باستخدام يديك حتى تشعر بتمدد خفيف في أسفل الظهر.',
        instructions: [
          'استلقِ على ظهرك على سطح مستوٍ',
          'اثنِ ركبتيك وضع قدميك على الأرض',
          'اسحب ركبتيك نحو صدرك ببطء',
          'حافظ على الوضع لمدة 15-30 ثانية',
          'كرر التمرين 3 مرات'
        ],
        imagePlaceholder: '/api/placeholder/400/300'
      }
    ]
  }
];

const ExerciseDetailCard = ({ exercise }: { exercise: any }) => (
  <Card className="w-full">
    <CardContent className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img 
            src={exercise.imagePlaceholder} 
            alt={exercise.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">{exercise.name}</h3>
          <div>
            <h4 className="font-semibold mb-2">المجموعات والتكرارات:</h4>
            <p>{exercise.sets} × {exercise.reps}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">الوصف:</h4>
            <p className="text-gray-700">{exercise.description}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">خطوات التمرين:</h4>
            <ol className="list-decimal list-inside space-y-1">
              {exercise.instructions.map((instruction: string, index: number) => (
                <li key={index} className="text-gray-700">{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const PatientExerciseManager = () => {
  const [selectedExercises, setSelectedExercises] = useState<any[]>([]);

  const handleExerciseToggle = (exercise: any) => {
    setSelectedExercises(prev => {
      const exists = prev.find(ex => ex.id === exercise.id);
      if (exists) {
        return prev.filter(ex => ex.id !== exercise.id);
      }
      return [...prev, exercise];
    });
  };

  const handleSendExercises = () => {
    // This would typically make an API call to send the exercises
    console.log('Sending exercises to patient:', selectedExercises);
    alert('تم إرسال التمارين للمريض بنجاح');
  };

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">اختيار التمارين</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={exerciseCategories[0].id.toString()} className="w-full">
            <TabsList className="w-full justify-start mb-4">
              {exerciseCategories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id.toString()}
                  className="px-4 py-2"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {exerciseCategories.map(category => (
              <TabsContent key={category.id} value={category.id.toString()}>
                <div className="grid grid-cols-1 gap-6">
                  {category.exercises.map(exercise => (
                    <div key={exercise.id}>
                      <div 
                        className={`mb-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedExercises.find(ex => ex.id === exercise.id)
                            ? 'bg-blue-50 border-blue-500'
                            : 'bg-white hover:bg-gray-50'
                        }`}
                        onClick={() => handleExerciseToggle(exercise)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{exercise.name}</h3>
                          <Button 
                            variant={selectedExercises.find(ex => ex.id === exercise.id) ? "default" : "outline"}
                          >
                            {selectedExercises.find(ex => ex.id === exercise.id) 
                              ? 'تم الاختيار' 
                              : 'اختيار التمرين'}
                          </Button>
                        </div>
                      </div>
                      <ExerciseDetailCard exercise={exercise} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {selectedExercises.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">التمارين المختارة ({selectedExercises.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedExercises.map(exercise => (
                <div key={exercise.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-4">
                    <img 
                      src={exercise.imagePlaceholder} 
                      alt={exercise.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{exercise.name}</h3>
                      <p className="text-sm text-gray-600">{exercise.sets} × {exercise.reps}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => handleExerciseToggle(exercise)}
                    className="text-red-500 hover:text-red-700"
                  >
                    إزالة
                  </Button>
                </div>
              ))}

              <div className="flex justify-end gap-4 mt-6">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedExercises([])}
                >
                  إعادة ضبط
                </Button>
                <Button 
                  onClick={handleSendExercises}
                >
                  إرسال التمارين للمريض
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientExerciseManager;
