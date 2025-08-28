import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueAreaChart({ revenueByYear }) {
  // Log the revenueByYear to see its structure
  console.log("Revenue chart data:", revenueByYear);

  // Get the data for the selected year from the revenueByYear object
  const selectedYearData = revenueByYear.data;

  return (
    <ResponsiveContainer width="100%" height={275}>
      <AreaChart
        data={selectedYearData} // Use data for the selected year
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorEarning" x1="0" y1="0" x2="0" y2="1">
            <stop offset="30%" stopColor="#3F80AE" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#2AA0D7" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#3F80AE"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorEarning)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
