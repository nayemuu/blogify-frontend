"use client";

import { useGetBlogsQuery } from "@/redux/features/blogs/blogsApi";
import { useEffect, useState } from "react";
import BlogCard from "../../reuseable/Cards/BlogCard/BlogCard";

const Home = () => {
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [initialPage, setInitialPage] = useState(0); // Initialize initialPage state

  const { isLoading, isError, isSuccess, data, error, isFetching } =
    useGetBlogsQuery(
      { limit: limit, offset: offset },
      { refetchOnMountOrArgChange: true }
    );

  useEffect(() => {
    if (isSuccess) {
      console.log("Inside Articles Components, data = ", data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log("Inside Articles Components, error = ", error);
    }
  }, [error, isError]);

  return (
    <div className="container">
      <div className="flex flex-col gap-5">
        {data?.data?.length ? (
          data.data.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
