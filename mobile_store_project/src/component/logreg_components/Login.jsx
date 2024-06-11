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
import { Link, NavLink } from "react-router-dom";

const schema = yup.object({
  email: yup.string().required("This field is required!"),
  password: yup.string().required("This field is required!"),
});

function Login() {
  const [logData, setLogData] = useState("empty");
  const userId = localStorage.getItem("userId");
  const {
    // register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmitHandler = (values) => {
    if (!isValid) return;
    const log_data = JSON.stringify(values);
    setLogData(log_data);
  };
  useEffect(() => {
    if (userId != "") {
      window.location.href = "/";
    }
    if (logData != "empty") {
      fetch(
        `http://127.0.0.1:5000/execute_python_function?input=login&data=${logData}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const userId = data["result"];
          console.log(userId);
          if (userId != "null") {
            localStorage.setItem("userId", userId);
            window.location.href = "/";
          } else {
            console.log("error");
          }
        })
        .catch((error) =>
          console.error("There was a problem with the fetch operation:", error)
        );
    }
  }, [logData]);
  return (
    <div className="fixed top-[20px] left-[calc(50%-250px)] min-h-[600px] bg-white  max-w-[500px] ">
      <div className="my-[10px] mb-[10px] ">
        <form
          className="absolute w-[450px] left-[25px] shadow-2xl rounded-3xl p-[20px]"
          onSubmit={handleSubmit(onSubmitHandler)}
          autoComplete="on"
        >
          <p className="text-center text-2xl py-10">DDA MOBILESTORE</p>
          <div className="flex flex-col gap-2  ">
            {/* UserName */}
            <label
              htmlFor="email"
              className="cursor-pointer text-[18px] font-semibold text-left "
            >
              Email
            </label>
            <Inputbox
              name="email"
              placeholder="Nhập email"
              id="email"
              control={control}
              type="text"
            ></Inputbox>
            {errors.email && (
              <span className="color: text-red-500 text-sm ">
                {errors.email.message}
              </span>
            )}
            {/* Password */}
            <label
              htmlFor="password"
              className="cursor-pointer text-[18px] font-semibold text-left  "
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
              <NavLink to="/fgpass" className="cursor-pointer underline">
                Quên mật khẩu
              </NavLink>
              <NavLink to="/changepass" className="cursor-pointer underline">
                Thay đổi mật khẩu
              </NavLink>
            </div>
            <button className="w-full p-5 mt-3 font-semibold text-[white] bg-main-clo rounded-lg hover:bg-slate-400 ">
              Đăng nhập
            </button>
            <div className="flex justify-center pb-4">
              <p>
                Chưa có tài khoản?
                <NavLink
                  to="/register"
                  className="text-[blue] underline cursor-pointer"
                >
                  {" "}
                  Đăng Ký
                </NavLink>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
