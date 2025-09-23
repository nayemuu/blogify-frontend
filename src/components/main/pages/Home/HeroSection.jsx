import heroImage from "@/assets/pages/Home/Good-team-pana.svg";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-[#3abfba1a] via-white to-[#3abfba1a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Right Illustration (shown first on small, second on lg) */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <Image
            src={heroImage}
            alt="Sharing Knowledge Illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Left Content (shown second on small, first on lg) */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Share Knowledge,{" "}
            <span className="text-[#087ea4]">Grow Together</span>.
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
            A caring community where everyone shares their thoughts, ideas, and
            experiences to help each other grow. Start writing, start inspiring.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex justify-center lg:justify-start gap-4">
            <button className="px-6 py-3 rounded-xl bg-[#43bfc7] text-white font-semibold shadow hover:bg-[#087ea4] transition cursor-pointer">
              Start Writing
            </button>
            <button className="px-6 py-3 rounded-xl border-2 border-[#43bfc7] text-[#087ea4] font-semibold hover:bg-[#3abfba1a] transition cursor-pointer">
              Explore Blogs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
