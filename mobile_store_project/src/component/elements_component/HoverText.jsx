/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// import React from 'react';
import { useEffect, useState } from "react";
import styled from "styled-components";
const Text = styled.p`
  cursor: default;
  width: 100%;
  left: 0%;
  position: absolute;
  font-weight: 500;
  bottom: 120%;
  background-color: var(--hover-color);
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
    0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  &::after {
    content: "";
    position: absolute;
    border-top: 10px solid var(--hover-color);
    border-bottom: 10px solid transparent;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    top: 100%;
    left: calc(20% - 10px);
  }
  &::before {
    content: "";
    width: 100%;
    height: 20px;
    background-color: transparent;
    bottom: -20px;
    left: 0;
    position: absolute;
  }
`;

const HoverText = (props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const box = document.querySelector(".boxHoverText");
    box.addEventListener("mouseover", () => {
      setShow(true);
    });
    box.addEventListener("mouseout", () => {
      setShow(false);
    });
  }, []);

  return (
    <div className={`boxHoverText relative ${props.width}`}>
      <p className="text text-xl cursor-pointer">{props.title}</p>
      <Text className={`${show ? " " : "hidden"}`}>{props.text}</Text>
    </div>
  );
};
export default HoverText;
