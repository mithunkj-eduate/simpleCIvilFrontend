"use client";

import React from "react";
import ProductsPage from "./ProductsPage";
import Navbar from "@/components/commen/Navbar";
import { LicenseTypes } from "@/utils/enum.types";
// import useGetApi from "@/hooks/useGetApi"; // update with your actual file path?

const Produtcs = () => {
  return (
    <div>
      <Navbar NavType={LicenseTypes.USER} />
      <ProductsPage />
    </div>
  );
};

export default Produtcs;
