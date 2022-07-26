import React, { useContext, useRef } from "react";
import "../styles/dropdown.css";
import { useClickAway } from "react-use";
import { CopyContext } from "../App";

const SmallDropDown = ({
  name,
  setShowDropDown,
  selectedTask,
  setIsModalOpen,
}) => {
  const { copy, setCopy, currentColumns, setCurrentColumns } =
    useContext(CopyContext);

  const ref = useRef(null);
  useClickAway(ref, () => {
    setShowDropDown(false);
  });

  const handleDelete = () => {
    setIsModalOpen("delete");
  };

  return (
    <div
      className={`small-dp-container ${name === "Board" && "board"}`}
      ref={ref}
    >
      <div onClick={() => name === "Task" && setIsModalOpen("task_form")}>
        Edit {name}
      </div>
      <div onClick={() => setIsModalOpen("delete")}>Delete {name}</div>
    </div>
  );
};

export default SmallDropDown;
