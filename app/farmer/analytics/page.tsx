"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import AutoStateAndDistrictSelect from "@/Autocomplents/AutoStateAndDistrictSelect";
import { AutoCompleteOption } from "@/utils/commenTypes";

interface ProfitCrop {
  _id: string;
  avgProfit: number;
  totalProduction: number;
}

interface OverSupply {
  _id: string;
  totalArea: number;
}

interface summaryTypes {
  totalProduction: number;
  totalRevenue: number;
  avgProfit: number;
  farmers: string[];
}

const summaryData = {
  totalProduction: 0,
  totalRevenue: 0,
  avgProfit: 0,
  farmers: [],
};
export default function AnalyticsPage() {
  const { TOKEN } = Api();
  const { state } = useContext(AppContext);

  const [summary, setSummary] = useState<summaryTypes>(summaryData);
  const [profitCrops, setProfitCrops] = useState<ProfitCrop[]>([]);
  const [oversupply, setOversupply] = useState<OverSupply[]>([]);

  const [selectedState, setSelectedState] = useState<AutoCompleteOption | null>(
    null,
  );
  const [selectedDistrict, setSelectedDistrict] =
    useState<AutoCompleteOption | null>(null);

  useEffect(() => {
    loadData();
  }, [selectedDistrict?.value, TOKEN, state.user]);

  const loadData = async () => {
    console.log("clled analitys aoi");

    if (!TOKEN || !state.user) return;
    console.log("clled analitys  ....");
    const [sum, profit, over] = await Promise.all([
      api.get(`/farmer/profitSummary?district=${selectedDistrict?.value}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      api.get(`/farmer/profitableCrops?district=${selectedDistrict?.value}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      api.get(`/farmer/oversupply?district=${selectedDistrict?.value}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
    ]);

    setSummary(sum.data);
    setProfitCrops(profit.data);
    setOversupply(over.data);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <h1 className="text-2xl font-bold text-gray-800">
        Crop Analytics Dashboard
      </h1>

      {/* FILTER */}
      <div className="flex gap-3 bg-white p-4 rounded-xl shadow-sm border">
        <AutoStateAndDistrictSelect
          selectedItem={selectedState}
          setSelectedItem={setSelectedState}
          path={"states"}
          label="Select State"
        />
        <AutoStateAndDistrictSelect
          selectedItem={selectedDistrict}
          setSelectedItem={setSelectedDistrict}
          path={selectedState ? `districts/${selectedState?.value}` : ""}
          label="Select District"
        />
      </div>

      {/* KPI SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Total Production"
          value={`${summary.totalProduction || 0} kg`}
        />
        <KpiCard
          title="Total Revenue"
          value={`₹${summary.totalRevenue || 0}`}
        />
        <KpiCard
          title="Average Profit"
          value={`₹${Math.round(summary.avgProfit || 0)}`}
        />
        <KpiCard title="Farmers" value={`${summary.farmers?.length || 0}`} />
      </div>

      {/* MOST PROFITABLE */}
      <Section title="Most Profitable Crops">
        <div className="grid md:grid-cols-3 gap-4">
          {profitCrops.map((crop) => (
            <InsightCard
              key={crop._id}
              title={crop._id}
              profit={crop.avgProfit}
              production={crop.totalProduction}
            />
          ))}
        </div>
      </Section>

      {/* OVERSUPPLY */}
      <Section title="Oversupply Crops">
        <div className="grid md:grid-cols-3 gap-4">
          {oversupply.map((crop) => (
            <div
              key={crop._id}
              className="bg-white rounded-xl shadow-sm border p-4"
            >
              <p className="text-lg font-semibold">{crop._id}</p>
              <p className="text-gray-600 text-sm">
                Total Area: {crop.totalArea} acres
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function KpiCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-xl p-4 border shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

function InsightCard({
  title,
  profit,
  production,
}: {
  title: string;
  profit: number;
  production: number;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border hover:shadow-md transition">
      <p className="text-sm text-gray-500">Crop</p>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

      <div className="mt-3 space-y-1 text-sm">
        <p className="text-green-600 font-medium">
          Avg Profit: ₹{Math.round(profit)}
        </p>
        <p className="text-gray-600">Production: {production} kg</p>
      </div>
    </div>
  );
}
