"use client";

import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";

export default function Todo() {
  const {
    renderTaskRow,
    addTask,
    list,
    progressTasks,
    pendingTasks,
    completedTask,
    input,
    setInput,
    setList,
  } = useContext(TodoContext);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setList(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(list));
  }, [list]);

  return (
    <div className="w-full h-auto px-5 py-5">
      {progressTasks.length > 0 && (
        <div className="mb-6">
          <div className="w-full flex justify-between px-2">
            <h1 className="text-xl font-semibold text-start">Progress Tasks</h1>
            <div className="flex text-sm gap-3">
              <div className="p-2 w-[120px]">Assignee</div>
              <div className="p-2 w-[120px]">Due date</div>
              <div className="p-2 w-[120px]">Remove</div>
            </div>
          </div>
          {progressTasks.map(renderTaskRow)}
        </div>
      )}

      {completedTask.length > 0 && (
        <div className="mb-6">
          <div className="w-full flex justify-between px-2">
            <h1 className="text-xl font-semibold text-start">Complete Tasks</h1>
            <div className="flex text-sm gap-3">
              <div className="p-2 w-[120px]">Assignee</div>
              <div className="p-2 w-[120px]">Due date</div>
              <div className="p-2 w-[120px]">Remove</div>
            </div>
          </div>
          {completedTask.map(renderTaskRow)}
        </div>
      )}

      <div className="w-full flex justify-between px-2">
        <h1 className="text-xl font-semibold text-start">Todo App</h1>
        <div className="flex text-sm gap-3">
          <div className="p-2 w-[120px]">Assignee</div>
          <div className="p-2 w-[120px]">Due date</div>
          <div className="p-2 w-[120px]">Remove</div>
        </div>
      </div>
      <div className="List text-zinc-800">
        {pendingTasks.map(renderTaskRow)}
      </div>

      {/* Add new Task */}
      <div className="p-1 mt-2 flex border-t border-zinc-800 border-b w-full justify-between items-center">
        <div className="w-1/2">
          <input
            type="text"
            value={input}
            placeholder="Add Task"
            onChange={(e) => setInput(e.target.value)}
            className="p-2 w-full text-sm rounded-md outline-none"
          />
        </div>
        <div>
          <button
            onClick={addTask}
            className="bg-purple-600 p-2 text-xs rounded-md hover:bg-purple-700 text-white"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
