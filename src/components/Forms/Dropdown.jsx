import React, { useState } from "react";
import { useField } from "formik";

const Dropdown = ({ currentColumns, name, isOpen, setIsOpen }) => {
  const [, , helpers] = useField(name);

  const { setValue } = helpers;

  return (
    <>
      {isOpen && (
        <div className="status-list" onClick={() => setIsOpen((prev) => !prev)}>
          {Object.values(currentColumns).map((column) => {
            return (
              <div onClick={() => setValue(column.name)}>{column.name}</div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Dropdown;
