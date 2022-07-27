import React, { useRef } from "react";
import "../styles/dropdown.css";
import { useClickAway } from "react-use";

const SmallDropDown = ({ name, setShowDropDown, setIsModalOpen }) => {
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShowDropDown(false);
  });

  const handleDelete = () => {
    setIsModalOpen("delete");
    setShowDropDown(false);
  };

  const handleEdit = () => {
    if (name === "Task") {
      setIsModalOpen("task_form");
    } else {
      setIsModalOpen("edit_board_form");
    }
    setShowDropDown(false);
  };

  return (
    <div
      className={`small-dp-container ${name === "Board" && "board"}`}
      ref={ref}
    >
      <div onClick={handleEdit}>Edit {name}</div>
      <div onClick={handleDelete}>Delete {name}</div>
    </div>
  );
};

export default SmallDropDown;
