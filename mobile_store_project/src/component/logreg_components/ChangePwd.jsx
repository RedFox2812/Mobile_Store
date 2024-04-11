// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";
import Inputbox from "./Inputbox";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    prepwd: yup.string().required("This field is required!"),
    newpwd: yup
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
    cfnewpwd: yup.string().required("This field is required!"),
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
    <div className="bg-white max-w-[500px] mx-auto shadow-2xl rounded-3xl">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        autoComplete="off"
        className="max-w-[450px] mx-auto my-40"
      >
        <p className="text-center text-3xl py-8">DDA MOBILESTORE</p>
        <div className="flex flex-col gap-3  ">
          {/* present pwd */}
          <label
            htmlFor="prepwd"
            className="cursor-pointer font-semibold text-xl"
          >
            Mật khẩu hiện tại
          </label>
          <Inputbox
            name="prepwd"
            placeholder="Nhập vào mật khẩu hiện tại của bạn"
            id="prepwd"
            control={control}
            type="password"
          ></Inputbox>
          {errors.prepwd && (
            <span className="color: text-red-500 text-sm ">
              {errors.prepwd.message}
            </span>
          )}
          {/* new pwd */}
          <label
            htmlFor="newpwd"
            className="cursor-pointer font-semibold text-xl"
          >
            Mật khẩu mới
          </label>
          <Inputbox
            name="cfnewpwd"
            placeholder="Nhập lại mật khẩu mới"
            id="cfnewpwd"
            control={control}
            type="password"
          ></Inputbox>
          {errors.newpwd && (
            <span className="color: text-red-500 text-sm ">
              {errors.newpwd.message}
            </span>
          )}
          {/* confirm newpwd */}
          <label
            htmlFor="newpwd"
            className="cursor-pointer font-semibold text-xl"
          >
            Xác nhận mật khẩu mới
          </label>
          <Inputbox
            name="newpwd"
            placeholder="Nhập vào mật khẩu mới"
            id="newpwd"
            control={control}
            type="password"
          ></Inputbox>
          {errors.cfnewpwd && (
            <span className="color: text-red-500 text-sm ">
              {errors.cfnewpwd.message}
            </span>
          )}
        </div>
        <div className="pb-8 text-center">
          <button className="w-full p-5 mt-5 font-semibold text-white bg-black rounded-lg">
            Xác nhận
          </button>
          <a href="" className="underline ">
            Quên mật khẩu?
          </a>
        </div>
      </form>
    </div>
  );
}
