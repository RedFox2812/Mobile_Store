// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";
import Inputbox from "./Inputbox";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("This field is required!"),
  password: yup.string().required("This field is required!"),
});

export default function App() {
  const {
    // register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmitHandler = (values) => {
    if (!isValid) return;
    console.log(values);
  };
  return (
    <div className="bg-white  max-w-[500px] mx-auto shadow-2xl rounded-3xl">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        autoComplete="off"
        className="max-w-[450px] mx-auto my-40"
      >
        <p className="text-center text-3xl py-8">DDA MOBILESTORE</p>
        <div className="flex flex-col gap-3  ">
          {/* UserName */}
          <label
            htmlFor="username"
            className="cursor-pointer text-xl font-semibold "
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
            className="cursor-pointer text-xl font-semibold "
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
          <a href="" className="text-right underline">
            Quên mật khẩu?
          </a>
          <button className="w-full p-5 mt-3 font-semibold text-white bg-black rounded-lg hover:bg-slate-400">
            Đăng nhập
          </button>
          <div className="flex justify-center pb-8">
            <p className="">
              Chưa có tài khoản?
              <a href="" className="underline">
                Đăng ký
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
