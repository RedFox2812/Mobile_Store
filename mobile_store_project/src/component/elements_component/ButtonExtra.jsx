/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react';
import { useEffect, useState } from "react";
import styled from "styled-components";
const ButtonExtraStyle = styled.a`
  display: block;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 25px;
  color: var(--text-color);
  /* border: 1px solid transparent; */
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  * {
    pointer-events: none;
  }
  img {
    padding: 0 10px;
  }
`;
const ButtonExtra = (props) => {
  return (
    <ButtonExtraStyle href={props.href} className={`${props.className} `}>
      {props.text ? props.text : ""}
      {props.srcIcon ? (
        <img
          src={props.srcIcon}
          className={`${props.size ? `h-[${props.size}px]` : "h-[24px]"}`}
        />
      ) : (
        ""
      )}
    </ButtonExtraStyle>
  );
};

export default ButtonExtra;
