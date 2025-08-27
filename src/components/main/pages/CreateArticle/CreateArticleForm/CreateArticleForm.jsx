"user client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateArticleForm = () => {
  let message = "Something went wrong";
  return (
    <div>
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="email" className="text-[20px]">
          Title <span className="text-brand-primary">*</span>
        </Label>
        <Input type="text" placeholder="Article title.." className="h-[50px]" />
      </div>
    </div>
  );
};

export default CreateArticleForm;
