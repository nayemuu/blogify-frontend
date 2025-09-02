import { apiSlice } from "../api/apiSlice";

export const blogsApi = apiSlice.injectEndpoints({
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
  }),
});

export const { useCreateBlogMutation } = blogsApi;
