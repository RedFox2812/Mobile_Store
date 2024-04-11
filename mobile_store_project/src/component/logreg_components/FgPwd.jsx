// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";
import Inputbox from "./Inputbox";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    forgotpwd: yup.string().required("This field is required!"),
  })
  .required();

export default function App() {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmitHandler = (values) => {
    if (!isValid) return;
    console.log(values);
  };

  return (
    <div className="bg-white max-h-[550px] max-w-[500px] mx-auto shadow-2xl rounded-3xl">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        autoComplete="off"
        className="max-w-[450px] mx-auto my-40"
      >
        <p className="text-center text-3xl py-8">DDA MOBILESTORE</p>
        <div className="flex flex-col gap-3  ">
          <label
            htmlFor="forgotpwd"
            className="cursor-pointer font-semibold text-3xl "
          >
            Nhập vào Email hoặc Số điện thoại bạn dùng đăng ký tài khoản!
          </label>
          <Inputbox
            name="forgotpwd"
            placeholder="Email hoặc SDT"
            id="forgotpwd"
            control={control}
            type="text"
          ></Inputbox>
          {errors.forgotpwd && (
            <span className="color: text-red-500 text-sm ">
              {errors.forgotpwd.message}
            </span>
          )}
        </div>
        <div className="pb-8 text-center">
          <button className="w-full p-5 mt-5 font-semibold text-white bg-black rounded-lg">
            Xác nhận
          </button>
          <a href="" className="underline">
            Thay đổi mật khẩu?
          </a>
        </div>
      </form>
    </div>
  );
}
