"use client";

import { dashboardText } from "@/app/utils/DashbordText";
import { SafeImage } from "@/app/utils/SafeImage";
import AddModal from "@/components/helpers/AddModal";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { toStandardDate } from "@/utils/utilFunctions";
import React, { useContext, useEffect, useState } from "react";
import { Operation } from "@/utils/enum.types";
import AddCropPlan from "./AddCropPlan";

interface CropPlanType {
  _id: string;
  cropName: string;
  plannedLandAcres: number;
  expectedPlantingDate: string;
  expectedHarvestDate: string;
  status: string;
}

const CropPlanList = () => {
  const { TOKEN } = Api();
  const { state } = useContext(AppContext);
  const lang = state.lang ?? "en";
  const [plans, setPlans] = useState<CropPlanType[]>([]);
  const [modalFlag, setModalFlag] = useState(false);
  const [operation, setOperation] = useState(Operation.NONE);
  const [selectedId,setSelectedId] = useState("")

  useEffect(() => {
    if (!TOKEN || !state.user) return;

    const fetchPlans = async () => {
      const res = await api.get("/farmer/cropPlan", {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      setPlans(res.data);
    };

    fetchPlans();
  }, [TOKEN, state.user]);

  const statusColor = (status: string) => {
    if (status === "PLANNED") return "bg-yellow-100 text-yellow-700";
    if (status === "PLANTED") return "bg-blue-100 text-blue-700";
    if (status === "HARVESTED") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-4 max-w-xl mx-auto pb-24">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        🌱{" "}
        {
          dashboardText.myPlans[
            lang as keyof typeof dashboardText.cropDashboard
          ]
        }
      </h2>

      {plans.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">
          No crop plans added yet
        </p>
      ) : (
        <div className="space-y-3">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {plan.cropName}
                </h3>

                <span className="text-xs font-semibold px-3 py-1 rounded-full">
                  <SafeImage
                    alt="edit"
                    className=""
                    height={30}
                    src="/EditProfile.svg"
                    width={30}
                    onClick={() => {
                      setOperation(Operation.UPDATE);
                      setModalFlag(true);
                      setSelectedId(plan._id)
                    }}
                  />
                </span>
                <span
                  className={`${statusColor(
                    plan.status,
                  )} text-xs font-semibold px-3 py-1 rounded-full`}
                >
                  {plan.status}
                </span>
              </div>

              {/* Acres */}
              <p className="text-sm text-gray-600 mt-2">
                🌾 Land:{" "}
                <span className="font-semibold">
                  {plan.plannedLandAcres} acres
                </span>
              </p>

              {/* Dates */}
              <div className="text-sm text-gray-500 mt-2">
                🌱 Planting:{" "}
                {plan.expectedPlantingDate
                  ? toStandardDate(plan.expectedPlantingDate)
                  : "-"}
              </div>

              <div className="text-sm text-gray-500">
                🌾 Harvest:{" "}
                {plan.expectedHarvestDate
                  ? toStandardDate(plan.expectedHarvestDate)
                  : "-"}
              </div>
            </div>
          ))}
        </div>
      )}

      <AddModal modalFlag={modalFlag} setModalFlag={setModalFlag}>
        {" "}
        <AddCropPlan
          setModalFlag={setModalFlag}
          operations={{ operation, setOperation }}
          selectedId={selectedId}
        />
      </AddModal>
    </div>
  );
};

export default CropPlanList;
