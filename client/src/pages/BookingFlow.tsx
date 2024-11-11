import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { MuscleSelector } from '@/components/ui/muscle-selector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const BookingFlow = () => {
  const [step, setStep] = useState(1);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleBooking = async () => {
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          area: selectedArea,
          therapistId: selectedTherapist?.id,
          date: selectedDate
        })
      });

      if (response.ok) {
        toast({
          title: "تم الحجز بنجاح",
          description: "سيتم إرسال تفاصيل الموعد إلى بريدك الإلكتروني"
        });
        setLocation('/');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "الرجاء المحاولة مرة أخرى"
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">حجز موعد جديد</h1>
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                step >= i ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl">اختر منطقة العلاج</h2>
          <MuscleSelector onSelect={setSelectedArea} selected={selectedArea} />
          <Button 
            className="w-full" 
            disabled={!selectedArea}
            onClick={() => setStep(2)}
          >
            التالي
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl">اختر المعالج</h2>
          <div className="grid gap-4">
            {/* Therapist selection cards */}
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => setStep(1)}>
              السابق
            </Button>
            <Button 
              className="flex-1"
              disabled={!selectedTherapist}
              onClick={() => setStep(3)}
            >
              التالي
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl">اختر الموعد</h2>
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => setStep(2)}>
              السابق
            </Button>
            <Button 
              className="flex-1"
              disabled={!selectedDate}
              onClick={handleBooking}
            >
              تأكيد الحجز
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingFlow;
