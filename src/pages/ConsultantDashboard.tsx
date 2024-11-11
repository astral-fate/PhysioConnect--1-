import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Calendar as CalendarIcon, 
  Users, 
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import PatientExerciseManager from '../components/PatientExerciseManager';

// Sample data - would come from API in production
const sessions = [
  {
    id: 1,
    patientName: 'أحمد محمد',
    date: '2024-11-12',
    time: '09:00',
    duration: '45 minutes',
    type: 'متابعة',
    status: 'قادم'
  },
  {
    id: 2,
    patientName: 'سارة أحمد',
    date: '2024-11-12',
    time: '10:00',
    duration: '30 minutes',
    type: 'جلسة أولى',
    status: 'قادم'
  }
];

const patients = [
  {
    id: 1,
    name: 'أحمد محمد',
    age: 45,
    condition: 'آلام أسفل الظهر',
    nextSession: '2024-11-12 09:00',
    progress: 75
  },
  {
    id: 2,
    name: 'سارة أحمد',
    age: 32,
    condition: 'إصابة في الركبة',
    nextSession: '2024-11-12 10:00',
    progress: 60
  }
];

const ConsultantDashboard = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState('sessions');
  const [scheduleView, setScheduleView] = useState('day');
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const handlePatientSelect = (patientId: number) => {
    setSelectedPatient(patientId);
    setSelectedTab('exercises');
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen" dir="rtl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">لوحة تحكم الأخصائي</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarIcon className="w-5 h-5" />
          <span>{date.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Calendar and Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>التقويم والمواعيد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                />
                <div className="space-y-4">
                  <h3 className="font-semibold">جلسات اليوم</h3>
                  {sessions.map(session => (
                    <div 
                      key={session.id}
                      className="p-4 rounded-lg border bg-white hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{session.patientName}</span>
                        <span className="text-sm text-blue-600">{session.time}</span>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>{session.duration}</span>
                        <span>{session.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Management */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>إدارة المواعيد</CardTitle>
                <div className="flex gap-2">
                  <button 
                    className={`px-3 py-1 rounded ${scheduleView === 'day' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                    onClick={() => setScheduleView('day')}
                  >
                    يومي
                  </button>
                  <button 
                    className={`px-3 py-1 rounded ${scheduleView === 'week' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                    onClick={() => setScheduleView('week')}
                  >
                    أسبوعي
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <button className="p-2 rounded hover:bg-gray-100">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <span className="font-medium">
                    {date.toLocaleDateString('ar-SA', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </span>
                  <button className="p-2 rounded hover:bg-gray-100">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {Array.from({ length: 8 }).map((_, index) => {
                    const hour = index + 9;
                    const session = sessions.find(s => parseInt(s.time) === hour);
                    
                    return (
                      <div 
                        key={hour}
                        className={`p-3 rounded-lg border ${
                          session ? 'bg-blue-50 border-blue-200' : 'bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{`${hour}:00`}</span>
                          {session && (
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{session.patientName}</span>
                              <span className="text-sm text-gray-600">{session.type}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Patients and Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>المرضى النشطون</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map(patient => (
                  <div 
                    key={patient.id}
                    className="p-4 rounded-lg border bg-white hover:bg-gray-50 cursor-pointer"
                    onClick={() => handlePatientSelect(patient.id)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{patient.name}</span>
                      <span className="text-sm text-gray-600">{patient.age} سنة</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{patient.condition}</div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-600">
                        الجلسة القادمة: {new Date(patient.nextSession).toLocaleDateString('ar-SA')}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${patient.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{patient.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إحصائيات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">المرضى اليوم</span>
                  </div>
                  <span className="text-2xl font-bold">{sessions.length}</span>
                </div>
                <div className="p-4 rounded-lg bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">نسبة التحسن</span>
                  </div>
                  <span className="text-2xl font-bold">70%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Exercise Assignment Section */}
      {selectedPatient && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                تعيين التمارين - {patients.find(p => p.id === selectedPatient)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PatientExerciseManager />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ConsultantDashboard;
