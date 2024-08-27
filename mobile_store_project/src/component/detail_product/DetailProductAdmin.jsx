import React from "react";

const DetailProductAdmin = () => {
  const dataProduct = localStorage.getItem("dataDetailProduct");
  console.log(dataProduct);
  return <div>{dataProduct}</div>;
};

export default DetailProductAdmin;
