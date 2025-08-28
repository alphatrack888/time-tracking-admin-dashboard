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
  }),
});

export const { useSigninMutation, useForgetPasswordMutation } = authApi;
