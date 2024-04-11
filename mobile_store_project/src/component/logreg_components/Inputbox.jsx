/* eslint-disable no-unused-vars */
import React from "react";
import { useController } from "react-hook-form";

// eslint-disable-next-line react/prop-types
const Inputbox = ({ control, ...props }) => {
  const { field } = useController({
    control,
    // eslint-disable-next-line react/prop-types
    name: props.name,
    defaultValue: "",
  });
  return (
    <input
      className="p-4 my-2 border-solid border-black rounded-lg bg-white outline-none transition-all focus:border-blue-500"
      {...field}
      {...props}
    ></input>
  );
};

export default Inputbox;
