/* eslint-disable no-unused-vars */
import React from "react";

const DetailOrderAdmin = () => {
  const dataOrder = JSON.parse(localStorage.getItem("dataDetailOrder"));
  console.log(dataOrder);
  return (
    <div className="bg-gray-100  text-text-clo text-left mx-auto">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold m-6 p-2 rounded-sm bg-main-clo text-white-clo ">
          Chi Tiết Đơn Đặt Hàng
        </h1>
        <div className="flex flex-col gap-3">
          <div className="justify-between px-6 flex">
            <div>
              <img
                src={dataOrder.image}
                alt="Product Image"
                className="w-48 h-48 rounded-lg shadow-md border"
              />
            </div>
            <div>
              <h2 className="text-xl text-text-clo font-bold text-center p-1 bg-backgruond-clo rounded-sm">
                Thông Tin Sản Phẩm Đặt Hàng
              </h2>
              <div className="flex flex-col gap-2 mt-3">
                <p>
                  <strong>Sản phẩm:</strong> {dataOrder.namesp}
                </p>
                <p>
                  <strong>Mã Sản Phẩm:</strong> {dataOrder.masp}
                </p>
                <p>
                  <strong>Số Lượng:</strong> {dataOrder.soluong}
                </p>
                <p className="text-red-500">
                  <strong>Giá tiền: </strong>
                  {dataOrder.gia.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 flex flex-col gap-2">
            <h2 className="text-xl text-white-clo font-bold text-center p-1 bg-main-clo rounded-sm">
              Thông Tin Khách Hàng
            </h2>
            <p>
              <strong>Tên khách hàng:</strong> {dataOrder.name}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {dataOrder.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {dataOrder.diachi}
            </p>
          </div>

          <div className="mb-4 px-6 flex flex-col gap-2">
            <h2 className="text-xl text-text-clo font-bold text-center p-1 bg-backgruond-clo rounded-sm">
              Thông Tin Đơn Hàng
            </h2>
            <p>
              <strong>Tình trạng đơn hàng: </strong>
              {dataOrder.tinhtrang}
            </p>
            <p>
              <strong>Ngày đặt hàng: </strong>
              {dataOrder.date}
            </p>
            <p className="text-xl text-white-clo font-bold text-center p-1 bg-main-clo rounded-sm">
              <strong>Thanh toán: </strong>
              {(dataOrder.gia * dataOrder.soluong).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrderAdmin;
