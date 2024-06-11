// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";
import Inputbox from "./Inputbox";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink } from "react-router-dom";

const schema = yup
  .object({
    username: yup.string().required("Thông tin bắt buộc !"),
    phonenumber: yup.string().required("Thông tin bắt buộc !"),
    address: yup.string().required("Thông tin bắt buộc !"),
    email: yup
      .string()
      .email("Định dạng email không hợp lệ !")
      .required("Email là bắt buộc !"),

    password: yup
      .string()
      .min(8, "Mật khẩu ít nhất phải có ít nhất 8 ký tự")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Mật khẩu phải chứa 1 ký tự viết hoa, 1 số và 1 ký tự đặt biệt",
        }
      )
      .required("Password là bắt buộc !"),
  })
  .required();

function Register() {
  const {
    // register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmitHandler = (values) => {
    if (!isValid) return;
    console.log(values);
  };
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="bg-white max-w-[520px] mx-auto shadow-2xl rounded-3xl relative top-6">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        autoComplete="off"
        className="w-[100%] mx-auto py-2 px-4"
      >
        <p className="text-center w-full bg-main-clo text-3xl mt-2 mb-3 p-3 text-white-clo rounded-t-3xl ">
          DDA MOBILESTORE
        </p>
        <div className="flex flex-row">
          <div className="ip-container flex flex-col w-full">
            <div className="w-full">
              <div className="ip-child w-full flex">
                {/* UserName*/}
                <div className="w-full">
                  <label
                    htmlFor="username"
                    className="cursor-pointer text-[18px] font-semibold"
                  >
                    Tên người dùng
                  </label>
                  <Inputbox
                    name="username"
                    placeholder="Nhập tên người dùng"
                    id="username"
                    control={control}
                    type="text"
                  ></Inputbox>
                  {errors.username && (
                    <span className="color: text-red-500 text-sm ">
                      {errors.username.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  {/* Phone Number */}
                  <label
                    htmlFor="phonenumber"
                    className="cursor-pointer text-[18px] font-semibold "
                  >
                    SDT
                  </label>
                  <Inputbox
                    name="phonenumber"
                    placeholder="SDT"
                    id="phonenumber"
                    control={control}
                    type="text"
                  ></Inputbox>
                  {errors.phonenumber && (
                    <span className="color: text-red-500 text-sm ">
                      {errors.phonenumber.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="ip-child flex flex-col px-3">
              {/* Email */}
              <label
                htmlFor="email"
                className="cursor-pointer text-[18px] font-semibold "
              >
                Email
              </label>
              <Inputbox
                name="email"
                placeholder="Nhập vào email"
                id="email"
                control={control}
                type="email"
              ></Inputbox>
              {errors.email && (
                <span className="color: text-red-500 text-sm   ">
                  {errors.email.message}
                </span>
              )}

              {/* password */}
              <label
                htmlFor="password"
                className="cursor-pointer text-[18px] font-semibold"
              >
                Mật khẩu
              </label>
              <Inputbox
                name="password"
                placeholder="Tạo mật khẩu mới"
                id="password"
                control={control}
                type="password"
              ></Inputbox>
              {errors.password && (
                <span className="color: text-red-500 text-sm ">
                  {errors.password.message}
                </span>
              )}

              {/* Adress */}
              <label
                htmlFor="address"
                className="cursor-pointer text-[18px] font-semibold"
              >
                Địa chỉ
              </label>
              <Inputbox
                name="address"
                placeholder="Nhập vào địa chỉ"
                id="address"
                control={control}
                type="text"
              ></Inputbox>
              {errors.address && (
                <span className="color: text-red-500 text-sm ">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="px-3 ">
          <button className="w-[100%] p-3 my-2 font-semibold text-[#fff] text-[20px] border border-main-clo bg-main-clo rounded-lg">
            Đăng ký
          </button>
        </div>
        <p className="text-center pb-2 mt-2">
          Bạn đã có tài khoản?
          <NavLink
            to="/login"
            className=" text-[blue] ml-2 underline cursor-pointer"
          >
            Đăng Nhập
          </NavLink>
        </p>
      </form>
    </div>
  );
}
export default Register;
