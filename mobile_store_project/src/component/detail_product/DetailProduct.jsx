/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import "../detail_product/detailProduct.css";
import Button from "../elements/Button";
import { NavLink } from "react-router-dom";
import ChatPage from "../page/ChatPage";
import { useLocation } from "react-router-dom";
// import React from "react";
const DetailProduct = () => {
  const dataProducts = JSON.parse(localStorage.getItem("dataProducts"));
  const [show, setShow] = useState(false);
  const [showChat, setShowChat] = useState(false);
  let dataUser = localStorage.getItem("dataUser");
  const [avata, setAvata] = useState("");
  const location = useLocation();
  const product = location.state || {};
  useEffect(() => {
    const btnClose = document.querySelector("#btn-close-chat");
    btnClose.addEventListener("click", () => {
      setShowChat(false);
    });
    if (dataUser != "") {
      dataUser = JSON.parse(dataUser);
      // console.log(dataUser);
      setAvata(dataUser["avata"]);
      setShow(true);
    }
  }, [dataUser, dataProducts]);
  return (
    <>
      <main>
        <nav>
          <div className="nav-center">
            <NavLink
              to="/"
              className="logo-home text-white-clo border-b-4 cursor-pointer"
            >
              - DDA Store -
            </NavLink>
            <div className="nav-container">
              <ul className="navbar flex gap-4">
                <li className=" nav-item--blue text-white-clo font-semibold border-b-4 border-white-clo">
                  Tình trạng đơn
                </li>
                <li className="nav-item--blue text-white-clo font-semibold">
                  <NavLink to="/cart" className=" text-white-clo font-semibold">
                    Giỏ Hàng
                  </NavLink>
                </li>
                <li
                  className="nav-item--blue cursor-pointer"
                  onClick={() => {
                    setShowChat(true);
                  }}
                >
                  Chat với shop
                </li>
                {show == false ? (
                  <>
                    <li className="nav-item--blue">
                      <NavLink
                        to="/login"
                        className=" px-3 border border-main-clo text-[#fff] bg-main-clo font-semibold rounded-sm hover:opacity-[0.9]"
                      >
                        Đăng Nhập
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/register"
                        className="py-1  px-3 border border-gray-clo text-gray-clo bg-[#fff] font-semibold rounded-sm hover:text-main-clo hover:border-main-clo"
                      >
                        Đăng Ký
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item--blue">
                      <div id="user-avt">
                        {dataUser ? (
                          <NavLink to="/user-info">
                            <img
                              className="w-[46px] h-[46px] bg-contain rounded-full cursor-pointer border-2 border-white-clo hover:shadow-md hover:border-main-clo"
                              src={avata}
                              alt="avata"
                            />
                          </NavLink>
                        ) : (
                          ""
                        )}
                      </div>
                    </li>
                    <li className="nav-item--blue">
                      <Button
                        onClick={() => {
                          localStorage.setItem("userId", "");
                          localStorage.setItem("dataUser", "");
                          window.location.href = "/";
                        }}
                        text="Đăng xuất"
                        className=" px-3 border border-gray-clo text-gray-clo bg-[#fff] font-semibold rounded-sm hover:text-red-clo hover:border-red-clo"
                      ></Button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <section className="cart">
          <header>
            <p className="text-[40px] text-left ">{product.records.name}</p>
          </header>
          <div className="info-container">
            <div className="product-info">
              {/* <div className="info-container"> */}
              <div className="product-img">
                <img src={product.records.image} alt="" />
              </div>
            </div>
            <div className="price-container">
              <div className="sale-container">
                <div className="title">
                  <strong>Nhận ngay khuyến mãi đặc biệt</strong>
                </div>
                <div className="sale-list">
                  <div>
                    <strong>1. Từ ngày 15/06 đến hết ngày 19/06:</strong>
                    <p>
                      Mua trực tiếp tại cửa hàng vào các khung giờ sau sẽ được
                      giảm giá lên đến 2.000.000đ <br />
                      <strong>Từ 8:00 đến 10:00: </strong>Giảm ngay 2.000.000đ{" "}
                      <br />
                      <strong>Từ 15:00 đến 17:00: </strong>Giảm ngay 1.000.000đ{" "}
                      <br />
                      <strong>2. Siêu sale mua hè, rinh quà hấp dẫn</strong>
                      <p>
                        Khi mua hóa đơn có trị từ 1.000.000đ trở lên sẽ có cơ
                        hội quay số trúng thưởng, nhận ngay một chuyến du lịch
                        Nha Trang tránh nóng
                      </p>
                      <strong>3. Thu cũ đổi mới</strong>
                      <p>
                        Hỗ trợ đổi máy mới từ điện thoại cũ mọi dòng trợ giá lên
                        đến 2.000.000đ. Thu lại máy với tình trạng cũ đẹp
                      </p>
                    </p>
                  </div>
                </div>
              </div>
              <div className="btn-static">
                <div>
                  <div className="flex items-center gap-3">
                    {!product.records.offers.highPrice ? (
                      <p className="text-[30px] py-3 lowprice">
                        {product.records.offers.lowPrice.toLocaleString(
                          "it-IT",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </p>
                    ) : (
                      <>
                        <p className="text-[20px] py-3 highprice">
                          {product.records.offers.highPrice.toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </p>
                        <p className="text-[30px] pt-2 pb-5 lowprice">
                          {product.records.offers.lowPrice.toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </p>
                      </>
                    )}
                  </div>
                  <button className="btn-payment">
                    <div>
                      <strong>MUA NGAY</strong>
                    </div>
                    <p>Giao hàng miễn phí hoặc nhận tại shop</p>
                  </button>
                </div>
                <div className="btn-tragop">
                  <button>
                    <div>
                      <strong>TRẢ GÓP 0%</strong>
                    </div>
                    <p>Duyệt nhanh qua điện thoại</p>
                  </button>
                  <button>
                    <div>
                      <strong>TRẢ GÓP QUA THẺ</strong>
                    </div>
                    <p>Visa, Master Card, JCB, AMEX </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="about-product">
            <div className="gt-product flex flex-col gap-5 text-left mt-14">
              <div className="gt-title">
                <strong>Chi tiết</strong>
              </div>
              <p>
                Năm nay, Apple đã hoàn thiện iPhone 15 Pro Max với khung máy
                titan, mang tới tổng thể nhẹ và bền bỉ hơn so với thế hệ cũ. Có
                thể nói, với khung titan, đây là chiếc iPhone 15 Pro Max nhẹ
                nhất từ trước đến nay.
              </p>
              <p>
                iPhone 15 Pro Max là sự hòa quyện hoàn hảo giữa công nghệ và
                tính thẩm mỹ, với bảng màu đa dạng gồm 4 sự lựa chọn phong cách:
                titan đen, titan xanh, titan tự nhiên và titan trắng. Mỗi gam
                màu tạo nên một câu chuyện riêng, thể hiện cá tính và phong cách
                cá nhân của người sử dụng.
              </p>
              <p>
                Đây không chỉ đơn thuần là một thiết bị di động thông minh, mà
                còn là biểu tượng của thời trang và cá tính. Nó cho phép bạn tự
                do thể hiện bản thân và phong cách thông qua việc lựa chọn màu
                sắc độc đáo này.
              </p>
            </div>
            <div className="kt-product">
              <table>
                {product.records.additionalProperty.map((additional) => {
                  return (
                    <>
                      <tr>
                        <td>{additional["name"]}</td>
                        <td>{additional["value"]}</td>
                      </tr>
                    </>
                  );
                })}
              </table>
              <div className="rate-product">
                <strong>Đánh giá sản phẩm</strong>
                <input type="text" />
                <button className="btn-rate">Gửi</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="popup-chatbot fixed z-[999] bottom-10 right-[35px]">
        <ChatPage show={showChat}></ChatPage>
      </div>
    </>

    // <ChangeInfoUser></ChangeInfoUser>
  );
};

export default DetailProduct;
