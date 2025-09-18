"use client";

import { createContext, useState } from "react";
import { MdOutlinePeople } from "react-icons/md";
import { CiCalendarDate, CiCircleRemove } from "react-icons/ci";
import { FaS } from "react-icons/fa6";
import ConfirmCompletedTask from "../Components/ConfirmCompletedTask";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [input, setInput] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openDropdownCheckbox, setOpenDropdownCheckbox] = useState(null);
  const [list, setList] = useState([]);
  const [subTaskInputs, setSubTaskInputs] = useState({});
  const [createTaskOption, setCreatedTaskOption] = useState(false);
  const [createTaskOptionInput, setCreatedTaskOptionInput] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [deadlineOption, setDeadlineOption] = useState("");
  const [confirmCompleteTask, setConfrimCompleteTask] = useState(null);

  const users = ["dhannu", "rohit", "rupak", "himanshu"];

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

  const addCreatedTask = () => {
    if (!createTaskOptionInput.trim()) return;
    setList((prev) => [
      ...prev,
      {
        id: Date.now(),
        task: createTaskOptionInput,
        status: "Pending",
        assignedTo: selectedUser || "",
        deadline: deadlineOption || "",
        subTasks: [],
      },
    ]);
    setCreatedTaskOptionInput("");
    setCreatedTaskOption(false);
    setSelectedUser("");
    setDeadlineOption("");
  };

  const assignUser = (id, user) => {
    setList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, assignedTo: user } : t))
    );
    setOpenDropdown(null);
  };

  const setDeadline = (id, date) => {
    setList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, deadline: date } : t))
    );
  };

  const handleDelete = (id) => {
    setList((prev) => prev.filter((cur) => cur.id !== id));
  };

  const addSubTask = (taskId, subTaskText) => {
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

  const toggleSubTaskStatus = (taskId, subTaskId) => {
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

  const deleteSubTask = (taskId, subTaskId) => {
    setList((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, subTasks: t.subTasks.filter((s) => s.id !== subTaskId) }
          : t
      )
    );
  };

  const handleCompleteCheckbox = (taskId, task) => {
    console.log(taskId, task);
    const hasPending =
      task.subTasks.length > 0 &&
      task.subTasks.some((cur) => cur.status !== "Completed");
    console.log(hasPending);

    if (task.subTasks.length === 0 || !hasPending) {
      setList((prev) =>
        prev.map((cur) =>
          cur.id === taskId ? { ...cur, status: "Completed" } : cur
        )
      );
      setOpenDropdownCheckbox(null);
    } else {
      setConfrimCompleteTask(hasPending ? taskId : null);
      setOpenDropdownCheckbox(null);
    }
  };

  const forceCompeleteTask = (taskId) => {
    setList((prev) =>
      prev.map((cur) => {
        return cur.id === taskId
          ? {
              ...cur,
              status: "Completed",
              subTasks: cur.subTasks.map((s) => ({
                ...s,
                status: "Completed",
              })),
            }
          : cur;
      })
    );
    setConfrimCompleteTask(null);
  };

  const progressTasks = list.filter((t) => t.status === "Progress");
  const pendingTasks = list.filter((t) => t.status === "Pending");
  const completedTask = list.filter((t) => t.status === "Completed");

  const today = new Date().toISOString().split("T")[0];

  const renderTaskRow = (cur) => (
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
                  onClick={() => handleCompleteCheckbox(cur.id, cur)}
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
          <div
            key={sub.id}
            className="flex items-center justify-between gap-2 mt-1"
          >
            <div className="flex items-center gap-1">
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
            </div>
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

  const handleCreateTaskOption = () => {
    setCreatedTaskOption(true);
  };

  const closeCreatedTaskOption = () => {
    setCreatedTaskOption(false);
  };

  return (
    <TodoContext.Provider
      value={{
        renderTaskRow,
        addTask,
        list,
        progressTasks,
        pendingTasks,
        completedTask,
        input,
        setInput,
        setList,
        handleCreateTaskOption,
        closeCreatedTaskOption,
        createTaskOption,
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
        setConfrimCompleteTask,
        forceCompeleteTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
