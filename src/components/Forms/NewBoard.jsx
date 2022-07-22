import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import cross from "../../assets/icon-cross.svg";

const NewBoard = ({ setCopy, copy }) => {
  const [columnAmount, setColumnAmount] = useState(1);

  return (
    <>
      <h1>Add New Board</h1>
      <Formik
        initialValues={{ name: "", columns: [] }}
        onSubmit={(values) => {
          values.columns.map((column) => (column.tasks = []));
          setCopy((prevState) => [...prevState, values]);
        }}
      >
        <Form className="form">
          <div className="field-wrapper">
            <label htmlFor="name">Board Name</label>
            <Field name="name" className="input" />
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
      </Formik>
    </>
  );
};

export default NewBoard;
