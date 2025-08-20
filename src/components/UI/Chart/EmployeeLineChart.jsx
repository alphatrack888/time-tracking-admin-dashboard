import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Updated data for working and break time
const data = [
  {
    day: "Mon",
    workingTime: 3,
    breakTime: 3,
  },
  {
    day: "Tue",
    workingTime: 4,
    breakTime: 1.5,
  },
  {
    day: "Wed",
    workingTime: 3.5,
    breakTime: 1,
  },
  {
    day: "Thu",
    workingTime: 6,
    breakTime: 2,
  },
  {
    day: "Fri",
    workingTime: 8,
    breakTime: 1,
  },
  {
    day: "Sat",
    workingTime: 5,
    breakTime: 0.5,
  },
  {
    day: "Sun",
    workingTime: 4,
    breakTime: 1,
  },
];

const EmployeeLineChart = () => {
  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="workingTime"
            stroke="#008000"
            activeDot={{ r: 8 }}
            name="Working Time (hrs)"
          />
          <Line
            type="monotone"
            dataKey="breakTime"
            stroke="#3F80AE"
            name="Break Time (hrs)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeLineChart;
