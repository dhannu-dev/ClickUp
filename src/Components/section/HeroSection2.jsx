"use client";

import { GoCodespaces } from "react-icons/go";
import { CiCalendar, CiCalendarDate } from "react-icons/ci";
import { LuBrain } from "react-icons/lu";
import { CiSquareMore } from "react-icons/ci";
import { BsFillInboxFill } from "react-icons/bs";
import { RiChatFollowUpLine } from "react-icons/ri";
import { RiUserFollowLine } from "react-icons/ri";
import { IoCheckmarkDone } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

import { MdOutlineFilterList, MdOutlinePeople } from "react-icons/md";

import { useContext, useState } from "react";
import { TodoContext } from "../../context/TodoContext";
import Link from "next/link";
import Space from "../space/Space";
import { SpaceContext } from "../../context/SpaceContext";

function HeroSection2() {
  const {
    handleCreateTaskOption,
    createTaskOption,
    closeCreatedTaskOption,
    createTaskOptionInput,
    setCreatedTaskOptionInput,
    addCreatedTask,
    setOpenDropdown,
    openDropdown,
    users,
    assignUser,
    selectedUser,
    setSelectedUser,
    setDeadlineOption,
    deadlineOption,
    confirmCompleteTask,
  } = useContext(TodoContext);



  return (
    <div className="w-full h-screen flex px-2 py-1">
      <div className="h-full rounded-md p-2 space-y-5  w-[50px] bg-[#1e1e2f]">
        <div className="flex flex-col gap-2 font-semibold">
          <div className="p-2 rounded-md bg-white">
            <img
              src="https://app-cdn.clickup.com/media/home-QDCPQXYW.png"
              alt=""
            />
          </div>
          <h2 className="text-xs">Home</h2>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <GoCodespaces size={23} />
          <h2 className="text-xs font-semibold">Space</h2>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <CiCalendar size={23} />
          <h2 className="text-xs font-semibold">Planner</h2>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <LuBrain size={23} />
          <h2 className="text-xs font-semibold">Brain</h2>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <CiSquareMore size={23} />
          <h2 className="text-xs font-semibold">Brain</h2>
        </div>
      </div>

      <div className="h-full bg-zinc-900 w-[300px] border border-gray-800 rounded-md p-3 ml-2">
        <div className="flex w-full justify-between items-center">
          <h2>Home</h2>
          <button
            onClick={handleCreateTaskOption}
            className="px-2 py-1 cursor-pointer rounded-md bg-purple-700 text-white"
          >
            + Create
          </button>
        </div>
        {createTaskOption && (
          <div
            onClick={closeCreatedTaskOption}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 flex flex-col text-white w-[400px] p-6 rounded-lg shadow-lg"
            >
              <h1 className="mb-2 text-xl">✏️Create Task...</h1>
              <input
                type="text"
                value={createTaskOptionInput}
                onChange={(e) => setCreatedTaskOptionInput(e.target.value)}
                placeholder="Enter your task."
                className="w-full border p-2 rounded-md border-gray-500 outline-none text-gray-400"
              />

              <div className="flex justify-between gap-4 mt-4">
                {/* User Dropdown */}
                <div className="relative w-1/2">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "create" ? null : "create"
                      )
                    }
                    className="flex items-center gap-2 px-3 py-2 w-full rounded-md border border-zinc-700 hover:bg-zinc-800 text-white"
                  >
                    {selectedUser ? (
                      <>
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-600 text-white text-sm">
                          {selectedUser.charAt(0).toUpperCase()}
                        </div>
                        <span>{selectedUser}</span>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <MdOutlinePeople size={18} />
                        <span className="text-sm text-gray-400">
                          Assign User
                        </span>
                      </div>
                    )}
                  </button>

                  {openDropdown === "create" && (
                    <div className="absolute mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md shadow-md z-50">
                      {users.map((user) => (
                        <button
                          key={user}
                          onClick={() => {
                            setSelectedUser(user);
                            setOpenDropdown(null);
                          }}
                          className="block w-full px-3 py-2 text-left text-sm text-white hover:bg-zinc-800"
                        >
                          {user}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Deadline Input */}
                <div className="w-1/2">
                  <label className="flex items-center gap-2 px-3 py-2 w-full rounded-md border border-zinc-700 hover:bg-zinc-800 cursor-pointer text-gray-300">
                    <CiCalendarDate size={18} />
                    <input
                      type="date"
                      value={deadlineOption}
                      onChange={(e) => setDeadlineOption(e.target.value)}
                      min={new Date().toISOString().split("T")[0]} // prevents past dates
                      className="bg-transparent outline-none text-white text-sm flex-1"
                    />
                  </label>
                </div>
              </div>

              <button
                onClick={addCreatedTask}
                className="mt-4 cursor-pointer px-4 py-2 bg-purple-700 text-white rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        )}
        <div className="text-zinc-400 mt-1   space-y-1 p-1">
          <div className="flex items-center gap-3  hover:bg-zinc-800 p-1 rounded-md">
            <BsFillInboxFill />
            <h2>Inbox</h2>
          </div>

          <div className="flex items-center gap-3  hover:bg-zinc-800 p-1 rounded-md">
            <RiChatFollowUpLine />
            <h2>FollowUps</h2>
          </div>

          <div className="flex items-center gap-3  hover:bg-zinc-800 p-1 rounded-md">
            <RiUserFollowLine />
            <Link href="/my-tasks">
              <h2 className="cursor-pointer">My Tasks</h2>
            </Link>
          </div>

          <div className="flex items-center gap-3  hover:bg-zinc-800 p-1 rounded-md">
            <IoCheckmarkDone />
            <h2>All Tasks</h2>
          </div>

          <div className="flex items-center gap-3 w-full hover:bg-zinc-800 p-1">
            <IoIosMore />
            <h2>More</h2>
          </div>
          <hr className="mt-3" />
        </div>

        <div>
          <Space />
        </div>
      </div>
    </div>
  );
}

export default HeroSection2;
