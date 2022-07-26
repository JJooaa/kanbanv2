import React, { useRef } from "react";
import "../styles/modal.css";
import TaskForm from "./Forms/TaskForm";
import ViewTask from "./ViewTask";
import { useClickAway } from "react-use";
import Delete from "./Delete";
import BoardForm from "./Forms/BoardForm";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  selectedTask,
  setSelectedTask,
}) => {
  const ref = useRef(null);

  useClickAway(ref, () => {
    setIsModalOpen(false);
    setSelectedTask({});
  });

  return (
    <div className="modal-background">
      <div className="modal" ref={ref}>
        {isModalOpen === "view_task" && (
          <ViewTask
            selectedTask={selectedTask}
            setIsModalOpen={setIsModalOpen}
          />
        )}
        {isModalOpen === "task_form" && (
          <TaskForm setIsModalOpen={setIsModalOpen} />
        )}
        {isModalOpen === "add_new_board" && (
          <BoardForm setIsModalOpen={setIsModalOpen} />
        )}
        {isModalOpen === "delete" && (
          <Delete setIsModalOpen={setIsModalOpen} selectedTask={selectedTask} />
        )}
      </div>
    </div>
  );
};

export default Modal;
