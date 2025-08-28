import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardOverview: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("Dashboard API Token:", accessToken);

        return {
          url: "/dashboard/general-stats",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["user"],
    }),

    revenueByYear: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("Revenue By Year API Token:", accessToken);
        console.log("Year in API call:", year);
        return {
          url: `/dashboard/monthly-revenue-stripe?year=${year}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["revenue"],
    }),

    companyByYear: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("Revenue By Year API Token:", accessToken);
        console.log("Year in API call:", year);
        return {
          url: `/dashboard/total-company-monthly?year=${year}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["company"],
    }),
  }),
});

export const {
  useDashboardOverviewQuery,
  useRevenueByYearQuery,
  useCompanyByYearQuery,
} = dashboardApi;
