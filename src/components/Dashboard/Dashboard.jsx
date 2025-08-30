import { useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { LuFolderKanban } from "react-icons/lu";

import {
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";

import RevenueAreaChart from "../UI/Chart/RevenueAreaChart";
import CompanyBarChart from "../UI/Chart/CompanyBarChart";
import {
  useCompanyByYearQuery,
  useDashboardOverviewQuery,
  useRevenueByYearQuery,
} from "../../Redux/api/dashboardApi";

export default function Dashboard() {
  const [totalCompanyByYear, setTotalCompanyByYear] = useState(2025);
  const [totalRevenueByYear, setTotalRevenueByYear] = useState(2025);

  const { data: dashboardOverviewData, isLoading } =
    useDashboardOverviewQuery();

  const { data: revenueByYearData, isLoading: revenueByYearLoading } =
    useRevenueByYearQuery(totalRevenueByYear);

  const { data: companyByYearData, isLoading: companyByYearLoading } =
    useCompanyByYearQuery(totalCompanyByYear);

  const dashboardData = dashboardOverviewData?.data || {};
  console.log("dashboardData", dashboardData);

  const revenueByYear = revenueByYearData?.data || [];
  console.log("revenueByYearData", revenueByYear);

  const companyByYear = companyByYearData?.data || [];
  console.log("companyByYearData", companyByYear);

  const handleTotalCompanyYearChange = (event) => {
    // console.log("year", event.target.value);
    setTotalCompanyByYear(event.target.value);
  };
  // const handleCompletedProjectYearChange = (event) => {
  //   setCompletedProjectByYear(event.target.value);
  // };
  const handleTotalRevenueYearChange = (event) => {
    // console.log("year", event.target.value);
    setTotalRevenueByYear(event.target.value);
  };

  // console.log("yaaaaaaaaaaaaaaaaaar", year);
  if (isLoading || revenueByYearLoading || companyByYearLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LinearProgress size="large" tip="Loading Terms and Conditions..." />
      </div>
    );
  }

  return (
    <div className="bg-[#efefef] px-10 py-3 h-[92vh] w-full">
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center justify-between gap-5">
          <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg px-8 py-4 w-full  h-28">
            <div className="flex items-center gap-2 text-[#333333]">
              <LuFolderKanban />
              <p className="font-medium text-lg">Total Company</p>
            </div>
            <p className="text-[#333333] text-3xl font-semibold">
              {" "}
              {dashboardData?.totalCompany}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg px-8 py-4 w-full h-28">
            <div className="flex items-center gap-2 text-[#333333]">
              <FaRegUser />
              <p className="font-medium text-lg">Total Employee</p>
            </div>
            <p className="text-[#333333] text-3xl font-semibold">
              {dashboardData?.totalEmployees}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg px-8 py-4 w-full  h-28">
            <div className="flex items-center gap-2 text-[#333333]">
              <LuFolderKanban />
              <p className="font-medium text-lg">Total Revenue</p>
            </div>
            <p className="text-[#333] text-3xl font-semibold">
              ${dashboardData?.totalRevenue}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 mt-5">
        <div className="bg-white shadow-xl w-full px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <p className="text-[#333333] font-semibold text-xl capitalize">
                total revenue monthly
              </p>
            </div>
            <div className="w-28">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  <div className="flex items-center">
                    <p>
                      <LuCalendar fontSize={20} />
                    </p>
                    {/* <p className="text-sm">Year</p> */}
                  </div>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={totalRevenueByYear}
                  label="Year"
                  onChange={handleTotalRevenueYearChange}
                  className="h-8"
                >
                  <MenuItem value={2025}>2025</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="mt-5">
            <RevenueAreaChart revenueByYear={revenueByYear} />
          </div>
        </div>
        <div className="flex items-center gap-3 w-full">
          {/* Project Bar Chart */}
          <div
            className="bg-white shadow-xl flex-1 px-5 py-3"
            style={{ minHeight: 325 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[#333333] font-semibold text-xl">
                Total Project Monthly
              </p>
              <div className="w-28">
                <FormControl fullWidth>
                  <InputLabel id="revenue-year-label">
                    <div className="flex items-center">
                      <p>
                        <LuCalendar fontSize={20} />
                      </p>
                      {/* <p className="text-sm">Year</p> */}
                    </div>
                  </InputLabel>
                  <Select
                    labelId="revenue-year-label"
                    id="revenue-year-select"
                    value={totalCompanyByYear}
                    label="Year"
                    onChange={handleTotalCompanyYearChange}
                    className="h-8"
                  >
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex mt-5 h-full">
              <CompanyBarChart companyByYear={companyByYear} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
