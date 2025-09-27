import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    //console.log(getState());
    // console.log('in apiSlice prepareHeaders, token = ', token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

/**
 * Wraps a promise with a timeout.
 * If the promise does not settle (resolve/reject) within the given time,
 * it rejects with a "TIMEOUT" error instead.
 *
 * @param {Promise} promise - The original async operation (e.g. fetch).
 * @param {number} timeoutMs - Timeout duration in milliseconds.
 * @returns {Promise} - Resolves/rejects with the first settled result
 *                      (either the promise or the timeout).
 */
const fetchWithTimeout = (promise, timeoutMs) =>
  Promise.race([
    // The original async operation
    promise,

    // A "timeout promise" that rejects after `timeoutMs`
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("TIMEOUT")), timeoutMs)
    ),
  ]);

// Custom baseQuery wrapper
const customBaseQuery = async (args, api, extraOptions) => {
  let result;

  console.log("args = ", args);
  //output - args =  /api/v1/blogs/?limit=5&offset=0

  // ✅ Only intercept GET requests if baseUrl matches
  if (
    process.env.NEXT_PUBLIC_BASE_URL ===
      "https://blogify-backend-8swc.onrender.com" &&
    // Case 1: args is an object
    ((typeof args === "object" &&
      (args?.method?.toUpperCase() === "GET" || !args?.method)) ||
      // Case 2: args is a string (implicit GET)
      typeof args === "string")
  ) {
    while (true) {
      try {
        result = await fetchWithTimeout(
          baseQuery(args, api, extraOptions),
          15 * 1000 // 15 seconds
        );

        // If success or valid error -> break loop
        if (!result.error || result.error.status !== "FETCH_ERROR") {
          break;
        }
      } catch (err) {
        if (err.message === "TIMEOUT") {
          console.warn("Request timed out, retrying GET:", args?.url);
          continue; // retry again
        } else {
          throw err;
        }
      }
    }
  } else {
    result = await baseQuery(args, api, extraOptions);
  }

  // console.log("result = ", result);

  // 🔑 Handle expired tokens (401)
  if (result?.error?.status === 401) {
    const refreshToken = api.getState()?.auth?.refreshToken;
    // console.log("refreshToken = ", refreshToken);
    if (refreshToken) {
      // console.log("Access token expired → trying refresh...");

      // Try refreshing the token
      const refreshResult = await baseQuery(
        {
          url: "/api/v1/auth/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      // console.log("refreshResult = ", refreshResult);
      if (refreshResult?.data?.accessToken) {
        // console.log("accessToken = ", refreshResult.data.accessToken);
        // console.log("pre accessToken = ", api.getState()?.auth?.accessToken);
        api.dispatch(
          userLoggedIn({
            accessToken: refreshResult.data.accessToken,
            refreshToken: refreshToken,
          })
        );

        // console.log("curr accessToken = ", api.getState()?.auth?.accessToken);

        localStorage.setItem(
          "auth",
          JSON.stringify({
            accessToken: refreshResult.data.accessToken,
            refreshToken: refreshToken,
          })
        );

        // retry original query
        // console.log("Refresh success → retrying original query...");
        //approch 1
        // let result = await baseQuery(args, api, extraOptions);
        // console.log("result ", result);
        // return result;

        //approch 2
        return baseQuery(args, api, extraOptions); // ✅ cleaner
      } else {
        // console.log("inside , Refresh failed → logging out...");

        api.dispatch(userLoggedOut());
        localStorage.removeItem("auth");
        setTimeout(() => {
          api.dispatch(apiSlice.util.resetApiState());
        }, 1);

        // show toast, but don't return its value
        toast.error("User Session Expired! Please Login Again.");

        // return a valid error object for RTK Query
        return { error: { status: 401, data: "Session expired" } };
      }
    }
    // console.log("Refresh failed , because there is no RefreshToken → logging out...");
    api.dispatch(userLoggedOut());
    localStorage.removeItem("auth");

    return result;
  }

  if (result?.error?.status === "FETCH_ERROR") {
    console.log("Backend is Down");
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});
