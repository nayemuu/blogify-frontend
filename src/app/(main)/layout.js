import Footer from "@/components/main/reuseable/Footer/Footer";
import Navbar from "@/components/main/reuseable/Navbar/Navbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
