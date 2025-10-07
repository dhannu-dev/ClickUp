"use client";

import { use, useContext, useEffect, useState } from "react";
import { BsLayoutThreeColumns } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { FaFlipboard } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { MdGroup, MdOutlineFilterList } from "react-icons/md";
import { TbSubtask } from "react-icons/tb";
import { TodoContext } from "../../../context/TodoContext";

export default function page(props) {
  const [userData, setUserData] = useState([]);
  const { renderTaskRow, pendingTasks } = useContext(TodoContext);
  const resp = use(props.params);
  const data = resp.user;

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("tasks"));
    console.log("usersdata", users);
    setUserData(users);
  }, [data]);

  // ✅ Step 1: find the assigned user for this task ID
  const selectedTask = userData.find((task) => task.id == data);
  const assignedUser = selectedTask?.assignedTo;

  // ✅ Step 2: filter all tasks assigned to that user
  const filterData = userData.filter(
    (task) => task.assignedTo === assignedUser
  );

  useEffect(() => {
    console.log("acutally data", userData);
    console.log("filterData", filterData);
  }, [userData]);

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

      <div className="flex items-center gap-4 border-b border-gray-800 px-4 py-2 text-sm text-gray-300">
        <div className="flex items-center gap-1 cursor-pointer hover:text-white">
          <CiViewList />
          <span>List</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-white">
          <FaFlipboard />
          <span>Board</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-white">
          <FcCalendar />
          <span>Calendar</span>
        </div>
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

      <div className="w-full h-auto mt-5 p-2">
        <div className="w-full flex justify-between">
          <h1 className="text-2xl font-semibold text-start">
            {assignedUser
              ? assignedUser.charAt(0).toUpperCase() + assignedUser.slice(1)
              : ""}
          </h1>
          <div className="flex text-sm space-x-3.5">
            <div className="p-2 w-[120px]">Assignee</div>
            <div className="p-2 w-[120px]">Due date</div>
            <div className="p-2 w-[120px]">Priority</div>
            <div className="p-2 w-[120px]">Menu</div>
          </div>
        </div>
        <div className="List text-zinc-800">
          {filterData.map((task) => renderTaskRow(task))}
        </div>
      </div>
    </div>
  );
}
