"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
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
   <ChartContainer config={chartConfig} className={"max-h-[200px]"}>
      <RadialBarChart data={chartData} style={{width:"50px", height:"50px"}}>
        <RadialBar dataKey="value" />
        <ChartTooltip content={<ChartTooltipContent />} />
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
