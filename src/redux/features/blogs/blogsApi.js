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

    getBlogs: builder.query({
      query: () => `/api/v1/blogs`,
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

export const { useCreateBlogMutation, useGetBlogsQuery } = blogsApi;
