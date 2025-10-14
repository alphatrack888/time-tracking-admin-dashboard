import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User"],
    }),
    ForgetPassword: builder.mutation({
      query: (data) => {
        const token = sessionStorage.getItem("accessToken");
        console.log("Forget Pass Mail Token", token);
        console.log("forget api mail", data);
        return {
          url: "/auth/forget-password",
          method: "POST",
          body: data,
          headers: {
            "content-type": "application/json",
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    VerifyOtp: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("otpToken");
        console.log("vetifyOtpToken", token);
        return {
          url: "/auth/verify-account",
          method: "post",
          body: data,
          headers: {
            "content-type": "application/json",
            token: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    ResetPassword: builder.mutation({
      query: (data) => {
        const token = sessionStorage.getItem("verifiedOtpToken");
        console.log(token);
        return {
          url: "/auth/reset-password",
          method: "post",
          body: data,
          headers: {
            // "content-type": "application/json",
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/auth/change-password",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useSigninMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
