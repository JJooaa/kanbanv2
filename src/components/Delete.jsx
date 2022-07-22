import React from "react";
import "../styles/modal.css";

const Delete = ({ selectedTask, setIsModalOpen }) => {
  const boardDeletion = `Are you sure you want to delete the '${selectedTask.title}'? This action will remove all columns and tasks and cannot be reversed.`;

  const taskDeletion = `Are you sure you want to delete the '${selectedTask.title}' task and its subtasks? This action cannot be reversed.`;

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="delete-modal">
      <h1>Delete this {selectedTask.title ? "Task" : "Board"}?</h1>
      <p>{selectedTask ? taskDeletion : boardDeletion}</p>
      <div>
        <button className="button red" onClick={handleClose}>
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
