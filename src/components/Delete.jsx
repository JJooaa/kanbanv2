import React, { useContext } from "react";
import "../styles/modal.css";
import { CopyContext } from "./App";

const Delete = ({ selectedTask, setIsModalOpen }) => {
  const {
    copy,
    currentBoard,
    setSelectedTask,
    setCurrentColumns,
    currentColumns,
  } = useContext(CopyContext);

  const boardDeletion = `Are you sure you want to delete the '${copy[currentBoard].name}' board? This action will remove all columns and tasks and cannot be reversed.`;

  const taskDeletion = `Are you sure you want to delete the '${selectedTask.title}' task and its subtasks? This action cannot be reversed.`;

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedTask({});
  };

  const handleDelete = () => {
    //first find the column that the current selectedTask lives in
    let columnOfSelectedTask = Object.values(currentColumns).find(
      (column) => column.name === selectedTask.status
    );

    // remove it and return us a new array
    let updatedTaskArray = columnOfSelectedTask.tasks.filter(
      (item) => item.key !== selectedTask.key
    );

    setCurrentColumns({
      ...currentColumns,
      [selectedTask.key]: {
        ...currentColumns[selectedTask.key],
        tasks: updatedTaskArray,
      },
    });
    handleClose();
  };

  return (
    <div className="delete-modal">
      <h1>
        Delete this{" "}
        {Object.entries(selectedTask).length !== 0 ? "Task" : "Board"}?
      </h1>
      <p>
        {Object.entries(selectedTask).length !== 0
          ? taskDeletion
          : boardDeletion}
      </p>
      <div>
        <button className="button red" onClick={handleDelete}>
          Delete
        </button>
        <button className="button" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Delete;
