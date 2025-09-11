"use client";

import { useEffect, useState } from "react";
import { MdOutlinePeople } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { json } from "stream/consumers";

interface Task {
  id: number;
  task: string;
  completed: boolean;
  assignedTo: string;
  deadline: string;
}

export default function Todo() {
  const [input, setInput] = useState("");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openDeadLine, setOpenDeadLine] = useState<number | null>(null);
  const [list, setList] = useState<Task[]>([]);

  const addTask = () => {
    if (!input.trim()) return;
    setList((prev) => [
      ...prev,
      {
        id: Date.now(),
        task: input,
        completed: false,
        assignedTo: "",
        deadline: "",
      },
    ]);
    setInput("");
    console.log(list);
  };

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setList(JSON.parse(saved));
    }
  }, []);

  const toggleCompleted = (id: number) => {
    setList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(list));
  }, [list]);

  const assignUser = (id: number, user: string) => {
    setList((prev) =>
      prev.map((t) => {
        return t.id === id ? { ...t, assignedTo: user } : t;
      })
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

  const users = ["dhannu", "rohit", "rupak", "himanshu"];

  return (
    <div className=" w-full h-auto px-10 py-5">
      <div className="w-full flex justify-between px-2">
        <h1 className="text-xl font-semibold text-start">Todo App</h1>
        <div className="flex text-sm gap-3">
          <div className="p-2 w-[120px] hover:bg-zinc-800">Assignee</div>
          <div className="p-2 w-[120px] hover:bg-zinc-800">Due date</div>
          <div className="p-2 w-[120px] hover:bg-zinc-800">Remove</div>
        </div>
      </div>

      <div className="List text-zinc-800 ">
        {list.map((cur) => {
          return (
            <div
              key={cur.id}
              className="list p-1 px-2 mt-2 text-gray-400 text-sm flex border-t border-zinc-800 border-b w-full justify-between items-center "
            >
              <div className="w-1/2 flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={cur.completed}
                  onChange={() => toggleCompleted(cur.id)}
                  className="w-4 h-4 rounded-full appearance-none border checked:bg-green-600 cursor-pointer"
                />
                <span
                  className={`${
                    cur.completed ? "line-through text-gray-600" : ""
                  } `}
                >
                  {cur.task}
                </span>
              </div>
              <div className="flex text-start gap-2">
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === cur.id ? null : cur.id)
                    }
                    className=" p-2 text-sm w-[120px] text-start rounded-md hover:bg-zinc-800 text-white"
                  >
                    {cur.assignedTo ? (
                      cur.assignedTo
                    ) : (
                      <MdOutlinePeople size={20} />
                    )}
                  </button>
                  {cur.id === openDropdown && (
                    <div className="absolute z-50">
                      {users.map((user) => (
                        <button
                          onClick={() => assignUser(cur.id, user)}
                          className="block w-full bg-black text-left px-3 py-1  text-sm text-white hover:bg-zinc-800"
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
                    className="bg-transparent outline-none text-white text-xs"
                  />
                </label>

                <button
                  onClick={() => handleDelete(cur.id)}
                  className=" p-2 w-[120px] text-xs rounded-md hover:bg-zinc-800 text-white"
                >
                  <CiCircleRemove size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-1 mt-2 flex border-t border-zinc-800 border-b w-full justify-between items-center ">
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
