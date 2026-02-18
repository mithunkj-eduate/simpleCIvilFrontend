import React from "react";
import Navbar from "./NavBar";
import { LicenseTypes } from "@/utils/enum.types";

interface Props {
  children: React.ReactNode;
}
const layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar NavType={LicenseTypes.FARMER} />
      {children}
      {/* <BottomNav /> */}
    </div>
  );
};

export default layout;
