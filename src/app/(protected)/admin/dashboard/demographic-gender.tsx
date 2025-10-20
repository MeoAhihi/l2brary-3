import React from "react";
import { useUsersByGender } from "@/hooks/analytics/demographic.queries";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c"];

function DemographicGenderPieChart() {
  const { data, isLoading, isError } = useUsersByGender();

  if (isLoading) {
    return <div>Loading demographic data...</div>;
  }

  if (isError) {
    return <div>Error loading demographic data.</div>;
  }

  // data expected shape: [{ gender: "Male", count: 30 }, ...]
  const pieData =
    data?.map((item: any) => ({
      name: item.gender,
      value: item.count,
    })) ?? [];

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            label={({ name, value, percent }) =>
              `${name}: ${value} (${(percent * 100).toFixed(1)}%)`
            }
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number, name: string) => [value, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DemographicGenderPieChart;
