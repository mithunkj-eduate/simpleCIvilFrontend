"use client";

import { useContext, useEffect, useState } from "react";
import { AutoCompleteOption } from "@/utils/commenTypes";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import AutoStateAndDistrictSelect from "@/Autocomplents/AutoStateAndDistrictSelect";
import { dashboardText } from "@/app/utils/DashbordText";

interface Recommendation {
  crop: string;
  score: number;
}

export default function CropRecommendations() {
  const { TOKEN } = Api();
  const { state } = useContext(AppContext);
  const lang = state.lang ?? "en";
  const [data, setData] = useState<Recommendation[]>([]);

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
    loadRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict?.value, TOKEN, state.user]);

  const loadRecommendations = async () => {
    if (!TOKEN || !state.user) return;

    try {
      const res = await api.get(
        `/farmer/recommendations?district=${selectedDistrict?.value}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBadge = (index: number) => {
    if (index === 0) return "🥇 Best Choice";
    if (index === 1) return "🥈 High Profit";
    if (index === 2) return "🥉 Good Option";
    return "✔ Recommended";
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">
        {
          dashboardText.reports[
            lang as keyof typeof dashboardText.cropDashboard
          ]
        }
      </h1>

      {/* District Filter */}
      <div className="flex flex-col md:flex-row gap-3 bg-white pt-4 pb-4 p-2 rounded-xl shadow-sm border">
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

      {/* Recommendation Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item, index) => (
          <div
            key={item.crop}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* Rank Badge */}
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              {getBadge(index)}
            </span>

            <h3 className="text-xl font-semibold mt-2 text-gray-800">
              🌱 {item.crop}
            </h3>

            <p className="text-sm text-gray-500 mt-1">Recommendation Score</p>

            <div className="mt-3">
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full"
                  style={{ width: `${Math.min(item.score, 100)}%` }}
                />
              </div>
              <p className="text-sm font-medium text-gray-700 mt-1">
                {item.score.toFixed(1)} / 100
              </p>
            </div>

            {/* insight */}
            <p className="text-xs text-gray-500 mt-3">
              Based on district profit trends & market demand
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
