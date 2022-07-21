import React, { useEffect, useState } from "react";
import "../../styles/form.css";
import checkIcon from "../../assets/icon-check.svg";

const ViewTask = ({ selectedTask }) => {
  const [amountOfCompletion, setAmountOfCompletion] = useState(0);
  useEffect(() => {
    setAmountOfCompletion(
      selectedTask.subtasks.filter((item) => item.isCompleted === true).length
    );
  }, [selectedTask]);

  return (
    <div className="view-task-content">
      <h1>{selectedTask.title}</h1>
      <h3>{selectedTask.description}</h3>
      <div>
        <h4>
          Subtasks ({amountOfCompletion} of {selectedTask.subtasks.length})
        </h4>
        {selectedTask.subtasks.map((task) => (
          <div
            className={`subtask ${task.isCompleted && "line-through"}`}
            key={task.title}
          >
            <img
              src={task.isCompleted ? checkIcon : undefined}
              alt=""
              className={task.isCompleted ? "completed" : "not-completed"}
            />
            {task.title}
          </div>
        ))}
      </div>
      <h4>Current Status</h4>
    </div>
  );
};

export default ViewTask;
