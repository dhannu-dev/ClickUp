import Navbar from "@/Components/layout/Navbar";
import HeroSection from "@/Components/section/HeroSection";
import React from "react";

export default function page() {
  return (
    <div className="w-full h-screen bg-white ">
      <Navbar />
      <HeroSection />
    </div>
  );
}
