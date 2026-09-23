import { baseApi } from "../baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ page = 1, limit = 20 } = {}) => {
        const accessToken = sessionStorage.getItem("accessToken");

        return {
          url: "/notifications",
          method: "GET",
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["notification"],
    }),
    markNotificationRead: builder.mutation({
      query: (id) => {
        const accessToken = sessionStorage.getItem("accessToken");

        return {
          url: `/notifications/${id}`,
          method: "patch",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["notification"],
    }),
    markAllNotificationsRead: builder.mutation({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");

        return {
          url: "/notifications/all",
          method: "patch",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["notification"],
    }),
    getNotificationPreferences: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");

        return {
          url: "/notification-preferences",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["notificationPreferences"],
    }),
    updateNotificationPreferences: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");

        return {
          url: "/notification-preferences",
          method: "patch",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["notificationPreferences"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useGetNotificationPreferencesQuery,
  useUpdateNotificationPreferencesMutation,
} = notificationApi;
