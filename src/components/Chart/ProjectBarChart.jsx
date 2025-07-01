import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const generatedYearData = [
  {
    year: 2023,
    data: [
      { month: "Jan", totalProjects: 10 },
      { month: "Feb", totalProjects: 18 },
      { month: "Mar", totalProjects: 51 },
      { month: "Apr", totalProjects: 24 },
      { month: "May", totalProjects: 17 },
      { month: "Jun", totalProjects: 66 },
      { month: "Jul", totalProjects: 37 },
      { month: "Aug", totalProjects: 31 },
      { month: "Sep", totalProjects: 21 },
      { month: "Oct", totalProjects: 49 },
      { month: "Nov", totalProjects: 88 },
      { month: "Dec", totalProjects: 13 },
    ],
  },
  {
    year: 2024,
    data: [
      { month: "Jan", totalProjects: 15 },
      { month: "Feb", totalProjects: 12 },
      { month: "Mar", totalProjects: 33 },
      { month: "Apr", totalProjects: 22 },
      { month: "May", totalProjects: 29 },
      { month: "Jun", totalProjects: 47 },
      { month: "Jul", totalProjects: 34 },
      { month: "Aug", totalProjects: 56 },
      { month: "Sep", totalProjects: 44 },
      { month: "Oct", totalProjects: 39 },
      { month: "Nov", totalProjects: 28 },
      { month: "Dec", totalProjects: 61 },
    ],
  },
  {
    year: 2025,
    data: [
      { month: "Jan", totalProjects: 2 },
      { month: "Feb", totalProjects: 4 },
      { month: "Mar", totalProjects: 6 },
      { month: "Apr", totalProjects: 3 },
      { month: "May", totalProjects: 9 },
      { month: "Jun", totalProjects: 11 },
      { month: "Jul", totalProjects: 14 },
      { month: "Aug", totalProjects: 18 },
      { month: "Sep", totalProjects: 20 },
      { month: "Oct", totalProjects: 25 },
      { month: "Nov", totalProjects: 17 },
      { month: "Dec", totalProjects: 22 },
    ],
  },
];

export default function ProjectBarChart({ selectedYear }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const yearData = generatedYearData.find(
      (data) => data.year === selectedYear
    );
    if (yearData) {
      setChartData(yearData.data);
    }
  }, [selectedYear]);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalProjects" fill="#3F80AE" barSize={20} />
          {/* <Bar dataKey="users" fill="#5856D6" barSize={20} /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
