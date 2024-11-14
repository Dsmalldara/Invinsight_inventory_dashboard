
const COLORS = [
  '#0088FE',  // blue
  '#00C49F',  // green
  '#FFBB28',  // yellow
  '#FF8042',  // orange
  '#8884d8',  // purple
  '#82ca9d',  // light green
];

// Assuming your aggregatedData looks something like this:
// const aggregatedData = [
//   { category: "Food", amount: 500 },
//   { category: "Transport", amount: 300 },
//   { category: "Entertainment", amount: 200 },
//   // ... etc
// ];

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMemo, useState } from 'react';
import { AggregatedDataItem } from './page';



type AggregatedData = Record<string, AggregatedDataItem>;

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number, value: number, name: string }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="middle"
      className="text-xs"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

interface ExpensesPieChartProps {
  aggregatedData: AggregatedDataItem[];
}

export const ExpensesPieChart = ({ aggregatedData }: ExpensesPieChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
    console.log(aggregatedData)
  return (
    <div className="w-full min-h-[400px] bg-white shadow rounded-lg  md:p-6">
    <ResponsiveContainer width="98%" height={400}>
      <PieChart>
        <Pie
          data={aggregatedData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={CustomLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="amount"
          nameKey="name"
          onMouseEnter={(_, index) => setActiveIndex(index)}
        >
          {aggregatedData.map((entry: AggregatedDataItem, index: number) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => `$${value.toLocaleString()}`}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px'
          }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          formatter={(value, entry) => (
            <span style={{ color: entry.color }} className="text-sm">
              {value}: ${((entry?.payload as unknown) as AggregatedDataItem)?.amount.toLocaleString()}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
  );
};