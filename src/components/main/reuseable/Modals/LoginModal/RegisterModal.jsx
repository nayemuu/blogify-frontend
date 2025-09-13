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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useEffect, useState } from "react";
import Error from "../../Error/Error";
import { Icon } from "@iconify/react";
import OtpVerificationTimer from "./OtpVerificationTimer/OtpVerificationTimer";
import LoaderInsideButton from "../../Loader/LoaderInsideButton";

const RegisterModal = ({ setShowRegisterModal, setShowLoginModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  const [otp, setOtp] = useState("");

  const [login, { isLoading, isError, isSuccess, data, error }] =
    useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("name = ", name);
    console.log("email = ", email);
    console.log("password = ", password);
    console.log("confirmPassword = ", confirmPassword);

    if (password !== confirmPassword) {
      return alert("Password did not match");
    }

    // login({ email: email.trim(), password: password.trim() });
  };

  const handleOtpForm = (e) => {
    e.preventDefault();

    console.log("otp = ", otp);
  };
  useEffect(() => {
    if (isSuccess) {
      setShowRegisterModal(false);
    }
  }, [isSuccess]);

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        {1 ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* <DialogHeader>
              <DialogTitle>Sign Up</DialogTitle>
            </DialogHeader> */}

            <DialogHeader className="flex flex-col gap-2">
              <DialogTitle className="modal-title">Sign Up</DialogTitle>

              <div className="modal-slogan">
                By signing up, you're agree to our!{" "}
                <span className="text-brand-primary">Terms & conditions</span>{" "}
                and <span className="text-brand-primary">privacy policy</span>.
              </div>
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

            {/* <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                Sign Up
              </Button>
            </DialogFooter> */}

            <div className="flex flex-col gap-3">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <LoaderInsideButton /> : <></>}
                Sign Up
              </Button>

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

              <div className="text-center text-[14px] leading-[16px]">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setShowRegisterModal(false);
                    setShowLoginModal(true);
                  }}
                  className="text-brand-primary cursor-pointer"
                >
                  Login
                </span>
              </div>
            </div>
          </form>
        ) : (
          <form className="flex flex-col gap-4">
            <DialogHeader className="flex flex-col gap-1">
              <DialogTitle className="modal-title">Verification</DialogTitle>
              <div className="modal-slogan">
                Please Enter Verification Code.
              </div>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button>Verify</Button>
              <OtpVerificationTimer
                minutes={minutes}
                setMinutes={setMinutes}
                seconds={seconds}
                setSeconds={setSeconds}
              />
            </div>
          </form>
        )}
      </DialogContent>
    </>
  );
};

export default RegisterModal;
