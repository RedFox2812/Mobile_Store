/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Payment.css";
import Button from "../elements/Button";
import { NavLink } from "react-router-dom";
import ChatPage from "../page/ChatPage";
const Payment = () => {
  const [show, setShow] = useState(false);
  let dataUser = localStorage.getItem("dataUser");
  const [showChat, setShowChat] = useState(false);
  const [avata, setAvata] = useState("");
  useEffect(() => {
    const btnClose = document.querySelector("#btn-close-chat");
    btnClose.addEventListener("click", () => {
      setShowChat(false);
    });

    if (dataUser != "") {
      setShow(true);
      dataUser = JSON.parse(dataUser);
      console.log(dataUser);
      setAvata(dataUser["avata"]);
      // console.log(dataUser);
    }
  }, [dataUser]);
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
        <dev>
          <p className="text-[30px] mt-10">Thanh toán sản phẩm</p>
        </dev>
        <div className="max-w-[1080px] mx-auto">
          <div>
            <div className="items-center flex">
              <img
                src="https://images.fpt.shop/unsafe/fit-in/800x800/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/10/30/638342502751589917_ip-15-pro-max-dd-bh-2-nam.jpg"
                alt=""
                className="w-[200px]"
              />
              <div className="chitietsp text-left flex justify-between w-full text-[20px]">
                <div>
                  <div>
                    <p className="text-[26px]">iPhone 15 Pro Max 256GB </p>
                    <p className="text-[26px]">Số lượng</p>
                  </div>
                </div>
                <div className="item-price">
                  <p className="text-[26px] text-red-clo">29.590.000 VND</p>
                  <p className="text-[26px]">1</p>
                </div>
              </div>

              <div></div>
            </div>
            <div className="khuyenmai my-3">
              <p>Khuyến mãi theo sản phẩm</p>
            </div>
            <div className="khuyenmai-list">
              <p>
                Đặc quyền EDU T06.2024 - DV - SIM FPT - Tặng PMH 100,000đ Mua
                dịch vụ chọn số đẹp
              </p>
              <p>
                Đặc quyền dành cho sinh viên - Giảm ngay 100,000đ áp dụng đến
                30/06Xem chi tiết
              </p>
              <p>Giảm ngay 3,400,000đ áp dụng đến 17/06</p>
            </div>
            <div className="khuyenmai my-3">
              <p>Khuyến mãi thanh toán</p>
            </div>
            <div className="khuyenmai-list">
              <p>
                Nhập mã ZLP150 giảm tối đa 150,000đ khi thanh toán 100% qua
                ZaloPayXem chi tiết
              </p>
              <p>
                Nhập mã MOMOFPT, giảm 1% tối đa 100.000đ khi thanh toán qua
                MomoXem chi tiết
              </p>
              <p>
                Nhập mã VTS3FPTS, Giảm 5% tối đa 300,000đ khi thanh toán qua ví
                trả sau Momo
              </p>
            </div>
          </div>
          {/* </div> */}
          <div className="thanhtoan-cart">
            <div className="nhanhang">
              <div className="nhanhang-title px-2">
                <p>
                  <strong>Chọn phương thức nhận hàng</strong>
                </p>
                <div className="flex gap-5">
                  <div className="flex gap-2 ">
                    <input type="checkbox" className="" />
                    <p>Giao hàng tận nơi</p>
                  </div>
                  <div className="flex gap-2 ">
                    <input type="checkbox" className="" />
                    <p>Nhận tại cửa hàng</p>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-[30px]">Thông tin đặt hàng</p>
                <div className="info-khachdathang">
                  <div className="info-permit flex px-2 gap-2">
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      className="w-full px-2 py-3"
                    />
                    <input
                      type="text"
                      placeholder="Nhập số điện thoại"
                      className="w-full px-2 py-3"
                    />
                  </div>
                  <div className="w-full p-2">
                    <input
                      type="text"
                      placeholder="Nhập email(không bắt buộc)"
                      className="w-full px-2 py-3 border border-main-clo rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="thongtin-thanhtoan px-2">
              <div className="thongtin text-left">
                <p>Tổng tiền:</p>
                <p>Giảm giá khuyến mãi:</p>
                <p>Giảm giá voucher:</p>
              </div>
              <div className="giatien">
                <p>29.590.000 VND</p>
                <p>0</p>
                <p>0</p>
              </div>
            </div>
            <div>
              <button className="btn-payment mb-[30px]">
                Hoàn tất đặt hàng
              </button>
            </div>
          </div>
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

export default Payment;
