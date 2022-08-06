import React, { useContext } from "react";
import { CopyContext } from "../App";
import "../styles/modal.css";

const Delete = ({ selectedTask, setIsModalOpen }) => {
  const {
    copy,
    setCopy,
    currentBoard,
    setCurrentBoard,
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

  // check if are removing task or board, if we have selectedTask its a task
  const isTaskOrBoard =
    Object.entries(selectedTask).length !== 0 ? "task" : "board";

  const handleDelete = () => {
    if (isTaskOrBoard === "task") {
      //first find the column that the current selectedTask lives in
      let columnOfSelectedTask = Object.values(currentColumns).find(
        (column) => column.name === selectedTask.status
      );

      // remove it and return us a new array
      let updatedTaskArray = columnOfSelectedTask.tasks.filter(
        (item) => item.key !== selectedTask.key
      );

      // replace the old columns with the new ones
      setCurrentColumns({
        ...currentColumns,
        [selectedTask.key]: {
          ...currentColumns[selectedTask.key],
          tasks: updatedTaskArray,
        },
      });
    }
    if (isTaskOrBoard === "board") {
      // if we have a board
      setCopy((prev) =>
        prev.filter((board) => board.name !== copy[currentBoard].name)
      );
      setCurrentBoard(0);
    }
    handleClose();
  };

  return (
    <div className="delete-modal">
      <h1>Delete this {isTaskOrBoard === "task" ? "Task" : "Board"}?</h1>
      <p>{isTaskOrBoard === "task" ? taskDeletion : boardDeletion}</p>
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
