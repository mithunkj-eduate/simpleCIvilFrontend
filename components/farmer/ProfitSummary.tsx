"use client";
import { useContext, useEffect, useState } from "react";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";

interface dataType {
  _id: string;
  totalProfit: string;
  totalYield: string;
}
export default function ProfitSummary() {
  const [data, setData] = useState<dataType | null>(null);
  const { state } = useContext(AppContext);
  const { TOKEN } = Api();

  useEffect(() => {
    if (!TOKEN || !state.user) return;
    const getStore = async () => {
      try {
        const res = await api.get(`/farmer/profitSummary`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStore();
  }, [TOKEN, state.user]);

  if (!data) return null;

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="font-semibold text-lg">Your Profit</h2>

      <p className="text-2xl text-profit font-bold">₹ {data.totalProfit}</p>
    </div>
  );
}
