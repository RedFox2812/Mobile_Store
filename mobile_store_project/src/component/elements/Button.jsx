/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react';
import { useEffect, useState } from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  display: block;
  align-items: center;
  /* background-color: #fff; */
  border-radius: 2px;
  padding: 8px 6px;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  * {
    pointer-events: none;
  }
`;
const Button = (props) => {
  return (
    <ButtonStyle
      className={props.className}
      href={props.href}
      onClick={props.onClick}
    >
      {props.text ? props.text : ""}
    </ButtonStyle>
  );
};

export default Button;
