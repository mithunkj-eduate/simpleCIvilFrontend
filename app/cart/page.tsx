import Navbar from "@/components/commen/Navbar";
import { LicenseTypes } from "@/utils/enum.types";
import React from "react";
import CartPage from "./CartPage";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar NavType={LicenseTypes.USER} />

        <main className="flex-1">
          <div className="flex flex-col items-center justify-center mt-2">
            <CartPage />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default page;
