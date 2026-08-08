"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartConfig, ChartContainer } from '../ui/chart';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';


export const description = "A radial chart with text"

const chartData = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig


export default function WeeklyProductivity() {
  return (
    <Card size={"sm"}>
        <CardHeader className={"flex items-center justify-between"}>
            <CardTitle>
                Weekly Productivity
            </CardTitle>
            <small className={"text-muted-foreground"}>May 22 - May 28</small>
        </CardHeader>
        <CardContent>
<div className={"grid grid-cols-2 items-center"}>
   <ChartContainer config={chartConfig}>
      <RadialBarChart data={chartData}>
        <RadialBar dataKey="value" />
        {/* <ChartTooltip content={<ChartTooltipContent />} /> */}
      </RadialBarChart>
    </ChartContainer>

        <div>
          <p>task completed</p>
        </div>
</div>
        </CardContent>
    </Card>
  )
}
