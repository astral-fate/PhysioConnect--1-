import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { date: '١/١', pain: 8, mobility: 4 },
  { date: '١/٢', pain: 7, mobility: 5 },
  { date: '١/٣', pain: 6, mobility: 6 },
  { date: '١/٤', pain: 5, mobility: 7 },
  { date: '١/٥', pain: 4, mobility: 8 },
  { date: '١/٦', pain: 3, mobility: 8 },
  { date: '١/٧', pain: 2, mobility: 9 },
];

export function ProgressChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip 
          contentStyle={{ direction: 'rtl' }}
          formatter={(value, name) => [value, name === 'pain' ? 'مستوى الألم' : 'الحركة']}
        />
        <Line 
          type="monotone" 
          dataKey="pain" 
          stroke="hsl(var(--destructive))" 
          name="مستوى الألم"
        />
        <Line 
          type="monotone" 
          dataKey="mobility" 
          stroke="hsl(var(--primary))" 
          name="الحركة"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
