"use client";
import { useContext, useEffect, useState } from "react";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";

interface trendsType {
  name: string;
  farmers: string;
}

export default function CropTrends() {
  const [trends, setTrends] = useState<trendsType[]>([]);

  const { state } = useContext(AppContext);
  const { TOKEN } = Api();

  useEffect(() => {
    if (!TOKEN || !state.user) return;
    const getStore = async () => {
      try {
        const res = await api.get(`/farmer/districtPlans`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data) {
          setTrends(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStore();
  }, [TOKEN, state.user]);

  if (!trends) return null;

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h3 className="font-semibold mb-2">District Trends</h3>

      {trends.map((crop) => (
        <div key={crop.name} className="flex justify-between">
          <span>{crop.name}</span>
          <span className="text-sm text-gray-500">{crop.farmers} farmers</span>
        </div>
      ))}
    </div>
  );
}
