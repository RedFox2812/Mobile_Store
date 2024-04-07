/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import styled from "styled-components";

const DropdownStyled = styled.div`
  align-items: center;
  width: 100%;
  border: 1px solid var(--gray-color);
  opacity: 0.8;
  cursor: pointer;
  .container {
    position: relative;
    height: 100%;
    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 20px;
      bottom: -50%;
      left: 0;
      z-index: 49;
      background-color: transparent;
    }
    .container-child {
      height: 100%;
      padding: 0 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .list {
      position: absolute;
      width: 100%;
      /* height: 0%; */
      left: 0;
      top: 40px;
      background-color: var(#fff);
      color: var(--gray-color);
      cursor: default;
      padding: 4px 0px;
      transform: translateY(-100%);
      opacity: 0;
      transition: all 0.15s ease-in;
      .item {
        cursor: pointer;
        height: 0%;
        padding: 10px 0;
        &:hover {
          height: auto;
          background-color: var(--list-color);
        }
      }
    }
    img {
      height: 10px;
      width: 10px;
      top: 25%;
      opacity: 0.8;
    }
  }
  .container:hover {
    .list {
      color: var(--text-color);
      opacity: 1;
      /* height: 100%; */
      transform: translateY(0%);
    }
    .img {
      opacity: 1;
    }
  }

  &:hover {
    opacity: 1;
  }
`;
const Dropdown = (props) => {
  let num = 0;
  return (
    <>
      <DropdownStyled className={props.className}>
        <div className="container">
          <div className="container-child">
            <p>{props.items[0]}</p>
            <img src="src/assets/icon/drop_icon.png" alt=""></img>
          </div>
          <div className="list">
            {props.items.map((item) => {
              num = num + 1;
              return (
                <div key={num} className="item bg-[#fff] ">
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </DropdownStyled>
    </>
  );
};
export default Dropdown;
