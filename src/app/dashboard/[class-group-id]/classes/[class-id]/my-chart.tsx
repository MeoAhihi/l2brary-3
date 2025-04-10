"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { session: "Buổi 1", attendees: 18 },
  { session: "Buổi 2", attendees: 30 },
  { session: "Buổi 3", attendees: 23 },
  { session: "Buổi 4", attendees: 73 },
  { session: "Buổi 5", attendees: 20 },
  { session: "Buổi 6", attendees: 21 },
];

const chartConfig = {
  attendees: {
    label: "Sĩ số",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function MyChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <XAxis
          dataKey="session"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <Bar dataKey="attendees" fill="var(--chart-2)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
