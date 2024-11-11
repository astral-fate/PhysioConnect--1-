import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import useSWR from 'swr';

const PhysioApp = () => {
  const { data: appointments } = useSWR('/api/appointments');
  const { data: profile } = useSWR('/api/profile');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">مرحباً {profile?.name}</h1>
        <div className="space-x-4 flex">
          <Button asChild variant="outline">
            <Link href="/chat">المحادثات</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/progress">التقدم</Link>
          </Button>
          <Button asChild>
            <Link href="/book">حجز موعد جديد</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>المواعيد القادمة</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments?.map((apt: any) => (
              <div key={apt.id} className="flex items-center space-x-4 py-3">
                <Avatar>
                  <AvatarImage src={apt.therapist.image} />
                  <AvatarFallback>{apt.therapist.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{apt.therapist.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(apt.date).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>التقويم</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PhysioApp;
