"use client";
import React, { useContext, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";

export default function AllTask() {
  const { renderTaskRow, getAllTasks, setList } = useContext(TodoContext);

  const savedSpaces = getAllTasks();
  console.log(savedSpaces);

  useEffect(() => {
    const spaces = getAllTasks();
    const allTodos = spaces.flatMap((space) => space.todo || []);
    setList(allTodos);
  }, []);

  return (
    <div className="w-full h-full p-5 space-y-6">
      {savedSpaces.map((space) => {
        const progressTasks = space.todo.filter((t) => t.status === "Progress");
        const completedTasks = space.todo.filter(
          (t) => t.status === "Completed"
        );
        const pendingTasks = space.todo.filter((t) => t.status === "Pending");

        return (
          <div
            className="bg-zinc-900 w-full rounded-md text-zinc-300 p-5 shadow-lg"
            key={space.id}
          >
            <h1 className="text-2xl font-bold mb-6">{space.spaceList}</h1>

            {/* Progress Tasks */}
            {progressTasks.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl px-4 font-semibold">Progress Tasks</h2>
                  <div className="flex text-sm gap-3 px-9 font-medium text-zinc-400 mb-2">
                    <div className="p-2 w-[120px] text-center">Assignee</div>
                    <div className="p-2 w-[120px] text-center">Due date</div>
                    <div className="p-2 w-[120px] text-center">Priority</div>
                    <div className="p-2 w-[120px] text-center">Menu</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {progressTasks.map((task) => renderTaskRow(task, space.id))}
                </div>
              </div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold px-2">
                    Completed Tasks
                  </h2>
                  <div className="flex text-sm gap-3 px-9 font-medium text-zinc-400 mb-2">
                    <div className="p-2 w-[120px] text-center">Assignee</div>
                    <div className="p-2 w-[120px] text-center">Due date</div>
                    <div className="p-2 w-[120px] text-center">Priority</div>
                    <div className="p-2 w-[120px] text-center">Menu</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {completedTasks.map((task) => renderTaskRow(task, space.id))}
                </div>
              </div>
            )}

            {/* Pending Tasks */}
            {pendingTasks.length > 0 && (
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold px-4">Todo Tasks</h2>
                  <div className="flex text-sm gap-3 px-9 font-medium text-zinc-400 mb-2">
                    <div className="p-2 w-[120px] text-center">Assignee</div>
                    <div className="p-2 w-[120px] text-center">Due date</div>
                    <div className="p-2 w-[120px] text-center">Priority</div>
                    <div className="p-2 w-[120px] text-center">Menu</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {pendingTasks.map((task) => renderTaskRow(task, space.id))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
