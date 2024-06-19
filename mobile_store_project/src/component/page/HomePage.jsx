/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import FilterSlider from "../child_components/navbar/FilterSlider";
import Filter from "../child_components/navbar/Filter";
import FilterExtra from "../child_components/navbar/FilterExtra";
import Button from "../elements/Button";
import { Link, NavLink, Outlet, Route, Routes, json } from "react-router-dom";
import ChatPage from "./ChatPage";

import Login from "../logreg_components/Login";
import styled from "styled-components";
import { date } from "yup";

const ItemProductStyled = styled.li`
  width: 100%;
  padding: 10px;
  max-height: 500px;
  border-radius: 4px;
  img {
    background-size: contain;
    background-position: center;
    width: 100%;
    height: 90%;
  }
  border: 1px solid var(--main-color);
  .info-item li {
    border: 1px solid var(--main-color);
    padding: 4px 4px;
    margin-right: 4px;
    border-radius: 4px;
  }
  .info-item li span {
    font-size: 14px;
  }
  .highprice {
    margin-bottom: -10px;
    padding-left: 10px;
    font-size: 16px;
    color: var(--gray-color);
    position: relative;
    &:before {
      position: absolute;
      top: 50%;
      left: 0px;
      content: "";
      width: 60%;
      height: 2px;
      background-color: var(--gray-color);
    }
  }
  .lowprice {
    margin-top: 6px;
    font-size: 24px;
    color: var(--red-color);
  }
`;
// import Products from "../child_components/Products";
const HomePage = () => {
  const images = [
    "src/assets/img/slide1.jpg",
    "src/assets/img/slide2.png",
    "src/assets/img/slide3.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("getProductList");
  const [filterShow, setFilterShow] = useState(false);
  const [dataApi, setDataApi] = useState("");
  const [dataProducts, setDataProducts] = useState("");
  const [showLog, setShowLog] = useState(true);
  const [showChat, setShowChat] = useState(true);

  let userId = "";
  userId = localStorage.getItem("userId");

  const [dataUser, setDataUser] = useState("");
  const handleResetFilter = () => {
    const filterValues = document.querySelectorAll(".checkbox-item .active");
    filterValues.forEach((item) => {
      item.classList.remove("active");
    });
  };
  const handleGetValueFilter = () => {
    const filterValues = document.querySelectorAll(".checkbox-item .active");
    const brandsFilter = [];
    const extraFilter = [];
    let ramFilter = "";
    let romFilter = "";
    let typeFilter = "";
    let sacFilter = "";
    filterValues.forEach((value) => {
      if (value.parentNode.classList.contains("checkbox-item-brand")) {
        brandsFilter.push(value.innerHTML);
      }
      if (value.parentNode.classList.contains("checkbox-item-extra")) {
        extraFilter.push(value.innerHTML);
      }
      if (value.parentNode.classList.contains("checkbox-item-ram")) {
        ramFilter = value.innerHTML[0];
      }
      if (value.parentNode.classList.contains("checkbox-item-rom")) {
        romFilter = value.innerHTML;
      }
      if (value.parentNode.classList.contains("checkbox-item-loai")) {
        typeFilter = value.innerHTML;
      }
      if (value.parentNode.classList.contains("checkbox-item-sac")) {
        sacFilter = value.innerHTML;
      }
    });
    const filters = {
      brands: brandsFilter,
      extra: extraFilter,
      ram: ramFilter,
      rom: romFilter,
      type: typeFilter,
      sac: sacFilter,
    };
    console.log(filters);
    setDataApi(JSON.stringify(filters));
    setInput("filter");
  };
  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/execute_python_function?input=${input}&data=${dataApi}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const response = await res.json();
      response ? setDataProducts(response.result) : console.log("empty");
      localStorage.setItem("dataProducts", JSON.stringify(dataProducts));
    } catch {
      console.error(" There was a problem with the fetch operation:");
    }
  };
  const addCart = (idproduct) => {
    try {
      const res = fetch(
        `http://127.0.0.1:5000/execute_python_function?input=addcart&data=${`${idproduct},${dataUser["_id"]}`}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const response = res.json();
      console.log(response);
    } catch {
      console.error(" There was a problem with the fetch operation:");
    }
  };
  const handleClickBrand = (e) => {
    const brandItem = e.target.querySelector("p");
    brandItem.classList.toggle("active");
  };

  const fetchUserData = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/execute_python_function?input=getuserdata&data=${userId}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const response = await res.json();
      const result = response.result;
      setDataUser(JSON.parse(result));
      localStorage.setItem("dataUser", JSON.stringify(dataUser));
      console.log(dataUser);
    } catch {
      console.error(" There was a problem with the fetch operation:");
    }
  };
  // fetchDataFilter();

  useEffect(() => {
    const btnClose = document.querySelector("#btn-close-chat");
    btnClose.addEventListener("click", () => {
      setShowChat(false);
    });
    if (userId && userId != "") {
      setShowLog(false);
      fetchUserData();
    }
    // const intervalUser = setInterval(fetchData, 1000);
    const intervalId = setInterval(fetchData, 1000);
    const intervalShowslide = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => {
      clearInterval(intervalId);
      // clearInterval(intervalUser);
      clearInterval(intervalShowslide);
    };
  }, [input, dataProducts, dataUser]);

  const [showFilterExtra, setShowFilterExtra] = useState(false);
  const handleToggleShow = () => {
    setShowFilterExtra(!showFilterExtra);
  };

  return (
    <>
      <div className=" h-full flex bg-[white]">
        <div className="container--left flex flex-col gap-0">
          <div className="container--left__extra" onClick={handleToggleShow}>
            {showFilterExtra ? "-" : "+"}
          </div>
          <p className="logo-home text-text-clo border-b-4">- DDA Store -</p>
          <div className="container-filter">
            <div className="filter w-full">
              <div className="pl-4 border-r-backgruond-clo">
                <div className="brands-list bg-opacity-30 shadow-md">
                  <div
                    onClick={(e) => handleClickBrand(e)}
                    className="brand-item checkbox-item checkbox-item-brand  "
                  >
                    <img
                      src="https://th.bing.com/th/id/R.113b4fffdd04928029943a988c53ce1d?rik=stMGXgeEcuUDHg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fxiaomi-png-xiaomi-logo-mi-7716.png&ehk=lP1AIVPj6gBi1%2f6YcIJ4GEjIhb2rAidRBbdnFNtxghQ%3d&risl=&pid=ImgRaw&r=0"
                      alt="Xiaomi"
                    />
                    <p className=" w-full text-[white] bg-[#FF6709]">Xiaomi</p>
                  </div>
                  <div
                    onClick={(e) => handleClickBrand(e)}
                    className="brand-item checkbox-item checkbox-item-brand"
                  >
                    <img
                      src="https://tvseriesfinale.com/wp-content/uploads/2016/02/Apple-logo-e1455567187247.jpg"
                      alt="Apple"
                    />
                    <p className=" w-full bg-[white]">Apple</p>
                  </div>
                  <div
                    onClick={(e) => handleClickBrand(e)}
                    className="brand-item checkbox-item checkbox-item-brand"
                  >
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/020/927/096/small_2x/samsung-brand-logo-phone-symbol-white-design-south-korean-mobile-illustration-with-blue-background-free-vector.jpg"
                      alt="Samsung"
                    />
                    <p className=" w-full text-[white] bg-[#172AA1]">Samsung</p>
                  </div>
                  <div
                    onClick={(e) => handleClickBrand(e)}
                    className="brand-item checkbox-item checkbox-item-brand"
                  >
                    <img
                      src="https://rec-data.kalibrr.com/www.kalibrr.com/logos/P3GZ44S6KB8F244D4U8P2YPM7PNVTFX4GPPLKX2A-5d3826f4.png"
                      alt="Oppo"
                    />
                    <p className=" w-full text-[white] bg-[#046A38]">OPPO</p>
                  </div>
                  <div
                    onClick={(e) => handleClickBrand(e)}
                    className="brand-item checkbox-item checkbox-item-brand"
                  >
                    <img
                      src="https://th.bing.com/th/id/R.4c986238730033c83b993f8b350315bb?rik=PKxRCT%2furG2jGw&pid=ImgRaw&r=0"
                      alt="Realme"
                    />
                    <p className=" w-full bg-[#FFC915]">Realme</p>
                  </div>
                </div>
                <div className=" w-full">
                  <FilterSlider></FilterSlider>
                  <Filter></Filter>
                </div>
              </div>
              <FilterExtra show={showFilterExtra}></FilterExtra>
            </div>
            <Button
              onClick={() => {
                handleGetValueFilter();
                setFilterShow(true);
              }}
              id="btn-filter"
              text="Lọc Sản Phẩm"
              className="button-filter mt-[4px] bg-main-clo text-[#fff]"
            ></Button>
          </div>
        </div>
        <div
          className={`container--main ${showFilterExtra ? "reponsive" : ""}`}
        >
          <div className="container__header bg-white-clo top-0 flex items-center justify-between">
            <div className="search-box w-[40%] flex justify-between py-1 px-2 border border-main-clo">
              <input
                type="text"
                className="search-input outline-none rounded-sm"
                placeholder={"Nhập thông tin tìm kiếm"}
              />
              <i className="fa-solid fa-magnifying-glass my-auto text-main-clo"></i>
            </div>
            <ul className="navbar flex gap-4 items-center">
              <li className="nav-item">
                <NavLink to="/order_status" className="nav-item">
                  Tình trạng đơn
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Cart" className="nav-item">
                  Giỏ hàng
                </NavLink>
              </li>
              <li
                className="nav-item cursor-pointer"
                onClick={() => {
                  setShowChat(true);
                }}
              >
                Chat với shop
              </li>
              {showLog ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="py-1 px-3 border border-main-clo text-[#fff] bg-main-clo font-semibold rounded-sm hover:opacity-[0.9]"
                    >
                      Đăng Nhập
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="py-1 px-3 border border-gray-clo text-gray-clo bg-[#fff] font-semibold rounded-sm hover:text-main-clo hover:border-main-clo"
                    >
                      Đăng Ký
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <div id="user-avt">
                      {dataUser ? (
                        <>
                          <NavLink to="/user-info">
                            <img
                              className="w-[45px] h-[45px] bg-contain rounded-full cursor-pointer border-2 border-white-clo hover:shadow-md hover:border-main-clo"
                              src={dataUser["avata"]}
                              alt="avata"
                            />
                          </NavLink>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                  <li className="nav-item">
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
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="container__body">
            <div className="slideshow">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentIndex ? "active" : ""}`}
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              ))}
            </div>
            <div className="products-box">
              {filterShow ? (
                <Button
                  onClick={() => {
                    setInput("getProductList");
                    setDataApi("");
                    fetchData();
                    setFilterShow(false);
                    handleResetFilter();
                  }}
                  id="btn-filter"
                  text="Bỏ Lọc"
                  className="button-filter my-[10px] border-red-clo bg-red-clo text-white-clo text-xl font-bold"
                ></Button>
              ) : (
                ""
              )}

              <ul className="list-product grid grid-cols-4 gap-2">
                {dataProducts
                  ? dataProducts.map((item) => {
                      const handleShowPrice = () => {
                        if (
                          item.records.offers.highPrice &&
                          item.records.offers.lowPrice
                        ) {
                          const highPrice =
                            item.records.offers.highPrice.toLocaleString(
                              "it-IT",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            );
                          const lowPrice =
                            item.records.offers.lowPrice.toLocaleString(
                              "it-IT",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            );
                          return (
                            <>
                              <p className="highprice">{highPrice}</p>
                              <p className="lowprice">{lowPrice}</p>
                            </>
                          );
                        } else {
                          const price =
                            item.records.offers.lowPrice.toLocaleString(
                              "it-IT",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            );
                          return <p className="lowprice">{price}</p>;
                        }
                      };
                      return (
                        <ItemProductStyled key={item._id} id={item._id}>
                          <div className="p-2">
                            <img
                              src={item.records.image}
                              alt={item.records.name}
                            ></img>
                          </div>
                          <div className="text-left">
                            <div className="pb-1 pl-3 text-[18px] border-b-[3px] border-b-gray-clo font-semibold">
                              <h3>{item.records.name}</h3>
                            </div>
                            <div>
                              <ul className="info-item flex text-[14px] pl-3 mt-3">
                                <li>
                                  {item.records.additionalProperty[3].value}
                                </li>
                                <li>
                                  {item.records.additionalProperty[4].value}
                                </li>
                                <li>
                                  {item.records.additionalProperty[6].value}
                                </li>
                              </ul>
                              <div className="px-3 py-1 text-[18px]">
                                {handleShowPrice()}
                              </div>
                              <div className="button-box p-0 py-1 flex justify-between gap-1">
                                <NavLink className="w-full">
                                  <Button
                                    className="w-full bg-main-clo hover:bg-[#3a6fbd] text-list-clo font-bold"
                                    text="Đặt Hàng"
                                  ></Button>
                                </NavLink>
                                <NavLink
                                  to={"/detail_product"}
                                  state={item}
                                  className="w-full"
                                >
                                  <Button
                                    className="w-full  bg-gray-clo hover:bg-[#9e9797] text-list-clo font-bold"
                                    text="Chi Tiết"
                                  ></Button>
                                </NavLink>
                                <button
                                  className="text-[16px] min-w-[20px]  bg-main-clo hover:bg-[#3a6fbd] text-list-clo font-bold"
                                  onClick={() => {
                                    addCart(item._id);
                                  }}
                                >
                                  <i className="fa-solid fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </ItemProductStyled>
                      );
                    })
                  : ""}
              </ul>
            </div>
            <div className="products-page">{/* chuyển trang */}</div>
          </div>
          <div className="border-t-2 border-t-main-clo relative container__footer flex text-left justify-between p-5 mt-5 shadow-md bottom-0">
            <div className="footer-col-1">
              <p className="text-[20px]">Thông tin cửa hàng</p>
              <ul className="text-[16px]">
                <li>
                  <NavLink to="/info" className="text-[blue]">
                    Giới thiệu về Mobile Store
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/news" className="text-[blue]">
                    Tin tức
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/career" className="text-[blue]">
                    Tuyển dụng
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/lien-he" className="text-[blue]">
                    Liên hệ - góp ý
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="footer-col-2">
              <p className="text-[20px]">Hướng dẫn</p>
              <ul className="text-[16px]">
                <li>
                  <NavLink to="/huong-dan-dat-hang" className="text-[blue]">
                    Hướng dẫn đặt hàng trực tuyến
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/huong-dan-thanh-toan" className="text-[blue]">
                    Hướng dẫn thanh toán
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tra-cuu-bao-hanh" className="text-[blue]">
                    Tra cứu bảo hành
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/huong-dan-tra-cuu" className="text-[blue]">
                    Hướng dẫn tra cứu đơn hàng
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="footer-col-3">
              <p className="text-[20px]">Chính sách chung</p>
              <ul className="text-[16px]">
                <li>
                  <NavLink to="/chinh-sach-can-chuyen" className="text-[blue]">
                    Chính sách vận chuyển
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/chinh-sach-bao-hanh" className="text-[blue]">
                    Chính sách bảo hành
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/chinh-sach-kiem-hang" className="text-[blue]">
                    Chính sách kiểm hàng
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/bao-mat" className="text-[blue]">
                    Bảo mật thông tin khách hàng
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="footer-col-4">
              <p className="text-[20px]">Thông tin liên hệ</p>
              <ul className="text-[16px]">
                <li>
                  Gọi mua: <span className="text-[blue]">1900 155 008</span>
                </li>
                <li>
                  khiếu nại: <span className="text-[blue]">1900 155 009</span>
                </li>
                <li>
                  Bảo hành: <span className="text-[blue]">1900 155 010</span>
                </li>
              </ul>
            </div>
            <div className="footer-col-5">
              <p className="text-[20px]">Mạng xã hội</p>
              <ul className="flex">
                <li>
                  <a href="https://www.facebook.com/">
                    <img
                      className="w-[50px]"
                      src="https://static.vecteezy.com/system/resources/previews/018/930/698/non_2x/facebook-logo-facebook-icon-transparent-free-png.png"
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/">
                    <img
                      className="w-[50px]"
                      src="https://ytpng.net/wp-content/uploads/2023/03/image-12.png"
                      alt=""
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="popup-chatbot fixed z-[999] bottom-10 right-[35px]">
        <ChatPage show={showChat}></ChatPage>
      </div>
    </>
  );
};

export default HomePage;
