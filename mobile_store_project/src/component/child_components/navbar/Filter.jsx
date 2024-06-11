/* eslint-disable no-unused-vars */
import React from "react";

const Filter = () => {
  const handleClickRam = (e) => {
    const check = document.querySelectorAll(".checkbox-item-ram");
    check.forEach((item) => {
      item.childNodes[0].classList.remove("active");
    });
    e.target.classList.toggle("active");
  };
  const handleClickRom = (e) => {
    const check = document.querySelectorAll(".checkbox-item-rom");
    check.forEach((item) => {
      item.childNodes[0].classList.remove("active");
    });
    e.target.classList.toggle("active");
  };
  return (
    <div className="text-left text-[16px] font-semibold my-[4px]">
      <p>RAM:</p>
      <div className="list-checkbox text-left ">
        <div className="checkbox-item checkbox-item-ram">
          <button onClick={(e) => handleClickRam(e)} id="ram-2">
            2 GB
          </button>
        </div>
        <div className="checkbox-item checkbox-item-ram">
          <button onClick={(e) => handleClickRam(e)} id="ram-3">
            3 GB
          </button>
        </div>
        <div className="checkbox-item checkbox-item-ram">
          <button onClick={(e) => handleClickRam(e)} id="ram-4">
            4 GB
          </button>
        </div>
        <div className="checkbox-item checkbox-item-ram">
          <button onClick={(e) => handleClickRam(e)} id="ram-6">
            6 GB
          </button>
        </div>
        <div className="checkbox-item checkbox-item-ram">
          <button onClick={(e) => handleClickRam(e)} id="ram-8">
            8 GB
          </button>
        </div>
        <div className="checkbox-item checkbox-item-ram">
          <button onClick={(e) => handleClickRam(e)} id="ram-12">
            12 GB
          </button>
        </div>
      </div>
      <p className="my-[4px]">Dung lượng lưu trữ:</p>
      <div className=" list-checkbox text-left ">
        <div className="checkbox-item checkbox-item-rom">
          <button onClick={(e) => handleClickRom(e)} id="rom-32">
            32 GB
          </button>
        </div>
        <div className="checkbox-item checkbox-item-rom">
          <button onClick={(e) => handleClickRom(e)} id="rom-64">
            64 GB
          </button>
        </div>
        <div className="checkbox-item checkbox-item-rom">
          <button onClick={(e) => handleClickRom(e)} id="rom-128">
            128 GB
          </button>
        </div>
        <div className="checkbox-item checkbox-item-rom">
          <button onClick={(e) => handleClickRom(e)} id="rom-256">
            256 GB
          </button>
        </div>
        <div className="checkbox-item checkbox-item-rom">
          <button onClick={(e) => handleClickRom(e)} id="rom-512">
            512 GB
          </button>
        </div>
        <div className="checkbox-item checkbox-item-rom">
          <button onClick={(e) => handleClickRom(e)} id="rom-1tb">
            1 TB
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
