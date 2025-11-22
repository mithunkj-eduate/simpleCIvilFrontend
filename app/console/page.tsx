"use client";
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

      <div className="flex-1 min-h-screen flex flex-col justify-between">
        <div className="mx-auto max-w-7xl px-4  py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              DashBord
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBord;
