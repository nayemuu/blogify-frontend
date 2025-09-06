"use client";

import { useGetBlogsQuery } from "@/redux/features/blogs/blogsApi";
import { useEffect, useState } from "react";

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
    <div>
      <p>yii</p>
    </div>
  );
};

export default Home;
