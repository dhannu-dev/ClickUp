"use client";
import { createContext, useEffect, useState } from "react";

export const SpaceContext = createContext();

export const SpaceProvide = ({ children }) => {
  const [space, setSpace] = useState(false);
  const [spaceInput, setSpaceInput] = useState("");
  const [description, setDescription] = useState("");
  const [list, setList] = useState([]);

  const handleSpace = () => {
    setSpace((prev) => !prev);
  };

  useEffect(() => {
    const savedItems = localStorage.getItem("spaceItems");
    if (savedItems) {
      setList(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("spaceItems", JSON.stringify(list));
  }, [list]);

  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-teal-500",
  ];

  const handleList = () => {
    if (!spaceInput) return;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setList((prev) => [
      ...prev,
      {
        id: Date.now(),
        spaceList: spaceInput,
        description,
        color: randomColor,
      },
    ]);
    setSpaceInput("");
    setDescription("");
    handleSpace();
  };

  const handleRemoveSpace = (id) => {
    setList((prev) => prev.filter((cur) => cur.id !== id));
  };

  return (
    <SpaceContext.Provider
      value={{
        space,
        setSpace,
        handleSpace,
        spaceInput,
        setSpaceInput,
        description,
        setDescription,
        list,
        setList,
        handleList,
        handleRemoveSpace,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
};
