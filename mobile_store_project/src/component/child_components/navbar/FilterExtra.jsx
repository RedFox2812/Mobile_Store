/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
// import showFilterExtra from "mobile_store_project/src/component/home/HomePage.jsx";
const FilterExtra = (props) => {
  const handleClickLoai = (e) => {
    const check = document.querySelectorAll(".checkbox-item-loai");
    check.forEach((item) => {
      item.childNodes[0].classList.remove("active");
    });
    e.target.classList.toggle("active");
  };
  const handleClickSac = (e) => {
    const check = document.querySelectorAll(".checkbox-item-sac");
    check.forEach((item) => {
      item.childNodes[0].classList.remove("active");
    });
    e.target.classList.toggle("active");
  };
  const handleClickExtra = (e) => {
    e.target.classList.toggle("active");
  };
  const show = true;
  return (
    <div
      className={`${
        props.show ? "filter-show" : "filter-hidden "
      } filter-extra`}
    >
      <div className="text-left text-[16px] font-semibold my-[4px]">
        <p>Loại điện thoại:</p>
        <div className="list-checkbox-type text-left ">
          <div className="checkbox-item checkbox-item-loai">
            <button onClick={(e) => handleClickLoai(e)} id="loai1">
              Android
            </button>
          </div>
          <div className="checkbox-item checkbox-item-loai">
            <button onClick={(e) => handleClickLoai(e)} id="loai2">
              Iphone(IOS)
            </button>
          </div>
        </div>
        <p>Nhu cầu:</p>
        <div className="list-checkbox-type text-left ">
          <div className="checkbox-item checkbox-item-extra">
            <button onClick={(e) => handleClickExtra(e)} id="nhucau1">
              Chơi game/ cấu hình cao
            </button>
          </div>
          <div className="checkbox-item checkbox-item-extra">
            <button onClick={(e) => handleClickExtra(e)} id="nhucau2">
              Pin khủng
            </button>
          </div>
          <div className="checkbox-item checkbox-item-extra">
            <button onClick={(e) => handleClickExtra(e)} id="nhucau3">
              Camera chất lượng
            </button>
          </div>
          <div className="checkbox-item checkbox-item-extra">
            <button onClick={(e) => handleClickExtra(e)} id="nhucau4">
              Mỏng nhẹ
            </button>
          </div>
        </div>
        <p className="my-[4px]">Tính năng:</p>
        <div className=" list-checkbox-type text-left ">
          <div className="checkbox-item checkbox-item-sac">
            <button onClick={(e) => handleClickSac(e)} id="tinhnang1">
              Sạc nhanh 20W
            </button>
          </div>
          <div className="checkbox-item checkbox-item-sac">
            <button onClick={(e) => handleClickSac(e)} id="tinhnang2">
              Sạc sieu nhanh 60W
            </button>
          </div>
          <div className="checkbox-item checkbox-item-sac">
            <button onClick={(e) => handleClickSac(e)} id="tinhnang2">
              Sạc không dây
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterExtra;
