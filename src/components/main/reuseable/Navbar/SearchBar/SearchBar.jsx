"use client";
import { debounceHandler } from "@/utils/debounceHandler";
import "./SearchBar.css";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null); // Create a ref for the input field

  const doSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = debounceHandler(doSearch, 300);

  const clearInputField = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input field text
    }
  };

  return (
    <div className="h-[40px] w-full relative z-10">
      <div className="absolute top-0 left-[15px] h-full flex items-center">
        <Icon icon="icon-park-outline:search" width="18" height="18" />
      </div>
      <form
        className="h-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input
          type="text"
          placeholder="Search Here..."
          onChange={handleSearch}
          className="bg-[#F5F5F5] w-full h-full outline-none rounded-[20px] border border-solid border-transparent pl-[42px] text-[14px]"
          ref={inputRef}
          //   onKeyDown={(e) => searchInputSuggestionHandler(e)}
        />

        {/* <input
          type="text"
          placeholder="Search Here..."
          onChange={handleSearch}
          className="bg-[#F5F5F5] w-full h-full outline-none rounded-[20px] border border-solid focus:border-primary border-transparent pl-[42px] text-[14px] searchbar"
          ref={inputRef}
          //   onKeyDown={(e) => searchInputSuggestionHandler(e)}
        /> */}
      </form>

      {searchText.length ? (
        <div className="absolute top-0 right-[15px] h-full flex items-center">
          <Icon
            icon="akar-icons:cross"
            className="text-[16px] hover:text-red-500 cursor-pointer"
            onClick={() => {
              setSearchText("");
              clearInputField();
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
