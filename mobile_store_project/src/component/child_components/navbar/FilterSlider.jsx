import React, { useState } from "react";

const FilterSlider = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(11);

  const handleMinPriceChange = (e) => {
    if (minPrice >= maxPrice) {
      setMaxPrice(Number(minPrice) + 10);
    } else {
      setMinPrice(e.target.value);
    }
  };
  const handleMaxPriceChange = (e) => {
    if (minPrice >= maxPrice) {
      setMinPrice(Number(maxPrice) - 10);
    } else {
      setMaxPrice(e.target.value);
    }
  };
  return (
    <div className="flex flex-colitems-center text-[16px] font-semibold">
      <div className="flex flex-col items-center mt-[10px] w-full">
        <div className="flex gap-1 w-full">
          <span>Giá: </span>
          <label htmlFor="minPrice">
            {minPrice} - {maxPrice} triệu
          </label>
        </div>
        <div className="flex flex-col w-full gap-1 mt-[4px]">
          <input
            type="range"
            id="minPrice"
            name="minPrice"
            min="0"
            max="100"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="w-full boxHover"
          />
          <input
            type="range"
            id="maxPrice"
            name="maxPrice"
            min="0"
            max="100"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="w-full boxHover"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSlider;
