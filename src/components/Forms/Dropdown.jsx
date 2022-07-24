import React, { useState } from "react";
import { useField } from "formik";

const Dropdown = ({ currentColumns, name }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [, , helpers] = useField(name);

  const { setValue } = helpers;

  return (
    <div className="status-list" onClick={() => setIsOpen((prev) => !prev)}>
      {isOpen &&
        Object.values(currentColumns).map((column) => {
          return <div onClick={() => setValue(column.name)}>{column.name}</div>;
        })}
    </div>
  );
};

export default Dropdown;
