import { baseApi } from "../baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Async attendance report job (Phase 5 backend, opened to admin/super_admin
    // in Phase 8): startDate/endDate always required; company omitted means
    // "every company" (a true cross-company report), company given scopes to
    // one company's employees. There is no employee-scoped async path — a
    // single employee always uses the synchronous /reports/attendance
    // download instead (see Reports.jsx).
    requestAttendanceReportAsync: builder.mutation({
      query: (payload) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/timetracker/reports/attendance/async",
          method: "POST",
          body: payload,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["reportJob"],
    }),
    getReportJobs: builder.query({
      query: ({ page = 1, limit = 20 } = {}) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/timetracker/reports/jobs",
          method: "GET",
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["reportJob"],
    }),
  }),
});

export const { useRequestAttendanceReportAsyncMutation, useGetReportJobsQuery } = reportApi;
