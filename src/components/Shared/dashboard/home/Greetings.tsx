"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { AreaChart, Bar, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  streak: {
    label: "Streak",
    color: ""
  }
} satisfies ChartConfig;

export default function Greetings() {
  const chartData = [
    { day: "Monday", desktop: 305, mobile: 200 },
    { day: "Tuesday", desktop: 237, mobile: 120 },
    { day: "Wednesday", desktop: 73, mobile: 190 },
    { day: "Thursday", desktop: 209, mobile: 130 },
    { day: "Friday", desktop: 214, mobile: 140 },
    { day: "Sunday", desktop: 186, mobile: 80 },
    { day: "Saturday", desktop: 186, mobile: 80 },
]
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className={"text-2xl font-bold"}>Good Evening, Shibu 👋</h1>

        <div className={"text-muted-foreground"}>
          <p>Lets build something amazing today.</p>
          <p>Wed, May 28, 2026 </p>
        </div>
      </div>

      <Card size={"sm"} className={"w-md p-0"}>
        <CardContent className="flex flex-wrap items-center justify-between gap-6">
          <div className={"flex flex-col items-center justify-center"}>
            <CardTitle className={"text-xl"}>🔥21</CardTitle>
            <CardDescription>Day Streak</CardDescription>
          </div>

          <ChartContainer config={chartConfig} className="h-26 w-xs">
  <AreaChart accessibilityLayer data={chartData}>
    {/* <CartesianGrid vertical={false} /> */}
    <XAxis
      dataKey="day"
      tickLine={false}
      tickMargin={0}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 1)}
    />
    {/* <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} /> */}
    <Bar dataKey="desktop" fill="var(--primary)" radius={4} />
  </AreaChart>
</ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
