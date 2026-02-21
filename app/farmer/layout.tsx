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

// Dashboard
//  ├── Farmer Profile Card
//  ├── Crop Plan Summary
//  ├── Profit Summary
//  ├── Market Trends
//  └── Recommendations

//1️⃣ Login
// 2️⃣ Create profile
// 3️⃣ Add crop plan
// 4️⃣ Add production report
// 5️⃣ See profit summary
// 6️⃣ See district trends
// 7️⃣ Avoid oversupply
// 8️⃣ Follow recommendations


// Login
//    ↓
// Create Profile
//    ↓
// Add Crop Plan
//    ↓
// View District Trends
//    ↓
// See Recommendations
//    ↓
// Add Production Data
//    ↓
// Track Profit