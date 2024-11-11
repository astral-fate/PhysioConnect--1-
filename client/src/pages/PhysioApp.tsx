import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import { useLocation } from 'wouter';
import { toArabicDate, toArabicTime } from '../lib/arabic-utils';

const PhysioApp = () => {
  const [_, setLocation] = useLocation();
  const [step, setStep] = useState('onboarding-injury');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<any | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Dummy data for prototype with more commonly supported emojis
  const dummyInjuryAreas = [
    { id: 'neck', name: 'ألم الرقبة', icon: '😣' },
    { id: 'back', name: 'ألم الظهر', icon: '⚡' },
    { id: 'knee', name: 'ألم الركبة', icon: '🦵' },
    { id: 'shoulder', name: 'الكتف', icon: '💪' },
  ];

  const dummyTrainers = [
    {
      id: 'T1',
      name: 'د. أحمد حسن',
      specialty: 'العلاج الطبيعي العام',
      rating: 4.8,
      image: '/api/placeholder/150/150'
    },
    {
      id: 'T2',
      name: 'د. سارة محمد',
      specialty: 'العلاج الرياضي',
      rating: 4.9,
      image: '/api/placeholder/150/150'
    }
  ];

  const OnboardingInjury = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">أين تشعر بالألم؟</h2>
      <div className="grid grid-cols-2 gap-4">
        {dummyInjuryAreas.map((area) => (
          <Card 
            key={area.id}
            className={`cursor-pointer transition-colors hover:border-primary ${
              selectedArea === area.id ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => setSelectedArea(area.id)}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <span className="text-4xl mb-4 emoji" role="img" aria-label={area.name}>{area.icon}</span>
              <span className="text-lg font-medium">{area.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button 
        className="w-full" 
        disabled={!selectedArea}
        onClick={() => setStep('onboarding-trainer')}
      >
        متابعة
      </Button>
    </div>
  );

  const OnboardingTrainer = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">اختر المعالج</h2>
      <div className="space-y-4">
        {dummyTrainers.map((trainer) => (
          <Card 
            key={trainer.id}
            className={`cursor-pointer transition-colors hover:border-primary ${
              selectedTrainer?.id === trainer.id ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => setSelectedTrainer(trainer)}
          >
            <CardContent className="flex items-center p-4 gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={trainer.image} alt={trainer.name} />
                <AvatarFallback>{trainer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-medium">{trainer.name}</h3>
                <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
                <div className="flex items-center mt-1">
                  <span className="emoji">{'⭐'.repeat(Math.floor(trainer.rating))}</span>
                  <span className="mr-1 text-sm text-muted-foreground">{trainer.rating}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-4 flex-row-reverse">
        <Button 
          className="flex-1" 
          disabled={!selectedTrainer}
          onClick={() => setStep('onboarding-schedule')}
        >
          متابعة
        </Button>
        <Button variant="outline" onClick={() => setStep('onboarding-injury')}>
          رجوع
        </Button>
      </div>
    </div>
  );

  const OnboardingSchedule = () => {
    const handleSchedule = () => {
      if (!selectedDate) return;
      
      setAppointments([
        ...appointments,
        {
          date: selectedDate,
          trainer: selectedTrainer,
          area: dummyInjuryAreas.find(a => a.id === selectedArea)
        }
      ]);
      setShowConfirmation(true);
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">اختر موعد الجلسة</h2>
        <Card>
          <CardContent className="p-4 flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border mx-auto"
              disabled={(date) => date < new Date()}
            />
          </CardContent>
        </Card>
        <div className="flex gap-4 flex-row-reverse">
          <Button 
            className="flex-1" 
            disabled={!selectedDate}
            onClick={handleSchedule}
          >
            تأكيد الموعد
          </Button>
          <Button variant="outline" onClick={() => setStep('onboarding-trainer')}>
            رجوع
          </Button>
        </div>
      </div>
    );
  };

  const HomePage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">أهلاً بك!</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setLocation('/progress')}>
            التقدم
          </Button>
          <Button variant="outline" onClick={() => setLocation('/exercises')}>
            التمارين
          </Button>
          <Button variant="outline" onClick={() => setLocation('/chat')}>
            المحادثة
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>المواعيد القادمة</CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.map((appointment, index) => (
            <div key={index} className="flex items-center gap-4 py-3 border-b last:border-b-0">
              <Avatar>
                <AvatarImage src={appointment.trainer.image} />
                <AvatarFallback>{appointment.trainer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium">{appointment.trainer.name}</h3>
                <p className="text-sm text-muted-foreground">
                  <span className="emoji" role="img" aria-label={appointment.area.name}>{appointment.area.icon}</span> {appointment.area.name}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <CalendarIcon className="ml-2 h-4 w-4 rtl-flip" />
                  {toArabicDate(appointment.date)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="ml-2 h-4 w-4" />
                  {toArabicTime(appointment.date)}
                </div>
              </div>
              <Button variant="outline">تغيير الموعد</Button>
            </div>
          ))}
          {appointments.length === 0 && (
            <p className="text-center text-muted-foreground py-4">لا توجد مواعيد قادمة</p>
          )}
        </CardContent>
      </Card>

      <Button className="w-full" onClick={() => setStep('onboarding-injury')}>
        حجز موعد جديد
      </Button>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      {step === 'onboarding-injury' && <OnboardingInjury />}
      {step === 'onboarding-trainer' && <OnboardingTrainer />}
      {step === 'onboarding-schedule' && <OnboardingSchedule />}
      {step === 'home' && <HomePage />}

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right">تم تأكيد الموعد!</AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              تم حجز موعدك بنجاح مع {selectedTrainer?.name}.
              سنرسل لك تفاصيل الموعد عبر البريد الإلكتروني.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-start">
            <AlertDialogAction onClick={() => {
              setShowConfirmation(false);
              setStep('home');
            }}>
              الذهاب إلى لوحة التحكم
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PhysioApp;
