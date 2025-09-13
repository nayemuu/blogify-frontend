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
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useEffect, useState } from "react";
import Error from "../../Error/Error";
import { Icon } from "@iconify/react";

const RegisterModal = ({ setShowRegisterModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const [login, { isLoading, isError, isSuccess, data, error }] =
    useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("email = ", email);
    // console.log("password = ", password);

    login({ email: email.trim(), password: password.trim() });
  };

  useEffect(() => {
    if (isSuccess) {
      setShowRegisterModal(false);
    }
  }, [isSuccess]);

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
          </DialogHeader>
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

            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <div className="relative flex w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="pr-[40px]"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div className="absolute top-0 right-[8px] h-full flex items-center">
                  {showPassword ? (
                    <Icon
                      icon="clarity:eye-line"
                      className="text-[22px] hover:text-brand-primary cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <Icon
                      icon="clarity:eye-hide-line"
                      className="text-[22px] hover:text-brand-primary cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password">Confirm Password</Label>
              <div className="relative flex w-full">
                <Input
                  id="password"
                  name="password"
                  className="pr-[40px]"
                  placeholder="Retype your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <div className="absolute top-0 right-[8px] h-full flex items-center">
                  {showConfirmPassword ? (
                    <Icon
                      icon="clarity:eye-line"
                      className="text-[22px] hover:text-brand-primary cursor-pointer"
                      onClick={() =>
                        setConfirmShowPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <Icon
                      icon="clarity:eye-hide-line"
                      className="text-[22px] hover:text-brand-primary cursor-pointer"
                      onClick={() =>
                        setConfirmShowPassword(!showConfirmPassword)
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {isError ? (
            <Error
              message={
                error?.data?.message
                  ? error.data.message
                  : "Something went wrong"
              }
            />
          ) : (
            <></>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              Sign Up
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
};

export default RegisterModal;
