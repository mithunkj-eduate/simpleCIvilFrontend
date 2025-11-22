import Navbar from "@/components/commen/Navbar";
import { LicenseTypes } from "@/utils/enum.types";
import React from "react";
import SingleProduct from "./SingleProduct";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <>
      <Navbar NavType={LicenseTypes.USER} />
      <div className="mt-16">
        <SingleProduct />
      </div>
      <Footer />
    </>
  );
};

export default page;
