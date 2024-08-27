/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// import React from "react";
import { useEffect, useState } from "react";
import ButtonExtra from "../elements/ButtonExtra";
import Button from "../elements/Button";
import Dropdown from "../elements/Dropdown";
import { data } from "autoprefixer";
let userId = "";
userId = localStorage.getItem("userId");
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
        `http://127.0.0.1:5000/execute_python_function?input=${input}&data=""`
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
      if (e.target.classList.contains("user")) {
        setData("");
        setInput("getUserList");
        setShow("user");
      } else if (e.target.classList.contains("product")) {
        setData("");
        setInput("getProductList");
        setShow("product");
      } else if (e.target.classList.contains("order")) {
        setData("");
        setInput("getOrderList");
        setShow("order");
      } else if (e.target.classList.contains("setting")) {
        setShow("setting");
      } else if (e.target.classList.contains("noti")) {
        setShow("noti");
      }
    });
    return () => clearInterval(intervalId);
  }, [show, input]);
  // console.log(data["result"]);
  return (
    <div className="Admin-page">
      <HeaderAdmin icon={arrayIcon}></HeaderAdmin>
      <BodyAdmin dataTable={data} show={show}></BodyAdmin>
    </div>
  );
};
const HeaderAdmin = (props) => {
  const items = ["Người dùng", "Sản phẩm", "Đơn đặt hàng"];
  return (
    <>
      <div className="container-header">
        <div className="w-[1230px] mx-auto h-auto flex  justify-between bg-[#fff] rounded-t-md">
          <div className=" left-bar h-full flex items-center ">
            <p className=" h-full p-[16px]  mr-[100px] text-main-clo text-[30px] font-bold cursor-default text-shadow-sm">
              Admin Manager
            </p>
            <ul className=" h-full flex gap-10 text-[20px] font-medium text-gray-clo">
              {items.map((item) => {
                return (
                  <li
                    key={items.indexOf(item)}
                    className={`select-item h-full relative p-[10px] cursor-pointer hover:text-text-clo ${
                      item == "Người dùng" ? "selected" : ""
                    } ${
                      item == "Người dùng"
                        ? "user"
                        : item == "Sản phẩm"
                        ? "product"
                        : item == "Đơn đặt hàng"
                        ? "order"
                        : ""
                    }`}
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
            <Button
              onClick={() => {
                localStorage.setItem("userId", "");
                localStorage.setItem("dataUser", "");
                userId = "";
                window.location.href = "/";
              }}
              text="Đăng xuất"
              className="py-1 px-3 border border-gray-clo text-gray-clo bg-[#fff] font-semibold rounded-sm hover:text-red-clo hover:border-red-clo"
            ></Button>
            <div className="w-[40px] border border-main-clo rounded-full p-2 cursor-pointer">
              <img src="src\assets\avata.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const BodyAdmin = (props) => {
  const show = props.show;
  let dataTable = "";
  if (show != "product") {
    dataTable = props.dataTable["result"]
      ? JSON.parse(props.dataTable["result"])
      : "";
  } else {
    dataTable = props.dataTable["result"];
  }

  return (
    <>
      <div className="container-body my-8">
        {dataTable ? (
          <div className="w-[1230px] mx-auto">
            {show == "user" ? (
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>ID</th>
                    <th>HỌ VÀ TÊN</th>
                    <th>SĐT</th>
                    <th>EMAIL</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((item) => {
                    return (
                      <tr key={item._id}>
                        <th>{item.id}</th>
                        <th>{item._id}</th>
                        <th>{item.name}</th>
                        <th>{item.phone}</th>
                        <th>{item.email}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : show == "product" ? (
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>ID</th>
                    <th>TÊN SẢN PHẨM</th>
                    <th>GIÁ SẢN PHẨM</th>
                    <th>SỐ LƯỢNG</th>
                    <th>CHI TIẾT</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((item) => {
                    return (
                      <tr key={item._id} id={item._id}>
                        <th>{item.id}</th>
                        <th>{item._id}</th>
                        <th className="text-left">{item.records.name}</th>
                        <th>
                          {item.records.offers.lowPrice.toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </th>
                        <th>{item.soluong}</th>
                        <th>
                          <i
                            onClick={(e) => {
                              const idProduct =
                                e.target.parentNode.parentNode.id;
                              console.log(idProduct);
                              dataTable.map((item) => {
                                if (item._id == idProduct) {
                                  console.log(item);
                                  const dataProduct = JSON.stringify(item);
                                  localStorage.setItem(
                                    "dataDetailProduct",
                                    dataProduct
                                  );
                                }
                              });
                              window.location.href = "/admin/detail_product";
                            }}
                            className="fa-solid fa-info p-2 px-4 text-[14px] cursor-pointer text-list-clo bg-gray-clo rounded-full hover:bg-main-clo"
                          ></i>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : show == "order" ? (
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>ID_donhang</th>
                    <th>SẢN PHẨM</th>
                    <th>SĐT</th>
                    <th>ĐỊA CHỈ</th>
                    <th>TÌNH TRẠNG</th>
                    <th>CHI TIẾT</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((item, index) => {
                    return (
                      <tr key={item._id} id={item._id}>
                        <th>{index + 1}</th>
                        <th>{item._id}</th>
                        <th>{item.namesp}</th>
                        <th>{item.phone}</th>
                        <th>{item.diachi}</th>
                        <th>{item.tinhtrang}</th>
                        <th>
                          <i
                            onClick={(e) => {
                              const idOrder = e.target.parentNode.parentNode.id;
                              console.log(idOrder);
                              dataTable.map((item) => {
                                if (item._id == idOrder) {
                                  console.log(item);
                                  const dataOrder = JSON.stringify(item);
                                  localStorage.setItem(
                                    "dataDetailOrder",
                                    dataOrder
                                  );
                                }
                              });
                              window.location.href = "/admin/detail_order";
                            }}
                            className="detail-order fa-solid fa-info p-2 px-4 text-[14px] cursor-pointer text-list-clo bg-gray-clo rounded-full hover:bg-main-clo"
                          ></i>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="w-8 h-8 border-4 mx-auto border-main-clo border-r-[transparent] rounded-full animate-spin"></div>
        )}
      </div>
    </>
  );
};

export default AdminPage;
