import React, { useRef } from "react";
import { useField } from "formik";
import { useClickAway } from "react-use";

const Dropdown = ({ currentColumns, name, isOpen, setIsOpen }) => {
  const [, , helpers] = useField(name);
  const ref = useRef(null);

  const { setValue } = helpers;

  useClickAway(ref, () => {
    setIsOpen(false);
  });

  return (
    <>
      {isOpen && (
        <div
          className="status-list"
          ref={ref}
          onClick={() => setIsOpen((prev) => !prev)}
        >
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
