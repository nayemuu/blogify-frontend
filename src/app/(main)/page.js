import Home from "@/components/main/pages/Home/Home";
import Navbar from "@/components/main/reuseable/Navbar/Navbar";

const page = () => {
  return (
    <div className="flex flex-col">
      <Navbar />

      <div className="mt-[100px]">
        <Home />
      </div>
    </div>
  );
};

export default page;
