"use client"
import Navbar from "@/components/commen/Navbar";
import { AppContext } from "@/context/context";
import { LicenseTypes } from "@/utils/enum.types";
import React, { useContext } from "react";

const DashBord = () => {
  const { state } = useContext(AppContext);

  if (!state.user || !state.user.id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Please login to access this page</h1>
      </div>
    );
  }
  return (
    <>
      <Navbar NavType={LicenseTypes.ADMIN} />
      <div className="mt-24">DashBord</div>
    </>
  );
};

export default DashBord;
