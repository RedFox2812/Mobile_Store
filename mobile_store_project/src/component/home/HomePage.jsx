/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import FilterSlider from "../child_components/navbar/FilterSlider";
import Filter from "../child_components/navbar/Filter";
import FilterExtra from "../child_components/navbar/FilterExtra";
import Button from "../elements/Button";
const HomePage = () => {
  const [showFilterExtra, setShowFilterExtra] = useState(false);
  const handleToggleShow = () => {
    setShowFilterExtra(!showFilterExtra);
  };
  useEffect(() => {
    const brandItems = document.querySelectorAll(".brand-item");
    brandItems.forEach((item) => {
      item.addEventListener("click", () => {
        const brandItem = item.querySelector("p");
        brandItem.classList.toggle("active");
      });
    });
  }, []);
  return (
    <div className="container h-full w-full flex bg-[white]">
      <div className="container--left">
        <div className="container--left__extra" onClick={handleToggleShow}>
          {showFilterExtra ? "-" : "+"}
        </div>
        <p className="logo-home text-text-clo border-b-4">- DDA Store -</p>
        <div className="container-filter">
          <div className="filter w-full">
            <div className="brands-list bg-opacity-30 shadow-md">
              <div className="brand-item">
                <img
                  src="https://th.bing.com/th/id/R.113b4fffdd04928029943a988c53ce1d?rik=stMGXgeEcuUDHg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fxiaomi-png-xiaomi-logo-mi-7716.png&ehk=lP1AIVPj6gBi1%2f6YcIJ4GEjIhb2rAidRBbdnFNtxghQ%3d&risl=&pid=ImgRaw&r=0"
                  alt="Xiaomi"
                />
                <p className=" w-full text-[white] bg-[#FF6709]">Xiaomi</p>
              </div>
              <div className="brand-item">
                <img
                  src="https://tvseriesfinale.com/wp-content/uploads/2016/02/Apple-logo-e1455567187247.jpg"
                  alt="Apple"
                />
                <p className=" w-full bg-[white]">Apple</p>
              </div>
              <div className="brand-item">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/020/927/096/small_2x/samsung-brand-logo-phone-symbol-white-design-south-korean-mobile-illustration-with-blue-background-free-vector.jpg"
                  alt="Samsung"
                />
                <p className=" w-full text-[white] bg-[#172AA1]">Samsung</p>
              </div>
              <div className="brand-item">
                <img
                  src="https://rec-data.kalibrr.com/www.kalibrr.com/logos/P3GZ44S6KB8F244D4U8P2YPM7PNVTFX4GPPLKX2A-5d3826f4.png"
                  alt="Oppo"
                />
                <p className=" w-full text-[white] bg-[#046A38]">Oppo</p>
              </div>
              <div className="brand-item">
                <img
                  src="https://th.bing.com/th/id/R.4c986238730033c83b993f8b350315bb?rik=PKxRCT%2furG2jGw&pid=ImgRaw&r=0"
                  alt="Realme"
                />
                <p className=" w-full bg-[#FFC915]">Realme</p>
              </div>
            </div>
            <div className="container-filter__extra w-full">
              <FilterSlider></FilterSlider>
              <Filter></Filter>
            </div>
          </div>
          <div
            className={`container-filter__extra w-full ${
              showFilterExtra ? "filter-show" : "filter-hidden"
            }`}
          >
            <FilterExtra show={showFilterExtra}></FilterExtra>
          </div>
        </div>
        <Button text="Filter" className="button-filter mt-[20px]"></Button>
      </div>
      <div className="container--center"></div>
      <div className="container--right"></div>
    </div>
  );
};

export default HomePage;
