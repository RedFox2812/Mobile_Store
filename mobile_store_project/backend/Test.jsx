/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SigIn from "../src/component/logreg_components/SigIn";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object({
  username: yup.string().required("This field is required!"),
  password: yup.string().required("This field is required!"),
});
const Test = () => {
  const [input, setInput] = useState("get");
  const [data, setData] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/execute_python_function?input=${input}?data=${data}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const response = await res.json();
      setData(response);
    } catch {
      console.log.error(
        " There was a problem with the fetch operation:",
        error
      );
    }
  };
  useEffect(() => {
    const intervalId = setInterval(fetchData, 3000);
    console.log(data);
  }, [data]);
  return (
    <div>
      <SigIn
        onSubmit={handleSubmit(onSubmitHandler)}
        control={control}
        error={errors}
      ></SigIn>
    </div>
  );
};

export default Test;
