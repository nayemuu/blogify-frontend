import Blog from "@/components/main/pages/Blog/Blog";
import React from "react";

const page = async ({ params }) => {
  let { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blogs/${id}`
  );
  const data = await response.json();
  // console.log("data = ", data);

  return (
    <div>
      <Blog blog={data.data} />
    </div>
  );
};

export default page;
