"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";
import { useMonthlyUserGrowth } from "@/hooks/analytics/track-growth.queries";

function TrackGrowthChart() {
  const { data: monthlyUserGrowth, isLoading, error } = useMonthlyUserGrowth();
  const chartConfig = {
    count: {
      label: "Thành viên mới",
      color: "bg-green-300",
    },
  } satisfies ChartConfig;
  if (isLoading) {
    return (
      <div className="flex min-h-32 w-full items-center justify-center">
        <Spinner className="h-20 w-20" />
      </div>
    );
  }

  if (error) {
    return <div>Rất tiếc, có lỗi xảy ra trong lúc tải dữ liệu.</div>;
  }

  return (
    <div>
      <ChartContainer config={chartConfig}>
        <LineChart
          data={monthlyUserGrowth}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#4ade80"
            name="Thành viên mới"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default TrackGrowthChart;
