import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressChart } from '../components/ProgressChart';
import { MuscleVisualization } from '../components/MuscleVisualization';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function ProgressPage() {
  const [_, setLocation] = useLocation();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">تتبع التقدم</h1>
        <Button variant="outline" onClick={() => setLocation('/')}>
          العودة للرئيسية
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>تحليل التقدم</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ProgressChart />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>صحة الظهر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>مستوى الألم</span>
                <span className="text-green-600">متحسن</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-green-500 rounded" style={{ width: '70%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>العضلات المستهدفة</CardTitle>
          </CardHeader>
          <CardContent>
            <MuscleVisualization 
              highlightedMuscles={['back', 'shoulders']}
              progress={75}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
