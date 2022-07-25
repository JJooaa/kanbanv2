import React, { useRef } from "react";
import "../styles/modal.css";
import TaskForm from "./Forms/TaskForm";
import ViewTask from "./Forms/ViewTask";
import { useClickAway } from "react-use";
import NewBoard from "./Forms/NewBoard";
import Delete from "./Delete";

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
          <NewBoard setIsModalOpen={setIsModalOpen} />
        )}
        {isModalOpen === "delete" && (
          <Delete setIsModalOpen={setIsModalOpen} selectedTask={selectedTask} />
        )}
      </div>
    </div>
  );
};

export default Modal;
