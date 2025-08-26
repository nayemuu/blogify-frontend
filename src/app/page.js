import Navbar from "@/components/main/reuseable/Navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="mt-[180px]">
        <div className="text-brand-primary">llllll</div>
        <div className="bg-brand-primary p-4">background</div>
      </div>
    </div>
  );
}
