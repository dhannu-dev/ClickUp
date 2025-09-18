import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { MdWarningAmber } from "react-icons/md";

function ConfirmCompletedTask() {
  const { setConfrimCompleteTask, confirmCompleteTask, forceCompeleteTask } =
    useContext(TodoContext);

  return (
    <div
      onClick={() => setConfrimCompleteTask(null)}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 text-white w-[420px] p-6 rounded-2xl shadow-2xl transform transition-all scale-100 hover:scale-[1.01]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-yellow-500/20 text-yellow-400 p-2 rounded-full">
            <MdWarningAmber size={28} />
          </div>
          <h2 className="text-lg font-semibold">Pending Subtasks Found</h2>
        </div>

        <p className="mb-6 text-sm text-gray-300 leading-relaxed">
          Some subtasks are still pending. Are you sure you want to mark this{" "}
          <span className="font-medium text-purple-400">task</span> as{" "}
          <span className="font-medium text-green-400">Completed</span>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setConfrimCompleteTask(null)}
            className="px-5 py-2 rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => forceCompeleteTask(confirmCompleteTask)}
            className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors shadow-md"
          >
            Yes, Complete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCompletedTask;
