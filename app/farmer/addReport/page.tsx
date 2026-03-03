"use client";
import AddModal from "@/components/helpers/AddModal";
import { Button } from "@/stories/Button/Button";
import { useContext, useState } from "react";
import ProductionReportList from "./ProductionReportList";
import { Operation } from "@/utils/enum.types";
import AddProductionReport from "./AddProductionReport";
import { dashboardText } from "@/app/utils/DashbordText";
import { AppContext } from "@/context/context";

export default function ReportPage() {
  const {state} = useContext(AppContext)
  const [modalFlag, setModalFlag] = useState(false);
  const [operation, setOperation] = useState(Operation.NONE);
  const lang = state.lang ?? "en"

  // const [form, setForm] = useState({
  //   cropName: "",
  //   landSize: "",
  //   investment: "",
  //   sales: "",
  //   otherCharges: "",
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const profit =
  //   Number(form.sales) - (Number(form.investment) + Number(form.otherCharges));

  return (
    <div className="p-4 max-w-5xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-2xl font-bold text-green-700">🌾
           {dashboardText.reports[lang as keyof typeof dashboardText.cropDashboard]}
        </h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            mode="primary"
            onClick={() => {
              setOperation(Operation.CREATE);
              setModalFlag(true);
            }}
          >
            + Production Report
          </Button>

          {/* <Button
            mode="secondary"
            onClick={() => {
              setOperation(Operation.CREATE);
              setSeesionModal(true);
            }}
          >
            + Season
          </Button> */}
        </div>
      </div>

      {/* Content Cards */}
      <div className="space-y-6">
        {/* Season Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-4">
          <ProductionReportList />
        </div>

        {/* Crop Plans Section */}
        {/* <div className="bg-white rounded-2xl shadow-sm border p-4">
          <CropPlanList />
        </div> */}
      </div>

      {/* Add Crop Plan Modal */}
      <AddModal modalFlag={modalFlag} setModalFlag={setModalFlag}>
        {" "}
        <AddProductionReport
          setModalFlag={setModalFlag}
          operations={{ operation, setOperation }}
        />
      </AddModal>
    </div>
  );
}
