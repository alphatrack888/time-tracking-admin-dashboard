import { baseApi } from "../baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionPlans: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("Dashboard API Token:", accessToken);

        return {
          url: "/subscriptions/plans",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["subscription"],
    }),
    addSubscriptionPlan: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("Subscription API Token:", accessToken);

        console.log("add Subscription api data", data);

        return {
          url: "/subscriptions/admin/plans",
          method: "post",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const { useGetSubscriptionPlansQuery, useAddSubscriptionPlanMutation } =
  subscriptionApi;
