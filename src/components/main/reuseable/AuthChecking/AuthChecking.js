"use client";

import { useDispatch, useSelector } from "react-redux";
import useLocalPropertiesCheck from "@/hooks/useLocalPropertiesCheck";
import {
  profileApi,
  useProfileQuery,
} from "@/redux/features/profile/profileApi";
import { useEffect } from "react";

const AuthChecking = () => {
  const localPropertiesChecked = useLocalPropertiesCheck();
  const { accessToken } = useSelector((state) => state.auth);
  // console.log("accessToken = ", accessToken);

  const { isLoading, isError, isSuccess, data, error } = useProfileQuery(
    undefined,
    { skip: !accessToken }
  );

  // useEffect(() => {
  //   console.log("isLoading = ", isLoading);
  // }, [isLoading]);

  // useEffect(() => {
  //   console.log("data = ", data);
  // }, [isSuccess]);

  // useEffect(() => {
  //   console.log("error = ", error);
  // }, [isError]);

  // console.log("uoo");
  // if (localPropertiesChecked) {
  //   dispatch(profileApi.endpoints.profile.initiate());
  // }

  return <></>;
};

export default AuthChecking;
