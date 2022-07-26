import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "../../styles/form.css";
import cross from "../../assets/icon-cross.svg";
import Dropdown from "../Dropdown";
import { CopyContext } from "../../App";

const TaskForm = ({ setIsModalOpen }) => {
  const [subTaskAmount, setSubTaskAmount] = useState(1);

  const { currentColumns, setCurrentColumns, selectedTask } =
    useContext(CopyContext);

  const [isOpen, setIsOpen] = useState(false);

  const initialValues = {
    title: "" || selectedTask.title,
    description: "" || selectedTask.description,
    subtasks: [] || selectedTask.subtasks,
    status: "" || selectedTask.status,
  };

  let isSelectedTask = Object.entries(selectedTask).length ? false : true;

  return (
    <>
      <h1>{isSelectedTask ? "Add New Task" : "Edit Task"}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          // add isCompleted property to all subtasks
          values.subtasks.map((task) => (task.isCompleted = false));
          // find the index of the array that we adding to
          let index = Object.entries(currentColumns).findIndex(
            ([id, column]) => column.name === values.status && id
          );
          // copy the old tasks and add a new task into a new array
          let newTasksArray = [...currentColumns[index].tasks, { ...values }];

          // replace the currentColumns[index] so eg "Todos" array. With the newTaskArrays
          setCurrentColumns({
            ...currentColumns,
            [index]: {
              ...currentColumns[index],
              tasks: newTasksArray,
            },
          });
          setIsModalOpen(false);
        }}
      >
        {(values) => (
          <Form className="form">
            <div className="field-wrapper">
              <label htmlFor="title">Title</label>
              <Field
                name="title"
                className="input"
                placeholder="e.g. Take coffee break"
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="title">Description</label>
              <Field
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                name="description"
                as="textarea"
                className="input textarea"
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="title">Subtasks</label>
              {Array.from(Array(subTaskAmount)).map((_, index) => (
                <div className="subtask-item" key={index}>
                  <Field
                    placeholder="e.g Make coffee"
                    name={`subtasks[${index}].title`}
                    className="input"
                    autocomplete="off"
                  />
                  <img
                    src={cross}
                    alt="cross"
                    onClick={() => setSubTaskAmount((prev) => (prev -= 1))}
                  />
                </div>
              ))}
              <button
                type="button"
                className="button"
                onClick={() => setSubTaskAmount((prev) => (prev += 1))}
              >
                + Add New Subtask
              </button>
            </div>
            <div className="field-wrapper parent">
              <label htmlFor="status">Status</label>
              <Field
                autocomplete="off"
                className="input"
                value={values.values.status}
                name="status"
                onClick={() => setIsOpen(true)}
              />
              <Dropdown
                currentColumns={currentColumns}
                name="status"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </div>
            <button type="submit" className="button submit">
              {isSelectedTask ? "Create Task" : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TaskForm;
