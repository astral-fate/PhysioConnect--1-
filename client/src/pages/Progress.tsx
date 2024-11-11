import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressChart } from '@/components/ui/progress-chart';
import useSWR from 'swr';

const Progress = () => {
  const { data: progress } = useSWR('/api/progress');
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">تتبع التقدم</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>مستوى الألم</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressChart data={progress?.painLevels} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>نطاق الحركة</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressChart data={progress?.mobility} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>التمارين المنزلية</CardTitle>
        </CardHeader>
        <CardContent>
          {progress?.exercises?.map((exercise: any) => (
            <div key={exercise.id} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">{exercise.name}</p>
                <p className="text-sm text-gray-500">{exercise.instructions}</p>
              </div>
              <p className="text-sm">{exercise.frequency}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;
