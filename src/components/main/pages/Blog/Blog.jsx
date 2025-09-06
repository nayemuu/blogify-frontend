"use client";

import React from "react";
import parse from "html-react-parser";
import "react-quill-new/dist/quill.snow.css";

const Blog = ({ blog }) => {
  console.log(parse(blog.content));
  return (
    <div className="container">
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-3xl md:text-5xl">{blog.title}</h1>

        <img
          className="mx-auto w-full md:w-8/12 object-contain h-80 md:h-96"
          src={blog.thumbnail}
          alt={blog.title}
        />
      </div>

      <div className="ql-editor">{parse(blog.content)}</div>
    </div>
  );
};

export default Blog;
