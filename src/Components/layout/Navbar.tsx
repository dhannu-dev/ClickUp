import React from "react";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 rounded-2xl shadow border border-gray-300 px-4 py-2 bg-white">
          <img
            src="https://clickup.com/assets/brand/logo-v3-clickup-light.svg"
            alt="logo"
            height="23"
            width="94"
          />
          <span className="text-xs text-gray-700">
            The everything <br />
            app, for work.
          </span>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button className="rounded-2xl border border-gray-300 px-4 py-2.5 text-md bg-white text-gray-700 hover:bg-gray-50 transition">
            Contact Sales
          </button>
          <div className="flex border rounded-2xl border-gray-300 p-1 bg-white">
            <button className="rounded-xl px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition">
              Log In
            </button>
            <button className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md hover:brightness-110 transition">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
