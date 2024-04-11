/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Inputbox from "./Inputbox";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("This field is required!"),
  password: yup.string().required("This field is required!"),
});

const SigIn = () => {
  const [input, setInput] = useState("login");
  const [data, setData] = useState("empty");
  const {
    // register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmitHandler = (values) => {
    if (!isValid) return;
    setData(values);
    // console.log(data);
    fetchData();
  };
  const fetchData = async (data) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/execute_python_function_login?input=${input}&data=${data}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const response = await res.json();
      // setData(response);
      console.log(response);
    } catch {
      console.log.error(
        " There was a problem with the fetch operation:",
        error
      );
    }
  };
  return (
    <div className="fixed top-[30px] left-[calc(50%-250px)] min-h-[600px] bg-white  max-w-[500px] ">
      <div className="my-[10px] mb-[10px] ">
        <form
          className="absolute w-[450px] left-[25px] shadow-2xl rounded-3xl p-[20px]"
          onSubmit={handleSubmit(onSubmitHandler)}
          autoComplete="off"
        >
          <p className="text-center text-2xl py-10">DDA MOBILESTORE</p>
          <div className="flex flex-col gap-2  ">
            {/* UserName */}
            <label
              htmlFor="username"
              className="cursor-pointer text-xl font-semibold text-left "
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
            {/* Password */}
            <label
              htmlFor="password"
              className="cursor-pointer text-xl font-semibold text-left  "
            >
              Mật khẩu
            </label>
            <Inputbox
              name="password"
              placeholder="Nhập mật khẩu"
              id="password"
              control={control}
              type="password"
            ></Inputbox>
            {errors.password && (
              <span className="color: text-red-500 text-sm ">
                {errors.password.message}
              </span>
            )}
            <div className="flex justify-between">
              <a className="cursor-pointer underline btn-fgpass">
                Quên mật khẩu?
              </a>
              <a className="cursor-pointer underline btn-changepass">
                Thay đổi mật khẩu?
              </a>
            </div>
            <button className="w-full p-5 mt-3 font-semibold text-[white] bg-[black] rounded-lg hover:bg-slate-400 btn-dangnhap">
              Đăng nhập
            </button>
            <div className="flex justify-center pb-4">
              <p className="">
                Chưa có tài khoản?
                <a className="btn-register underline cursor-pointer">Đăng ký</a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigIn;
