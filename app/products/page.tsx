"use client";

import GetApi from "@/hooks/useGetApi";
import React from "react";
import ProductsPage from "./ProductsPage";
import Navbar from "@/components/commen/Navbar";
import { LicenseTypes } from "@/utils/enum.types";
// import useGetApi from "@/hooks/useGetApi"; // update with your actual file path?

const Produtcs = () => {
  const { response: productsResponse, error: productsError } = GetApi({
    apiPath: "/products",
  }); // GET PRODUCTS

  if (productsError) return <div>Error: {productsError.message}</div>;
  if (!productsResponse) return<div>Loading...</div>

  console.log(productsResponse, "products");

  return (
    <div>
      <Navbar NavType={LicenseTypes.USER}/>

<ProductsPage />
    </div>
  );
};

export default Produtcs;


