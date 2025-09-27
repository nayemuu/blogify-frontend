"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const EditProfileModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    //
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle className="modal-title">Edit Profile</DialogTitle>

          <div className="modal-slogan">
            By signing up, you're agree to our!{" "}
            <span className="text-brand-primary">Terms & conditions</span> and{" "}
            <span className="text-brand-primary">privacy policy</span>.
          </div>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </DialogHeader>
      </form>
    </DialogContent>
  );
};

export default EditProfileModal;
