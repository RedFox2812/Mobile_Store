// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../elements/Button";

const OrderStatusPage = () => {
  const [show, setShow] = useState(false);
  let dataUser = localStorage.getItem("dataUser");
  dataUser = JSON.parse(dataUser);
  console.log(dataUser);
  useEffect(() => {
    if (dataUser != "") {
      setShow(true);
    }
  }, [dataUser]);
  return (
    <main className="">
      <nav>
        <div className="nav-center">
          <p className="logo-home text-white-clo border-b-4">- DDA Store -</p>
          <div className="nav-container">
            <ul className="navbar flex gap-4">
              <li className=" nav-item text-white-clo font-semibold border-b-4 border-white-clo">
                Tình trạng đơn
              </li>
              <li className="nav-item text-white-clo font-semibold">
                <NavLink
                  to="/cart"
                  className="nav-item text-white-clo font-semibold"
                >
                  Giỏ Hàng
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/messages"
                  className="nav-item text-white-clo font-semibold"
                >
                  Chat với shop
                </NavLink>
              </li>
              {show == false ? (
                <>
                  <li className="nav-item">
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
                      className="  px-3 border border-gray-clo text-gray-clo bg-[#fff] font-semibold rounded-sm hover:text-main-clo hover:border-main-clo"
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
                              className="w-[45px] h-[45px] bg-contain rounded-full cursor-pointer border-2 border-white-clo hover:shadow-md hover:border-green-clo"
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
            <div className="select-all">
              <input type="checkbox" />{" "}
              <p className="select-all"> Chọn tất cả</p>
            </div>
            <table>
              <thead>
                <tr className="text-[16px]">
                  <th className="col-1">Chọn</th>
                  <th className="col-2">ID</th>
                  <th className="col-3">Sản phẩm</th>
                  <th className="col-4">Số lượng</th>
                  <th className="col-4">Giá tiên</th>
                  <th className="col-4">Địa chỉ</th>
                  <th className="col-4">SDT</th>
                  <th className="col-4">Tình trạng</th>
                </tr>
              </thead>
              <tbody className="py-2">
                <tr>
                  <th className="col-1">
                    <input type="checkbox" />
                  </th>
                  <th className="col-2">371936</th>
                  <th className="col-3">Samsung Galaxy S23 Ultra</th>
                  <th className="col-4">1</th>
                  <th className="col-4">21.990.000đ</th>
                  <th className="col-4">Austria</th>
                  <th className="col-4">0708511563</th>
                  <th className="col-4">Đang giao</th>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <p className="font-semibold mt-10 text-[24px]">
              Vui lòng đăng nhập để xem thông tin và tình trạng đơn hàng
            </p>

            <div className="btn-static grid grid-cols-1 w-[30%] mx-auto">
              {/* <button className="btn-static-remove">Xóa</button>
        <button className="btn-static-fix">Điều chỉnh</button> */}
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
  );
};

export default OrderStatusPage;
