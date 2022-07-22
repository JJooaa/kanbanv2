import React, { useContext, useRef } from "react";
import "../styles/dropdown.css";
import { useClickAway } from "react-use";
import { CopyContext } from "./App";

const SmallDropDown = ({ name, setShowDropDown, selectedTask }) => {
  const { copy, setCopy, currentColumns, setCurrentColumns } =
    useContext(CopyContext);

  const ref = useRef(null);
  useClickAway(ref, () => {
    setShowDropDown(false);
  });

  const handleDelete = () => {
    // first find the column that the current selectedTask lives in
    let taskInColumn = Object.values(currentColumns).find(
      (column) => column.name === selectedTask.status
    );
    // remove it and return us a new array
    let updatedTaskArray = taskInColumn.tasks.filter(
      (item) => item.key !== selectedTask.key
    );
    console.log(currentColumns, "current columns");
    console.log(taskInColumn, "the task in the current column");
    console.log(updatedTaskArray, "the updated column");
  };

  return (
    <div className="small-dp-container" ref={ref}>
      <div>Edit {name}</div>
      <div onClick={handleDelete}>Delete {name}</div>
    </div>
  );
};

export default SmallDropDown;
