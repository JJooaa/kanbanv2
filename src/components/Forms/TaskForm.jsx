import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import "../../styles/form.css";
import cross from "../../assets/icon-cross.svg";
import Dropdown from "../Dropdown";
import { CopyContext } from "../../App";
import { validationSchemaTask } from "../../lib/formValidation";

const TaskForm = ({ setIsModalOpen }) => {
  const { currentColumns, setCurrentColumns, selectedTask } =
    useContext(CopyContext);

  const [isOpen, setIsOpen] = useState(false);

  const initialValues = {
    title: "" || selectedTask.title,
    description: "" || selectedTask.description,
    subtasks: selectedTask.subtasks || [{ name: "" }],
    status: "" || selectedTask.status,
  };

  let isSelectedTask = Object.entries(selectedTask).length ? false : true;

  return (
    <>
      <h1>{isSelectedTask ? "Add New Task" : "Edit Task"}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaTask}
        onSubmit={(values) => {
          // get the index of the array the we modify
          let index = Object.entries(currentColumns).findIndex(
            ([id, column]) => column.name === values.status && id
          );
          if (isSelectedTask) {
            // add isCompleted property to all subtasks
            values.subtasks.map((task) => (task.isCompleted = false));
            // copy the old tasks and add a new task into a new array
            const newTasksArray = [
              ...currentColumns[index].tasks,
              { ...values },
            ];

            // replace the currentColumns[index] so eg "Todos" array. With the newTaskArray
            setCurrentColumns({
              ...currentColumns,
              [index]: {
                ...currentColumns[index],
                tasks: newTasksArray,
              },
            });
          } else {
            // find the one that we are editing and replace it
            const updatedArray = currentColumns[index].tasks.map((task) =>
              task.index === selectedTask.index ? { ...values } : task
            );
            setCurrentColumns({
              ...currentColumns,
              [index]: {
                ...currentColumns[index],
                tasks: updatedArray,
              },
            });
          }
          setIsModalOpen(false);
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="form">
            <div className="field-wrapper">
              <label htmlFor="title">Title</label>
              <Field
                name="title"
                className="input"
                placeholder="e.g. Take coffee break"
                style={
                  errors.title && touched.title === true
                    ? { outline: "1px solid red" }
                    : null
                }
              />
              <ErrorMessage
                name="title"
                component="div"
                className="error-message"
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="title">Description</label>
              <Field
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                name="description"
                as="textarea"
                className="input textarea"
                style={
                  errors.description && touched.description === true
                    ? { outline: "1px solid red" }
                    : null
                }
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error-message"
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="title">Subtasks</label>
              <FieldArray
                name="subtasks"
                render={(arrayHelpers) => (
                  <>
                    {values.subtasks.map((__, index) => (
                      <div className="subtask-item" key={index}>
                        <Field
                          placeholder="e.g Make coffee"
                          name={`subtasks[${index}].title`}
                          className="input"
                          autoComplete="off"
                        />

                        <img
                          src={cross}
                          alt="cross"
                          onClick={() => arrayHelpers.remove(index)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="button"
                      onClick={() => arrayHelpers.push({ title: "" })}
                    >
                      + Add New Subtask
                    </button>
                  </>
                )}
              />
            </div>
            <div className="field-wrapper parent">
              <label htmlFor="status">Status</label>
              <Field
                autoComplete="off"
                className="input"
                value={values.status}
                name="status"
                onClick={() => setIsOpen(true)}
                style={
                  errors.status && touched.status === true
                    ? { outline: "1px solid red" }
                    : null
                }
              />
              <ErrorMessage
                name="status"
                component="div"
                className="error-message"
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
