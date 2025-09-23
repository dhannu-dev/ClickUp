"use client";

import { useContext, useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { SpaceContext } from "../../context/SpaceContext";

function Space() {
  const {
    space,
    handleSpace,
    handleList,
    list,
    spaceInput,
    description,
    setSpaceInput,
    setDescription,
    handleRemoveSpace,
  } = useContext(SpaceContext);

  return (
    <div className="h-full w-full py-4">
      <h2 className="text-sm text-gray-300">Favorites</h2>

      <div className="w-full flex items-center justify-between mt-4">
        <h2 className="text-sm text-gray-300">Spaces</h2>

        <button
          onClick={handleSpace}
          className="px-2 rounded-md bg-zinc-700 text-white cursor-pointer"
        >
          +
        </button>
      </div>
      <div className="w-full h-auto ">
        <div className="flex gap-2 mt-2">
          <span className="h-[28px] w-[30px] text-sm flex items-center justify-center bg-black rounded-md">
            A
          </span>
          <h1 className="text-gray-300 text-[16px]">All Tasks</h1>
        </div>
        {list.map((cur) => {
          return (
            <div
              key={cur.id}
              className="flex items-center gap-2 mt-2 group py-1 px-1 rounded-md hover:bg-zinc-800 transition"
            >
              <span
                className={`w-[35px] font-semibold h-[28px] flex justify-center items-center text-sm rounded-md ${cur.color}`}
              >
                {cur.spaceList.charAt(0)}
              </span>
              <h1 className={`text-gray-400 text-[14px] w-full cursor-pointer`}>
                {cur.spaceList}
              </h1>
              <span
                onClick={() => handleRemoveSpace(cur.id)}
                className="text-2xl opacity-0 text-gray-300 group-hover:opacity-100 cursor-pointer"
              >
                <CiCircleRemove size={20} />
              </span>
            </div>
          );
        })}
      </div>
      {space && (
        <div
          onClick={handleSpace}
          className="absolute bg-black/50 h-screen w-full z-50 flex justify-center items-center left-0 top-0"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-4 w-[550px] relative rounded-2xl bg-zinc-900 h-[400px]"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-[17px]">Create a Space</h1>
              <span
                onClick={handleSpace}
                className="hover:cursor-pointer text-gray-300"
              >
                <CiCircleRemove size={20} />
              </span>
            </div>
            <p className="text-sm mt-1 text-zinc-500">
              A Space represents teams, departments, or groups, each with its
              own Lists, workflows, and settings.
            </p>
            <div className="flex flex-col w-full px-1 py-2">
              <h3 className="text-zinc-300">Icons & name</h3>
              <div className="flex mt-2 w-full gap-3">
                <span className="px-3 py-1.5 rounded-lg border cursor-pointer">
                  {spaceInput.charAt(0) || "M"}
                </span>
                <input
                  placeholder="e.g. Marketing, Engineering, HR"
                  type="text"
                  value={spaceInput}
                  onChange={(e) => setSpaceInput(e.target.value)}
                  className=" border-2 px-2 border-gray-500 w-full rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <h1 className="text-sm text-zinc-300 mb-1">
                Description <span className="text-[13px]">(Optional)</span>
              </h1>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-2 px-2 py-1 border-gray-500 w-full rounded-md"
                type="text"
              />
            </div>
            <div className="flex justify-between items-center mt-7 text-gray-300">
              <h1 className="text-sm">Default Permission</h1>
              <button className="text-xs border border-gray-500 bg-zinc-950 outline-none  rounded-md px-2 py-1">
                Full edit
              </button>
            </div>
            <div className="absolute bottom-0 left-0 rounded-b-2xl w-full bg-zinc-950 p-4 flex justify-between items-center shadow-2xl">
              <h1 className="text-zinc-500 font-medium text-sm">
                Use Templates
              </h1>

              <button
                onClick={handleList}
                className="px-2 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Space;
