
"use client";
import React from "react";
import OrderHistoryPage from "./OrderHistoryPage";
import Navbar from "@/components/commen/Navbar";
import { LicenseTypes } from "@/utils/enum.types";
import Footer from "@/components/Footer";

const OrderHistory = () => {
  return (
    <>
      <Navbar NavType={LicenseTypes.USER} />
      <div className="">
        <OrderHistoryPage />
      </div>

      <Footer />
    </>
  );
};

export default OrderHistory;
