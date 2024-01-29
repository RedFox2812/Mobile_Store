/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// import React from "react";

import { useEffect, useState } from "react";
import ButtonExtra from "../elements_component/ButtonExtra";
import Button from "../elements_component/Button";
import Dropdown from "../elements_component/Dropdown";
const AdminPage = () => {
  const arrayIcon = {
    setting: "src/assets/icon/setting_hover_icon.png",
    bell: "src/assets/icon/bell_hover_icon.png",
  };
  const [show, setShow] = useState("user");
  function handleToggleClass(e, str) {
    const selected = document.querySelector(`.${str}`);
    selected ? selected.classList.remove(str) : e.target.classList.add(str);
    e.target.classList.add(str);
  }
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("select-item")) {
        handleToggleClass(e, "selected");
        handleToggleClass(e, "selected-icon");
      }
      if (e.target.classList.contains("button-icon")) {
        handleToggleClass(e, "selected-icon");
      }
      if (e.target.classList.contains("User")) {
        setShow("user");
      } else if (e.target.classList.contains("Product")) {
        setShow("product");
      } else if (e.target.classList.contains("Voucher")) {
        setShow("voucher");
      } else if (e.target.classList.contains("setting")) {
        setShow("setting");
      } else if (e.target.classList.contains("noti")) {
        setShow("");
      }
    });
  }, [show]);

  return (
    <div className="Admin-page w-full ">
      <HeaderAdmin icon={arrayIcon}></HeaderAdmin>
      {show == "user" ? (
        <UserManager></UserManager>
      ) : show == "product" ? (
        <ProductManager></ProductManager>
      ) : show == "voucher" ? (
        <VoucherManager></VoucherManager>
      ) : show == "setting" ? (
        <Setting></Setting>
      ) : show == "noti" ? (
        <Noti></Noti>
      ) : (
        ""
      )}
    </div>
  );
};
const HeaderAdmin = (props) => {
  const items = ["User", "Product", "Voucher"];
  return (
    <div className="container-header">
      <div className="w-full h-auto flex  justify-between bg-[#fff] rounded-t-md">
        <div className=" left-bar h-full flex items-center ">
          <p className=" h-full p-[16px]  mr-[100px] text-text-clo text-[24px] font-medium cursor-default ">
            Admin Manager
          </p>
          <ul className=" h-full flex gap-10 text-[20px] font-medium text-gray-clo">
            {items.map((item) => {
              return (
                <li
                  key={items.indexOf(item)}
                  className={`select-item h-full relative p-[20px] cursor-pointer hover:text-text-clo ${
                    item == "User" ? "selected" : ""
                  } ${item}`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right-bar flex gap-3 px-[16px] items-center">
          <ButtonExtra
            srcIcon={props.icon.bell}
            className="noti button-icon relative select-item"
            size="24"
          ></ButtonExtra>
          <ButtonExtra
            srcIcon={props.icon.setting}
            size="24"
            className="setting button-icon relative select-item"
          ></ButtonExtra>
          <div className="w-[40px] border border-main-clo rounded-full p-2 cursor-pointer">
            <img src="src\assets\avata.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
const UserManager = () => {
  let num = 0;
  const arrayCol = {
    SNo: "S.No",
    id: "ID",
    name: "Name",
    phone: "Number Phone",
    address: "Address",
    email: "Email",
  };
  const usersdata = {
    items: [
      {
        id: "AAAAAA",
        name: "Pham Duy",
        phone: "0705211874",
        address: "Can Tho",
        email: "alan.hany123@gmail.com",
      },
      {
        id: "BBBBBB",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "CCCCCC",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "DDDDDD",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "EEEEEE",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "FFFFFF",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "GGGGGG",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "JJJJJJ",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "AAAAAA",
        name: "Pham Duy",
        phone: "0705211874",
        address: "Can Tho",
        email: "alan.hany123@gmail.com",
      },
      {
        id: "BBBBBB",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "CCCCCC",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "DDDDDD",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "EEEEEE",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "FFFFFF",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "GGGGGG",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "JJJJJJ",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "AAAAAA",
        name: "Pham Duy",
        phone: "0705211874",
        address: "Can Tho",
        email: "alan.hany123@gmail.com",
      },
      {
        id: "BBBBBB",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "CCCCCC",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "DDDDDD",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "EEEEEE",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "FFFFFF",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "GGGGGG",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "JJJJJJ",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "AAAAAA",
        name: "Pham Duy",
        phone: "0705211874",
        address: "Can Tho",
        email: "alan.hany123@gmail.com",
      },
      {
        id: "BBBBBB",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "CCCCCC",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "DDDDDD",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "EEEEEE",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "FFFFFF",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "GGGGGG",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
      {
        id: "JJJJJJ",
        name: "Hai Duong",
        phone: "0705211874",
        address: "Can Tho",
        email: "lehaiduong123@gmail.com",
      },
    ],
  };
  return (
    <div>
      <div className="search-filter w-full h-[55px] mt-[6px] flex justify-around items-center bg-[#fff] ">
        <div className="search flex-[calc(8/9)]">
          <div className="w-[99%] p-1 m-3  flex justify-between border border-main-clo text-center items-center rounded-full">
            <img
              className="w-[16px] h-[16px] mx-[20px]"
              src="src\assets\icon\search_icon.png"
              alt=""
            />
            <div
              className="w-full flex justify-between text-[18px] font-medium  border-l-2 border-l-main-clo"
              onClick={(e) => {
                e.target.value = "";
              }}
            >
              <input
                className="w-full pl-3 outline-none text-gray-clo"
                value={"Input your text..."}
              />
              <Button text="Search" className="px-[10px] "></Button>
            </div>
          </div>
        </div>
        <Dropdown
          items={["Cần Thơ", "Hồ Chí Minh", "Đà Nẵng"]}
          className="flex-[calc(1/9)] h-[70%] mx-3 text-[20px] items-center rounded-full"
        ></Dropdown>
      </div>
      <div className="flex">
        <div
          className={`left-board flex-[calc(7/8)] h-[934px] mt-[6px] gap-1 bg-[#fff] overflow-y-scroll `}
        >
          <div>
            <UserInfo
              className="text-left w-full flex mt-[-2px] px-7 py-4 gap-2 border-t-[4px] border-b-[4px] bg-[#fff] text-[16px] font-medium text-gray-clo border-backgruond-clo"
              col={arrayCol}
              SNo={arrayCol.SNo}
            ></UserInfo>
            {usersdata.items.map((item) => {
              num = num + 1;
              return (
                <UserInfo
                  key={num}
                  col={item}
                  SNo={num}
                  className={`${
                    num % 2 == 0 ? "" : "bg-list-clo"
                  } text-left w-full flex px-7 py-4 gap-2 text-[16px] font-medium my-[2px] text-text-clo border-b-[4px] border-backgruond-clo`}
                ></UserInfo>
              );
            })}
          </div>
        </div>
        <div className="right-board flex-[calc(1/8)]"></div>
      </div>
    </div>
  );
};
// - Người dùng
//     - MAND
//     - NameND
//     - SDT
//     - Address
//     - Email
const UserInfo = (props) => {
  return (
    <div className={props.className}>
      <div className="flex-[calc(1/17)] border-r-[2px] border-r-gray-clo">
        {props.SNo}
      </div>
      <div className="flex-[calc(2/17)] border-r-[2px] border-r-gray-clo">
        {props.col.id}
      </div>
      <div className="flex-[calc(3/17)] border-r-[2px] border-r-gray-clo">
        {props.col.name}
      </div>
      <div className="flex-[calc(3/17)] border-r-[2px] border-r-gray-clo">
        {props.col.phone}
      </div>
      <div className="flex-[calc(4/17)] border-r-[2px] border-r-gray-clo">
        {props.col.address}
      </div>
      <div className="flex-[calc(4/17)] ">{props.col.email}</div>
    </div>
  );
};
const ProductManager = (props) => {};
const VoucherManager = (props) => {};
const Setting = (props) => {};
const Noti = (props) => {};
export default AdminPage;
