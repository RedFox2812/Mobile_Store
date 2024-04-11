// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";
import Inputbox from "./Inputbox";
// import Checkboxcus from "./checkbox/Checkboxcus";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required("This field is required!"),
    phonenumber: yup.number().required("This field is required!"),
    address: yup.string().required("This field is required!"),
    email: yup
      .string("Please enter valid email")
      .email()
      .required("This field is required!"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters or more")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Your password must be at least 1 uppercase, 1 number and 1 special character",
        }
      )
      .required("This field is required!"),
  })
  .required();

export default function Logreg() {
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
    <div className="bg-white max-w-[500px] mx-auto shadow-2xl rounded-3xl">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        autoComplete="off"
        className="max-w-[450px] mx-auto my-40 "
      >
        <p className="text-center text-3xl py-8">DDA MOBILESTORE</p>
        <div className="flex flex-row gap-3">
          <div className="ip-container flex flex-col ">
            <div className="ip-child flex justify-between">
              {/* UserName*/}
              <div>
                <label
                  htmlFor="username"
                  className="cursor-pointer text-xl font-semibold"
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

              <div className="w-[50%]">
                {/* Phone Number */}
                <label
                  htmlFor="phonenumber"
                  className="cursor-pointer text-xl font-semibold "
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

            <div className="ip-child flex flex-col">
              {/* Email */}
              <label
                htmlFor="email"
                className="cursor-pointer text-xl font-semibold "
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
                <span className="color: text-red-500 text-sm ">
                  {errors.email.message}
                </span>
              )}

              {/* password */}
              <label
                htmlFor="password"
                className="cursor-pointer text-xl font-semibold"
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
                className="cursor-pointer text-xl font-semibold"
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
        <button className="w-full p-5 mt-5 font-semibold text-white bg-black rounded-lg">
          Đăng ký
        </button>
        <p className="text-center pb-8">
          Bạn đã có tài khoản?
          <a href="" className="underline">
            Đăng nhập
          </a>
        </p>
      </form>
    </div>
  );
}
