"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Todo from "../Components/Todo";
import { CiViewList } from "react-icons/ci";
import { FaFlipboard } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { TbSubtask } from "react-icons/tb";
import { BsLayoutThreeColumns } from "react-icons/bs";
import { MdGroup, MdOutlineFilterList } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import ConfirmCompletedTask from "../Components/ConfirmCompletedTask";
import { TodoContext } from "../context/TodoContext";
import HomePage from "../Components/HomePage";
import { SpaceContext } from "../context/SpaceContext";
import Link from "next/link";

export default function Page() {
  const { confirmCompleteTask } = useContext(TodoContext);
  const { list, handleSpaceClick } = useContext(SpaceContext);

  return (
    <div className="w-full h-full bg-transparent border-t border-t-gray-800 rounded-md">
      <div className="flex justify-between items-center px-4 py-2 mt-2">
        <h1 className="font-semibold text-lg">Dhannu Kumar's Workspace</h1>
        <div className="flex gap-3">
          <button className="px-3 py-1 border border-gray-500 rounded-md text-sm hover:bg-gray-700">
            Ask AI
          </button>
          <button className="px-3 py-1 border border-gray-500 rounded-md text-sm hover:bg-gray-700">
            Share
          </button>
        </div>
      </div>
      <div className="flex relative items-center gap-6 border-b border-gray-800 px-4 py-2 text-sm text-gray-300">
        {/* List + Dropdown */}
        <div className="relative group flex items-center gap-1 cursor-pointer hover:text-white">
          <CiViewList />
          <span>List</span>
          <ul className="absolute left-0 top-full hidden group-hover:block bg-zinc-900 text-zinc-300 shadow-lg rounded-md z-50 min-w-[200px]">
            {list.length > 0 ? (
              list.map((cur) => {
                return (
                  <div
                    key={cur.id}
                    className="flex items-center gap-2 mt-1 group py-1 px-1 rounded-md hover:bg-zinc-800 transition"
                  >
                    <span
                      className={`w-[25px] font-semibold h-[24px] flex justify-center items-center text-sm rounded-md ${cur.color}`}
                    >
                      {cur.spaceList.charAt(0)}
                    </span>
                    <Link href={`/todos/${cur.id}`} className="w-full">
                      <h1
                        onClick={() => handleSpaceClick(cur.id)}
                        className="text-[14px] text-gray-400 group-hover:text-white cursor-pointer py-1 rounded-md transition"
                      >
                        {cur.spaceList}
                      </h1>
                    </Link>
                  </div>
                );
              })
            ) : (
              <li className="py-2 px-3">Space List is empty.</li>
            )}
          </ul>
        </div>

        {/* Board + Dropdown */}
        <div className="relative group flex items-center gap-1 cursor-pointer hover:text-white">
          <FaFlipboard />
          <span>Board</span>
          <ul className="absolute left-0 top-full hidden group-hover:block bg-zinc-900 text-zinc-300 shadow-lg rounded-md z-50 min-w-[150px]">
            <li className="px-4 py-2 hover:bg-zinc-600 cursor-pointer rounded-md">
              Kanban View
            </li>
            <li className="px-4 py-2 hover:bg-zinc-600 cursor-pointer rounded-md">
              Scrum Board
            </li>
            <li className="px-4 py-2 hover:bg-zinc-600 cursor-pointer rounded-md">
              Timeline
            </li>
          </ul>
        </div>

        {/* Calendar + Dropdown */}
        <div className="relative group flex items-center gap-1 cursor-pointer hover:text-white">
          <FcCalendar />
          <span>Calendar</span>
          <ul className="absolute left-0 top-full hidden group-hover:block bg-zinc-800 text-zinc-300 shadow-lg rounded-md z-50 min-w-[150px]">
            <li className="px-4 py-2 hover:bg-zinc-600 rounded-md cursor-pointer">
              Month View
            </li>
            <li className="px-4 py-2 hover:bg-zinc-600 rounded-md cursor-pointer">
              Week View
            </li>
            <li className="px-4 py-2 hover:bg-zinc-600 rounded-md cursor-pointer">
              Day View
            </li>
          </ul>
        </div>

        {/* View (No dropdown, just button) */}
        <div className="flex items-center gap-1 border-l border-gray-700 pl-3 cursor-pointer hover:text-white">
          <span>+</span>
          <span>View</span>
        </div>
      </div>
      <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-400">
        <div className="flex gap-3">
          <div className="flex items-center gap-1 px-2 py-1 border border-gray-600 rounded-full">
            <LiaLayerGroupSolid size={16} />
            <span>Group: Status</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 border border-gray-600 rounded-full">
            <TbSubtask size={16} />
            <span>Subtasks</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 border border-gray-600 rounded-full">
            <BsLayoutThreeColumns size={12} />
            <span>Columns</span>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-1 px-2 py-1 border border-gray-600 rounded-full">
            <MdOutlineFilterList size={16} />
            <span>Filter</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 border border-gray-600 rounded-full">
            <IoIosCheckmarkCircleOutline size={16} />
            <span>Closed</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 border border-gray-600 rounded-full">
            <MdGroup size={16} />
            <span>Assignee</span>
          </div>
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-700 text-white">
            <span>D</span>
          </div>
        </div>
      </div>
      <div className="h-[500px] text-gray-400">
        <HomePage />
      </div>
      {confirmCompleteTask && <ConfirmCompletedTask />}
    </div>
  );
}
