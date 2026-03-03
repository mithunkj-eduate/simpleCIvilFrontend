"use client";
import { dashboardText } from "@/app/utils/DashbordText";
import { SafeImage } from "@/app/utils/SafeImage";
import AddModal from "@/components/helpers/AddModal";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { toStandardDate } from "@/utils/utilFunctions";
import React, { useContext, useEffect, useState } from "react";
import AddSession from "./AddSession";
import { Operation } from "@/utils/enum.types";

interface formDataTypes {
  _id: string;
  seasonName: string;
  startDate: string;
  endDate: string;
}
const SeasonList = () => {
  const { TOKEN } = Api();
  const { state } = useContext(AppContext);
  const lang = state.lang ?? "en";
  const [formData, setFormData] = useState<formDataTypes[]>([]);

  const [operation, setOperation] = useState(Operation.NONE);
  const [sessionModal, setSeesionModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

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
        console.log(res.data,"ddh");
        if (res.data) {
          setFormData(
            res.data.data.map((item: formDataTypes) => ({
              _id: item._id,
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
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        🌾{" "}
        {
          dashboardText.seasons[
            lang as keyof typeof dashboardText.cropDashboard
          ]
        }
      </h2>

      {formData.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">No seasons available</p>
      ) : (
        <div className="space-y-3">
          {formData.map((season) => (
            <div
              key={season.seasonName}
              className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition duration-200"
            >
              <div className="flex justify-between items-center">
                {/* Season Name */}
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {season.seasonName}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {toStandardDate(season.startDate)} →{" "}
                    {toStandardDate(season.endDate)}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button className="p-2 rounded-full hover:bg-green-50 transition cursor-pointer">
                    <SafeImage
                      alt="edit"
                      className="w-5 h-5 md:w-6 md:h-6 opacity-70 hover:opacity-100 transition"
                      src="/EditProfile.svg"
                      width={24}
                      height={24}
                      onClick={() => {
                        console.log(season,"ses")
                        setOperation(Operation.UPDATE);
                        setSeesionModal(true);
                        setSelectedId(season._id);
                      }}
                    />
                  </button>

                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddModal modalFlag={sessionModal} setModalFlag={setSeesionModal}>
        <AddSession
          setModalFlag={setSeesionModal}
          operations={{ operation, setOperation }}
          selectedId={selectedId}
        />
      </AddModal>
    </div>
  );
};

export default SeasonList;
