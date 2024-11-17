"use client"

import React from 'react'
import { TrendingUp } from "lucide-react"
import { 
  CartesianGrid, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface RatingDataItem {
  rating: string;
  stockQuantity: number;
  name:string
}

interface RatingDataProps {
  data: RatingDataItem[];
}

const RatingData = ({ data }: RatingDataProps) => {
  // Transform the data to include an index for the X-axis
  const chartData = data.map((item, index) => ({
    index: item.name,
    rating: parseFloat(item.rating),
    stock: item.stockQuantity
  }))

  // Calculate average rating
  const avgRating = (
    chartData.reduce((sum, item) => sum + item.rating, 0) / chartData.length
  ).toFixed(1)

  return (
    <Card className="w-full mt-6 md:ml-0 ml-[-1rem] mx-auto  ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Product Ratings & Stock Analysis</CardTitle>
            <CardDescription>Average Rating: {avgRating} ⭐</CardDescription>
          </div>
          <div className="flex items-center space-x-2 text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">
              {chartData.length} Products
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData} 
              margin={{ top: 5, right: 10, bottom: 10, left: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="index"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                yAxisId="rating"
                domain={[0, 5]}
                orientation="left"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                label={{ value: 'Rating', angle: -90, position: 'insideLeft' }}
              />
              <YAxis
                yAxisId="stock"
                orientation="right"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                label={{ value: 'Stock Quantity', angle: 90, position: 'insideRight' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-2">
                          <div className="font-medium">{payload[0].payload.index}</div>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="text-blue-500">Rating:</span>
                            <span className="font-medium">{payload[0].value}⭐</span>
                            <span className="text-green-500">Stock:</span>
                            <span className="font-medium">{payload[1]?.value?.toLocaleString() ?? 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                yAxisId="rating"
                type="monotone"
                dataKey="rating"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
                name="Rating"
              />
              <Line
                yAxisId="stock"
                type="monotone"
                dataKey="stock"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))" }}
                name="Stock"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default RatingData