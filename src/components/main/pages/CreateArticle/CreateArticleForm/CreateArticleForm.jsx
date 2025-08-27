"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./CreateArticleForm.css";
import { Button } from "@/components/ui/button";
import ImageUpload from "./ImageUpload";

const modules = {
  toolbar: [
    [{ align: [] }], // align content
    ["bold", "italic", "underline"], // toggled buttons
    [{ header: [1, 2, 3, false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }],
    ["link"],
  ],
}; // UIতে কি কি toolbar show করবে

const formats = [
  "align",
  "bold",
  "italic",
  "underline",
  "header",
  "color",
  "link",
  "list",
]; // UIএর toolbar কে ফাংশনাল করার জন্য
// string ae extra specing thakle kaj korbe na

const CreateArticleForm = () => {
  const [textEditorValue, setTextEditorValue] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const textEditorInputHandler = (content, delta, source, editor) => {
    setTextEditorValue(content);
  };

  const handleSubmit = () => {
    console.log("textEditorValue = ", textEditorValue);
  };

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="email" className="text-[20px]">
          Title <span className="text-brand-primary">*</span>
        </Label>
        <Input type="text" placeholder="Article title.." className="h-[50px]" />
      </div>

      <div>
        <Label htmlFor="email" className="text-[20px] mb-3">
          Content <span className="text-brand-primary">*</span>
        </Label>
        <ReactQuill
          theme="snow"
          value={textEditorValue}
          onChange={textEditorInputHandler}
          placeholder="Write your article here..."
          modules={modules}
          formats={formats}
        />
      </div>

      <ImageUpload
        image={coverImage}
        setImage={setCoverImage}
        title="Cover Image"
      />

      <Button
        className="max-w-[200px] h-[40px] text-[20px]"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default CreateArticleForm;
