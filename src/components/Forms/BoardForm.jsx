import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import cross from "../../assets/icon-cross.svg";
import { CopyContext } from "../../App";
import { validationSchemaBoard } from "../../lib/formValidation";

const BoardForm = ({ setIsModalOpen }) => {
  const [columnAmount, setColumnAmount] = useState(1);

  const { copy, setCopy } = useContext(CopyContext);

  return (
    <>
      <h1>Add New Board</h1>
      <Formik
        initialValues={{ name: "", columns: [] }}
        validationSchema={validationSchemaBoard}
        onSubmit={(values) => {
          values.columns.map((column) => (column.tasks = []));
          setCopy((prevState) => [...prevState, values]);
          setIsModalOpen(false);
        }}
      >
        {(values) => (
          <Form className="form">
            <div className="field-wrapper">
              <label htmlFor="name">Board Name</label>
              <Field
                name="name"
                className="input"
                style={
                  values.errors.name && values.touched.name === true
                    ? { outline: "1px solid red" }
                    : null
                }
              />
              <ErrorMessage
                name="name"
                className="error-message"
                component="div"
              />
            </div>
            <div className="field-wrapper">
              <label htmlFor="name">Board Columns</label>
              {Array.from(Array(columnAmount)).map((_, index) => (
                <div className="subtask-item" key={index}>
                  <Field
                    placeholder="e.g Todo"
                    name={`columns[${index}].name`}
                    className="input"
                  />
                  <img
                    src={cross}
                    alt="cross"
                    onClick={() => setColumnAmount((prev) => (prev -= 1))}
                  />
                </div>
              ))}
            </div>
            <button
              className="button"
              type="button"
              onClick={() => setColumnAmount((prev) => (prev += 1))}
            >
              + Add New Column
            </button>
            <button className="button submit" type="submit">
              Create New Board
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BoardForm;
