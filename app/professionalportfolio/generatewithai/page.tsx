import Navbar from "@/components/commen/Navbar";
import GeneratePortfolioPage from "@/components/professionalPortfolioComponents/add/GenaretpProtfolioAI";
import { LicenseTypes } from "@/utils/enum.types";
// import GenerateWithAI from "@/components/professionalPortfolioComponents/add/GenerateWithAI";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar NavType={LicenseTypes.WEBSIT} />

      <GeneratePortfolioPage />
    </>
  );
};

export default page;
