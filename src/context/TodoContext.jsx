"use client";

import { createContext, useEffect, useState } from "react";
import { MdOutlinePeople } from "react-icons/md";
import { CiCalendarDate, CiCircleRemove } from "react-icons/ci";
import { FaS } from "react-icons/fa6";
import ConfirmCompletedTask from "../Components/ConfirmCompletedTask";
import { BsThreeDots } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDownloadDone } from "react-icons/md";
import { CiFlag1 } from "react-icons/ci";

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
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);
  const [openTodoMenu, setOpenTodoMenu] = useState(null);
  const [edittodoId, setEditTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");
  const [allTask, setAllTasks] = useState(false);
  const [subTaskOpen, setSubTaskOpen] = useState(null);
  const [priorityId, setPriorityId] = useState(null);

  useEffect(() => {
    const savedId = localStorage.getItem("savedSubtaskId");
    if (savedId) {
      setSubTaskOpen(JSON.parse(savedId));
    }
  }, []);

  // Save subTaskOpen to localStorage
  useEffect(() => {
    if (subTaskOpen !== null) {
      localStorage.setItem("savedSubtaskId", JSON.stringify(subTaskOpen));
    } else {
      localStorage.removeItem("savedSubtaskId");
    }
  }, [subTaskOpen]);

  const showAllTasks = () => {
    setAllTasks(true);
  };

  // const addTask = () => {
  //   if (!input.trim()) return;
  //   setList((prev) => [
  //     ...prev,
  //     {
  //       id: Date.now(),
  //       task: input,
  //       status: "Pending",
  //       assignedTo: "",
  //       deadline: "",
  //       subTasks: [],
  //     },
  //   ]);
  //   setInput("");
  // };

  const addTask = (spaceId) => {
    if (!input.trim()) return;

    // localStorage se pura data nikal lo
    const data = JSON.parse(localStorage.getItem("spaceItems")) || [];
    const updatedData = data.map((cur) => {
      if (Number(cur.id) === Number(spaceId)) {
        const newTask = {
          id: Date.now(),
          task: input,
          status: "Pending",
          assignedTo: "",
          deadline: "",
          priority: "",
          subTasks: [],
        };

        return {
          ...cur,
          todo: [...cur.todo, newTask],
        };
      }
      return cur;
    });

    // updated data ko localStorage me wapas save karo
    localStorage.setItem("spaceItems", JSON.stringify(updatedData));
    console.log("Updated spaceItems:", updatedData);

    const selectedSpace = updatedData.find(
      (cur) => Number(cur.id) === Number(spaceId)
    );
    setList(selectedSpace?.todo || []);
    setInput("");
  };

  useEffect(() => {
    const saved = localStorage.getItem("spaceItems");
    if (saved) setList(JSON.parse(saved));
  }, []);

  const handleSpaceClick = (id) => {
    setSelectedSpaceId(id);
    const data = JSON.parse(localStorage.getItem("spaceItems")) || [];
    const selectedSpace = data.find((space) => Number(space.id) === Number(id));
    setList(selectedSpace?.todo || []);
    setAllTasks(false);
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

  const assignUser = (taskId, user, spaceId) => {
    setList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, assignedTo: user } : t))
    );

    // localStorage update
    const data = JSON.parse(localStorage.getItem("spaceItems")) || [];
    const updatedData = data.map((space) => {
      if (Number(space.id) === Number(spaceId)) {
        return {
          ...space,
          todo: space.todo.map((t) =>
            t.id === taskId ? { ...t, assignedTo: user } : t
          ),
        };
      }
      return space;
    });

    localStorage.setItem("spaceItems", JSON.stringify(updatedData));
    setOpenDropdown(null);
  };

  const declarePriority = (prioId, prioName, spaceId) => {
    setList((prev) =>
      prev.map((t) => (t.id === prioId ? { ...t, priority: prioName } : t))
    );

    const data = JSON.parse(localStorage.getItem("spaceItems")) || [];
    const updatedData = data.map((space) => {
      if (Number(space.id) === Number(spaceId)) {
        return {
          ...space,
          todo: space.todo.map((t) =>
            t.id === prioId ? { ...t, priority: prioName } : t
          ),
        };
      }
      return space;
    });

    localStorage.setItem("spaceItems", JSON.stringify(updatedData));
    setPriorityId(null);
  };

  const setDeadline = (taskId, newDate, spaceId) => {
    setList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, deadline: newDate } : t))
    );

    // localStorage update
    const data = JSON.parse(localStorage.getItem("spaceItems")) || [];
    const updatedData = data.map((space) => {
      if (Number(space.id) === Number(spaceId)) {
        return {
          ...space,
          todo: space.todo.map((t) =>
            t.id === taskId ? { ...t, deadline: newDate } : t
          ),
        };
      }
      return space;
    });

    localStorage.setItem("spaceItems", JSON.stringify(updatedData));
  };

  const handleDelete = (id) => {
    setList((prev) => prev.filter((cur) => cur.id !== id));

    const data = JSON.parse(localStorage.getItem("spaceItems")) || [];
    const updatedData = data.map((space) => {
      if (Number(space.id) === Number(selectedSpaceId)) {
        return {
          ...space,
          todo: space.todo.filter((t) => t.id !== id),
        };
      }
      return space;
    });

    localStorage.setItem("spaceItems", JSON.stringify(updatedData));
  };

  const addSubTask = (taskId, subTaskText) => {
    if (!subTaskText.trim()) return;

    // Update the list state
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

    // Also update localStorage
    const data = JSON.parse(localStorage.getItem("spaceItems")) || [];
    const updatedData = data.map((space) => {
      if (Number(space.id) === Number(selectedSpaceId)) {
        return {
          ...space,
          todo: space.todo.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  subTasks: [
                    ...t.subTasks,
                    { id: Date.now(), task: subTaskText, status: "Pending" },
                  ],
                }
              : t
          ),
        };
      }
      return space;
    });

    localStorage.setItem("spaceItems", JSON.stringify(updatedData));
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

  const handleEditTodo = (id) => {
    console.log(id);
    const todo = list.find((t) => t.id === id);
    if (todo) {
      setEditTodoId(id);
      setEditingTodoText(todo.task);
    }
  };

  const saveTodo = (id) => {
    const updatedList = list.map((t) =>
      t.id === id ? { ...t, task: editingTodoText } : t
    );
    setList(updatedList);

    // Update localStorage too if you are using spaceItems
    const data = JSON.parse(localStorage.getItem("spaceItems")) || [];
    const updatedData = data.map((space) => ({
      ...space,
      todo: space.todo.map((t) =>
        t.id === id ? { ...t, task: editingTodoText } : t
      ),
    }));
    localStorage.setItem("spaceItems", JSON.stringify(updatedData));

    setEditTodoId(null);
    setEditingTodoText("");
    setOpenTodoMenu(null);
  };

  const updateTaskStatus = (taskId, newStatus, spaceId) => {
    // state update
    setList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    // localStorage update
    const data = JSON.parse(localStorage.getItem("spaceItems")) || [];
    const updatedData = data.map((space) => {
      if (Number(space.id) === Number(spaceId)) {
        return {
          ...space,
          todo: space.todo.map((t) =>
            t.id === taskId ? { ...t, status: newStatus } : t
          ),
        };
      }
      return space;
    });

    localStorage.setItem("spaceItems", JSON.stringify(updatedData));
  };

  const users = ["dhannu", "rohit", "rupak", "himanshu"];
  const priortyOption = [
    { id: 1, name: "Urgent", color: "pink" },
    { id: 2, name: "High", color: "yellow" },
    { id: 3, name: "Normal", color: "blue" },
    { id: 4, name: "Low", color: "white" },
  ];

  const renderTaskRow = (cur, id) => (
    <div
      key={cur.id}
      className="list p-1 px-2 mt-2 text-gray-100 text-sm flex flex-col border-t border-zinc-800 border-b w-full"
    >
      {/* 🔹 Main Task Row */}
      <div className="flex justify-between items-center">
        <div className="relative group w-1/2 flex gap-2 items-center">
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
                    updateTaskStatus(cur.id, "Progress", id);
                    setOpenDropdownCheckbox(null);
                  }}
                  className="block px-4 py-2 text-sm text-white hover:bg-zinc-800 w-full"
                >
                  Progress
                </button>
                <button
                  onClick={() => {
                    handleCompleteCheckbox(cur.id, cur);
                  }}
                  className="block px-4 py-2 text-sm text-white hover:bg-zinc-800 w-full"
                >
                  Completed
                </button>
              </div>
            )}
          </div>

          {edittodoId === cur.id ? (
            <input
              type="text"
              value={editingTodoText}
              onChange={(e) => setEditingTodoText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveTodo(cur.id);
                }
              }}
              className="w-full text-white px-2 py-2 outline-none bg-zinc-800 rounded-md "
            />
          ) : (
            <span className="text-white">{cur.task}</span>
          )}

          <button
            onClick={() =>
              setSubTaskOpen((prev) => (prev === cur.id ? null : cur.id))
            }
            className="absolute top-1/2 -translate-y-1/2 right-2 bg-zinc-700 cursor-pointer text-white px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            +
          </button>

          <button
            onClick={() => handleEditTodo(cur.id)}
            className="absolute top-1/2 -translate-y-1/2 right-10 
                        bg-zinc-600 
                        cursor-pointer text-white px-2 py-1 rounded-md shadow-md
                        opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <MdOutlineModeEdit size={12} />
          </button>
        </div>

        <div className="flex text-center gap-2">
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === cur.id ? null : cur.id)
              }
              className="p-2 relative text-sm  w-[120px] text-start rounded-md hover:bg-zinc-800 text-white "
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
                    onClick={() => assignUser(cur.id, user, id)}
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
              onChange={(e) => setDeadline(cur.id, e.target.value, id)}
              min={today}
              className="bg-transparent outline-none text-white text-xs"
            />
          </label>

          <div className="relative">
            <button
              onClick={() =>
                setPriorityId((prev) => (prev === cur.id ? null : cur.id))
              }
              className="py-2 px-3 relative text-sm w-[120px] text-start rounded-md hover:bg-zinc-800 text-white flex items-center gap-2"
            >
              {cur.priority ? (
                <CiFlag1
                  size={18}
                  color={
                    priortyOption.find((p) => p.name === cur.priority)?.color ||
                    "red"
                  }
                />
              ) : (
                <CiFlag1 size={18} className="text-red-600" />
              )}
            </button>

            {cur.id === priorityId && (
              <div className="p-2 rounded-md bg-zinc-900 min-w-[150px] space-y-2 absolute z-50">
                {priortyOption.map((prio) => (
                  <button
                    className="rounded-md w-full bg-zinc-900 text-left px-3 py-2 text-sm text-white hover:bg-zinc-950 cursor-pointer flex items-center gap-2"
                    key={prio.id}
                    onClick={() => {
                      declarePriority(cur.id, prio.name, id);
                      setPriorityId(null);
                    }}
                  >
                    <CiFlag1 size={18} color={prio.color} /> {prio.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full h-full relative">
            <button
              onClick={() =>
                setOpenTodoMenu(cur.id === openTodoMenu ? null : cur.id)
              }
              className="p-2 ml-2 relative w-[120px] text-xs rounded-md hover:bg-zinc-800 text-white"
            >
              <BsThreeDots size={20} />
            </button>

            {cur.id === openTodoMenu && (
              <div className="absolute left-6 top-10 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-50 w-[100px]">
                <button
                  onClick={() => handleEditTodo(cur.id)}
                  className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 rounded-md w-full"
                >
                  <span className="flex items-center gap-2">
                    <MdOutlineModeEdit size={15} />
                    <p className="text-[14px]">Edit</p>
                  </span>
                </button>
                {edittodoId === cur.id && (
                  <button
                    onClick={() => saveTodo(cur.id)}
                    className="block px-4 py-2 text-sm text-green-200 hover:bg-zinc-800 rounded-md w-full"
                  >
                    <span className="flex items-center gap-2">
                      <MdDownloadDone size={16} />
                      <p className="text-[14px]">Save</p>
                    </span>
                  </button>
                )}
                <button
                  onClick={() => handleDelete(cur.id)}
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
      </div>

      {subTaskOpen === cur.id && (
        <div className="ml-6">
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
                      : "text-gray-100"
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
              className="p-1 text-sm w-full text-gray-100 rounded-md outline-none"
            />
            <button
              type="submit"
              className="border px-2 py-1 bg-purple-600 text-white rounded-md border-gray-500"
            >
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );

  const handleCreateTaskOption = () => {
    setCreatedTaskOption(true);
  };

  const closeCreatedTaskOption = () => {
    setCreatedTaskOption(false);
  };

  const getAllTasks = () => {
    const data = JSON.parse(localStorage.getItem("spaceItems")) || [];
    return data.map((space) => ({
      ...space,
      todo: space.todo || [],
    }));
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
        handleSpaceClick,
        selectedSpaceId,
        showAllTasks,
        allTask,
        getAllTasks,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
