import Navbar from "@/Components/section/Navbar";
import React from "react";
import HeroSection2 from "@/Components/section/HeroSection2";

export default function page() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Navbar />
      <HeroSection2 />
    </div>
  );
}
