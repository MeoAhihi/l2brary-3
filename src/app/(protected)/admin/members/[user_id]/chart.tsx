"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import classJoining from "@/constants/class-joining.json";

const chartConfig = {
  attendees: {
    label: "Sĩ số",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function MyChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={classJoining}>
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <XAxis
          dataKey="class"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <YAxis
          tickMargin={10}
          axisLine={false}
          tickLine={false}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <Bar dataKey="join_rate" fill="var(--chart-2)" radius={4} />
        <Bar dataKey="quiz_rate" fill="var(--chart-1)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
