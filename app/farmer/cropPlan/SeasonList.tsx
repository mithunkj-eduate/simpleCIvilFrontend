"use client";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { toStandardDate } from "@/utils/utilFunctions";
import React, { useContext, useEffect, useState } from "react";

interface formDataTypes {
  seasonName: string;
  startDate: string;
  endDate: string;
}
const SeasonList = () => {
  const { TOKEN } = Api();
  const { state } = useContext(AppContext);

  const [formData, setFormData] = useState<formDataTypes[]>([]);

  useEffect(() => {
    if (!TOKEN || !state.user) return;

    const getStore = async () => {
      try {
        const res = await api.get(`/farmer/season`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        console.log(res.data);
        if (res.data) {
          setFormData(
            res.data.data.map((item: formDataTypes) => ({
              seasonName: item.seasonName,
              startDate: item.startDate,
              endDate: item.endDate,
            })),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStore();
  }, [TOKEN, state.user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Seasons</h2>

      <div className="space-y-2">
        {formData.map((crop) => (
          <div
            key={crop.seasonName}
            className="bg-white p-3 rounded-xl shadow flex justify-between"
          >
            <div>
              <p className="font-semibold">{crop.seasonName}</p>
              <p className="text-sm text-gray-500">
                {toStandardDate(crop.endDate)} to{" "}
                {toStandardDate(crop.startDate)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonList;
