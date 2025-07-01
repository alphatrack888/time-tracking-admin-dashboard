import { useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { LuFolderKanban } from "react-icons/lu";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import ProjectPieChart from "../Chart/ProjectPieChart";
import EmployeeAreaChart from "../Chart/EmployeeAreaChart";
import ProjectBarChart from "../Chart/ProjectBarChart";

export default function Dashboard() {
  const [totalProjectByYear, setTotalProjectByYear] = useState(2025);
  const [completedProjectByYear, setCompletedProjectByYear] = useState(2025);
  const [totalEmployeeByYear, setTotalEmployeeByYear] = useState(2025);

  const handleTotalProjectYearChange = (event) => {
    // console.log("year", event.target.value);
    setTotalProjectByYear(event.target.value);
  };
  const handleCompletedProjectYearChange = (event) => {
    // console.log("year", event.target.value);
    setCompletedProjectByYear(event.target.value);
  };
  const handleTotalEmployeeYearChange = (event) => {
    // console.log("year", event.target.value);
    setTotalEmployeeByYear(event.target.value);
  };

  // console.log("yaaaaaaaaaaaaaaaaaar", year);

  return (
    <div className="bg-[#efefef] px-10 py-3 h-[92vh] w-full">
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center justify-between gap-5">
          <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg px-8 py-4 w-full h-28">
            <div className="flex items-center gap-2 text-[#333333]">
              <FaRegUser />
              <p className="font-medium text-lg">Total Employee</p>
            </div>
            <p className="text-[#333333] text-3xl font-semibold">320</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg px-8 py-4 w-full  h-28">
            <div className="flex items-center gap-2 text-[#333333]">
              <LuFolderKanban />
              <p className="font-medium text-lg">Total Project</p>
            </div>
            <p className="text-[#333333] text-3xl font-semibold">134</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg px-8 py-4 w-full  h-28">
            <div className="flex items-center gap-2 text-[#333333]">
              <LuFolderKanban />
              <p className="font-medium text-lg">Complete Project</p>
            </div>
            <p className="text-[#333] text-3xl font-semibold">403</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 mt-5">
        <div className="bg-white shadow-xl w-full px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <p className="text-[#333333] font-semibold text-xl capitalize">
                total employee monthly
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
                  value={totalEmployeeByYear}
                  label="Year"
                  onChange={handleTotalEmployeeYearChange}
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
            <EmployeeAreaChart selectedYear={totalEmployeeByYear} />
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
                    value={totalProjectByYear}
                    label="Year"
                    onChange={handleTotalProjectYearChange}
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
              <ProjectBarChart selectedYear={totalProjectByYear} />
            </div>
          </div>

          {/* Project Pie Chart */}
          <div
            className="bg-white shadow-xl flex-1 px-5 py-3"
            style={{ minHeight: 320 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#1A1A1A] font-semibold text-xl">
                  Complete Project Monthly
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="font-medium">20% complete daily</p>
                </div>
              </div>
              <div className="w-28">
                <FormControl fullWidth>
                  <InputLabel id="service-year-label">
                    <div className="flex items-center">
                      <p>
                        <LuCalendar fontSize={20} />
                      </p>
                      {/* <p className="text-sm">Year</p> */}
                    </div>
                  </InputLabel>
                  <Select
                    labelId="service-year-label"
                    id="service-year-select"
                    value={completedProjectByYear}
                    label="Year"
                    onChange={handleCompletedProjectYearChange}
                    className="h-8"
                  >
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <ProjectPieChart selectedYear={completedProjectByYear} />
          </div>
        </div>
      </div>
    </div>
  );
}
