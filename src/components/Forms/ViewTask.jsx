import React, { useEffect, useState } from "react";
import "../../styles/form.css";
import checkIcon from "../../assets/icon-check.svg";
import dots from "../../assets/icon-vertical-ellipsis.svg";
import SmallDropDown from "../SmallDropDown";

const ViewTask = ({ selectedTask, setIsModalOpen }) => {
  const [amountOfCompletion, setAmountOfCompletion] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    setAmountOfCompletion(
      selectedTask.subtasks.filter((item) => item.isCompleted === true).length
    );
  }, [selectedTask]);

  return (
    <div className="view-task-content">
      <div className="view-task-title">
        <h1>{selectedTask.title}</h1>
        <img
          src={dots}
          alt="dots"
          onClick={() => setShowDropDown((prev) => !prev)}
        />
        {showDropDown && (
          <SmallDropDown
            name="Task"
            setShowDropDown={setShowDropDown}
            selectedTask={selectedTask}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>

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
