"use client";
import { useContext, useEffect, useState } from "react";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";

interface cropeType {
  _id: string;
  totalArea: string;
  name: string;
}
export default function OversupplyAlert() {
  const [crops, setCrops] = useState<cropeType[]>([]);

  const { state } = useContext(AppContext);
  const { TOKEN } = Api();

  useEffect(() => {
    if (!TOKEN || !state.user) return;
    const getStore = async () => {
      try {
        const res = await api.get(`/farmer/oversupply`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data) {
          setCrops(
            res.data.map((item: cropeType) => ({
              _id: item._id,
              totalArea: item.totalArea,
              name: item.name,
            })),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStore();
  }, [TOKEN, state.user]);

  if (!crops) return null;

  return (
    <div className="bg-warning/20 p-4 rounded-xl">
      <h3 className="font-semibold">⚠ Oversupply Risk</h3>

      {crops.map((crop) => (
        <p key={crop.name}>{crop.name}</p>
      ))}
    </div>
  );
}
