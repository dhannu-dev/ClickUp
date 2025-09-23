"use client";

import { useContext } from "react";
import { SpaceContext } from "../context/SpaceContext";

function HomePage() {
  const { handleSpace } = useContext(SpaceContext);

  return (
    <div className="h-[450px] w-full flex justify-center items-center">
      <div className="w-1/3 text-center">
        <h2>
          You have no existing Spaces to put shared tasks in. Create a Space now
          to organize your work.
        </h2>
        <button
          onClick={() => handleSpace()}
          className="bg-purple-600 mt-4 cursor-pointer text-white p-2 rounded-md"
        >
          Create new Space
        </button>
      </div>
    </div>
  );
}

export default HomePage;
