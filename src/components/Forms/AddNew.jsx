import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "../../styles/form.css";
import cross from "../../assets/icon-cross.svg";

const AddNewTaskForm = ({ setIsModalOpen }) => {
  const [subTaskAmount, setSubTaskAmount] = useState(2);

  const initialValues = {
    title: "",
    description: "",
    subtasks: [],
    status: "",
  };

  return (
    <>
      <h1>Add New Task </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
          setIsModalOpen(false);
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
                  name={`subtasks[${index}].name`}
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
              className="new-subtask"
              onClick={() => setSubTaskAmount((prev) => (prev += 1))}
            >
              + Add New Subtask
            </button>
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default AddNewTaskForm;