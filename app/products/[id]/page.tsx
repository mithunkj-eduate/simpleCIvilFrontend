import Navbar from "@/components/commen/Navbar";
import { LicenseTypes } from "@/utils/enum.types";
import React from "react";
import SingleProduct from "./SingleProduct";

const page = () => {
  return (
    <>
      <Navbar NavType={LicenseTypes.USER} />
      <div className="mt-16">
        <SingleProduct />
      </div>
    </>
  );
};

export default page;
