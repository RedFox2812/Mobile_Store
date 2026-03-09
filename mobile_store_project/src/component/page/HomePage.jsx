/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from "react";
import FilterSlider from "../child_components/navbar/FilterSlider";
import Filter from "../child_components/navbar/Filter";
import FilterExtra from "../child_components/navbar/FilterExtra";
import Button from "../elements/Button";
import { Link, NavLink, Outlet, Route, Routes, json } from "react-router-dom";
import ChatPage from "./ChatPage";
import { ChatContext } from "./ChatContext";
import Loading from "../elements/Loading";

// import Products from "../child_components/Products";
const HomePage = () => {
  const images = [
    "src/assets/img/slide1.jpg",
    "src/assets/img/slide2.png",
    "src/assets/img/slide3.jpg",
  ];
  const [token, setToken] = useState("");
  const [showLogButon, setShowlogButton] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("none");
  const [page, setPage] = useState(1);
  const [filterShow, setFilterShow] = useState(false);
  const [dataProducts, setDataProducts] = useState("");
  const [dataProfile, setDataProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const { showChat, setShowChat } = useContext(ChatContext);

  let paramsApi = new URLSearchParams();

  let userId = "";
  userId = localStorage.getItem("userId");

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
    let chargeFilter = "";
    filterValues.forEach((value) => {
      if (value.parentNode.classList.contains("checkbox-item-brand")) {
        brandsFilter.push(value.innerHTML);
      }
      if (value.parentNode.classList.contains("checkbox-item-extra")) {
        extraFilter.push(value.innerHTML);
      }
      if (value.parentNode.classList.contains("checkbox-item-ram")) {
        ramFilter = value.innerHTML;
      }
      if (value.parentNode.classList.contains("checkbox-item-rom")) {
        romFilter = value.innerHTML;
      }
      if (value.parentNode.classList.contains("checkbox-item-loai")) {
        typeFilter = value.innerHTML;
      }
      if (value.parentNode.classList.contains("checkbox-item-sac")) {
        chargeFilter = value.innerHTML;
      }
    });
    const filters = {
      brands: brandsFilter,
      extra: extraFilter,
      ram: ramFilter,
      rom: romFilter,
      type: typeFilter,
      charge: chargeFilter,
    };
    console.log(filters);
    brandsFilter.forEach((b) => {
      paramsApi.append("brand", b);
    });
    extraFilter.forEach((e) => {
      paramsApi.append("extra", e);
    });
    paramsApi.append("ram", ramFilter);
    paramsApi.append("rom", romFilter);
    paramsApi.append("type", typeFilter);
    paramsApi.append("ram", chargeFilter);
  };

  const checkLoged = async () => {
    if (token) {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/execute_python_function/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setDataProfile(data.data);
        setShowlogButton(false);
      } catch {
        console.error(
          "There was a problem with the fetch operation:",
          error.message,
        );
      }
    } else {
      setShowlogButton(true);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/execute_python_function/getProductList?search=${search}&page=${page}&limit=10&${paramsApi.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Network respones was not ok");
      }

      data ? setDataProducts(data.data) : console.log("empty");
      localStorage.setItem("dataProducts", JSON.stringify(dataProducts));
      setLoading(false);
    } catch {
      console.error(
        "There was a problem with the fetch operation:",
        error.message,
      );
    }
  };
  // fetchDataFilter();

  // const addCart = (idproduct) => {
  //   try {
  //     const res = fetch(
  //       `http://127.0.0.1:5000/execute_python_function?input=addcart&data=${`${idproduct},${dataUser["_id"]}`}`,
  //     );
  //     if (!res.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const response = res.json();
  //     console.log(response);
  //   } catch {
  //     console.error(" There was a problem with the fetch operation:");
  //   }
  // };
  const handleClickBrand = (e) => {
    const brandItem = e.target.querySelector("p");
    brandItem.classList.toggle("active");
  };

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
    checkLoged();
    fetchData();
    const btnClose = document.querySelector("#btn-close-chat");
    btnClose.addEventListener("click", () => {
      setShowChat(false);
    });

    const intervalShowslide = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => {
      clearInterval(intervalShowslide);
    };
  }, [search, token]);

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
                    <img src="/src/assets/icon/xiaomi_logo.png" alt="Xiaomi" />
                    <p className=" w-full text-[white] bg-[#FF6709]">Xiaomi</p>
                  </div>
                  <div
                    onClick={(e) => handleClickBrand(e)}
                    className="brand-item checkbox-item checkbox-item-brand"
                  >
                    <img src="/src/assets/icon/apple_logo.png" alt="Apple" />
                    <p className=" w-full bg-[white]">Apple</p>
                  </div>
                  <div
                    onClick={(e) => handleClickBrand(e)}
                    className="brand-item checkbox-item checkbox-item-brand"
                  >
                    <img
                      src="/src/assets/icon/samsung_logo.png"
                      alt="Samsung"
                    />
                    <p className=" w-full text-[white] bg-[#172AA1]">Samsung</p>
                  </div>
                  <div
                    onClick={(e) => handleClickBrand(e)}
                    className="brand-item checkbox-item checkbox-item-brand"
                  >
                    <img src="/src/assets/icon/oppo_logo.jpg" alt="Oppo" />
                    <p className=" w-full text-[white] bg-[#046A38]">OPPO</p>
                  </div>
                  <div
                    onClick={(e) => handleClickBrand(e)}
                    className="brand-item checkbox-item checkbox-item-brand"
                  >
                    <img src="/src/assets/icon/realme_logo.png" alt="Realme" />
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
                setFilterShow(true);
                handleGetValueFilter();
                fetchData();
              }}
              id="btn-filter"
              text="Lọc Sản Phẩm"
              className="button-filter mt-[4px] bg-main text-white"
            ></Button>
          </div>
        </div>
        <div
          className={`container--main flex flex-col justify-between ${showFilterExtra ? "reponsive" : ""}`}
        >
          <div className="container__header shadow-md p-2 flex items-center justify-between border-b-2 border-main">
            <div className="search-box w-[40%] flex justify-between py-1 px-2 border border-main">
              <input
                type="text"
                className="outline-none w-full"
                placeholder="Nhập thông tin tìm kiếm"
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Cập nhật khi gõ
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch(); // Nhấn Enter để tìm
                }}
              />

              <Button
                text={
                  <i className="fa-solid fa-magnifying-glass my-auto text-main"></i>
                }
                onClick={() => {
                  handleSearch();
                }}
              ></Button>
            </div>
            <ul className="navbar flex gap-4 items-center">
              <li className="nav-item">
                <NavLink to="/order_status" className="nav-item">
                  Tình trạng đơn
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/cart" className="nav-item">
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
              {showLogButon ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="py-1 px-3 border border-main-clo text-[#fff] bg-[#4f8bff] ont-semibold rounded-sm hover:opacity-[0.9]"
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
                      {dataProfile ? (
                        <>
                          <NavLink to="/user-info">
                            <img
                              className="w-[45px] h-[45px] bg-contain rounded-full cursor-pointer border-2 border-white-clo hover:shadow-md hover:border-main-clo"
                              src={`src/assets/img/avatas/${dataProfile["avata"]}.png`}
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
                        localStorage.setItem("token", "");
                        setToken("");
                        window.location.href = "/";
                      }}
                      text="Đăng xuất"
                      className="py-1 px-3 border border-gray-clo font-semibold rounded-sm bg-red text-white border-red hover:bg-white hover:text-red transition-all"
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
                    fetchData();
                    setFilterShow(false);
                    handleResetFilter();
                  }}
                  id="btn-filter"
                  text="Bỏ Lọc"
                  className="button-filter my-[10px] border-red-300 bg-red-500 text-white text-xl font-bold"
                ></Button>
              ) : (
                ""
              )}

              <ul className="list-product grid grid-cols-4 gap-2">
                {loading && <Loading></Loading>}
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
                              },
                            );
                          const lowPrice =
                            item.records.offers.lowPrice.toLocaleString(
                              "it-IT",
                              {
                                style: "currency",
                                currency: "VND",
                              },
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
                              },
                            );
                          return <p className="lowprice">{price}</p>;
                        }
                      };
                      return (
                        <li
                          key={item._id}
                          className="w-full p-[10px] min-h-[580x] rounded border border-main  flex flex-col items-center bg-white"
                        >
                          <div className="mt-2 p-2 w-full flex justify-center">
                            <img
                              src={`src/assets/img/products/${item.records.image}.jpg`}
                              alt={item.records.name}
                              className="w-full h-[80%] object-contain mx-auto"
                            />
                          </div>

                          <div className="text-left w-full mt-auto">
                            <div className="pb-1 pl-3 text-lg border-b-[3px] border-gray-300 font-semibold">
                              <h3 className="truncate">{item.records.name}</h3>
                            </div>

                            <ul className="flex gap-1 text-sm pl-3 mt-3 overflow-x-auto">
                              {[3, 4, 6].map((idx) => (
                                <li
                                  key={idx}
                                  className="border border-main-clo px-1 py-0.5 rounded whitespace-nowrap"
                                >
                                  <span>
                                    {item.records.additionalProperty[idx].value}
                                  </span>
                                </li>
                              ))}
                            </ul>

                            <div className="px-3 py-1 mt-2">
                              {item.records.offers.highPrice ? (
                                <>
                                  <p className="text-gray-400 text-base relative inline-block before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-gray-400 before:top-1/2 before:left-0">
                                    {item.records.offers.highPrice.toLocaleString(
                                      "vi-VN",
                                      { style: "currency", currency: "VND" },
                                    )}
                                  </p>
                                  <p className="text-red-500 text-2xl font-bold">
                                    {item.records.offers.lowPrice.toLocaleString(
                                      "vi-VN",
                                      { style: "currency", currency: "VND" },
                                    )}
                                  </p>
                                </>
                              ) : (
                                <p className="text-red-500 text-2xl font-bold">
                                  {item.records.offers.lowPrice.toLocaleString(
                                    "vi-VN",
                                    { style: "currency", currency: "VND" },
                                  )}
                                </p>
                              )}
                            </div>

                            <div className="flex justify-between gap-1 p-3">
                              <NavLink className="flex-1">
                                <Button
                                  className="w-full bg-main hover:bg-blue-400 text-white font-bold rounded text-[17px]"
                                  text="Đặt Hàng"
                                />
                              </NavLink>
                              <NavLink
                                to="/detail_product"
                                state={item}
                                className="flex-1"
                              >
                                <Button
                                  className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold rounded text-[17px]"
                                  text="Chi Tiết"
                                />
                              </NavLink>
                              <button
                                onClick={() => addCart(item._id)}
                                className="px-3 bg-main hover:bg-blue-400 text-white rounded font-bold"
                              >
                                <i className="fa-solid fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
            {/* <div className="products-page">chuyển trang</div> */}
          </div>
          <div className="container__footer border-t-2 border-t-main flex text-left justify-between p-5 mt-5 shadow-md ">
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
                      className="w-20"
                      src="https://static.vecteezy.com/system/resources/previews/018/930/698/non_2x/facebook-logo-facebook-icon-transparent-free-png.png"
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/">
                    <img
                      className="w-200"
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
