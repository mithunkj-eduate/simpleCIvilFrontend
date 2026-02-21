"use client";

import { useContext, useEffect, useState } from "react";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { AutoCompleteOption } from "@/utils/commenTypes";
import AutoStateAndDistrictSelect from "@/Autocomplents/AutoStateAndDistrictSelect";
import { dashboardText } from "@/app/utils/DashbordText";

interface Plan {
  _id: string;
  farmers: number;
  totalArea: number;
}

export default function DistrictPlans() {
  const { TOKEN } = Api();
  const { state } = useContext(AppContext);
const lang= state.lang ?? "en"
  const [plans, setPlans] = useState<Plan[]>([]);
const [selectedState, setSelectedState] = useState<AutoCompleteOption | null>(
    {
      label: "Karnataka",
      value: "Karnataka",
    },
  );
  const [selectedDistrict, setSelectedDistrict] =
    useState<AutoCompleteOption | null>({
      label: "Davangere",
      value: "Davangere",
    });

  useEffect(() => {
    loadPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict?.value, TOKEN, state.user]);

  const loadPlans = async () => {
    if (!TOKEN || !state.user) return;

    try {
      const res = await api.get(
        `/farmer/districtPlans?district=${selectedDistrict?.value}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );
      setPlans(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-1 lg:p-4 md:p-6 space-y-5">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">
           {dashboardText.districtPlanning[lang as keyof typeof dashboardText.cropDashboard]}
      </h1>

      {/* Filter */}
      <div className="bg-white pt-4 pb-4 p-2 rounded-xl shadow-sm border md:flex gap-3">
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

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md transition"
          >
            <p className="text-sm text-gray-500">Crop</p>
            <h3 className="text-xl font-semibold text-gray-800">{plan._id}</h3>

            <div className="mt-3 space-y-1 text-sm">
              <p className="text-green-700 font-medium">
                👨‍🌾 Farmers: {plan.farmers}
              </p>
              <p className="text-gray-600">
                🌾 Planned Area: {plan.totalArea} acres
              </p>
            </div>

            {/* visual bar */}
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${Math.min(plan.totalArea * 2, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
