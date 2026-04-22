import axios from "axios";

export const axiosBaseQuery =
  ({ baseUrl }) =>
  async ({ url, method, body, headers, params }) => {
    try {
      // Ensure baseUrl doesn't have a trailing slash and url has a leading slash
      const fullUrl = `${baseUrl?.replace(/\/$/, "")}/${url?.replace(/^\//, "")}`;
      
      console.log("Requesting:", method, fullUrl);

      const result = await axios({
        url: fullUrl,
        method,
        data: body,
        params,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      console.error("Axios Error:", err.message, err.response);
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
