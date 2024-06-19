/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../elements/Button";
import ChatPage from "../page/ChatPage";
const Cart = () => {
  const [show, setShow] = useState(false);
  let dataUser = localStorage.getItem("dataUser");
  const [showChat, setShowChat] = useState(false);
  const [avata, setAvata] = useState("");
  const [dataCart, setDataCart] = useState("");
  const [thanhtoan, setThanhToan] = useState(0);
  const removeCart = (id) => {
    console.log(id);
    try {
      const res = fetch(
        `http://127.0.0.1:5000/execute_python_function?input=removecart&data=${id}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const response = res.json();
      const result = response.result;
      console.log(result);
    } catch {
      console.error(" There was a problem with the fetch operation:");
    }
  };
  const changeAmount = (id, func) => {
    if (id != "") {
      console.log(id);
      const item = document.getElementById(`${id}`);
      const amount = item ? item.querySelector(".amount").innerHTML : "";
      console.log(amount);
      try {
        const res = fetch(
          `http://127.0.0.1:5000/execute_python_function?input=${
            func == "up" ? "upamount" : "downamount"
          }&data=${id}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
      } catch {
        console.error(" There was a problem with the fetch operation:");
      }
    }
  };
  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/execute_python_function?input=getcart&data=${dataUser["_id"]}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const response = await res.json();
      const result = response.result;
      setDataCart(JSON.parse(result));
      // console.log(dataCart);
    } catch {
      console.error(" There was a problem with the fetch operation:");
    }
  };
  useEffect(() => {
    const btnClose = document.querySelector("#btn-close-chat");
    btnClose.addEventListener("click", () => {
      setShowChat(false);
    });

    if (dataUser != "") {
      setShow(true);
      dataUser = JSON.parse(dataUser);
      console.log(dataUser);
      fetchData();
      setAvata(dataUser["avata"]);
      // console.log(dataUser);
    }
  }, [dataUser, dataCart]);
  return (
    <>
      <main className="h-full">
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
                <li className="nav-item--blue">
                  <NavLink
                    to="/order_status"
                    className=" text-white-clo font-semibold"
                  >
                    Tình trạng đơn
                  </NavLink>
                </li>
                <li className=" text-white-clo border-b-4 border-white-clo font-semibold">
                  Giỏ Hàng
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
                        className=" py-1 px-3 border border-gray-clo text-gray-clo bg-[#fff] font-semibold rounded-sm hover:text-main-clo hover:border-main-clo"
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
                          <>
                            <NavLink to="/user-info">
                              <img
                                className="w-[45px] h-[45px] bg-contain rounded-full cursor-pointer border-2 border-white-clo hover:shadow-md hover:border-green-clo"
                                src={avata}
                                alt="avata"
                              />
                            </NavLink>
                          </>
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
        <div className="cart-body h-full mb-20">
          {show ? (
            <div className="cart mt-0">
              <div>
                {dataCart
                  ? dataCart.map((cart) => {
                      const price = cart["gia"].toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      });
                      return (
                        <div
                          className="cart-item border-b flex justify-between border-main-clo py-3"
                          key={cart["_id"]}
                          id={cart["_id"]}
                        >
                          <div className="flex gap-3">
                            <img
                              src={cart["image"]}
                              alt=""
                              className="w-[200px]"
                            />
                            <div className="text-left">
                              <h4>{cart["namesp"]}</h4>
                              <p className="item-price text-red-clo">{price}</p>
                              <button
                                className="remove-btn"
                                onClick={() => {
                                  removeCart(cart["_id"]);
                                }}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-3 items-center">
                            <div className="flex flex-col justify-between items-center">
                              <button
                                className="amount-btn"
                                onClick={(e) => {
                                  changeAmount(
                                    e.target.parentNode.parentNode.parentNode
                                      .id,
                                    "up"
                                  );
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
                                </svg>
                              </button>
                              <p className="amount text-red-clo">
                                {cart["soluong"]}
                              </p>
                              <button
                                className="amount-btn"
                                onClick={(e) => {
                                  changeAmount(
                                    e.target.parentNode.parentNode.parentNode
                                      .id,
                                    "down"
                                  );
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </button>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                name=""
                                className="select"
                                onClick={(e) => {
                                  setThanhToan("0 VNĐ");
                                  e.target.classList.toggle("selected");
                                  const checkeds =
                                    document.querySelectorAll(".selected");
                                  checkeds.forEach((checked) => {
                                    const cartItem =
                                      checked.parentNode.parentNode.parentNode;
                                    const sl = parseInt(
                                      cartItem.querySelector(".amount")
                                        .innerHTML
                                    );
                                    let gia =
                                      cartItem.querySelector(
                                        ".item-price"
                                      ).innerHTML;
                                    gia = gia
                                      .replace(/\./g, "")
                                      .replace(/\s*VND/, "")
                                      .replace(/\u00A0/g, "");
                                    let tong = sl * parseInt(gia, 10);
                                    setThanhToan((thanhtoan) => {
                                      thanhtoan + tong;
                                    });
                                    console.log(thanhtoan);
                                  });
                                  const payment =
                                    document.querySelector(".payment-price");
                                  payment.innerHTML = thanhtoan;
                                  // .toLocaleString(
                                  //   "it-IT",
                                  //   {
                                  //     style: "currency",
                                  //     currency: "VND",
                                  //   }
                                  // );
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : "giỏ hàng trống"}
              </div>
              <div>
                <hr />
                <div className="cart-total">
                  <h4>
                    Tổng hóa đơn <span className="payment-price">0 VNĐ</span>
                  </h4>
                </div>
                <div className="payment-backhome block">
                  <NavLink to="/cart/payment">
                    <button className="btn payment-btn">Thanh Toán</button>
                  </NavLink>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-semibold mt-10 text-[24px]">
                Vui lòng đăng nhập để xem thông tin giỏ hàng
              </p>

              <div className="btn-static grid grid-cols-1 w-[30%] mx-auto">
                <button className="btn-login p-3 border-2 border-main-clo bg-main-clo text-white-clo font-semibold rounded-md mt-5 hover:opacity-90">
                  <NavLink to="/login" className="nav-item">
                    Trở về trang đăng nhập
                  </NavLink>
                </button>
                <button className="btn-login p-3 border-2 border-main-clo text-main-clo font-semibold rounded-md mt-5 hover:opacity-90">
                  <NavLink to="/" className="nav-item">
                    Trở về trang chủ
                  </NavLink>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-full mx-auto container__footer flex text-left justify-between p-5 mt-5 shadow-lg border-t-2 border-t-main-clo">
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
      </main>
      <div className="popup-chatbot fixed z-[999] bottom-10 right-[35px]">
        <ChatPage show={showChat}></ChatPage>
      </div>
    </>
  );
};

export default Cart;
