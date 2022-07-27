import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import cross from "../../assets/icon-cross.svg";
import { CopyContext } from "../../App";
import { validationSchemaBoard } from "../../lib/formValidation";

const BoardForm = ({ setIsModalOpen }) => {
  const { setCopy, selectedBoard, isModalOpen } = useContext(CopyContext);

  const isAddBoard = isModalOpen === "add_board_form" ? true : false;

  return (
    <>
      <h1>{isAddBoard ? "Add New Board" : "Edit Board"}</h1>
      <Formik
        initialValues={{
          name: (!isAddBoard && selectedBoard.name) || "",
          columns: (!isAddBoard && selectedBoard.columns) || [{ name: "" }],
        }}
        validationSchema={validationSchemaBoard}
        onSubmit={(values) => {
          if (isAddBoard) {
            values.columns.map((column) => (column.tasks = []));
            setCopy((prevState) => [...prevState, values]);
          } else {
            console.log(values.columns.map((column) => column.name
            ));
          }
          setIsModalOpen(false);
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="form">
            <div className="field-wrapper">
              <label htmlFor="name">Board Name</label>
              <Field
                name="name"
                className="input"
                style={
                  errors.name && touched.name === true
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
              <FieldArray
                name="columns"
                render={(arrayHelpers) => (
                  <>
                    {values.columns.map((__, index) => (
                      <div className="subtask-item" key={index}>
                        <Field
                          placeholder="e.g Todo"
                          name={`columns[${index}].name`}
                          className="input"
                        />
                        <img
                          src={cross}
                          alt="cross"
                          onClick={() => arrayHelpers.remove(index)}
                        />
                      </div>
                    ))}
                    <button
                      className="button"
                      type="button"
                      onClick={() => arrayHelpers.push({ name: "" })}
                    >
                      + Add New Column
                    </button>
                  </>
                )}
              />
            </div>
            <button className="button submit" type="submit">
              {isAddBoard ? "Create New Board" : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BoardForm;
