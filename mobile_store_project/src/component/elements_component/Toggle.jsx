/* eslint-disable no-undef */
// import React from 'react';
import { useState } from "react";
import styled from "styled-components";
const ToggleCss = styled.div`
  &:hover {
    opacity: 0.8;
  }
`;
const Toggle = () => {
  const [on, setOn] = useState(false);
  return (
    <div>
      <ToggleCss
        onClick={() => setOn(!on)}
        className={`m-auto w-[58px] h-[30px] border shadow-sm ${
          on ? "bg-[#94e9b5]" : "bg-[#ccc]"
        } relative rounded-3xl py-[1px]`}
      >
        <span className=""></span>
        {on ? (
          <span className="w-[26px] h-[26px] right-[2px] shadow-sm bg-[#fff] absolute rounded-full"></span>
        ) : (
          <span className="w-[26px] h-[26px] left-[1px] shadow-sm bg-[#fff] absolute rounded-full"></span>
        )}
      </ToggleCss>
    </div>
  );
};

export default Toggle;
