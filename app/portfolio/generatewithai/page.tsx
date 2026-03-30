import Navbar from "@/components/commen/Navbar";
import GeneratePortfolioPage from "@/components/protfolio/GenaretpProtfolioAI";
import { LicenseTypes } from "@/utils/enum.types";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar NavType={LicenseTypes.PORTFOLIO} />

      <GeneratePortfolioPage />
    </>
  );
};

export default page;
