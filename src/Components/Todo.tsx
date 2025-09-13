"use client";

import { useEffect, useState } from "react";
import { MdOutlinePeople } from "react-icons/md";
import { CiCalendarDate, CiCircleRemove } from "react-icons/ci";

interface SubTask {
  id: number;
  task: string;
  status: "Pending" | "Completed";
}

interface Task {
  id: number;
  task: string;
  status: "Pending" | "Progress" | "Completed";
  assignedTo: string;
  deadline: string;
  subTasks: SubTask[];
}

export default function Todo() {
  const [input, setInput] = useState("");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openDropdownCheckbox, setOpenDropdownCheckbox] = useState<
    number | null
  >(null);
  const [list, setList] = useState<Task[]>([]);

  // 🔹 Track subtask input per task (so each task has its own input state)
  const [subTaskInputs, setSubTaskInputs] = useState<{
    [taskId: number]: string;
  }>({});

  const users = ["dhannu", "rohit", "rupak", "himanshu"];
  const today = new Date().toISOString().split("T")[0];

  const addTask = () => {
    if (!input.trim()) return;
    setList((prev) => [
      ...prev,
      {
        id: Date.now(),
        task: input,
        status: "Pending",
        assignedTo: "",
        deadline: "",
        subTasks: [],
      },
    ]);
    setInput("");
  };

  const assignUser = (id: number, user: string) => {
    setList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, assignedTo: user } : t))
    );
    setOpenDropdown(null);
  };

  const setDeadline = (id: number, date: string) => {
    setList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, deadline: date } : t))
    );
  };

  const handleDelete = (id: number) => {
    setList((prev) => prev.filter((cur) => cur.id !== id));
  };

  const addSubTask = (taskId: number, subTaskText: string) => {
    if (!subTaskText.trim()) return;
    setList((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subTasks: [
                ...t.subTasks,
                { id: Date.now(), task: subTaskText, status: "Pending" },
              ],
            }
          : t
      )
    );
  };

  const toggleSubTaskStatus = (taskId: number, subTaskId: number) => {
    setList((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subTasks: t.subTasks.map((s) =>
                s.id === subTaskId
                  ? {
                      ...s,
                      status: s.status === "Pending" ? "Completed" : "Pending",
                    }
                  : s
              ),
            }
          : t
      )
    );
  };

  const deleteSubTask = (taskId: number, subTaskId: number) => {
    setList((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, subTasks: t.subTasks.filter((s) => s.id !== subTaskId) }
          : t
      )
    );
  };

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setList(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(list));
  }, [list]);

  const progressTasks = list.filter((t) => t.status === "Progress");
  const pendingTasks = list.filter((t) => t.status === "Pending");
  const completedTask = list.filter((t) => t.status === "Completed");

  const renderTaskRow = (cur: Task) => (
    <div
      key={cur.id}
      className="list p-1 px-2 mt-2 text-gray-400 text-sm flex flex-col border-t border-zinc-800 border-b w-full"
    >
      {/* 🔹 Main Task Row */}
      <div className="flex justify-between items-center">
        <div className="w-1/2 flex gap-2 items-center">
          <div className="relative flex items-center gap-2">
            <input
              type="checkbox"
              checked={cur.status === "Completed"}
              onChange={() =>
                setOpenDropdownCheckbox(
                  cur.id === openDropdownCheckbox ? null : cur.id
                )
              }
              className={`w-4 h-4 rounded-full appearance-none border cursor-pointer
              ${
                cur.status === "Progress"
                  ? "bg-purple-600 border-purple-600"
                  : ""
              }
              ${
                cur.status === "Completed"
                  ? "bg-green-600 border-green-600"
                  : ""
              }
              ${
                cur.status === "Pending" ? "bg-transparent border-gray-400" : ""
              }
            `}
            />

            {cur.id === openDropdownCheckbox && (
              <div className="absolute left-6 top-6 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-50">
                <button
                  onClick={() => {
                    setList((prev) =>
                      prev.map((t) =>
                        t.id === cur.id ? { ...t, status: "Progress" } : t
                      )
                    );
                    setOpenDropdownCheckbox(null);
                  }}
                  className="block px-4 py-2 text-sm text-white hover:bg-zinc-800 w-full"
                >
                  Progress
                </button>
                <button
                  onClick={() => {
                    setList((prev) =>
                      prev.map((t) =>
                        t.id === cur.id ? { ...t, status: "Completed" } : t
                      )
                    );
                    setOpenDropdownCheckbox(null);
                  }}
                  className="block px-4 py-2 text-sm text-white hover:bg-zinc-800 w-full"
                >
                  Completed
                </button>
              </div>
            )}
          </div>
          <span>{cur.task}</span>
        </div>

        <div className="flex text-center gap-2">
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === cur.id ? null : cur.id)
              }
              className="p-2 text-sm  w-[120px] text-start rounded-md hover:bg-zinc-800 text-white "
            >
              {cur.assignedTo ? (
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-600 text-white text-xs">
                  {cur.assignedTo.charAt(0).toUpperCase()}
                </div>
              ) : (
                <MdOutlinePeople size={20} />
              )}
            </button>
            {cur.id === openDropdown && (
              <div className="absolute z-50">
                {users.map((user) => (
                  <button
                    onClick={() => assignUser(cur.id, user)}
                    className="block w-full bg-black text-left px-3 py-1 text-sm text-white hover:bg-zinc-800"
                    key={user}
                  >
                    {user}
                  </button>
                ))}
              </div>
            )}
          </div>

          <label className="p-2 text-xs w-[120px] text-start rounded-md hover:bg-zinc-800 text-white flex items-center gap-1 cursor-pointer">
            <CiCalendarDate size={20} />
            <input
              type="date"
              value={cur.deadline}
              onChange={(e) => setDeadline(cur.id, e.target.value)}
              min={today}
              className="bg-transparent outline-none text-white text-xs"
            />
          </label>

          <button
            onClick={() => handleDelete(cur.id)}
            className="p-2 w-[120px] text-xs rounded-md hover:bg-zinc-800 text-white"
          >
            <CiCircleRemove size={20} />
          </button>
        </div>
      </div>

      <div className="ml-6 mt-2">
        <h4 className="text-sm font-semibold text-gray-300">Subtasks</h4>

        {cur.subTasks.map((sub) => (
          <div key={sub.id} className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              checked={sub.status === "Completed"}
              onChange={() => toggleSubTaskStatus(cur.id, sub.id)}
              className={`appearance-none w-4 h-4 rounded-full border ${
                sub.status === "Completed" ? "bg-green-600" : ""
              }`}
            />
            <span
              className={
                sub.status === "Completed"
                  ? "line-through text-gray-500"
                  : "text-gray-300"
              }
            >
              {sub.task}
            </span>
            <button
              onClick={() => deleteSubTask(cur.id, sub.id)}
              className=" text-xs"
            >
              <CiCircleRemove size={20} />
            </button>
          </div>
        ))}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addSubTask(cur.id, subTaskInputs[cur.id] || "");
            setSubTaskInputs((prev) => ({ ...prev, [cur.id]: "" }));
          }}
          className="flex gap-2 mt-2"
        >
          <input
            type="text"
            value={subTaskInputs[cur.id] || ""}
            onChange={(e) =>
              setSubTaskInputs((prev) => ({
                ...prev,
                [cur.id]: e.target.value,
              }))
            }
            placeholder="Add Subtask"
            className="p-1 text-sm w-full text-gray-300 rounded-md outline-none"
          />
          <button
            type="submit"
            className="border px-2 py-1 bg-purple-600 text-white rounded-md border-gray-500"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="w-full h-auto px-10 py-5">
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
