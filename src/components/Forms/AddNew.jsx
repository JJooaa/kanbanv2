import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "../../styles/form.css";
import cross from "../../assets/icon-cross.svg";
import { CopyContext } from "../App";

const AddNewTaskForm = ({ setIsModalOpen }) => {
  const [subTaskAmount, setSubTaskAmount] = useState(1);

  const { copy, setCopy, currentColumns, setCurrentColumns } =
    useContext(CopyContext);

  const initialValues = {
    title: "",
    description: "",
    subtasks: [],
    status: "Todo",
  };

  return (
    <>
      <h1>Add New Task </h1>
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
        }}
      >
        <Form className="form">
          <div className="field-wrapper">
            <label htmlFor="title">Title</label>
            <Field name="title" className="input" />
          </div>
          <div className="field-wrapper">
            <label htmlFor="title">Description</label>
            <Field
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
          <div className="field-wrapper">
            <label htmlFor="status">Status</label>
          </div>
          <button type="submit" className="button submit">
            Create Task
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default AddNewTaskForm;
