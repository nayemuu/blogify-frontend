import Footer from "@/components/main/reuseable/Footer/Footer";
import Navbar from "@/components/main/reuseable/Navbar/Navbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between w-full">
      <div>
        <Navbar />
        <div className="">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default layout;
