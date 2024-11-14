import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage: number;
  date: string;
}

interface SalesSummaryChartProps {
  data: SalesSummary[];
}

const SalesSummaryChart = ({ data }: SalesSummaryChartProps) => {
  // Sort data by date
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Process data for the chart
  const chartData = sortedData.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }),
    totalValue: item.totalValue,
    changePercentage: item.changePercentage
  }));

  // Calculate overall trend
  const latestChange = sortedData[sortedData.length - 1]?.changePercentage || 0;
  const isPositiveTrend = latestChange > 0;

  // Format currency
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <Card className="mt-6 row-span-2 xl:row-spn-3 col-span-1 md:col-span-2 xl:col-span-1 ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Summary</CardTitle>
            <CardDescription>Daily sales totals and change percentage</CardDescription>
          </div>
          <div className={`flex items-center space-x-2 ${isPositiveTrend ? 'text-emerald-600' : 'text-red-600'}`}>
            {isPositiveTrend ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span className="text-sm font-medium">
              {latestChange > 0 ? '+' : ''}{latestChange.toFixed(2)}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                type="number"
                domain={[0, 'dataMax']}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={value => `$${(value / 1000000).toFixed(1)}M`}
                className="text-muted-foreground"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-2">
                          <div className="font-medium">{payload[0].payload.date}</div>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="text-primary">Total:</span>
                            <span className="font-medium">
                              {payload[0].value && formatCurrency(payload[0].value as number)}
                            </span>
                            <span className={payload[1] && Number(payload[1].value) >= 0 ? "text-emerald-500" : "text-red-500"}>
                              Change:
                            </span>
                            <span className="font-medium">
                              { payload[1].value  && Number(payload[1].value) > 0 ? '+' : ''}{Number(payload[1].value).toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="totalValue"
                fill="hsl(var(--primary))"
                barSize={40}
              />
              <Bar
                dataKey="changePercentage" 
                fill="hsl(var(--success))"
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesSummaryChart;