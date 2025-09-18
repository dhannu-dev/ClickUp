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
import { CiViewList } from "react-icons/ci";
import { FaFlipboard } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { TbSubtask } from "react-icons/tb";
import { BsLayoutThreeColumns } from "react-icons/bs";
import { MdOutlineFilterList, MdOutlinePeople } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import Todo from "../Todo";
import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import ConfirmCompletedTask from "../ConfirmCompletedTask";

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

      <div className="h-full bg-zinc-900 w-[350px] border border-gray-800 rounded-md p-3 ml-2">
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
            <h2>My Tasks</h2>
          </div>

          <div className="flex items-center gap-3  hover:bg-zinc-800 p-1 rounded-md">
            <IoCheckmarkDone />
            <h2>All Tasks</h2>
          </div>

          <div className="flex items-center gap-3 w-full rounded-md hover:bg-zinc-800 p-1">
            <IoIosMore />
            <h2>More</h2>
          </div>
        </div>
      </div>

      <div className="w-full h-full bg-transparent border-t rounded-md border-t-gray-800  ">
        <div className="w-ful">
          <div className="flex  justify-between px-3 py-0 mt-2">
            <h1>Dhannu Kumar's Workspace</h1>
            <div className="flex gap-4">
              <div className="px-2 py-1 border-gray-500 border text-center rounded-md text-sm">
                Ask AI
              </div>
              <div className="px-2 py-1 text-center border border-gray-500 rounded-md text-sm">
                Share
              </div>
            </div>
          </div>
          <div className="w-full flex border-b border-gray-800 space-x-3  px-3 py-2">
            <div className="flex items-center justify-center gap-1">
              <CiViewList />
              <p className="text-sm">List</p>
            </div>

            <div className="flex items-center justify-center gap-1">
              <FaFlipboard />
              <p className="text-sm">Board</p>
            </div>

            <div className="flex items-center justify-center gap-1">
              <FcCalendar />
              <p className="text-sm">Calender</p>
            </div>

            <div className="flex items-center justify-center gap-1 border-l border-gray-700 px-2">
              <span>+</span>
              <p className="text-sm">View</p>
            </div>
          </div>
        </div>
        <div className="w-full p-2">
          <div className="w-full flex justify-between">
            <div className="flex text-xs gap-3 text-gray-400">
              <div className="flex justify-center items-center gap-1 rounded-full px-2 py-1 border border-gray-600">
                <LiaLayerGroupSolid size={18} />
                <p>Group:Status</p>
              </div>
              <div className="flex justify-center items-center gap-1 rounded-full px-2 py-1 border border-gray-600">
                <TbSubtask size={18} />
                <p>Subtasks</p>
              </div>
              <div className="flex justify-center items-center gap-1 rounded-full px-2 py-1 border border-gray-600">
                <BsLayoutThreeColumns size={12} />
                <p>Columns</p>
              </div>
            </div>
            <div className="flex text-xs gap-3 text-gray-400">
              <div className="flex justify-center items-center gap-1 rounded-full px-2 py-1 border border-gray-600">
                <MdOutlineFilterList size={17} />
                <p>filter</p>
              </div>

              <div className="flex justify-center items-center gap-1 rounded-full px-2 py-1 border border-gray-600">
                <IoIosCheckmarkCircleOutline size={17} />
                <p>Closed</p>
              </div>

              <div className="flex justify-center items-center gap-1 rounded-full px-2 py-1 border border-gray-600">
                <MdGroup size={17} />
                <p>Assignee</p>
              </div>

              <div className="px-2 text-center flex justify-center items-center rounded-full bg-purple-700 text-white">
                <p>D</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" h-[500px] text-gray-400">
          <Todo />
        </div>
        <div>{confirmCompleteTask && <ConfirmCompletedTask />}</div>
      </div>
    </div>
  );
}

export default HeroSection2;
