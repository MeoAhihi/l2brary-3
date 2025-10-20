import React from "react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { useUsersByAge } from "@/hooks/analytics/demographic.queries";

function DemographicAgePieChart() {
  const { data, isLoading, error } = useUsersByAge();

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Có lỗi xảy ra khi tải dữ liệu.</div>;
  }

  // Calculate the total count for percentage computation
  const total = data.reduce((sum: number, entry: any) => sum + entry.count, 0);

  // Add percentage property to each entry for display/legend if needed
  const dataWithPercentage = data.map((entry: any) => ({
    ...entry,
    percentage: total > 0 ? (entry.count / total) * 100 : 0,
  }));

  // Define a palette with blue shades for the pie slices
  const blueColors = [
    "#60a5fa", // blue-400
    "#3b82f6", // blue-500
    "#2563eb", // blue-600
    "#1d4ed8", // blue-700
    "#1e40af", // blue-800
    "#1e3a8a", // blue-900
  ];

  // Chart config for legend/labels/colors
  const chartConfig = dataWithPercentage.reduce(
    (acc: object, cur: { ageGroup: string; count: number }, index: number) => ({
      ...acc,
      [cur.ageGroup]: {
        label:
          cur.ageGroup +
          ` (${total > 0 ? ((cur.count / total) * 100).toFixed(1) : "0.0"}%)`,
        color: blueColors[index % blueColors.length],
      },
    }),
    {},
  ) satisfies ChartConfig;

  // Custom Recharts tooltip
  function CustomTooltip({ active, payload }: any) {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div className="rounded bg-white px-3 py-2 text-xs text-gray-500 shadow">
          <strong>{entry.ageGroup}</strong>
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
          <Pie data={dataWithPercentage} dataKey="count" nameKey="ageGroup">
            {dataWithPercentage.map((entry: any, index: number) => (
              <Cell
                key={`cell-${entry.ageGroup}`}
                fill={blueColors[index % blueColors.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ChartContainer>
    </div>
  );
}

export default DemographicAgePieChart;
