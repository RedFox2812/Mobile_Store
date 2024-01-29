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
  color: var(--gray-color);
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  * {
    pointer-events: none;
  }
  div {
    padding: 5px 10px;
    border: 1px solid var(--gray-color);
    border-radius: 1.5rem;
    color: var(--gray-color);
    background-color: transparent;
  }
  img {
    padding: 0 10px;
  }
  &:hover {
    div {
      border: 1px solid var(--text-color);
      color: var(--text-color);
    }
  }
`;
const ButtonExtra = (props) => {
  return (
    <ButtonExtraStyle href={props.href} className={`${props.className} `}>
      {props.text ? <div>{props.text}</div> : ""}
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
