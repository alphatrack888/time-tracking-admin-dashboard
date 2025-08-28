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

export default function CompanyBarChart({ companyByYear }) {
  console.log("Company chart data:", companyByYear);

  const selectedYearData = companyByYear.data;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={selectedYearData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="count" fill="#3F80AE" barSize={20} />
          {/* <Bar dataKey="users" fill="#5856D6" barSize={20} /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
