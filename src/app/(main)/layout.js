import Navbar from "@/components/main/reuseable/Navbar/Navbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="mt-[180px]">{children}</div>
    </div>
  );
};

export default layout;
