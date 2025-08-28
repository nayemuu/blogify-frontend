"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const MultiSelectOptonItems = ({
  item,
  list,
  selectedItems,
  setSelectedItems,
}) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Checkbox
          id={item.id}
          onChange={() =>
            selectedItems.includes(item.id)
              ? setSelectedItems(
                  selectedItems.filter((item) => item !== item.id)
                )
              : setSelectedItems((previousSelectedItemsId) => [
                  ...previousSelectedItemsId,
                  item.id,
                ])
          }
          //   checked={selectedItems.includes(item.id) ? true : false}
        />
        <Label htmlFor={item.id}>{item.title}</Label>
      </div>
    </div>
  );
};

export default MultiSelectOptonItems;
