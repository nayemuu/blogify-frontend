import { apiSlice } from "../api/apiSlice";
import { profileApi } from "../profile/profileApi";
import { userLoggedIn } from "./authSlice";
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          //   console.log("inside authApi arg = ", arg);
          const result = await queryFulfilled;
          //   console.log("inside login result = ", result);
          if (result?.data?.data?.tokens) {
            // console.log("tokens = ", result.data.data.tokens);
            dispatch(
              userLoggedIn({
                accessToken: result.data.data.tokens.access,
                refreshToken: result.data.data.tokens.refresh,
              })
            );
            dispatch(profileApi.endpoints.profile.initiate());

            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result.data.data.tokens.access,
                refreshToken: result.data.data.tokens.refresh,
              })
            );
          }
        } catch (error) {
          //
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
