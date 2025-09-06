import React from "react";
import parse from "html-react-parser";

const Blog = ({ blog }) => {
  return (
    <div className="container">
      <div className="flex flex-col gap-5">
        <h1 class="font-bold text-3xl md:text-5xl">{blog.title}</h1>

        <img
          class="mx-auto w-full md:w-8/12 object-contain h-80 md:h-96"
          src={blog.thumbnail}
          alt={blog.title}
        />
      </div>

      <div>{parse(blog.content)}</div>
    </div>
  );
};

export default Blog;
