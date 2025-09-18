import { apiSlice } from "../api/apiSlice";

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ["MyBlogs"] });

export const blogsApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/api/v1/blogs",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["MyBlogs"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log('inside createBlog arg = ', arg);
          const result = await queryFulfilled;
          // console.log('inside createBlog result = ', result);
        } catch (error) {
          // console.log('inside createBlog error = ', error);
        }
      },
    }),

    getMyBlogs: builder.query({
      query: ({ limit, offset }) =>
        `/api/v1/user/blogs/?limit=${limit}&offset=${offset}`,
      // providesTags: ["MyBlogs"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("inside useProfileQuery = ", result);
        } catch (error) {
          //
        }
      },
    }),

    getBlogs: builder.query({
      query: ({ limit, offset }) =>
        `/api/v1/blogs/?limit=${limit}&offset=${offset}`,
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("inside useProfileQuery = ", result);
        } catch (error) {
          //
        }
      },
    }),
  }),
});

export const { useCreateBlogMutation, useGetMyBlogsQuery, useGetBlogsQuery } =
  blogsApi;
