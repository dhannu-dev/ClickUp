"use client";
import React from "react";
import { Resizable } from "re-resizable";

function AssignedComments() {
  return (
    <Resizable
      defaultSize={{
        width: 550,
        height: 400,
      }}
      minWidth={550}
      minHeight={400}
      className="bg-zinc-900  rounded-lg text-center flex items-center justify-center text-white"
    >
      Assigned Comments
    </Resizable>
  );
}

export default AssignedComments;
