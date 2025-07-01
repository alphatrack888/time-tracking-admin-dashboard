import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    year: 2023,
    data: [
      { month: "Jan", earning: 4000 },
      { month: "Feb", earning: 3000 },
      { month: "Mar", earning: 5000 },
      { month: "Apr", earning: 4000 },
      { month: "May", earning: 6000 },
      { month: "Jun", earning: 7000 },
      { month: "Jul", earning: 8000 },
      { month: "Aug", earning: 6000 },
      { month: "Sep", earning: 7000 },
      { month: "Oct", earning: 9000 },
      { month: "Nov", earning: 10000 },
      { month: "Dec", earning: 11000 },
    ],
  },
  {
    year: 2024,
    data: [
      { month: "Jan", earning: 3500 },
      { month: "Feb", earning: 3200 },
      { month: "Mar", earning: 5100 },
      { month: "Apr", earning: 4200 },
      { month: "May", earning: 6100 },
      { month: "Jun", earning: 6900 },
      { month: "Jul", earning: 7600 },
      { month: "Aug", earning: 6400 },
      { month: "Sep", earning: 7100 },
      { month: "Oct", earning: 9500 },
      { month: "Nov", earning: 10500 },
      { month: "Dec", earning: 11500 },
    ],
  },
  {
    year: 2025,
    data: [
      { month: "Jan", earning: 5000 },
      { month: "Feb", earning: 3800 },
      { month: "Mar", earning: 5200 },
      { month: "Apr", earning: 4600 },
      { month: "May", earning: 6300 },
      { month: "Jun", earning: 7500 },
      { month: "Jul", earning: 8000 },
      { month: "Aug", earning: 6500 },
      { month: "Sep", earning: 7200 },
      { month: "Oct", earning: 9800 },
      { month: "Nov", earning: 10700 },
      { month: "Dec", earning: 11800 },
    ],
  },
];

export default function EmployeeAreaChart({ selectedYear }) {
  // Find the data for the selected year
  const selectedYearData = data.find(
    (yearData) => yearData.year === selectedYear
  );

  return (
    <ResponsiveContainer width="100%" height={275}>
      <AreaChart
        data={selectedYearData ? selectedYearData.data : []} // Use data based on selected year
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
          dataKey="earning"
          stroke="#3F80AE"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorEarning)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
