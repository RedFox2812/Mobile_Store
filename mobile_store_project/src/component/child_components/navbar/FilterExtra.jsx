/* eslint-disable no-undef */
import React from "react";
// import showFilterExtra from "mobile_store_project/src/component/home/HomePage.jsx";
const FilterExtra = (props) => {
  const handleClick = (e) => {
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
          <div className="checkbox-item">
            <button onClick={(e) => handleClick(e)} id="loai1">
              Android
            </button>
          </div>
          <div className="checkbox-item">
            <button onClick={(e) => handleClick(e)} id="loai2">
              Iphone(IOS)
            </button>
          </div>
        </div>
        <p>Nhu cầu:</p>
        <div className="list-checkbox-type text-left ">
          <div className="checkbox-item">
            <button onClick={(e) => handleClick(e)} id="nhucau1">
              Chơi game/ cấu hình cao
            </button>
          </div>
          <div className="checkbox-item">
            <button onClick={(e) => handleClick(e)} id="nhucau2">
              Pin khủng
            </button>
          </div>
          <div className="checkbox-item">
            <button onClick={(e) => handleClick(e)} id="nhucau3">
              Camera chất lượng
            </button>
          </div>
          <div className="checkbox-item">
            <button onClick={(e) => handleClick(e)} id="nhucau4">
              Mỏng nhẹ
            </button>
          </div>
        </div>
        <p className="my-[4px]">Tính năng:</p>
        <div className=" list-checkbox-type text-left ">
          <div className="checkbox-item">
            <button onClick={(e) => handleClick(e)} id="tinhnang1">
              Sạc nhanh 20W
            </button>
          </div>
          <div className="checkbox-item">
            <button onClick={(e) => handleClick(e)} id="tinhnang2">
              Sạc sieu nhanh 60W
            </button>
          </div>
          <div className="checkbox-item">
            <button onClick={(e) => handleClick(e)} id="tinhnang2">
              Sạc không dây
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterExtra;
