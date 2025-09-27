"use client";

import { useProfileQuery } from "@/redux/features/profile/profileApi";
import { useEffect, useState } from "react";
import backgroundOfCoverPhoto from "@/assets/pages/profile/backgroundOfCoverPhoto.png";
import Image from "next/image";
import "./ProfileSection.css";
import EditProfileModal from "@/components/main/reuseable/Modals/LoginModal/EditProfileModal";
import { Dialog } from "@/components/ui/dialog";

function ProfileSection(props) {
  const { isLoading, isError, isSuccess, data, error } = useProfileQuery();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  // useEffect(() => {
  //   if (isSuccess) {
  //     if (data?.data) {
  //       console.log("data = ", data.data);
  //       console.log("totalBlogs = ", data.data.user.totalBlogs);
  //     }
  //   }
  // }, [isSuccess]);

  return isSuccess ? (
    <div className="container">
      <div className="sm:grid grid-cols-2 py-[50px]">
        <div className="flex flex-col justify-center gap-y-[9px] md:gap-y-[15px] lg:gap-y-[20px]">
          <div>
            {data?.data?.user?.name ? (
              <div className="text-[2rem] sm:text-[2.25rem] md:text-[2.625rem] lg:text-5xl xxl:text-6xl font-semibold text-primary leading-[30.6px] md:leading-[40.6px]  lg:leading-[50.6px] xl:leading-[65.6px] xxl:leading-[71.6px]">
                {data.data.user.name}
              </div>
            ) : (
              <></>
            )}

            <div className="text-[#757575] text-lg sm:text-xl md:text-2xl lg:text-2xl font-normal leading-[20.8px] sm:leading-[35.8px] mt-[6px] xxl:mt-[10px]">
              Total Articles:{" "}
              <span className="text-primary">
                {data?.data?.user?.totalBlogs ? data.data.user.totalBlogs : 0}
              </span>
            </div>
          </div>

          {/* <div className="max-w-[150px] lg:max-w-[250px] w-full">
            <button
              type="button"
              className="px-[22px] md:px-[30px] lg:px-[35px] xl:px-[37px] py-[3px] sm:py-[4px] md:py-[7px] lg:py-[9px] xl:py-[12px] bg-gradient-to-b from-primary to-brand-secondary  text-white rounded-[5px] text-xs md:text-sm lg:text-base xl:text-lg font-bold leading-[21.48px] hover:from-primary/80 hover:to-brand-secondary/80 cursor-pointer w-full"
              onClick={() => {
                setShowEditProfileModal(true);
              }}
            >
              Edit Profile
            </button>
          </div> */}
        </div>

        <div className="relative cover-photo-background">
          <div className="bg-primary rounded-full aspect-square h-[260px] z-[2]">
            {data?.data?.user?.name ? (
              <div className="w-full h-full flex text-white lg:text-[150px] justify-center items-center p-1">
                {data.data.user.name[0]?.toUpperCase()}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={showEditProfileModal}
        onOpenChange={setShowEditProfileModal}
      >
        <EditProfileModal open={showEditProfileModal} />
      </Dialog>
    </div>
  ) : (
    <div className="container">Loading...</div>
  );
}

export default ProfileSection;
