import React from "react";
import { useUsersByRank } from "@/hooks/analytics/demographic.queries";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

function DemographicRankPieChart() {
  const { data, isLoading, error } = useUsersByRank();

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Có lỗi xảy ra khi tải dữ liệu.</div>;
  }

  // Calculate the total for percentage calculation
  const total = data.reduce((sum: number, entry: any) => sum + entry.count, 0);

  // Add percentage property to each entry for display/legend if needed
  const dataWithPercentage = data.map((entry: any) => ({
    ...entry,
    percentage: total > 0 ? (entry.count / total) * 100 : 0,
  }));

  // Define an array of green color shades to use for the pie slices
  const greenColors = [
    "#4ade80", // green-400
    "#22c55e", // green-500
    "#16a34a", // green-600
    "#15803d", // green-700
    "#166534", // green-800
    "#065f46", // green-900
  ];

  // Build a chart config with green gradient colors per rank
  const chartConfig = dataWithPercentage.reduce(
    (acc: object, cur: { rank: string; count: number }, index: number) => ({
      ...acc,
      [cur.rank]: {
        label:
          cur.rank +
          ` (${total > 0 ? ((cur.count / total) * 100).toFixed(1) : "0.0"}%)`,
        color: greenColors[index % greenColors.length],
      },
    }),
    {},
  ) satisfies ChartConfig;

  // Custom tooltip to show rank, count, and percentage
  function CustomTooltip({ active, payload }: any) {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div className="rounded bg-white px-3 py-2 text-xs text-gray-500 shadow">
          <strong>{entry.rank}</strong>
          <br />
          {entry.count} ({((entry.count / total) * 100).toFixed(1)}%)
        </div>
      );
    }
    return null;
  }

  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Pie data={dataWithPercentage} dataKey="count" nameKey="rank">
            {dataWithPercentage.map((entry: any, index: number) => (
              <Cell
                key={`cell-${entry.rank}`}
                fill={greenColors[index % greenColors.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ChartContainer>
    </div>
  );
}

export default DemographicRankPieChart;
