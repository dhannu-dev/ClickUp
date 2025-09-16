// HeroSection.js
import React from "react";

const HeroSection = () => {
  return (
    <section className="hero-section flex justify-center items-center flex-col w-full h-full">
      <h1 className="text-6xl font-semibold text-gray-800">
        The everything app, for work
      </h1>
      <p className="mt-5 text-xl text-center text-gray-900">
        <strong>Get everyone working in a single platform</strong> designed to
        <br />
        manage any type of work.
      </p>
      <button className="rounded-xl mt-7 px-15 py-4 bg-gradient-to-tr from-sky-400 from-5% via-blue-600 via-[60%] to-violet-700 to-[90%] text-2xl font-semibold text-white shadow-md hover:brightness-110 transition">
        Get Started. It's FREE →
      </button>

      <small className="text-gray-600 text-sm  mt-3 ">
        Free Forever. No Credit Card.
      </small>
    </section>
  );
};

export default HeroSection;
