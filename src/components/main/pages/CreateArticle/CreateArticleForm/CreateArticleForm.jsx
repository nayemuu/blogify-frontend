"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./CreateArticleForm.css";
import { Button } from "@/components/ui/button";
import ImageUpload from "./ImageUpload";
import MultiSelectOptonItems from "@/components/main/reuseable/Selects/MultiSelectOpton/MultiSelectOpton";
import { Icon } from "@iconify/react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useGetTagsQuery } from "@/redux/features/tags/tagsApi";

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
  const [title, setTitle] = useState("");
  const [textEditorValue, setTextEditorValue] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const tagsInputRef = useRef();

  const {
    isLoading: tagsIsLoading,
    isError: tagsIsError,
    isSuccess: tagsIsSuccess,
    data: tagsData,
    error: tagsError,
  } = useGetTagsQuery();

  const textEditorInputHandler = (content, delta, source, editor) => {
    setTextEditorValue(content);
  };

  useOutsideClick(tagsInputRef, () => setShowTagsDropdown(false));

  const handleSubmit = () => {
    console.log("title = ", title);
    console.log("selectedTags = ", selectedTags);
    console.log("textEditorValue = ", textEditorValue);
    console.log("coverImage = ", coverImage);
  };

  let selectedTagsTitle = "Select Tag";
  if (selectedTags.length & tagsData?.data?.length) {
    selectedTags.map((itemId, index) => {
      tagsData.data.map((tag) => {
        if (itemId === tag.id) {
          if (index !== 0) {
            selectedTagsTitle = `${selectedTagsTitle}, ${tag.title}`;
          } else {
            selectedTagsTitle = tag.title;
          }
        }
      });
    });
  } else {
    selectedTagsTitle = "Select Tag";
  }

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="email" className="text-[20px]">
          Title <span className="text-brand-primary">*</span>
        </Label>
        <Input
          type="text"
          placeholder="Article title.."
          className="h-[50px]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="grid w-full items-center gap-3">
        <Label htmlFor="email" className="text-[20px]">
          Tag
          {/* <span className="text-brand-primary">*</span> */}
        </Label>
        <div ref={tagsInputRef}>
          <div className="relative">
            <Input
              type="text"
              placeholder="tags.."
              className="h-[50px] cursor-pointer mr-3"
              readOnly
              value={selectedTagsTitle}
              onClick={() => setShowTagsDropdown(!showTagsDropdown)}
            />

            <div className="absolute h-full flex items-center top-0 right-1 text-[12px] pointer-events-none">
              <Icon icon="formkit:down" />
            </div>
          </div>
          {showTagsDropdown && tagsIsSuccess && tagsData?.data?.length ? (
            <div className="rounded-md bg-popover shadow-md border flex flex-col gap-3 p-3 mt-3">
              {tagsData.data.map((item) => (
                <MultiSelectOptonItems
                  key={item.id}
                  item={item}
                  list={tagsData.data}
                  selectedItems={selectedTags}
                  setSelectedItems={setSelectedTags}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
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
        className="max-w-[200px] h-[40px] text-[20px] bg-brand-primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default CreateArticleForm;
