/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// import React from "react";
import { useEffect, useState } from "react";
import ButtonExtra from "../elements/ButtonExtra";
import Button from "../elements/Button";
import Dropdown from "../elements/Dropdown";
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
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("select-item")) {
        handleToggleClass(e, "selected");
        handleToggleClass(e, "selected-icon");
      }
      if (e.target.classList.contains("button-icon")) {
        handleToggleClass(e, "selected-icon");
      }
      if (e.target.classList.contains("User")) {
        setInput("getUserList");
        setShow("user");
      } else if (e.target.classList.contains("Product")) {
        setInput("getProductList");
        setShow("product");
      } else if (e.target.classList.contains("Voucher")) {
        setShow("voucher");
      } else if (e.target.classList.contains("setting")) {
        setShow("setting");
      } else if (e.target.classList.contains("noti")) {
        setShow("");
      }
    });
    return () => clearInterval(intervalId);
  }, [show, input]);
  console.log(data["result"]);
  return (
    <div className="Admin-page w-full ">
      <HeaderAdmin icon={arrayIcon}></HeaderAdmin>
      {show == "user" ? (
        <UserManager data={data}></UserManager>
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
    <div className="container-header fixed h-[100px] w-full z-50">
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
            className="noti button-icon relative flex select-item"
            size="24"
          ></ButtonExtra>
          <ButtonExtra
            srcIcon={props.icon.setting}
            size="24"
            className="setting button-icon relative flex select-item"
          ></ButtonExtra>
          <div className="w-[40px] border border-main-clo rounded-full p-2 cursor-pointer">
            <img src="src\assets\avata.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
const UserManager = (props) => {
  // console.log(props.usersData);
  const data = props.data ? props.data["result"] : "";
  const dataJson = data ? JSON.parse(data) : "";
  let num = 0;
  const arrayCol = {
    SNo: "S.No",
    _id: "ID",
    name: "Name",
    phone: "Number Phone",
    address: "Address",
    email: "Email",
  };

  return (
    <div>
      <div className="search-filter fixed w-full h-[55px] top-[70px] flex justify-around items-center bg-[#fff] z-40">
        <div className="search flex-[calc(8/9)]">
          <div className="w-[99%] p-1 m-auto  flex justify-between border border-main-clo text-center items-center rounded-full">
            <img
              className="w-[16px] h-[16px] mx-[20px]"
              src="src\assets\icon\search_icon.png"
              alt=""
            />
            <div
              className="w-full flex justify-between text-[18px] font-medium border-l-2 border-l-main-clo"
              onClick={(e) => {
                e.target.value = "";
              }}
            >
              <input
                className="w-full pl-3 outline-none text-gray-clo"
                defaultValue={"Input your text..."}
              />
              <Button text="Search" className="px-[10px]"></Button>
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
          className={`board w-full mt-[65px] gap-1 bg-[#fff] overflow-y-scroll `}
        >
          <div>
            <UserInfo
              className="text-left w-full flex mt-[60px] px-7 py-4 gap-2 border-t-[4px] border-b-[4px] bg-[#fff] text-[16px] font-medium text-gray-clo border-backgruond-clo"
              col={arrayCol}
              SNo={arrayCol.SNo}
              delete="none"
            ></UserInfo>
            {dataJson ? (
              dataJson.map((item) => {
                // console.log(item);
                num = num + 1;
                return (
                  <UserInfo
                    key={item._id}
                    col={item}
                    SNo={num}
                    className={`${
                      num % 2 == 0 ? "" : "bg-list-clo"
                    } text-left w-full flex px-7 py-4 gap-2 text-[16px] font-medium my-[2px] text-text-clo border-b-[4px] border-backgruond-clo`}
                  ></UserInfo>
                );
              })
            ) : (
              <div className="loading mx-auto my-3 w-[35px] h-[35px] border-[6px] border-main-clo border-r-[transparent] rounded-full bg-hover-clo"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const UserInfo = (props) => {
  return (
    <div className={props.className}>
      <div className="flex-[calc(1/17)] border-r-[2px] border-r-gray-clo">
        {props.SNo}
      </div>
      <div className="flex-[calc(2/17)] border-r-[2px] border-r-gray-clo pr-2 max-w-[100px] overflow-hidden">
        {props.col._id.substring(0, 8)}
      </div>
      <div className="flex-[calc(2/17)] border-r-[2px] border-r-gray-clo">
        {props.col.name}
      </div>
      <div className="flex-[calc(3/17)] border-r-[2px] border-r-gray-clo">
        {props.col.phone}
      </div>
      <div className="flex-[calc(4/17)] border-r-[2px] border-r-gray-clo">
        {props.col.address}
      </div>
      <div className="flex-[calc(4/17)] ">{props.col.email}</div>
      <div className="detele-user flex-[calc(1/17)]">
        {props.delete == "none" ? (
          <div className="delete button-icon relative w-[26px]"></div>
        ) : (
          <div className="delete-btn">
            <ButtonExtra
              srcIcon={"src/assets/icon/recycle_bin_icon.png"}
              className="delete button-icon relative select-item"
              size="26"
            ></ButtonExtra>
          </div>
        )}
      </div>
    </div>
  );
};
const ProductManager = (props) => {
  return (
    <>
      <div className="search-filter fixed w-full h-[55px] top-[70px] flex justify-around items-center bg-[#fff] z-40">
        <div className="search flex-[calc(8/9)]">
          <div className="w-[99%] p-1 m-auto  flex justify-between border border-main-clo text-center items-center rounded-full">
            <img
              className="w-[16px] h-[16px] mx-[20px]"
              src="src\assets\icon\search_icon.png"
              alt=""
            />
            <div
              className="w-full flex justify-between text-[18px] font-medium border-l-2 border-l-main-clo"
              onClick={(e) => {
                e.target.value = "";
              }}
            >
              <input
                className="w-full pl-3 outline-none text-gray-clo"
                defaultValue={"Input your text..."}
              />
              <Button text="Search" className="px-[10px]"></Button>
            </div>
          </div>
        </div>
        <div className="flex gap-3 flex-[calc(1/9)] justify-center">
          <ButtonExtra
            srcIcon={"src/assets/icon/filter_icon.png"}
            text="Filter"
            size="24"
            className="filter button-filter relative py-[4px] border-1 border-gray-clo opacity-50 hover:opacity-[1]"
          ></ButtonExtra>
        </div>
      </div>
    </>
  );
};
const VoucherManager = (props) => {};
const Setting = (props) => {};
const Noti = (props) => {};
const Filter = (props) => {};

export default AdminPage;
