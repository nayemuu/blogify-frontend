"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./CreateArticleForm.css";
import { Button } from "@/components/ui/button";
import ImageUpload from "./ImageUpload";
import MultiSelectOptonItems from "@/components/main/reuseable/Selects/MultiSelectOpton/MultiSelectOpton";

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

let TagsList = [
  {
    id: 1,
    title: "JavaScript",
  },
  {
    id: 2,
    title: "HTML",
  },
  {
    id: 3,
    title: "CSS",
  },
];

const CreateArticleForm = () => {
  const [textEditorValue, setTextEditorValue] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    console.log("showTagsDropdown = ", showTagsDropdown);
  }, [showTagsDropdown]);

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

      <div className="grid w-full items-center gap-3">
        <Label htmlFor="email" className="text-[20px]">
          Tag
          {/* <span className="text-brand-primary">*</span> */}
        </Label>
        <Input
          type="text"
          placeholder="tags.."
          className="h-[50px]"
          readOnly
          onClick={() => setShowTagsDropdown(!showTagsDropdown)}
        />

        {showTagsDropdown && TagsList.length ? (
          <div className="rounded-md bg-popover shadow-md border flex flex-col gap-3 p-3">
            {TagsList.map((item) => (
              <MultiSelectOptonItems
                key={item.id}
                item={item}
                list={TagsList}
                selectedItems={[]}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
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
