"use client";
import React from "react";
import PersonalList from "../../Components/myTasks/PersonalList";
import MyWork from "../../Components/myTasks/MyWork";
import AssignToMe from "../../Components/myTasks/AssignToMe";
import AssignedComments from "../../Components/myTasks/AssignedComments";
import Priorities from "../../Components/myTasks/Priorities";

export default function page() {
  return (
    <div className="w-full h-auto bg-black text-white">
      <div className="w-full p-2 h-auto flex justify-between items-center border-b border-zinc-800 bg-zinc-900 rounded-md">
        <h1>My Tasks</h1>
        <button className="px-2 py-1 bg-purple-700 text-white rounded-md">
          Manage Cards
        </button>
      </div>
      <div className="flex gap-y-5  flex-wrap justify-between p-5">
        <h1 className="w-full text-2xl font-semibold">Good Morning, Dhannu</h1>

        <PersonalList />
        <MyWork />
        <AssignToMe />
        <AssignedComments />
        <Priorities />
      </div>
    </div>
  );
}
