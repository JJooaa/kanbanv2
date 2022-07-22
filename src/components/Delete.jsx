import React from "react";

const Delete = ({ name }) => {
  const boardDeletion = `Are you sure you want to delete the '${name}'? This action will remove all columns and tasks and cannot be reversed.`;

  const taskDeletion = `Are you sure you want to delete the '${name}' task and its subtasks? This action cannot be reversed.`;

  return (
    <div className="delete-modal">
      <h1>Delete this {name}?</h1>
      <p>{name === "board" ? boardDeletion : taskDeletion}</p>
      <div>
        <button>Delete</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default Delete;
