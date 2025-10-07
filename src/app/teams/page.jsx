"use client";
import { CiViewList } from "react-icons/ci";
import { FaFlipboard } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { TbSubtask } from "react-icons/tb";
import { BsLayoutThreeColumns, BsThreeDots } from "react-icons/bs";
import {
  MdDeleteOutline,
  MdDownloadDone,
  MdGroup,
  MdOutlineFilterList,
  MdOutlineModeEdit,
} from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

export default function Teams() {
  const {
    users,
    teamOption,
    handleTeamOption,
    memberInput,
    handleMemberInput,
    addMember,
    handleOpenUserMenu,
    openUserMenu,
    handleDeletedUser,
    handleEditUser,
    editUserId,
    editUser,
    setEditUser,
    handleSaveEditUser
  } = useContext(TodoContext);
  console.log(users);
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

      <div className="flex justify-between items-center py-3 px-4">
        <div className="flex items-center gap-3">
          <FaUserGroup />
          <h2 className="text-xl font-medium">All Teams Memeber</h2>
        </div>
        <div>
          <button
            onClick={handleTeamOption}
            className="py-1 px-3 cursor-pointer bg-purple-600 text-white rounded-md "
          >
            New Member
          </button>
        </div>
      </div>

      <div className="w-full py-2 px-4">
        {users.map((cur, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-3 py-1 px-3 mb-2 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 p-2 text-sm rounded-full bg-purple-600 font-semibold">
                {cur.charAt(0).toUpperCase()}
              </span>
              {editUserId === idx ? (
                <input
                  value={editUser}
                  onChange={(e) => setEditUser(e.target.value)}
                  className="p-2 outline-none"
                />
              ) : (
                <span className="text-base capitalize">{cur}</span>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => handleOpenUserMenu(idx)}
                className="p-2 ml-2 relative cursor-pointer w-[50px] text-xs rounded-md hover:bg-zinc-800 text-white"
              >
                <BsThreeDots size={20} />
              </button>

              {idx === openUserMenu && (
                <div className="absolute right-[1px] top-10 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-50 w-[100px]">
                  <button
                    onClick={() => handleEditUser(cur, idx)}
                    className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 rounded-md w-full"
                  >
                    <span className="flex items-center gap-2">
                      <MdOutlineModeEdit size={15} />
                      <p className="text-[14px]">Edit</p>
                    </span>
                  </button>
                  {editUserId === idx && (
                    <button onClick={() => handleSaveEditUser(idx)} className="block px-4 py-2 text-sm text-green-200 hover:bg-zinc-800 rounded-md w-full">
                      <span className="flex items-center gap-2">
                        <MdDownloadDone size={16} />
                        <p className="text-[14px]">Save</p>
                      </span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeletedUser(idx)}
                    className="block px-4 py-2 text-sm text-red-200 rounded-md hover:bg-zinc-800 w-full"
                  >
                    <span className="flex items-center gap-2">
                      <MdDeleteOutline size={15} />
                      <p className="text-[14px]">Delete</p>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {teamOption && (
        <div
          onClick={handleTeamOption}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 flex flex-col text-white w-auto p-3 rounded-2xl shadow-xl"
          >
            <h1 className="text-2xl font-semibold mb-2 text-center mt-1">
              Create Team Member
            </h1>

            <div className="flex flex-col gap-2 p-3">
              <div className="flex flex-col gap-1">
                <label className="text-zinc-300">Team Member Name</label>
                <input
                  value={memberInput}
                  onChange={handleMemberInput}
                  type="text"
                  className="p-2 rounded-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500 w-[400px]"
                />
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <label className="text-zinc-300">Add a short description</label>
                <textarea
                  rows={4}
                  className="p-3 rounded-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500 resize-none"
                />
              </div>

              <button
                onClick={addMember}
                className="mt-2 py-2.5 rounded-md bg-purple-600 hover:bg-purple-700 transition-all font-medium text-white"
              >
                Create Members
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
