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
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiEye } from "react-icons/fi";

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
    setOpenUserMenu,
    userFormData,
    handleFormChange,
    addMember,
  } = useContext(TodoContext);

  const [activeUser, setActiveUser] = useState(null);

  const handleSideBar = (user) => {
    setActiveUser((prev) => (prev?.id === user.id ? null : user));
    setOpenUserMenu(null);
  };

  const getAvatarColor = (idx) => avatarColors[idx % avatarColors.length];

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
      <div className="w-full py-2 px-4 flex flex-wrap gap-4">
        {users.map((cur, idx) => {
          const avatarColor = getAvatarColor(idx);

          return (
            <div
              key={idx}
              className="w-[250px] h-[250px] bg-zinc-900 text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-4 flex flex-col items-center gap-4"
            >
              <div
                onClick={() => handleSideBar(cur)}
                className={`flex items-center justify-center w-[200px] h-[200px] rounded-2xl text-2xl font-bold ${avatarColor}`}
              >
                {cur.name ? cur.name.charAt(0).toUpperCase() : "U"}
              </div>

              <div className="fixed inset-0 z-50 pointer-events-none">
                <div
                  onClick={() => setActiveUser(null)}
                  className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ease-in-out ${
                    activeUser ? "opacity-100 pointer-events-auto" : "opacity-0"
                  }`}
                ></div>
                <div
                  className={`absolute right-0 top-0 h-full w-[480px] bg-zinc-900 text-white p-6 flex flex-col transform transition-all duration-500 ease-in-out shadow-2xl rounded-l-2xl ${
                    activeUser
                      ? "translate-x-0 opacity-100 pointer-events-auto"
                      : "translate-x-full opacity-0"
                  }`}
                >
                  {activeUser && (
                    <>
                      <div className="flex flex-col items-center gap-2 mb-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                          {activeUser.name.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-2xl font-semibold">
                          {activeUser.name}
                        </h2>
                        <p className="text-gray-400 text-sm">Team Member</p>
                      </div>

                      <hr className="border-gray-700 mb-6" />

                      <div className="flex flex-col gap-5 text-sm">
                        <div className="flex flex-col gap-2">
                          <h3 className="font-semibold text-gray-300 uppercase tracking-wide text-xs">
                            Contact Info
                          </h3>
                          <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition">
                            <MdEmail size={19} className="text-yellow-700" />

                            <span>{activeUser.email}</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition">
                            <FaPhone size={17} className="text-blue-600" />
                            <span>{activeUser.phoneNo || "-"}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <h3 className="font-semibold text-gray-300 uppercase tracking-wide text-xs">
                            Location
                          </h3>
                          <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition">
                            <svg
                              className="w-5 h-5 text-blue-400"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 11c2.21 0 4-1.79 4-4S14.21 3 12 3 8 4.79 8 7s1.79 4 4 4zM12 13v8"
                              />
                            </svg>
                            <span>
                              {activeUser.city}, {activeUser.state}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <h3 className="font-semibold text-gray-300 uppercase tracking-wide text-xs">
                            About
                          </h3>
                          <p className="p-3 bg-zinc-800 rounded-lg text-gray-300 hover:bg-zinc-700 transition">
                            {activeUser.des || "No description provided."}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveUser(null)}
                        className="mt-auto py-3 px-6 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-semibold shadow-lg transition-all"
                      >
                        Close
                      </button>
                    </>
                  )}
                </div>
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
                      {cur.name}
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
                      onClick={() => handleSideBar(cur)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-800 w-full rounded-md"
                    >
                      <FiEye size={16} />
                      Details
                    </button>
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
      {/* {teamOption && (
        <div
          onClick={handleTeamOption}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          {step === 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 w-full max-w-md p-8 rounded-2xl shadow-xl flex flex-col gap-3 relative"
            >
              <h1 className="text-2xl font-semibold text-center text-white">
                Personal Information <br />
                <span className="text-[17px] font-normal">
                  Please provide your basic personal details below
                </span>
              </h1>
              <p className="text-center text-gray-400 text-sm"></p>

              <form onSubmit={addMember} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="firstName"
                  value={userFormData.firstName}
                  onChange={handleFormChange}
                  placeholder="First Name"
                  className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />

                <input
                  type="text"
                  name="middleName"
                  value={userFormData.middleName}
                  onChange={handleFormChange}
                  placeholder="Middle Name"
                  className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />

                <input
                  type="text"
                  name="lastName"
                  value={userFormData.lastName}
                  onChange={handleFormChange}
                  placeholder="Last Name"
                  className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />

                <input
                  type="date"
                  name="dob"
                  value={userFormData.dob}
                  onChange={handleFormChange}
                  className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />

                <div className="flex gap-3">
                  <select
                    name="gender"
                    value={userFormData.gender}
                    onChange={handleFormChange}
                    className="flex-1 p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    required
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="trans">Trans</option>
                  </select>

                  <select
                    name="maritalStatus"
                    value={userFormData.maritalStatus}
                    onChange={handleFormChange}
                    className="flex-1 p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  >
                    <option value="">Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                  </select>
                </div>

                <input
                  type="text"
                  name="nationality"
                  value={userFormData.nationality}
                  onChange={handleFormChange}
                  placeholder="Nationality"
                  className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </form>
              <div className="w-full flex justify-end mt-4">
                <button
                  onClick={handleNext}
                  className="bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-2 rounded-full text-white font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 w-full max-w-md p-8 rounded-3xl shadow-2xl flex flex-col"
            >
              <h1 className="text-2xl font-semibold text-white mb-4 flex flex-col items-center">
                <span>Contact & Address Information</span>
                <span className="text-sm text-gray-300 mt-1 text-center font-normal">
                  Please make sure all information is correct before submitting.
                </span>
              </h1>

              <form onSubmit={addMember} className="flex flex-col gap-4">
                <input
                  type="email"
                  name="email"
                  value={userFormData.email}
                  onChange={handleFormChange}
                  placeholder="Email"
                  className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm w-full"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  value={userFormData.phone}
                  onChange={handleFormChange}
                  placeholder="Phone Number"
                  className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm w-full"
                />

                <input
                  type="text"
                  name="address1"
                  value={userFormData.address1}
                  onChange={handleFormChange}
                  placeholder="Address 1"
                  className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm w-full"
                  required
                />
                <input
                  type="text"
                  name="address2"
                  value={userFormData.address2}
                  onChange={handleFormChange}
                  placeholder="Address 2"
                  className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm w-full"
                  required
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    name="city"
                    value={userFormData.city}
                    onChange={handleFormChange}
                    placeholder="City"
                    className="flex-1 p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm w-full"
                  />
                  <input
                    type="text"
                    name="state"
                    value={userFormData.state}
                    onChange={handleFormChange}
                    placeholder="State"
                    className="flex-1 p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm w-full"
                  />
                </div>

                <input
                  type="text"
                  name="pincode"
                  value={userFormData.pincode}
                  onChange={handleFormChange}
                  placeholder="Pincode"
                  className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm w-full"
                />
              </form>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handlePrev}
                  className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 w-full max-w-md p-8 rounded-3xl shadow-2xl flex flex-col gap-4"
            >
              <h1 className="text-2xl font-semibold text-center text-white">
                Employment Information
                <span className="block font-normal text-sm text-gray-300 mt-1">
                  Please provide your current employment details accurately.
                </span>
              </h1>

              <form onSubmit={addMember} className="flex flex-col gap-4">
                <input
                  type="date"
                  name="employmentStartDate"
                  value={userFormData.employmentStartDate}
                  onChange={handleFormChange}
                  placeholder="Employment Start Date"
                  className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm w-full"
                  required
                />

                <input
                  type="text"
                  name="employmentType"
                  value={userFormData.employmentType}
                  onChange={handleFormChange}
                  placeholder="Employment Type"
                  className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm w-full"
                  required
                />

                <input
                  type="text"
                  name="jobTitle"
                  value={userFormData.jobTitle}
                  onChange={handleFormChange}
                  placeholder="Job Title"
                  className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm w-full"
                />

                <input
                  type="text"
                  name="department"
                  value={userFormData.department}
                  onChange={handleFormChange}
                  placeholder="Department"
                  className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm w-full"
                />

                <input
                  type="text"
                  name="reportingManager"
                  value={userFormData.reportingManager}
                  onChange={handleFormChange}
                  placeholder="Reporting Manager"
                  className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm w-full"
                />
              </form>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handlePrev}
                  className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                >
                  Prev
                </button>
                <button
                  type="submit"
                  onClick={addMember}
                  className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      )} */}

      {teamOption && (
        <div
          onClick={handleTeamOption}
          className="absolute no-scrollbar left-0 top-0 h-screen w-full overflow-y-auto bg-gradient-to-b from-black via-zinc-950 to-black p-8 text-white z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col gap-8 max-w-6xl mx-auto"
          >
            <div className="border border-zinc-700 rounded-2xl p-8 shadow-lg bg-gradient-to-b from-zinc-900 to-zinc-950 hover:shadow-purple-500/10 transition-all duration-300">
              <h1 className="text-3xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Personal Information
              </h1>
              <p className="text-sm text-zinc-400 mb-5">
                Fill in your basic personal details carefully.
              </p>
              <div className="flex flex-wrap gap-2">
                <label className="w-full text-zinc-300 font-medium">
                  Full Name
                </label>

                <div className="flex flex-col flex-1 min-w-[250px] group">
                  <input
                    type="text"
                    name="firstName"
                    value={userFormData.firstName}
                    onChange={handleFormChange}
                    className="border border-zinc-700 bg-transparent rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  />
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    First Name
                  </label>
                </div>
                <div className="flex flex-col flex-1 min-w-[250px] group">
                  <input
                    type="text"
                    name="middleName"
                    value={userFormData.middleName}
                    onChange={handleFormChange}
                    className="border border-zinc-700 bg-transparent rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  />
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    Middle Name
                  </label>
                </div>

                <div className="flex flex-col flex-1 min-w-[250px] group">
                  <input
                    type="text"
                    name="lastName"
                    value={userFormData.lastName}
                    onChange={handleFormChange}
                    className="border border-zinc-700 bg-transparent rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  />
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    Last Name
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <label className="w-full text-zinc-300 font-medium">
                  Personality
                </label>
                <div className="flex flex-col flex-1 min-w-[250px] group">
                  <input
                    type="date"
                    name="dob"
                    value={userFormData.dob}
                    onChange={handleFormChange}
                    className="border border-zinc-700 bg-transparent rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  />
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    Date of Birth
                  </label>
                </div>

                <div className="flex flex-col flex-1 min-w-[250px] group">
                  <select
                    name="gender"
                    value={userFormData.gender}
                    onChange={handleFormChange}
                    className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="trans">Trans</option>
                  </select>
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    Gender
                  </label>
                </div>

                <div className="flex flex-col flex-1 min-w-[250px] group">
                  <select
                    name="maritalStatus"
                    value={userFormData.maritalStatus}
                    onChange={handleFormChange}
                    className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  >
                    <option value="">Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                  </select>
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    Gender
                  </label>
                </div>

                <div className="flex flex-col flex-1 min-w-[250px] group">
                  <input
                    type="text"
                    name="nationality"
                    value={userFormData.nationality}
                    onChange={handleFormChange}
                    className="border border-zinc-700 bg-transparent rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  />
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    Nationality
                  </label>
                </div>
              </div>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-8 shadow-lg bg-gradient-to-b from-zinc-900 to-zinc-950 hover:shadow-purple-500/10 transition-all duration-300">
              <h1 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Contact & Address Information
              </h1>
              <p className="text-sm text-zinc-400 mb-5">
                Provide your contact details and current address.
              </p>

              <div className="flex flex-wrap gap-2">
                <label className="w-full text-zinc-300 font-medium">
                  Contact
                </label>

                <div className="flex flex-col flex-1 min-w-[300px] group">
                  <input
                    type="email"
                    name="email"
                    value={userFormData.email}
                    onChange={handleFormChange}
                    className="border border-zinc-700 bg-transparent rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  />
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    Email
                  </label>
                </div>

                <div className="flex flex-col flex-1 min-w-[300px] group">
                  <input
                    type="text"
                    name="phone"
                    value={userFormData.phone}
                    onChange={handleFormChange}
                    className="border border-zinc-700 bg-transparent rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  />
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    Phone No.
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <label className="w-full text-zinc-300 font-medium">
                  Address
                </label>

                <div className="flex flex-col flex-1 min-w-[300px] group">
                  <input
                    type="text"
                    name="address1"
                    value={userFormData.address1}
                    onChange={handleFormChange}
                    className="border border-zinc-700 bg-transparent rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  />
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    Address 1
                  </label>
                </div>

                <div className="flex flex-col flex-1 min-w-[300px] group">
                  <input
                    type="text"
                    name="address2"
                    value={userFormData.address2}
                    onChange={handleFormChange}
                    className="border border-zinc-700 bg-transparent rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  />
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    Address 2
                  </label>
                </div>

                <div className="flex flex-col flex-1 min-w-[300px] group">
                  <input
                    type="text"
                    name="state"
                    value={userFormData.state}
                    onChange={handleFormChange}
                    className="border border-zinc-700 bg-transparent rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  />
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    State
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-5">
                <div className="flex flex-col flex-1 min-w-[300px] max-w-[465px] group">
                  <input
                    type="text"
                    name="city"
                    value={userFormData.city}
                    onChange={handleFormChange}
                    className="border border-zinc-700 bg-transparent rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  />
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    City
                  </label>
                </div>

                <div className="flex flex-col flex-1 min-w-[300px] max-w-[465px] group">
                  <input
                    type="text"
                    name="pincode"
                    value={userFormData.pincode}
                    onChange={handleFormChange}
                    className="border border-zinc-700 bg-transparent rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                  />
                  <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                    Pincode
                  </label>
                </div>
              </div>
            </div>
            <div className="border border-zinc-700 rounded-2xl p-8 shadow-lg bg-gradient-to-b from-zinc-900 to-zinc-950 hover:shadow-purple-500/10 transition-all duration-300">
              <h1 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Employment Details
              </h1>
              <p className="text-sm text-zinc-400 mb-6">
                Provide your employment details for company records.
              </p>

              <div className="flex flex-wrap gap-3 mb-5">
                <div className="w-full flex gap-4">
                  <div className="flex flex-col flex-1 min-w-[250px] group">
                    <input
                      type="date"
                      name="employmentStartDate"
                      value={userFormData.employmentStartDate}
                      onChange={handleFormChange}
                      className="border border-zinc-700 bg-transparent rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                    />
                    <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                      Employment Start Date
                    </label>
                  </div>

                  <div className="flex flex-col flex-1 min-w-[250px] group">
                    <select
                      name="employmentType"
                      value={userFormData.employmentType}
                      onChange={handleFormChange}
                      className="p-2.5 rounded-lg bg-transparent border border-zinc-700 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                    >
                      <option className="bg-zinc-800" value="">
                        Select Employment Type
                      </option>
                      <option className="bg-zinc-800" value="fulltime">
                        Full-Time
                      </option>
                      <option className="bg-zinc-800" value="parttime">
                        Part-Time
                      </option>
                      <option className="bg-zinc-800" value="internship">
                        Internship
                      </option>
                      <option className="bg-zinc-800" value="contract">
                        Contract
                      </option>
                    </select>
                    <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                      Employment Type
                    </label>
                  </div>

                  {/* Job Title */}
                  <div className="flex flex-col flex-1 min-w-[250px] group">
                    <select
                      name="jobTitle"
                      value={userFormData.jobTitle}
                      onChange={handleFormChange}
                      className="p-2.5 rounded-lg bg-transparent border border-zinc-700 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                    >
                      <option className="bg-zinc-800" value="">
                        Select Job Title
                      </option>
                      <option className="bg-zinc-800" value="frontend">
                        Frontend Developer
                      </option>
                      <option className="bg-zinc-800" value="backend">
                        Backend Developer
                      </option>
                      <option className="bg-zinc-800" value="uiux">
                        UI/UX Designer
                      </option>
                      <option className="bg-zinc-800" value="manager">
                        Project Manager
                      </option>
                    </select>
                    <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                      Job Title
                    </label>
                  </div>
                </div>

                {/* Department */}
                <div className="w-full flex gap-4 mt-3">
                  <div className="flex flex-col flex-1 min-w-[250px] group">
                    <select
                      name="department"
                      value={userFormData.department}
                      onChange={handleFormChange}
                      className="p-2.5 rounded-lg bg-transparent border border-zinc-700 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                    >
                      <option className="bg-zinc-800" value="">
                        Select Department
                      </option>
                      <option className="bg-zinc-800" value="hr">
                        Human Resources
                      </option>
                      <option className="bg-zinc-800" value="finance">
                        Finance
                      </option>
                      <option className="bg-zinc-800" value="tech">
                        Technology
                      </option>
                      <option className="bg-zinc-800" value="marketing">
                        Marketing
                      </option>
                    </select>
                    <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                      Department
                    </label>
                  </div>

                  {/* Reporting Manager */}
                  <div className="flex flex-col flex-1 min-w-[250px] group">
                    <select
                      name="reportingManager"
                      value={userFormData.reportingManager}
                      onChange={handleFormChange}
                      className="p-2.5 rounded-lg bg-transparent border border-zinc-700 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all group-hover:border-zinc-500"
                    >
                      <option className="bg-zinc-800" value="">
                        Select Reporting Manager
                      </option>
                      <option className="bg-zinc-800" value="gautam">
                        Gautam Sir
                      </option>
                      <option className="bg-zinc-800" value="kumal">
                        Kumal Sir
                      </option>
                      <option className="bg-zinc-800" value="rohit">
                        Rohit Sir
                      </option>
                    </select>
                    <label className="text-xs text-zinc-500 mt-2 text-right group-hover:text-zinc-300">
                      Reporting Manager
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-5 mb-20">
              <button
                onClick={handleTeamOption}
                className="px-6 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={addMember}
                className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white shadow-lg transition-all"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
