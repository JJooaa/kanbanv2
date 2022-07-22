import React, { useRef } from "react";
import "../styles/modal.css";
import AddNewTaskForm from "./Forms/AddNew";
import ViewTask from "./Forms/ViewTask";
import { useClickAway } from "react-use";
import NewBoard from "./Forms/NewBoard";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  selectedTask,
  setSelectedTask,
  copy,
  setCopy,
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
          <ViewTask selectedTask={selectedTask} />
        )}
        {isModalOpen === "add_new_task" && (
          <AddNewTaskForm setIsModalOpen={setIsModalOpen} />
        )}
        {isModalOpen === "add_new_board" && (
          <NewBoard copy={copy} setCopy={setCopy} />
        )}
      </div>
    </div>
  );
};

export default Modal;
