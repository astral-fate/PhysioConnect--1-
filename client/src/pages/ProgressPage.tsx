import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressChart } from '../components/ProgressChart';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

const HealthStatus = ({ emoji, label, value, trend }: { emoji: string, label: string, value: number, trend: 'up' | 'down' | 'stable' }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <span className="font-medium">{label}</span>
      </div>
      <span className={
        trend === 'up' ? 'text-green-600' :
        trend === 'down' ? 'text-red-600' :
        'text-yellow-600'
      }>
        {trend === 'up' ? 'متحسن' :
         trend === 'down' ? 'متراجع' :
         'مستقر'}
      </span>
    </div>
    <div className="h-2 bg-secondary rounded">
      <div 
        className={`h-2 rounded transition-all ${
          trend === 'up' ? 'bg-green-500' :
          trend === 'down' ? 'bg-red-500' :
          'bg-yellow-500'
        }`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

export default function ProgressPage() {
  const [_, setLocation] = useLocation();

  // Sample progress data
  const healthMetrics = [
    { emoji: '🦵', label: 'صحة المفاصل', value: 75, trend: 'up' as const },
    { emoji: '🏃', label: 'القدرة على الحركة', value: 85, trend: 'up' as const },
    { emoji: '😊', label: 'التحسن العام', value: 80, trend: 'stable' as const }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">تتبع التقدم</h1>
        <div className="flex gap-2">
          <Button onClick={() => setLocation('/chat')}>
            المحادثة مع المعالج
          </Button>
          <Button variant="outline" onClick={() => setLocation('/')}>
            العودة للرئيسية
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>المناطق المستهدفة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square max-w-[300px] mx-auto bg-muted rounded-lg flex items-center justify-center">
              <img
                src="/api/placeholder/300/300"
                alt="مناطق الألم"
                className="max-h-[80%] max-w-[80%] object-contain"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تقدم التعافي</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {healthMetrics.map((metric, index) => (
              <HealthStatus
                key={index}
                emoji={metric.emoji}
                label={metric.label}
                value={metric.value}
                trend={metric.trend}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>تحليل التقدم الأسبوعي</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ProgressChart />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
