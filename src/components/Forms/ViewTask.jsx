import React from "react";
import "../../styles/form.css";

const ViewTask = ({ selectedTask }) => {
  return (
    <div className="view-task-content">
      <h1>{selectedTask.title}</h1>
      <h3>{selectedTask.description}</h3>
    </div>
  );
};

export default ViewTask;
