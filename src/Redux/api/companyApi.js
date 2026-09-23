import { baseApi } from "../baseApi";

const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("Dashboard API Token:", accessToken);

        return {
          url: "/user?role=company",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["company"],
    }),
    // Reports filters (Phase 8): every employee, optionally scoped to one
    // company. A large limit is passed since this feeds a filter dropdown,
    // not a paginated table.
    getEmployees: builder.query({
      query: ({ company } = {}) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/user",
          method: "GET",
          params: { role: "employee", limit: 1000, ...(company && { company }) },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["company"],
    }),
    createCompany: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("Dashboard API Token:", accessToken);

        console.log("create company api data", data);

        return {
          url: "/auth/signup",
          method: "post",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["company"],
    }),
    updateCompany: builder.mutation({
      query: (data, id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("Dashboard API Token:", accessToken);

        console.log("update company api data", data);

        return {
          url: `/user/${id}`,
          method: "patch",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["company"],
    }),
    deleteCompany: builder.mutation({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("Dashboard API Token:", accessToken);

        console.log("delete company", id);

        return {
          url: `/user/${id}`,
          method: "delete",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["company"],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useGetEmployeesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
