"use client";
import CropTrends from "@/components/farmer/CropTrends";
import OversupplyAlert from "@/components/farmer/OversupplyAlert";
import ProfitSummary from "@/components/farmer/ProfitSummary";
import Recommendations from "@/components/farmer/Recommendations";
import { AppContext } from "@/context/context";
import Link from "next/link";
import { useContext } from "react";

export default function FarmerDashboard() {
  const {state} = useContext(AppContext)
  return (
    <div className="p-4 space-y-4">
      {/* Welcome */}
      <div className="bg-green-100 p-4 rounded-2xl shadow">
        <h2 className="text-xl font-bold">Welcome {state.user && state.user.name} 👨‍🌾</h2>
        <p className="text-sm text-gray-600">Here is today’s crop insight</p>
      </div>

      

      {/* Insights */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Top Crop</p>
          <h3 className="font-bold text-lg">Tomato</h3>
        </div>

        <div className="bg-white p-3 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Avg Profit</p>
          <h3 className="font-bold text-lg text-green-600">₹5200</h3>
        </div>
      </div>

      {/* District Alert */}
      <div className="bg-yellow-100 p-3 rounded-xl">
        ⚠ Too many farmers planting Tomato in your district
      </div>

      {/* Quick Actions */}
      <Link href="/farmer/addReport">
        <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold">
          ➕ Add Crop Report
        </button>
      </Link>

      <ProfitSummary />
      <OversupplyAlert />
      <CropTrends />
      <Recommendations />
    </div>
  );
}
