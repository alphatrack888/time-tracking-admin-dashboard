import { useState } from "react";
import {
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useGetAllCompaniesQuery, useGetEmployeesQuery } from "../../Redux/api/companyApi";
import {
  useRequestAttendanceReportAsyncMutation,
  useGetReportJobsQuery,
} from "../../Redux/api/reportApi";
import { downloadReport } from "../../utils/downloadReport";

const JOB_STATUS_LABEL = {
  pending: { label: "Pending", color: "default" },
  processing: { label: "Processing", color: "info" },
  ready: { label: "Ready", color: "success" },
  failed: { label: "Failed", color: "error" },
};

function lastNMonthsOptions(n = 12) {
  const months = [];
  const now = dayjs();
  for (let i = 0; i < n; i++) {
    const month = now.subtract(i, "month");
    months.push({ value: month.format("YYYY-MM"), label: month.format("MMMM YYYY") });
  }
  return months;
}

function CompanySelect({ value, onChange, allowAllCompanies }) {
  const { data, isLoading } = useGetAllCompaniesQuery();
  const companies = data?.data?.data ?? [];

  return (
    <FormControl size="small" sx={{ minWidth: 220 }}>
      <InputLabel id="report-company-label">Company</InputLabel>
      <Select
        labelId="report-company-label"
        label="Company"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
      >
        {allowAllCompanies && <MenuItem value="">All companies</MenuItem>}
        {companies.map((c) => (
          <MenuItem key={c._id} value={c._id}>
            {c.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function EmployeeSelect({ company, value, onChange, required }) {
  const { data, isLoading } = useGetEmployeesQuery({ company }, { skip: !company });
  const employees = data?.data?.data ?? [];

  return (
    <FormControl size="small" sx={{ minWidth: 220 }} disabled={!company}>
      <InputLabel id="report-employee-label">Employee</InputLabel>
      <Select
        labelId="report-employee-label"
        label="Employee"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!company || isLoading}
      >
        {!required && <MenuItem value="">All employees in this company</MenuItem>}
        {employees.map((e) => (
          <MenuItem key={e._id} value={e._id}>
            {e.name}
          </MenuItem>
        ))}
      </Select>
      {!company && (
        <p className="text-xs text-[#9ca3af] mt-1">Select a company to pick an employee.</p>
      )}
    </FormControl>
  );
}

function AttendanceReportTab() {
  const [startDate, setStartDate] = useState(dayjs().startOf("month"));
  const [endDate, setEndDate] = useState(dayjs());
  const [company, setCompany] = useState("");
  const [employee, setEmployee] = useState("");
  const [format, setFormat] = useState("pdf");
  const [lang, setLang] = useState("en");
  const [isBusy, setIsBusy] = useState(false);
  const [requestJob, { isLoading: isRequesting }] = useRequestAttendanceReportAsyncMutation();

  const handleCompanyChange = (value) => {
    setCompany(value);
    setEmployee(""); // an employee from the previous company no longer applies
  };

  const validRange = startDate && endDate && !endDate.isBefore(startDate, "day");

  const handleSubmit = async () => {
    if (!validRange) {
      toast.error("End date must not be before the start date.");
      return;
    }
    const startDateStr = startDate.format("YYYY-MM-DD");
    const endDateStr = endDate.format("YYYY-MM-DD");

    if (employee) {
      // A single employee is small enough to stay synchronous — matches
      // the backend's own /reports/attendance vs /reports/attendance/async
      // split (see timetracker.route.ts).
      setIsBusy(true);
      try {
        await downloadReport(
          "/timetracker/reports/attendance",
          { startDate: startDateStr, endDate: endDateStr, employee, format, lang },
          `attendance-report-${startDateStr}-to-${endDateStr}.${format === "excel" ? "xlsx" : "pdf"}`
        );
        toast.success("Report downloaded.");
      } catch (err) {
        toast.error(err.message || "Failed to generate report");
      } finally {
        setIsBusy(false);
      }
      return;
    }

    // Company-wide or cross-company (no employee): always async — this can
    // span every employee of a company, or every company.
    try {
      await requestJob({
        startDate: startDateStr,
        endDate: endDateStr,
        format,
        lang,
        ...(company && { company }),
      }).unwrap();
      toast.success(
        company
          ? "Report requested. You'll be notified when it's ready — check My Report Requests."
          : "Cross-company report requested. You'll be notified when it's ready — check My Report Requests."
      );
    } catch (err) {
      toast.error(err?.data?.message || "Failed to request report");
    }
  };

  const busy = isBusy || isRequesting;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start date"
            value={startDate}
            onChange={setStartDate}
            slotProps={{ textField: { size: "small" } }}
          />
          <DatePicker
            label="End date"
            value={endDate}
            onChange={setEndDate}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>

        <CompanySelect value={company} onChange={handleCompanyChange} allowAllCompanies />
        <EmployeeSelect company={company} value={employee} onChange={setEmployee} />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="attendance-format-label">Format</InputLabel>
          <Select
            labelId="attendance-format-label"
            label="Format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="excel">Excel</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="attendance-lang-label">Language</InputLabel>
          <Select
            labelId="attendance-lang-label"
            label="Language"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="de">German</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={busy || !validRange}
          sx={{ textTransform: "none", bgcolor: "#3F80AE", "&:hover": { bgcolor: "#356a91" } }}
        >
          {busy ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : employee ? (
            "Download report"
          ) : (
            "Request report"
          )}
        </Button>
        <p className="text-xs text-[#9ca3af] mt-2">
          {employee
            ? "A single employee's report downloads immediately."
            : company
            ? "No employee selected: this covers every employee at the selected company and runs in the background — you'll get a notification when it's ready."
            : "No company or employee selected: this covers every employee across every company and runs in the background — you'll get a notification when it's ready."}
        </p>
      </div>
    </div>
  );
}

function TimesheetReportTab() {
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const [company, setCompany] = useState("");
  const [employee, setEmployee] = useState("");
  const [template, setTemplate] = useState("default");
  const [format, setFormat] = useState("pdf");
  const [lang, setLang] = useState("en");
  const [isBusy, setIsBusy] = useState(false);
  const monthOptions = lastNMonthsOptions(12);

  const handleCompanyChange = (value) => {
    setCompany(value);
    setEmployee("");
  };

  const handleDownload = async () => {
    if (!employee) {
      toast.error("Select an employee first — a timesheet report is always for one employee.");
      return;
    }
    setIsBusy(true);
    try {
      await downloadReport(
        "/timetracker/reports/monthly",
        { month, employee, template, format, lang },
        `monthly-report-${month}${format === "excel" ? "" : "-" + template}.${format === "excel" ? "xlsx" : "pdf"}`
      );
      toast.success("Report downloaded.");
    } catch (err) {
      toast.error(err.message || "Failed to generate report");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4">
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="timesheet-month-label">Month</InputLabel>
          <Select
            labelId="timesheet-month-label"
            label="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {monthOptions.map((m) => (
              <MenuItem key={m.value} value={m.value}>
                {m.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <CompanySelect value={company} onChange={handleCompanyChange} allowAllCompanies={false} />
        <EmployeeSelect company={company} value={employee} onChange={setEmployee} required />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="timesheet-template-label">Template</InputLabel>
          <Select
            labelId="timesheet-template-label"
            label="Template"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="timesheet">Timesheet</MenuItem>
            <MenuItem value="comprehensive">Comprehensive</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="timesheet-format-label">Format</InputLabel>
          <Select
            labelId="timesheet-format-label"
            label="Format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="excel">Excel</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="timesheet-lang-label">Language</InputLabel>
          <Select
            labelId="timesheet-lang-label"
            label="Language"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="de">German</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <Button
          variant="contained"
          onClick={handleDownload}
          disabled={isBusy || !employee}
          sx={{ textTransform: "none", bgcolor: "#3F80AE", "&:hover": { bgcolor: "#356a91" } }}
        >
          {isBusy ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Download report"}
        </Button>
      </div>
    </div>
  );
}

function MyReportRequestsTab() {
  const [page, setPage] = useState(1);
  // Poll only once we know a job is still in flight — the first fetch (no
  // `data` yet) can't poll, but as soon as it lands the pollingInterval
  // below is re-evaluated on the next render off that same query's result,
  // so a pending/processing job keeps refreshing without a second hook call.
  const [hasActiveJobs, setHasActiveJobs] = useState(false);
  const { data, isLoading, isError } = useGetReportJobsQuery(
    { page, limit: 20 },
    { pollingInterval: hasActiveJobs ? 5000 : 0 }
  );
  const jobs = data?.data?.data ?? [];

  const stillActive = jobs.some((j) => j.status === "pending" || j.status === "processing");
  if (stillActive !== hasActiveJobs) setHasActiveJobs(stillActive);

  if (isLoading) return <p className="text-sm text-[#6b7280]">Loading report requests...</p>;
  if (isError)
    return <p className="text-sm text-red-600">Couldn't load report requests. Please try again.</p>;

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-[#1c1c1c] font-medium">No report requests yet</p>
        <p className="text-[#6b7280] text-sm mt-1">
          Company-wide and cross-company attendance reports you request will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[#e6e6e6] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#f7f7f7] text-left text-[#6b7280]">
            <tr>
              <th className="px-4 py-3 font-medium">Requested</th>
              <th className="px-4 py-3 font-medium">Date range</th>
              <th className="px-4 py-3 font-medium">Scope</th>
              <th className="px-4 py-3 font-medium">Format</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">File</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const status = JOB_STATUS_LABEL[job.status] || { label: job.status, color: "default" };
              return (
                <tr key={job.jobId} className="border-t border-[#f0f0f0]">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {dayjs(job.createdAt).format("YYYY-MM-DD HH:mm")}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {job.startDate} to {job.endDate}
                  </td>
                  <td className="px-4 py-3">{job.company ? "One company" : "All companies"}</td>
                  <td className="px-4 py-3 uppercase">{job.format}</td>
                  <td className="px-4 py-3">
                    <Chip size="small" label={status.label} color={status.color} />
                    {job.status === "failed" && job.errorMessage && (
                      <p className="text-xs text-red-600 mt-1">{job.errorMessage}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {job.status === "ready" && job.fileUrl ? (
                      <a
                        href={job.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#3F80AE] font-medium hover:underline"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-[#9ca3af]">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {data?.data?.meta && data.data.meta.totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-[#f0f0f0]">
          <Button
            size="small"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            sx={{ textTransform: "none" }}
          >
            Previous
          </Button>
          <span className="text-xs text-[#6b7280]">
            Page {page} of {data.data.meta.totalPages}
          </span>
          <Button
            size="small"
            disabled={page >= data.data.meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
            sx={{ textTransform: "none" }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Reports() {
  const [tab, setTab] = useState("attendance");

  return (
    <div className="px-10 py-8 bg-[#efefef] h-[92vh] overflow-y-auto">
      <p className="text-[#1c1c1c] font-medium text-2xl capitalize mb-6">reports</p>

      <Tabs
        value={tab}
        onChange={(e, value) => setTab(value)}
        sx={{ mb: 4, "& .MuiTabs-indicator": { bgcolor: "#3F80AE" } }}
      >
        <Tab value="attendance" label="Attendance report" sx={{ textTransform: "none" }} />
        <Tab value="timesheet" label="Timesheet report" sx={{ textTransform: "none" }} />
        <Tab value="jobs" label="My report requests" sx={{ textTransform: "none" }} />
      </Tabs>

      <div className="bg-white rounded-lg border border-[#e6e6e6] p-6">
        {tab === "attendance" && <AttendanceReportTab />}
        {tab === "timesheet" && <TimesheetReportTab />}
        {tab === "jobs" && <MyReportRequestsTab />}
      </div>
    </div>
  );
}
