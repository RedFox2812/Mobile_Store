/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../elements/Button";
import ChatPage from "../page/ChatPage";

const OrderStatusPage = () => {
  const [show, setShow] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [dataOrder, setDataOrder] = useState("");
  let dataUser = localStorage.getItem("dataUser");
  const [avata, setAvata] = useState("");
  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/execute_python_function?input=getorder&data=${dataUser["_id"]}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const response = await res.json();
      const result = response.result;
      setDataOrder(JSON.parse(result));
      console.log(dataOrder);
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
      dataUser = JSON.parse(dataUser);
      fetchData();
      // console.log(dataUser);
      setAvata(dataUser["avata"]);
      setShow(true);
    }
  }, [dataUser]);
  return (
    <>
      <main className="">
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
        <div className="h-auto min-h-[400px]">
          {show ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr className="text-[16px]">
                    <th className="col-1 text-center">Chỉnh sửa</th>
                    <th className="col-2 text-center">ID</th>
                    <th className="col-3 text-center">Sản phẩm</th>
                    <th className="col-4 text-center">Số lượng</th>
                    <th className="col-4 text-center">Giá tiên</th>
                    <th className="col-4 text-center">Địa chỉ</th>
                    <th className="col-4 text-center">SDT</th>
                    <th className="col-4 text-center">Tình trạng</th>
                  </tr>
                </thead>
                <tbody className="py-2">
                  {dataOrder ? (
                    dataOrder.map((order) => {
                      return (
                        <tr
                          key={order["_id"]}
                          id={order["_id"]}
                          className="text-left"
                        >
                          <th className="col-1 text-center">
                            <NavLink
                              to={"order_status/order_edit"}
                              className="bg-main-clo text-white-clo px-2 py-2 rounded-xl hover:translate-y-[-2px]"
                            >
                              <i className="fa-solid fa-pen"></i>
                            </NavLink>
                          </th>
                          <th className="col-2">{order["_id"]}</th>
                          <th className="col-3 min-w-[100px]">
                            {order["namesp"]}
                          </th>
                          <th className="col-4 text-center">
                            {order["soluong"]}
                          </th>
                          <th className="col-4 text-center">
                            {order["gia"].toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </th>
                          <th className="col-4 min-w-[300px] text-left">
                            {order["diachi"]}
                          </th>
                          <th className="col-4 text-center">
                            {order["phone"]}
                          </th>
                          <th className="col-4 min-w-[100px]">
                            {order["tinhtrang"]}
                          </th>
                        </tr>
                      );
                    })
                  ) : (
                    <div>Bạn chưa có đơn hàng nào</div>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <p className="font-semibold mt-10 text-[24px]">
                Vui lòng đăng nhập để xem thông tin và tình trạng đơn hàng
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

        <div className="w-full mx-auto  container__footer flex text-left justify-between p-5 mt-5 shadow-lg border-t-2 border-t-main-clo">
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

export default OrderStatusPage;
