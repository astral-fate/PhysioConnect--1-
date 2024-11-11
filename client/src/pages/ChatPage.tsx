import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocation } from 'wouter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';
import { MuscleVisualization } from '../components/MuscleVisualization';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'trainer';
  timestamp: Date;
  hasExercise?: boolean;
}

interface Exercise {
  id: number;
  name: string;
  duration: string;
  sets: number;
  reps: number;
  image: string;
  description: string;
  muscles: string[];
}

const assignedExercises: Exercise[] = [
  {
    id: 1,
    name: "تمارين تقوية عضلات الظهر",
    duration: "١٥ دقيقة",
    sets: 3,
    reps: 12,
    image: "/api/placeholder/200/150",
    description: "تمارين مخصصة لتقوية عضلات الظهر السفلية",
    muscles: ['back']
  },
  {
    id: 2,
    name: "تمارين تمدد العمود الفقري",
    duration: "١٠ دقائق",
    sets: 2,
    reps: 10,
    image: "/api/placeholder/200/150",
    description: "تمارين لزيادة مرونة العمود الفقري",
    muscles: ['back', 'shoulders']
  }
];

const ExerciseSummary = ({ exercises, onClose }: { exercises: Exercise[], onClose: () => void }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">التمارين المخصصة</h3>
      <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
        <X className="w-5 h-5" />
      </button>
    </div>
    {exercises.map(exercise => (
      <Card key={exercise.id} className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="space-y-2">
            <h4 className="font-medium text-lg">{exercise.name}</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>المدة: {exercise.duration}</p>
              <p>المجموعات: {exercise.sets}</p>
              <p>التكرارات: {exercise.reps}</p>
            </div>
            <p className="text-sm">{exercise.description}</p>
          </div>
          <div className="h-40">
            <MuscleVisualization 
              highlightedMuscles={exercise.muscles}
              progress={100}
            />
          </div>
        </div>
      </Card>
    ))}
  </div>
);

export default function ChatPage() {
  const [_, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'مرحباً، كيف يمكنني مساعدتك اليوم؟',
      sender: 'trainer',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showExercises, setShowExercises] = useState(false);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    }]);
    setNewMessage('');

    // Simulate trainer response with exercise
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: 'لقد قمت بتخصيص بعض التمارين لحالتك. يمكنك مراجعتها الآن.',
        sender: 'trainer',
        timestamp: new Date(),
        hasExercise: true
      }]);
      setTimeout(() => setShowExercises(true), 1000);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">المحادثة مع المعالج</h1>
        <div className="flex gap-2">
          <Button onClick={() => setLocation('/exercises')}>
            التمارين
          </Button>
          <Button variant="outline" onClick={() => setLocation('/')}>
            العودة للرئيسية
          </Button>
        </div>
      </div>

      <Card className="flex-1">
        <ScrollArea className="h-[calc(100vh-200px)] p-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
                <Avatar>
                  <AvatarImage src={message.sender === 'trainer' ? '/trainer.jpg' : '/user.jpg'} />
                  <AvatarFallback>{message.sender === 'trainer' ? 'م' : 'أ'}</AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.text}</p>
                  {message.hasExercise && (
                    <Button
                      variant="link"
                      className="p-0 h-auto text-sm underline"
                      onClick={() => setShowExercises(true)}
                    >
                      عرض التمارين
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <CardContent className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              onKeyPress={e => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend}>إرسال</Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showExercises} onOpenChange={setShowExercises}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>التمارين المخصصة</DialogTitle>
            <p className="text-sm text-muted-foreground">
              قائمة التمارين المخصصة لحالتك من قبل المعالج
            </p>
          </DialogHeader>
          <ExerciseSummary 
            exercises={assignedExercises}
            onClose={() => setShowExercises(false)}
          />
          <DialogFooter>
            <Button onClick={() => {
              setShowExercises(false);
              setLocation('/exercises');
            }}>
              عرض كل التمارين
            </Button>
            <Button variant="outline" onClick={() => setShowExercises(false)}>
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}