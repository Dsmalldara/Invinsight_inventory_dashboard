import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage: number;
  date: string;
}

interface PurchaseSummaryChartProps {
  data: PurchaseSummary[];
}

const PurchaseSummaryChart = ({ data }: PurchaseSummaryChartProps) => {
  // Sort data by date
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Process data for the chart
  const chartData = sortedData.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }),
    total: item.totalPurchased,
    change: item.changePercentage
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
    <Card className="row-span-2 xl:row-span-3 mt-6 h-[400px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Purchase Summary</CardTitle>
            <CardDescription>Daily purchase totals and change percentage</CardDescription>
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
        <div className="h-[300px] w-[100%]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 1, right: 1, bottom: 1, left: 1 }}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis 
                yAxisId="total"
                orientation="left"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={value => `$${(value / 1000000).toFixed(1)}M`}
                className="text-muted-foreground"
              />
              <YAxis 
                yAxisId="change"
                orientation="right"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={value => `${value.toFixed(0)}%`}
                className="text-muted-foreground"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border p-2 shadow-sm">
                        <div className="grid gap-2">
                          <div className="font-medium">{payload[0].payload.date}</div>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="text-primary">Total:</span>
                            <span className="font-medium">
                              {payload[0] && typeof payload[0].value === 'number' ? formatCurrency(payload[0].value) : 'N/A'}
                            </span>
                            <span className={payload[1] && typeof payload[1].value === 'number' && payload[1].value >= 0 ? "text-emerald-500" : "text-red-500"}>
                              Change:
                            </span>
                            <span className="font-medium">
                              {payload[1] && typeof payload[1].value === 'number' && payload[1].value > 0 ? '+' : ''}
                              {payload[1] && typeof payload[1].value === 'number' ? payload[1].value.toFixed(2) : 'N/A'}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                yAxisId="total"
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--primary))"
                fill="url(#totalGradient)"
                strokeWidth={2}
              />
              <Line
                yAxisId="change"
                type="monotone"
                dataKey="change"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseSummaryChart;