import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { unauthorized } from "next/navigation";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState()?.auth?.accessToken;
  //   //console.log(getState());

  //   // console.log('in apiSlice prepareHeaders, token = ', token);
  //   if (token) {
  //     headers.set("Authorization", `Bearer ${token}`);
  //   }

  //   return headers;
  // },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let results = await baseQuery(args, api, extraOptions);
    // console.log("results = ", results);
    if (results?.error?.status === 401) {
      console.log("unauthorized");
    }

    if (results?.error?.status === "FETCH_ERROR") {
      console.log("Backend is Down");
    }

    return results;
  },
  endpoints: () => ({}),
});
