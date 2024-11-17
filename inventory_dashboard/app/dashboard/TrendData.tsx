import React from 'react';
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TrendInfoItem {
  date: string;
  amount: string;
}

interface TrendDataProps {
  trendInfo: TrendInfoItem[][];
}

const TrendData: React.FC<TrendDataProps> = ({ trendInfo }) => {
  // Process data: Flatten the array of arrays, parse dates and amounts, sort chronologically
  const processedData = trendInfo.reduce((acc: { date: Date; amount: number }[], curr: { date: string; amount: string }[]) => {
    return acc.concat(
      curr.map((item: { date: string; amount: string }) => ({
        date: new Date(item.date),
        amount: parseFloat(item.amount)
      }))
    );
  }, [])
  .sort((a: { date: Date; amount: number }, b: { date: Date; amount: number }) => a.date.getTime() - b.date.getTime())
  .map((item: { date: Date; amount: number }) => ({
    date: item.date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    amount: isNaN(item.amount) ? 0 : item.amount
  }));

  console.log(processedData)
  // Calculate trend percentage
  let trendPercentage = '0.0';
  let isUpTrend = false;

  if (processedData.length >= 2) {
    const lastTwoMonths = processedData.slice(-2);
    trendPercentage = ((lastTwoMonths[1].amount - lastTwoMonths[0].amount) / lastTwoMonths[0].amount * 100).toFixed(1);
    isUpTrend = parseFloat(trendPercentage) > 0;
  }

  return (
    <Card className="w-full md:mt-6 mt-2 ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Financial Trends</CardTitle>
            <CardDescription>Monthly transaction amounts</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className={isUpTrend ? "text-green-500" : "text-red-500"} />
            <span className={isUpTrend ? "text-green-500" : "text-red-500"}>
              {isUpTrend ? "+" : ""}{trendPercentage}% this month
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData}    margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                className="text-xs"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-xs"
                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="font-medium">Amount:</span>
                          <span>${payload?.[0]?.value?.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Showing monthly transaction totals over time
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default TrendData;