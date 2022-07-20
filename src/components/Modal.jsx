import React, { useRef } from "react";
import "../styles/modal.css";
import AddNewTaskForm from "./Forms/AddNew";
import ViewTask from "./Forms/ViewTask";
import { useClickAway } from "react-use";

const Modal = ({ setIsModalOpen, selectedTask, setSelectedTask }) => {
  const ref = useRef(null);

  useClickAway(ref, () => {
    console.log("here");
    setIsModalOpen(false);
    setSelectedTask({});
  });

  return (
    <div className="modal-background">
      <div className="modal" ref={ref}>
        {selectedTask.title && <ViewTask selectedTask={selectedTask} />}
        {!selectedTask.title && (
          <AddNewTaskForm setIsModalOpen={setIsModalOpen} />
        )}
      </div>
    </div>
  );
};

export default Modal;
