import Navbar from "@/components/commen/Navbar";
import { LicenseTypes } from "@/utils/enum.types";
import React from "react";
import CartPage from "./CartPage";

const page = () => {
  return (
    <>
      <Navbar NavType={LicenseTypes.USER} />
      <div className="flex flex-col items-center justify-center min-h-screen mt-2">
        <CartPage />
      </div>
    </>
  );
};

export default page;
