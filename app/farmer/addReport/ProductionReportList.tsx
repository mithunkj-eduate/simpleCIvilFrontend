"use client";

import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import React, { useContext, useEffect, useState } from "react";

interface ProductionType {
  _id: string;
  cropName: string;
  season: string;
  landUsedAcres: number;
  investmentCost: number;
  otherExpenses: number;
  yieldKg: number;
  sellingPricePerKg: number;
  totalRevenue: number;
  profit: number;
}

const ProductionReportList = () => {
  const { TOKEN } = Api();
  const { state } = useContext(AppContext);

  const [reports, setReports] = useState<ProductionType[]>([]);

  useEffect(() => {
    if (!TOKEN || !state.user) return;

    const fetchReports = async () => {
      const res = await api.get("/farmer/production", {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      setReports(
        res.data.map((item: ProductionType) => ({
          ...item,
        })),
      );
    };

    fetchReports();
  }, [TOKEN, state.user]);

  const profitColor = (profit: number) => {
    if (profit > 0) return "text-green-600";
    if (profit < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="p-4 max-w-xl mx-auto pb-24">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        💰 Production Reports
      </h2>

      {reports.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">
          No production reports yet
        </p>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <div
              key={r._id}
              className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{r.cropName}</h3>
                <span className="text-sm text-gray-500">{r.season}</span>
              </div>

              {/* Land */}
              <p className="text-sm text-gray-600 mt-1">
                🌾 Land Used: <b>{r.landUsedAcres} acres</b>
              </p>

              {/* Investment */}
              <div className="mt-2 text-sm text-gray-600">
                💸 Investment: ₹{r.investmentCost}
              </div>
              <div className="text-sm text-gray-600">
                🧾 Other Expenses: ₹{r.otherExpenses}
              </div>

              {/* Yield */}
              <div className="mt-2 text-sm text-gray-600">
                ⚖ Yield: {r.yieldKg} kg
              </div>
              <div className="text-sm text-gray-600">
                💰 Selling Price: ₹{r.sellingPricePerKg}/kg
              </div>

              {/* Revenue */}
              <div className="mt-2 text-sm font-medium">
                Total Revenue: ₹{r.totalRevenue}
              </div>

              {/* Profit */}
              <div
                className={`text-lg font-bold mt-1 ${profitColor(r.profit)}`}
              >
                Profit: ₹{r.profit}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductionReportList;
