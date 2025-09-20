"use client";
import React, { useState } from "react";
import PersonalList from "../../Components/myTasks/PersonalList";
import MyWork from "../../Components/myTasks/MyWork";
import AssignToMe from "../../Components/myTasks/AssignToMe";
import AssignedComments from "../../Components/myTasks/AssignedComments";
import Priorities from "../../Components/myTasks/Priorities";

export default function Page() {
  const [tasks, setTasks] = useState([
    { id: 1, component: <PersonalList /> },
    { id: 2, component: <MyWork /> },
    { id: 3, component: <AssignToMe /> },
    { id: 4, component: <AssignedComments /> },
    { id: 5, component: <Priorities /> },
  ]);

  const [draggedId, setDraggedId] = useState(null);

  const handleDrop = (dropId) => {
    if (draggedId === null || draggedId === dropId) return;

    const newTasks = [...tasks];
    const fromIndex = newTasks.findIndex((t) => t.id === draggedId);
    const toIndex = newTasks.findIndex((t) => t.id === dropId);

    const [movedItem] = newTasks.splice(fromIndex, 1);
    newTasks.splice(toIndex, 0, movedItem);

    setTasks(newTasks);
    setDraggedId(null);
  };

  return (
    <div className="w-full h-auto bg-black text-white">
      <div className="w-full p-2 h-auto flex justify-between items-center border-b border-zinc-800 bg-zinc-900 rounded-md">
        <h1>My Tasks</h1>
        <button className="px-2 py-1 bg-purple-700 text-white rounded-md">
          Manage Cards
        </button>
      </div>
      <div className="flex gap-y-5 flex-wrap justify-between p-5">
        <h1 className="w-full text-2xl font-semibold">Good Morning, Dhannu</h1>

        <div className="container flex gap-y-5 flex-wrap justify-between p-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              draggable={true}
              onDragStart={(e) => {
                setDraggedId(task.id);
                e.dataTransfer.effectAllowed = "move";

                // custom drag preview
                const dragImage = e.currentTarget.cloneNode(true);
                dragImage.style.position = "absolute";
                dragImage.style.pointerEvents = "none";
                dragImage.style.opacity = "0.9";
                dragImage.style.transform = "scale(1.05)";
                dragImage.style.top = "0px";
                dragImage.style.left = "0px";
                dragImage.style.width = "200px";
                dragImage.style.height = "100px";

                document.body.appendChild(dragImage);
                e.dataTransfer.setDragImage(dragImage, 50, 50);

                e.currentTarget.addEventListener(
                  "dragend",
                  () => {
                    document.body.removeChild(dragImage);
                  },
                  { once: true }
                );
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(task.id)}
              className={`cursor-grab active:cursor-grabbing rounded-md flex items-center justify-center w-[550px] h-[400px] transition ${
                draggedId === task.id ? "bg-zinc-800" : "bg-zinc-900"
              }`}
            >
              {task.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
