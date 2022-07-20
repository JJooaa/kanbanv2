import React from "react";
import "../styles/modal.css";
import AddNewTaskForm from "./Forms/AddNew";

const Modal = ({ setIsModalOpen }) => {
  return (
    <div className="modal-background">
      <div className="modal">
        <AddNewTaskForm setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

export default Modal;
