import React, { useEffect, useState } from "react";

const Test = () => {
  const [input, setInput] = useState("getUserList");
  const [data, setData] = useState("");
  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/execute_python_function?input=${input}`
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
      <button
        onClick={() => {
          setInput("getUserList");
        }}
      >
        Test
      </button>
    </div>
  );
};

export default Test;
