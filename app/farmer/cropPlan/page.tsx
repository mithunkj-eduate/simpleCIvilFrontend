"use client";
import AddModal from "@/components/helpers/AddModal";
import { Button } from "@/stories/Button/Button";
import { Operation, UserType } from "@/utils/enum.types";
import AddCropPlan from "./AddCropPlan";
import { useContext, useState } from "react";
import AddSession from "./AddSession";
import SeasonList from "./SeasonList";
import CropPlanList from "./CropPlanList";
import { AppContext } from "@/context/context";
import { dashboardText } from "@/app/utils/DashbordText";

const CropPlan = () => {
  const { state } = useContext(AppContext);
  const lang = state.lang ?? "en"
  const [modalFlag, setModalFlag] = useState(false);
  const [operation, setOperation] = useState(Operation.NONE);
  const [sessionModal, setSeesionModal] = useState(false);

  return (
    <div className="p-4 max-w-5xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-2xl font-bold text-green-700">🌾 {dashboardText.planning[lang as keyof typeof dashboardText.cropDashboard]}

        </h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            mode="primary"
            onClick={() => {
              setOperation(Operation.CREATE);
              setModalFlag(true);
            }}
          >
            + Crop Plan
          </Button>
          {state.user &&
            (state.user.role === UserType.ADMIN ||
              state.user.role === UserType.SYSTEM_ADMIN) && (
              <Button
                mode="secondary"
                onClick={() => {
                  setOperation(Operation.CREATE);
                  setSeesionModal(true);
                }}
              >
                + Season
              </Button>
            )}
        </div>
      </div>

      {/* Content Cards */}
      <div className="space-y-6">
        {/* Season Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-4">
          <SeasonList />
        </div>

        {/* Crop Plans Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-4">
          <CropPlanList />
        </div>
      </div>

      {/* Add Crop Plan Modal */}
      <AddModal modalFlag={modalFlag} setModalFlag={setModalFlag}>
        {" "}
        <AddCropPlan
          setModalFlag={setModalFlag}
          operations={{ operation, setOperation }}
          selectedId=""
        />
      </AddModal>

      {/* Add Season Modal */}
      <AddModal modalFlag={sessionModal} setModalFlag={setSeesionModal}>
        <AddSession
          setModalFlag={setSeesionModal}
          operations={{ operation, setOperation }}
          selectedId=""
        />
      </AddModal>
    </div>
  );
};

export default CropPlan;
