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
import { useContext, useState } from "react";
import { TodoContext } from "../../context/TodoContext";

const avatarColors = [
  "bg-purple-600",
  "bg-pink-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-indigo-500",
];

export default function Teams() {
  const {
    users,
    teamOption,
    handleTeamOption,
    handleOpenUserMenu,
    openUserMenu,
    handleDeletedUser,
    handleEditUser,
    editUserId,
    editUser,
    setEditUser,
    handleSaveEditUser,
    memberInput,
    handleMemberInput,
    userEmail,
    setUserEmail,
    userPhoneNo,
    setUserPhoneNo,
    userStreetAddress,
    setUserStreetAddress,
    userCity,
    setUserCity,
    userState,
    setUserState,
    userDes,
    setUserDes,
    addMember,
  } = useContext(TodoContext);

  const getAvatarColor = (idx) => avatarColors[idx % avatarColors.length];

  return (
    <div className="w-full h-full bg-transparent border-t border-t-gray-800 rounded-md">
      {/* Header */}
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

      {/* Views */}
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

      {/* Filters */}
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

      {/* Teams Header */}
      <div className="flex justify-between items-center py-3 px-4">
        <div className="flex items-center gap-3">
          <FaUserGroup />
          <h2 className="text-xl font-medium">All Teams Member</h2>
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

      {/* Users List */}
      <div className="w-full py-2 px-4 flex flex-wrap gap-4">
        {users.map((cur, idx) => {
          const avatarColor = getAvatarColor(idx);

          return (
            <div
              key={idx}
              className="w-[250px] bg-zinc-900 text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-4 flex flex-col items-center gap-4"
            >
              <div
                className={`flex items-center justify-center w-[200px] h-[200px] rounded-2xl text-2xl font-bold ${avatarColor}`}
              >
                {cur ? cur.charAt(0).toUpperCase() : "U"}
              </div>

              <div className="relative w-full px-3 flex justify-between items-center">
                <span>
                  {editUserId === idx ? (
                    <input
                      value={editUser}
                      onChange={(e) => setEditUser(e.target.value)}
                      className="w-full p-2 rounded-md text-black outline-none"
                    />
                  ) : (
                    <span className="text-lg font-semibold capitalize">
                      {cur}
                    </span>
                  )}
                </span>

                <button
                  onClick={() => handleOpenUserMenu(idx)}
                  className="p-2 rounded-md hover:bg-zinc-800 transition"
                >
                  <BsThreeDots size={20} />
                </button>

                {idx === openUserMenu && (
                  <div className="absolute right-0 top-10 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-50 w-[120px]">
                    <button
                      onClick={() => handleEditUser(cur, idx)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 w-full rounded-md"
                    >
                      <MdOutlineModeEdit size={16} /> Edit
                    </button>
                    {editUserId === idx && (
                      <button
                        onClick={() => handleSaveEditUser(idx)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-green-400 hover:bg-zinc-800 w-full rounded-md"
                      >
                        <MdDownloadDone size={16} /> Save
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletedUser(idx)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 w-full rounded-md"
                    >
                      <MdDeleteOutline size={16} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Member Modal */}
      {teamOption && (
        <div
          onClick={handleTeamOption}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 w-[500px] p-6 rounded-3xl shadow-2xl flex flex-col gap-6"
          >
            <h1 className="text-2xl font-bold text-center text-white">
              Create Team Member
            </h1>

            <form onSubmit={addMember} className="flex flex-col gap-4">
              <input
                type="text"
                value={memberInput}
                onChange={handleMemberInput}
                placeholder="Full Name"
                className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Email"
                className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />
              <input
                type="tel"
                value={userPhoneNo}
                onChange={(e) => setUserPhoneNo(e.target.value)}
                placeholder="Phone Number"
                className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <input
                type="text"
                value={userStreetAddress}
                onChange={(e) => setUserStreetAddress(e.target.value)}
                placeholder="Street Address"
                className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  value={userCity}
                  onChange={(e) => setUserCity(e.target.value)}
                  placeholder="City"
                  className="flex-1 p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <input
                  type="text"
                  value={userState}
                  onChange={(e) => setUserState(e.target.value)}
                  placeholder="State"
                  className="flex-1 p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              <textarea
                rows={4}
                value={userDes}
                onChange={(e) => setUserDes(e.target.value)}
                placeholder="Short Description"
                className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all"
              ></textarea>
              <button
                type="submit"
                className="mt-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition-all text-white font-bold shadow-lg"
              >
                Create Member
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
